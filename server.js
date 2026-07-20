const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Загрузка переменных окружения из .env
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            const key = match[1];
            let value = match[2] || '';
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            } else if (value.startsWith("'") && value.endsWith("'")) {
                value = value.slice(1, -1);
            }
            process.env[key] = value;
        }
    });
}


const PORT = 3000;
const BOT_TOKEN = '8900718740:AAE3mKTpjSbzrJmAa8j_pUWlrtcAuZoqt5I';
const CONFIG_FILE = path.join(__dirname, 'admin.json');

// Хранилище ID администратора
let config = { adminId: null };

// Загрузка конфигурации администратора
if (fs.existsSync(CONFIG_FILE)) {
    try {
        config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        console.log('Конфигурация загружена. ID администратора:', config.adminId);
    } catch (e) {
        console.error('Ошибка загрузки конфигурации:', e);
    }
} else {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config), 'utf8');
}

// Функция сохранения конфигурации
function saveConfig() {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
}

// Функция отправки сообщения через Telegram API
function sendTelegramMessage(chatId, text, parseMode = 'Markdown') {
    const data = JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: parseMode
    });

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log(`Ответ от Telegram при отправке сообщения: ${body}`);
        });
    });

    req.on('error', (e) => {
        console.error(`Ошибка при отправке сообщения в Telegram: ${e.message}`);
    });

    req.write(data);
    req.end();
}

// HTTP Сервер для приема лидов
const server = http.createServer((req, res) => {
    // Включаем CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/lead' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const leadData = JSON.parse(body);
                console.log('Получен новый лид:', leadData);

                if (!config.adminId) {
                    console.warn('Внимание: Лид получен, но администратор еще не зарегистрирован! Напишите боту /start');
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: 'Администратор бота не зарегистрирован. Пожалуйста, напишите боту /start.' }));
                    return;
                }

                // Форматируем красивое сообщение для администратора
                const messageText = `🚀 *Новая заявка на разработку!*\n\n` +
                                    `👤 *Имя:* ${leadData.name || 'Не указано'}\n` +
                                    `📞 *Контакт:* ${leadData.contact || 'Не указано'}\n\n` +
                                    `📝 *Описание идеи / Роадмап:*\n${leadData.description || 'Не указано'}`;

                sendTelegramMessage(config.adminId, messageText);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (e) {
                console.error('Ошибка парсинга JSON:', e);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
            }
        });
    } else if (req.url === '/api/chat' && req.method === 'POST') {
        handleChatRequest(req, res);
    } else if (req.url === '/api/discovery' && req.method === 'POST') {
        handleDiscoveryRequest(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`HTTP сервер запущен на порту ${PORT}`);
});

// ==================== TELEGRAM BOT LONG POLLING ====================
let lastUpdateId = 0;

function pollUpdates() {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${lastUpdateId}&timeout=30`;
    
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (response.ok && response.result.length > 0) {
                    response.result.forEach((update) => {
                        processTelegramUpdate(update);
                        lastUpdateId = update.update_id + 1;
                    });
                }
            } catch (e) {
                console.error('Ошибка обработки ответов Long Polling:', e.message);
            }
            // Рекурсивный опрос сразу после окончания предыдущего
            setTimeout(pollUpdates, 1000);
        });
    }).on('error', (e) => {
        console.error('Ошибка связи с Telegram API (Long Polling):', e.message);
        setTimeout(pollUpdates, 5000); // повтор при ошибке сети
    });
}

function processTelegramUpdate(update) {
    if (!update.message || !update.message.text) return;
    
    const chatId = update.message.chat.id;
    const text = update.message.text.trim();
    const username = update.message.chat.username || '';

    console.log(`Получено сообщение от chat_id ${chatId} (@${username}): ${text}`);

    if (text.startsWith('/start')) {
        // Если админ еще не задан (первый запуск)
        if (!config.adminId) {
            config.adminId = chatId;
            saveConfig();
            
            sendAdminWelcome(chatId, true);
            return;
        }

        // Если пишет действующий админ
        if (chatId === config.adminId) {
            sendAdminWelcome(chatId, false);
            return;
        }

        // Если пишет обычный клиент (пользователь)
        sendClientWelcome(chatId);
    }
}

function sendAdminWelcome(chatId, isFirst = false) {
    const text = isFirst 
        ? `⚡ *Добро пожаловать в Dobrosvet Dev!*\n\nВы успешно зарегистрированы как администратор (первый запуск).\n\nТеперь все заявки и сгенерированные ИИ-роадмапы с сайта будут мгновенно присылаться вам в этот диалог.`
        : `⚡ *Добро пожаловать в панель администратора Dobrosvet Dev!*\n\nВы уже зарегистрированы в системе. Все лиды с сайта приходят сюда в реальном времени.`;

    const data = JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Открыть Web App 🚀',
                        web_app: {
                            url: 'https://createmind.org'
                        }
                    }
                ]
            ]
        }
    });

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = https.request(options, (res) => {});
    req.on('error', (e) => {
        console.error(`Ошибка при отправке приветствия админу: ${e.message}`);
    });
    req.write(data);
    req.end();
}

function sendClientWelcome(chatId) {
    const text = `👋 *Добро пожаловать в Dobrosvet Dev!*\n\n` +
                 `Запустите наше интерактивное приложение, чтобы надиктовать идею голосом и получить персональный роадмап разработки проекта.`;

    const data = JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Запустить приложение 🚀',
                        web_app: {
                            url: 'https://createmind.org'
                        }
                    }
                ]
            ]
        }
    });

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = https.request(options, (res) => {});
    req.on('error', (e) => {
        console.error(`Ошибка при отправке приветствия клиенту: ${e.message}`);
    });
    req.write(data);
    req.end();
}

// Запуск опроса обновлений бота
pollUpdates();

// ==================== AI ARCHITECT DEMO PLATFORM BACKEND ====================
const sessions = {};

function handleChatRequest(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const { sessionId, message, lang = 'ru' } = data;

            if (!sessionId || !message) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing sessionId or message' }));
                return;
            }

            // Инициализация сессии
            if (!sessions[sessionId]) {
                sessions[sessionId] = {
                    step: 0,
                    understanding: {
                        businessType: null,
                        problem: null,
                        goal: null,
                        channels: [],
                        integrations: [],
                        users: []
                    },
                    history: []
                };
            }

            const session = sessions[sessionId];
            session.history.push({ role: 'user', content: message });

            // Переключатель между реальным Gemini API и Fallback
            let result = null;
            if (process.env.GEMINI_API_KEY) {
                try {
                    result = await callGeminiAPI(process.env.GEMINI_API_KEY, session, message, lang);
                } catch (err) {
                    console.error('Ошибка Gemini API, переключаемся на Fallback:', err.message);
                    result = runFallbackArchitect(session, message, lang);
                }
            } else {
                result = runFallbackArchitect(session, message, lang);
            }

            // Сохраняем последний ответ в историю
            session.history.push({ role: 'model', content: result.assistantMessage });
            
            // Если чертеж готов, сохраняем его в сессию
            if (result.blueprintReady) {
                session.finalBlueprint = result.solution;
            }

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(result));
        } catch (e) {
            console.error('Ошибка в обработчике чата:', e);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error', details: e.message }));
        }
    });
}

function runFallbackArchitect(session, message, lang) {
    const isEn = lang === 'en';
    const text = message.toLowerCase();

    // Шаг 0: Анализ стартовой идеи
    if (session.step === 0) {
        let business = isEn ? "Services / Retail" : "Сфера услуг / Ритейл";
        let goal = isEn ? "Customer assistance" : "Консультирование клиентов";
        let channels = ["Telegram"];

        if (text.includes("стоматолог") || text.includes("dental") || text.includes("клиник") || text.includes("clinic")) {
            business = isEn ? "Dental Clinic" : "Стоматология / Медицина";
            goal = isEn ? "Automate client booking" : "Запись клиентов на прием";
        } else if (text.includes("магазин") || text.includes("shop") || text.includes("доставк") || text.includes("deliver")) {
            business = isEn ? "E-Commerce / Delivery" : "Интернет-магазин / Доставка";
            goal = isEn ? "Order processing" : "Прием и обработка заказов";
        } else if (text.includes("поддерж") || text.includes("support") || text.includes("клиент")) {
            business = isEn ? "Customer Support" : "Служба поддержки клиентов";
            goal = isEn ? "24/7 client support" : "Автоматизация ответов техподдержки";
        }

        session.understanding.businessType = business;
        session.understanding.goal = goal;
        session.understanding.channels = channels;

        const replyMsg = isEn 
            ? `Got it! You need an AI-assistant for **${business}** that will manage **${goal}** in Telegram. I will design the architecture for you.` 
            : `Понял задачу. Вам нужен умный AI-ассистент для **${business}**, который будет закрывать задачу **«${goal}»** в Telegram. Спроектируем архитектуру.`;

        const nextQ = isEn 
            ? "Do you already have a CRM, calendar, or booking system?" 
            : "У вас уже есть CRM-система, база данных или календарь записи клиентов?";

        session.step = 1;

        return {
            assistantMessage: replyMsg,
            currentUnderstanding: session.understanding,
            missingInformation: [isEn ? "users" : "пользователи", isEn ? "main problem" : "главная проблема"],
            nextQuestion: nextQ,
            solution: null,
            blueprintReady: false
        };
    }

    // Шаг 1: Ответ про CRM / интеграции
    if (session.step === 1) {
        let integrations = [];
        if (text.includes("да") || text.includes("yes") || text.includes("есть") || text.includes("amo") || text.includes("bitrix")) {
            integrations = ["CRM System", "Notifications"];
            session.understanding.integrations = integrations;
        } else {
            integrations = ["Google Sheets / Database"];
            session.understanding.integrations = integrations;
        }

        const replyMsg = isEn 
            ? "Great. Integrating the system with your database/CRM ensures real-time data synchronization." 
            : "Понял. Подключение базы данных или CRM обеспечит автоматическую выгрузку заявок в реальном времени.";

        const nextQ = isEn 
            ? "Who will be the primary users of the AI system? (customers, managers, or sales team)" 
            : "Кто будет основным пользователем ИИ-системы? (клиенты напрямую, менеджеры или отдел продаж)";

        session.step = 2;

        return {
            assistantMessage: replyMsg,
            currentUnderstanding: session.understanding,
            missingInformation: [isEn ? "main problem" : "главная проблема"],
            nextQuestion: nextQ,
            solution: null,
            blueprintReady: false
        };
    }

    // Шаг 2: Ответ про пользователей
    if (session.step === 2) {
        let users = [];
        if (text.includes("клиент") || text.includes("custom") || text.includes("все") || text.includes("all")) {
            users = [isEn ? "Customers" : "Клиенты напрямую"];
        } else {
            users = [isEn ? "Internal team" : "Внутренние менеджеры"];
        }
        session.understanding.users = users;

        const replyMsg = isEn 
            ? "Got it. We will design simple and clear dialog flows optimized for these users." 
            : "Отлично. Адаптируем сценарии диалога под эту категорию пользователей для максимальной конверсии.";

        const nextQ = isEn 
            ? "Provide your Telegram username or phone number to receive the generated project blueprint:" 
            : "Укажите ваш Telegram или телефон для отправки готового чертежа спецификации проекта:";

        session.step = 3;

        return {
            assistantMessage: replyMsg,
            currentUnderstanding: session.understanding,
            missingInformation: [],
            nextQuestion: nextQ,
            solution: null,
            blueprintReady: false
        };
    }

    // Шаг 3: Финал, отправка контакта
    if (session.step === 3) {
        session.understanding.contact = message;
        session.step = 4; // завершено

        // Формируем архитектуру решения
        const solution = {
            projectName: isEn 
                ? `AI Assistant for ${session.understanding.businessType}` 
                : `ИИ-Ассистент для ${session.understanding.businessType}`,
            businessType: session.understanding.businessType,
            primaryGoal: session.understanding.goal,
            modules: [
                { id: "telegram", name: "Telegram Bot", type: "channel", purpose: isEn ? "Receive customer messages" : "Прием сообщений клиентов" },
                { id: "ai-admin", name: "AI Core Agent", type: "agent", purpose: isEn ? "Understand requests and routing" : "Понимание запросов и маршрутизация" },
                { id: "knowledge", name: "Knowledge Base", type: "data", purpose: isEn ? "Store services, pricing, FAQ" : "Хранение услуг, цен и регламентов" },
                { id: "crm", name: "CRM Integration", type: "integration", purpose: isEn ? "Save leads and customer history" : "Сохранение лидов и истории клиентов" }
            ],
            connections: [
                ["telegram", "ai-admin"],
                ["ai-admin", "knowledge"],
                ["ai-admin", "crm"]
            ],
            workflow: [
                { step: 1, action: isEn ? "Client sends message to Telegram" : "Клиент пишет сообщение в Telegram" },
                { step: 2, action: isEn ? "AI parses intent and checks Knowledge Base" : "ИИ распознает намерение и сверяется с базой знаний" },
                { step: 3, action: isEn ? "AI responds with personalized details" : "ИИ формирует персональный ответ клиенту" },
                { step: 4, action: isEn ? "Lead information updated in CRM" : "Информация о лиде обновляется в CRM" }
            ]
        };

        const replyMsg = isEn 
            ? "Thank you! The architecture specifications of your project have been successfully compiled. Everything is ready."
            : "Спасибо! Спецификация и схема связей вашего проекта успешно сгенерированы. Все готово.";

        return {
            assistantMessage: replyMsg,
            currentUnderstanding: session.understanding,
            missingInformation: [],
            nextQuestion: null,
            solution: solution,
            blueprintReady: true
        };
    }

    // Если пишут после финала
    return {
        assistantMessage: isEn ? "All set! Please proceed to Telegram to discuss." : "Чертеж готов! Пожалуйста, переходите в Telegram для детального обсуждения.",
        currentUnderstanding: session.understanding,
        missingInformation: [],
        nextQuestion: null,
        solution: session.finalBlueprint || null,
        blueprintReady: true
    };
}

function callGeminiAPI(apiKey, session, message, lang) {
    return new Promise((resolve, reject) => {
        const isEn = lang === 'en';
        
        const systemInstruction = 
            `You are a Senior AI Solution Architect. Your job is to understand the visitor's business problem and design the smallest useful AI system that can solve it.\n` +
            `Return ONLY valid JSON that matches the following schema:\n` +
            `{\n` +
            `  "assistantMessage": "string containing your friendly reply in ${isEn ? 'English' : 'Russian'}",\n` +
            `  "currentUnderstanding": {\n` +
            `    "businessType": "string or null",\n` +
            `    "problem": "string or null",\n` +
            `    "goal": "string or null",\n` +
            `    "channels": ["strings of channels, e.g. Telegram"],\n` +
            `    "integrations": ["strings of integrations, e.g. CRM, Calendar"],\n` +
            `    "users": ["strings of users, e.g. Customers, Managers"]\n` +
            `  },\n` +
            `  "missingInformation": ["parameters still needed, e.g. users, CRM"],\n` +
            `  "nextQuestion": "string or null. Ask ONLY ONE question at a time. If all needed info is collected and blueprint is ready, set to null",\n` +
            `  "solution": {\n` +
            `    "projectName": "string or null",\n` +
            `    "businessType": "string or null",\n` +
            `    "primaryGoal": "string or null",\n` +
            `    "modules": [\n` +
            `      { "id": "string", "name": "string", "type": "string", "purpose": "string" }\n` +
            `    ],\n` +
            `    "connections": [ ["module_id_1", "module_id_2"] ],\n` +
            `    "workflow": [\n` +
            `      { "step": 1, "action": "string" }\n` +
            `    ]\n` +
            `  },\n` +
            `  "blueprintReady": boolean. Set to true ONLY when you have asked 2-4 questions, collected the name/contact and formulated the project blueprint.\n` +
            `}\n` +
            `Do not output any Markdown block like \`\`\`json. Return only the raw JSON.`;

        const contents = session.history.map(h => ({
            role: h.role === 'model' ? 'model' : 'user',
            parts: [{ text: h.content }]
        }));

        const postData = JSON.stringify({
            contents: contents,
            systemInstruction: {
                parts: [{ text: systemInstruction }]
            },
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const options = {
            hostname: 'generativelanguage.googleapis.com',
            port: 443,
            path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const responseJson = JSON.parse(body);
                    if (responseJson.candidates && responseJson.candidates[0].content.parts[0].text) {
                        const rawText = responseJson.candidates[0].content.parts[0].text.trim();
                        const parsed = JSON.parse(rawText);
                        resolve(parsed);
                    } else {
                        reject(new Error('Invalid response structure from Gemini API'));
                    }
                } catch (err) {
                    reject(err);
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(postData);
        req.end();
    });
}

function handleDiscoveryRequest(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        const startTime = Date.now();
        try {
            const data = JSON.parse(body);
            const { query } = data;

            if (!query) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: 'Missing query parameter' }));
                return;
            }

            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: 'OPENAI_API_KEY is not configured in .env' }));
                return;
            }

            const result = await callOpenAIAPI(apiKey, query);

            // Валидация схемы
            const requiredFields = [
                'language',
                'project_type',
                'existing_product',
                'needs_modernization',
                'needs_migration',
                'automation_opportunities',
                'summary',
                'clarifying_questions',
                'confidence'
            ];

            for (const field of requiredFields) {
                if (result[field] === undefined) {
                    throw new Error(`Missing required field in OpenAI response: ${field}`);
                }
            }

            const latency = Date.now() - startTime;
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                success: true,
                model: "gpt-5.5-pro",
                api: "RESPONSES",
                latency,
                result
            }));
        } catch (e) {
            const latency = Date.now() - startTime;
            console.error('Error in /api/discovery:', e);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({
                success: false,
                model: "gpt-5.5-pro",
                api: "RESPONSES",
                latency,
                error: e.message
            }));
        }
    });
}

function callOpenAIAPI(apiKey, prompt, timeoutMs = 90000) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            model: "gpt-5.5-pro",
            instructions: "You are a professional business analyst. Detect the language of the user query. Translate all output fields ('project_type', 'automation_opportunities', 'summary', 'clarifying_questions') to the detected query language (use 'ru' for Russian, 'en' for English). Return the detected language code in the 'language' field ('ru' or 'en').",
            input: prompt,
            text: {
                format: {
                    type: "json_schema",
                    name: "discovery_analysis",
                    strict: true,
                    schema: {
                        type: "object",
                        properties: {
                            language: { type: "string" },
                            project_type: { type: "string" },
                            existing_product: { type: "boolean" },
                            needs_modernization: { type: "boolean" },
                            needs_migration: { type: "boolean" },
                            automation_opportunities: {
                                type: "array",
                                items: { type: "string" }
                            },
                            summary: { type: "string" },
                            clarifying_questions: {
                                type: "array",
                                items: { type: "string" }
                            },
                            confidence: { type: "number" }
                        },
                        required: [
                            "language",
                            "project_type",
                            "existing_product",
                            "needs_modernization",
                            "needs_migration",
                            "automation_opportunities",
                            "summary",
                            "clarifying_questions",
                            "confidence"
                        ],
                        additionalProperties: false
                    }
                }
            }
        });

        const options = {
            hostname: 'api.openai.com',
            port: 443,
            path: '/v1/responses',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        let timer = setTimeout(() => {
            req.destroy();
            reject(new Error('OpenAI Responses API request timed out'));
        }, timeoutMs);

        const req = https.request(options, (res) => {
            clearTimeout(timer);
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const responseJson = JSON.parse(body);
                    if (responseJson.error) {
                        reject(new Error(responseJson.error.message || 'OpenAI API Error'));
                        return;
                    }
                    if (responseJson.output && Array.isArray(responseJson.output)) {
                        const msgItem = responseJson.output.find(item => item.type === 'message');
                        if (msgItem && msgItem.content && msgItem.content[0] && msgItem.content[0].type === 'output_text') {
                            const rawText = msgItem.content[0].text.trim();
                            resolve(JSON.parse(rawText));
                        } else {
                            reject(new Error(`Invalid response structure from OpenAI Responses API. Full response: ${body}`));
                        }
                    } else {
                        reject(new Error(`Invalid response structure from OpenAI Responses API. Output array missing. Full response: ${body}`));
                    }
                } catch (err) {
                    reject(err);
                }
            });
        });

        req.on('error', (e) => {
            clearTimeout(timer);
            reject(e);
        });

        req.write(postData);
        req.end();
    });
}

