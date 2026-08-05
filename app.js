// Инициализация Telegram WebApp SDK
const tg = (window.Telegram && window.Telegram.WebApp) ? window.Telegram.WebApp : {
    ready: () => {},
    expand: () => {},
    onEvent: () => {},
    colorScheme: 'dark',
    initDataUnsafe: { user: { language_code: 'ru' } },
    themeParams: { button_color: '#2563eb', button_text_color: '#ffffff' },
    MainButton: {
        show: () => {},
        hide: () => {},
        onClick: () => {},
        setParams: () => {}
    },
    openTelegramLink: (link) => window.open(link, '_blank'),
    showPopup: (params, callback) => {
        if (confirm(params.message)) {
            if (callback) callback('send');
        } else {
            if (callback) callback('cancel');
        }
    }
};

// КОНФИГУРАЦИЯ: Замените на ваш юзернейм в Telegram (без символа @)
const DEVELOPER_USERNAME = 'your_telegram_username'; 

// Polyfill for CanvasRenderingContext2D.roundRect to support older browsers
if (typeof CanvasRenderingContext2D.prototype.roundRect !== 'function') {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, radii) {
        if (radii === undefined || radii === null) radii = 0;
        let rTopLeft = 0, rTopRight = 0, rBottomRight = 0, rBottomLeft = 0;
        if (Array.isArray(radii)) {
            if (radii.length === 1) {
                rTopLeft = rTopRight = rBottomRight = rBottomLeft = radii[0];
            } else if (radii.length === 2) {
                rTopLeft = rBottomRight = radii[0];
                rTopRight = rBottomLeft = radii[1];
            } else if (radii.length === 3) {
                rTopLeft = radii[0];
                rTopRight = rBottomLeft = radii[1];
                rBottomRight = radii[2];
            } else if (radii.length >= 4) {
                rTopLeft = radii[0];
                rTopRight = radii[1];
                rBottomRight = radii[2];
                rBottomLeft = radii[3];
            }
        } else {
            rTopLeft = rTopRight = rBottomRight = rBottomLeft = radii;
        }

        const maxRadius = Math.min(w / 2, h / 2);
        rTopLeft = Math.min(maxRadius, Math.max(0, rTopLeft));
        rTopRight = Math.min(maxRadius, Math.max(0, rTopRight));
        rBottomRight = Math.min(maxRadius, Math.max(0, rBottomRight));
        rBottomLeft = Math.min(maxRadius, Math.max(0, rBottomLeft));

        this.moveTo(x + rTopLeft, y);
        this.lineTo(x + w - rTopRight, y);
        this.quadraticCurveTo(x + w, y, x + w, y + rTopRight);
        this.lineTo(x + w, y + h - rBottomRight);
        this.quadraticCurveTo(x + w, y + h, x + w - rBottomRight, y + h);
        this.lineTo(x + rBottomLeft, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - rBottomLeft);
        this.lineTo(x, y + rTopLeft);
        this.quadraticCurveTo(x, y, x + rTopLeft, y);
        this.closePath();
        return this;
    };
}

// Сообщаем Telegram, что приложение готово и разворачиваем его на весь экран
tg.ready();
tg.expand();

// Настройка цветовой схемы Telegram
function applyTheme() {
    const isLight = tg.colorScheme === 'light';
    if (isLight) {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// Применяем тему при загрузке и слушаем изменения темы в Telegram
applyTheme();
tg.onEvent('themeChanged', applyTheme);

// ==================== ЛОКАЛИЗАЦИЯ (RU | EN) ====================
const translations = {
    ru: {
        logo_title: "AI & Web Studio",
        logo_subtitle: "Умная автоматизация",
        hero_title: "Ваш следующий сотрудник.",
        hero_subtitle: "Модернизируем существующие продукты, переносим сайты на современную архитектуру и создаем ИИ-сотрудников для автоматизации, аналитики и развития бизнеса.",
        badge_automations: "⚡ Автоматизация",
        badge_employees: "🏗️ Модернизация",
        badge_growth: "🤖 AI Engineering",
        badge_time: "📈 Масштабирование",
        cta_start: "Начать проект",
        cta_solutions: "Смотреть решения",
        pulse_counter_label: "Задач выполнено сегодня:",
        workspace_tag: "AI OS Workspace",
        workspace_title: "Интерактивная среда",
        workspace_subtitle: "ИИ-сотрудник координирует все бизнес-процессы в реальном времени.",
        card_chat_title: "Интерфейс общения",
        chat_user_text: "Найди необработанные лиды в CRM.",
        chat_ai_text: "Найдено 17 диалогов. Обработано. Ответы отправлены клиентам.",
        voice_text: "Создать Telegram-бота для поддержки клиентов...",
        card_team_title: "ИИ-Команда (Агенты)",
        agent_sales: "Sales AI (Продажи)",
        agent_marketing: "Marketing AI (Маркетинг)",
        agent_support: "Support AI (Поддержка)",
        agent_finance: "Finance AI (Финансы)",
        card_workflow_title: "Автоматизация процессов",
        flow_lead: "Получение лида (Lead)",
        flow_qual: "Квалификация ИИ (Qualification)",
        flow_crm: "Запись в CRM (CRM sync)",
        flow_invoice: "Выставление счета (Invoice)",
        flow_complete: "Завершено (Completed)",
        card_memory_title: "База знаний и память",
        mem_tag_comm: "Канал связи",
        mem_val_comm: "Telegram WebApp & CRM",
        mem_tag_budget: "Бюджет лида",
        mem_val_budget: "Утвержден автоматически",
        mem_tag_goals: "Цели бизнеса",
        mem_val_goals: "Масштабирование воронки",
        card_analysis_title: "Анализ & Документы",
        doc_drop: "PDF / Word / Excel прикреплены",
        card_analytics_title: "Эффективность бизнеса",
        workspace_input_placeholder: "Спросите вашего ИИ-сотрудника...",
        quiz_q_title: "Шаг 1: Выберите бизнес-сценарий",
        quiz_opt_sales_title: "Автоматизация продаж",
        quiz_opt_sales_desc: "ИИ квалифицирует лиды, заносит в CRM и выставляет счета",
        quiz_opt_support_title: "Техподдержка 24/7",
        quiz_opt_support_desc: "ИИ мгновенно отвечает на частые вопросы клиентов",
        quiz_opt_parsing_title: "Анализ конкурентов",
        quiz_opt_parsing_desc: "ИИ парсит прайсы конкурентов и собирает Excel-отчет",
        quiz_submit_btn: "Запустить симуляцию ИИ-сотрудника 🚀",
        services_tag: "Решения",
        services_title: "Наши услуги",
        services_subtitle: "Качественная разработка полного цикла от идеи до масштабируемого продукта.",
        service_1_title: "ИИ-Сотрудник",
        service_1_desc: "ИИ квалифицирует входящие заявки, отвечает на частые вопросы и планирует встречи с клиентами.",
        s1_step1: "Сообщение",
        s1_step2: "Анализ",
        s1_step3: "Ответ",
        s1_step4: "Встреча",
        service_2_title: "Telegram WebApp",
        service_2_desc: "Интерактивный веб-интерфейс внутри Telegram: продажи, каталог услуг, оплата в один клик.",
        s2_step1: "Запуск",
        s2_step2: "Форма",
        s2_step3: "Оплата",
        s2_step4: "Успех",
        service_3_title: "Автоматизация",
        service_3_desc: "Связка API-сервисов, парсинг данных, автозаполнение CRM и оповещение менеджеров.",
        s3_step1: "Лид",
        s3_step2: "Маршрут",
        s3_step3: "CRM",
        s3_step4: "Алерт",
        service_4_title: "Интеллект сайта",
        service_4_desc: "Поведенческий анализ пользователей, автоматическое выявление SEO-проблем и багов.",
        s4_step1: "Сканирование",
        s4_step2: "SEO",
        s4_step3: "Скорость",
        s4_step4: "Отчет",
        service_5_title: "Анализ документов",
        service_5_desc: "Мгновенное извлечение условий из договоров, анализ PDF-отчетов и создание КП.",
        s5_step1: "PDF",
        s5_step2: "Парсинг",
        s5_step3: "Сводка",
        s5_step4: "КП",
        service_6_title: "Голосовой ИИ",
        service_6_desc: "Распознавание голосовых сообщений клиентов, вычленение намерений и постановка задач.",
        s6_step1: "Голос",
        s6_step2: "Текст",
        s6_step3: "Суть",
        s6_step4: "Задача",
        timeline_tag: "Процесс",
        timeline_title: 'Запуск проекта <span class="gradient-text">сегодня</span>',
        timeline_subtitle: "От вашей идеи до первого рабочего прототипа за 24 часа. Без лишней бюрократии.",
        timeline_step_1_title: "Обсуждение идеи",
        timeline_step_1_time: "Сегодня (30 минут)",
        timeline_step_1_desc: "Быстрый созвон. Разбираем вашу задачу, подбираем стек технологий и утверждаем концепт.",
        timeline_step_2_title: "Интерактивный прототип",
        timeline_step_2_time: "Сегодня к вечеру",
        timeline_step_2_desc: "Проектируем логику работы и собираем кликабельный макет, который вы сможете оценить в этот же день.",
        timeline_step_3_title: "Старт разработки",
        timeline_step_3_time: "Сегодня (сразу после ТЗ)",
        timeline_step_3_desc: "Без задержек разворачиваем проект, настраиваем базы данных и подключаем API ИИ-моделей (Gemini / GPT).",
        timeline_step_4_title: "Первые результаты",
        timeline_step_4_time: "Уже завтра",
        timeline_step_4_desc: "Вы получаете первую готовую к работе версию (MVP) для сбора заявок и тестирования гипотез.",
        tech_tag: "Стек",
        tech_title: 'Технологический <span class="gradient-text">арсенал</span>',
        tech_subtitle: "Используем передовые инструменты для быстродействия, надежности и масштабируемости.",
        benefit_1_title: "Высокая скорость",
        benefit_1_desc: "Запуск первой рабочей версии (MVP) уже через несколько дней.",
        benefit_2_title: "Надежность",
        benefit_2_desc: "Ваш код будет стабилен, надежен, безопасен и тщательно проверен. Это не хаотичный no-code, а профессиональная разработка от реальных программистов, вооруженных передовыми технологиями.",
        roadmap_tag: "AI Анализ",
        roadmap_title: 'Персональный <span class="gradient-text">Роадмап</span>',
        roadmap_subtitle: "Индивидуальный план разработки вашего проекта на основе нашего стека технологий.",
        contact_tag: "Старт",
        contact_title: "Что бы вы хотели поручить ИИ в вашем бизнесе?",
        contact_subtitle: "Спроектируйте архитектуру вашей будущей системы вместе с ИИ-Архитектором за 1 минуту.",
        architect_input_placeholder: "Опишите вашу идею...",
        architect_blueprint_title: "Архитектура вашего проекта",
        architect_detected_modules: "Обнаруженные модули:",
        architect_timeline_est: "Оценка разработки: {weeks} недель",
        architect_call_btn: "Запланировать стратегический звонок",
        architect_blueprint_btn: "Получить чертеж проекта",
        architect_welcome: "Привет! Я ведущий ИИ-Архитектор студии. Опишите вашу идею или бизнес-задачу, и мы вместе спроектируем структуру вашего будущего решения.",
        architect_q_industry: "Какая сфера вашего бизнеса?",
        architect_q_users: "Кто будет основным пользователем ИИ-системы?",
        architect_q_problem: "Какую главную проблему должен решить ИИ?",
        architect_q_date: "Желаемая дата запуска MVP?",
        architect_q_contact: "Укажите ваш Telegram или телефон для отправки готового чертежа:",
        architect_summary: "Архитектура проекта успешно сформирована!",
        proof_sales: "● AI Sales Assistant (вчера)",
        proof_miniapp: "● Telegram Mini App (3 дня назад)",
        proof_automation: "● CRM Автоматизация (на этой неделе)",
        proof_consultant: "● AI Consultant (сегодня)",
        direct_tg_channel: "Telegram-канал",
        direct_tg_chat: "Личный чат",
        footer_text: "© 2026 AI & Web Studio. Все права защищены.",
        signature_phrase: "Каждая великая ИИ-система начинается с одной идеи.",
        signature_btn: "Давайте создадим вашу",
        hero_entry_label: "Какую задачу вы хотите решить?",
        hero_entry_placeholder: "Опишите проект, сайт или задачу для автоматизации...",
        tag_sales_emp: "Обновить существующий продукт",
        tag_tg_app: "Перенести сайт на новую архитектуру",
        tag_process_auto: "Внедрить AI в бизнес",
        blueprint_understanding_title: "Живая спецификация (ИИ-Анализ):",
        u_business: "Бизнес:",
        u_goal: "Цель:",
        u_channel: "Канал:",
        u_integrations: "Интеграции:",
        u_users: "Пользователи:",
        chat_header_title: "AI-Консультант",
        chat_status_text: "онлайн",
        chat_welcome_msg: 'Привет! Напишите или надиктуйте голосом вашу идею (например: "Нужен бот для доставки еды" или "Хочу сайт для продажи услуг").<br><br>Я мгновенно проанализирую её, предложу стек технологий и составлю детальный роадмап проекта прямо на этой странице! 🚀',
        chat_input_placeholder: "Опишите вашу идею...",
        recording_error: "Ошибка распознавания речи.",
        recording_denied: "Голосовой ввод не поддерживается или заблокирован.",
        empty_text_error: "Пожалуйста, опишите вашу идею.",
        ai_analyzing: "🤖 <i>Анализирую вашу идею...</i>",
        ai_stacking: "🤖 <i>Подбираю оптимальный стек технологий...</i>",
        ai_planning: "🤖 <i>Формирую пошаговый план разработки...</i>",
        ai_ready_chat: "🤖 <b>Готово!</b> Я создал персональный роадмап для вашего проекта.<br><br>Стек: <code>{stack}</code><br>Срок: <b>{time}</b>.<br><br>👇 Ознакомьтесь с планом на странице ниже!",
        lead_success: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
        lead_error: "Ошибка отправки заявки. Пожалуйста, попробуйте еще раз.",
        discovery_status_idle: "Ожидание запроса...",
        discovery_status_thinking: "Анализирую проект…",
        ind_type: "Определяю тип проекта",
        ind_system: "Изучаю текущую систему",
        ind_mod: "Ищу точки модернизации",
        ind_auto: "Анализирую возможности автоматизации",
        discovery_understood_title: "Я понял задачу",
        discovery_clarifying_title: "Мне нужно уточнить несколько деталей",
        discovery_submit_btn: "Продолжить анализ",
        discovery_saved_status: "Ответы сохранены",
        discovery_error_msg: "Не удалось завершить анализ. Попробуйте еще раз.",
        discovery_retry_btn: "Повторить анализ"
    },
    en: {
        logo_title: "AI & Web Studio",
        logo_subtitle: "Smart Automation",
        hero_title: "Your next employee.",
        hero_subtitle: "We modernize existing products, migrate websites to modern architecture, and build AI employees for automation, analytics, and business growth.",
        badge_automations: "⚡ Automation",
        badge_employees: "🏗️ Modernization",
        badge_growth: "🤖 AI Engineering",
        badge_time: "📈 Scaling",
        cta_start: "Start Project",
        cta_solutions: "View Solutions",
        pulse_counter_label: "Tasks completed today:",
        workspace_tag: "AI OS Workspace",
        workspace_title: "Interactive Workspace",
        workspace_subtitle: "An AI employee coordinates all business processes in real time.",
        card_chat_title: "AI Chat Interface",
        chat_user_text: "Find unanswered leads.",
        chat_ai_text: "17 conversations processed. Completed.",
        voice_text: "Create a Telegram bot for customer support...",
        card_team_title: "AI Team (Agents)",
        agent_sales: "Sales AI",
        agent_marketing: "Marketing AI",
        agent_support: "Support AI",
        agent_finance: "Finance AI",
        card_workflow_title: "Automated Workflow",
        flow_lead: "Lead Generation",
        flow_qual: "AI Qualification",
        flow_crm: "CRM Sync",
        flow_invoice: "Invoice Created",
        flow_complete: "Workflow Completed",
        card_memory_title: "Knowledge & Memory",
        mem_tag_comm: "Communication",
        mem_val_comm: "Telegram WebApp & CRM",
        mem_tag_budget: "Budget Status",
        mem_val_budget: "Approved automatically",
        mem_tag_goals: "Business Goals",
        mem_val_goals: "Scale funnel efficiency",
        card_analysis_title: "Website & Docs Analysis",
        doc_drop: "PDF / Word / Excel files dropped",
        card_analytics_title: "Business Efficiency",
        workspace_input_placeholder: "Ask your AI employee...",
        quiz_q_title: "Step 1: Select a Business Scenario",
        quiz_opt_sales_title: "Sales Automation",
        quiz_opt_sales_desc: "AI qualifies leads, syncs with CRM and issues invoices",
        quiz_opt_support_title: "Customer Support 24/7",
        quiz_opt_support_desc: "AI instantly answers frequent customer questions",
        quiz_opt_parsing_title: "Competitor Analysis",
        quiz_opt_parsing_desc: "AI scrapes competitor prices and compiles Excel reports",
        quiz_submit_btn: "Run AI Employee Simulation 🚀",
        services_tag: "Solutions",
        services_title: "Our Services",
        services_subtitle: "Full-cycle premium development from idea to scale.",
        service_1_title: "AI Employee",
        service_1_desc: "AI qualifies inbound requests, answers customer questions, and books calendar meetings.",
        s1_step1: "Message",
        s1_step2: "Analyze",
        s1_step3: "Reply",
        s1_step4: "Booked",
        service_2_title: "Telegram WebApp",
        service_2_desc: "Interactive web app directly in Telegram: ecommerce, catalogs, single-tap payments.",
        s2_step1: "Open",
        s2_step2: "Form",
        s2_step3: "Pay",
        s2_step4: "Done",
        service_3_title: "Automation",
        service_3_desc: "Integrating API services, scraping data, autofilling CRM, and notifying managers.",
        s3_step1: "Lead",
        s3_step2: "Route",
        s3_step3: "CRM",
        s3_step4: "Alert",
        service_4_title: "Website Intelligence",
        service_4_desc: "AI behavioral analytics, automatic search for UX bugs, SEO auditing, and load metrics.",
        s4_step1: "Scan",
        s4_step2: "SEO",
        s4_step3: "Perf",
        s4_step4: "Report",
        service_5_title: "Documents AI",
        service_5_desc: "Instant knowledge extraction from contracts, PDF analysis, and proposal generation.",
        s5_step1: "PDF",
        s5_step2: "Extract",
        s5_step3: "Summary",
        s5_step4: "Proposal",
        service_6_title: "Voice AI",
        service_6_desc: "Transcribing customer voice messages, detecting intent, and auto-creating task lists.",
        s6_step1: "Voice",
        s6_step2: "Text",
        s6_step3: "Intent",
        s6_step4: "Task",
        timeline_tag: "Process",
        timeline_title: 'Launch Project <span class="gradient-text">Today</span>',
        timeline_subtitle: "From your idea to the first working prototype in 24 hours. Minimal bureaucracy.",
        timeline_step_1_title: "Idea Discussion",
        timeline_step_1_time: "Today (30 mins)",
        timeline_step_1_desc: "Quick call. We analyze your task, select the tech stack, and agree on the concept.",
        timeline_step_2_title: "Interactive Prototype",
        timeline_step_2_time: "Today by evening",
        timeline_step_2_desc: "We design the application logic and build a clickable layout you can test the same day.",
        timeline_step_3_title: "Start Development",
        timeline_step_3_time: "Today (right after specs)",
        timeline_step_3_desc: "No delays. We set up the environment, databases, and integrate AI APIs (Gemini / GPT).",
        timeline_step_4_title: "First Results",
        timeline_step_4_time: "By tomorrow",
        timeline_step_4_desc: "You get the first working version (MVP) to collect leads and test hypotheses.",
        tech_tag: "Stack",
        tech_title: 'Tech <span class="gradient-text">Stack</span>',
        tech_subtitle: "We use cutting-edge tools for fast performance, security, and scalability.",
        benefit_1_title: "Ultra Fast Speed",
        benefit_1_desc: "Deploying the first working version (MVP) in just a few days.",
        benefit_2_title: "High Reliability",
        benefit_2_desc: "Your code will be stable, reliable, secure, and fully tested. This is professional custom coding by developers armed with modern AI tools, not random no-code.",
        roadmap_tag: "AI Analysis",
        roadmap_title: 'Custom <span class="gradient-text">Roadmap</span>',
        roadmap_subtitle: "Personal development plan for your project based on our modern tech stack.",
        contact_tag: "Start",
        contact_title: "What would you like AI to do for your business?",
        contact_subtitle: "Design the architecture of your future AI system with our AI Architect in 1 minute.",
        architect_input_placeholder: "Describe your idea...",
        architect_blueprint_title: "Project Architecture Blueprint",
        architect_detected_modules: "Detected Modules:",
        architect_timeline_est: "Estimated development: {weeks} weeks",
        architect_call_btn: "Schedule Strategy Call",
        architect_blueprint_btn: "Receive Project Blueprint",
        architect_welcome: "Hello! I am the lead AI Solution Architect. Describe your business idea, and we'll design your custom blueprint together.",
        architect_q_industry: "What industry is your business?",
        architect_q_users: "Who will be the primary users of the AI system?",
        architect_q_problem: "What main problem should the AI solve?",
        architect_q_date: "What is your target launch date for the MVP?",
        architect_q_contact: "Provide your Telegram username or phone to receive the blueprint:",
        architect_summary: "Project architecture blueprint prepared!",
        proof_sales: "● AI Sales Assistant (yesterday)",
        proof_miniapp: "● Telegram Mini App (3 days ago)",
        proof_automation: "● CRM Automation (this week)",
        proof_consultant: "● AI Consultant (today)",
        direct_tg_channel: "Telegram Channel",
        direct_tg_chat: "Direct Chat",
        footer_text: "© 2026 AI & Web Studio. All rights reserved.",
        signature_phrase: "Every great AI system starts with one idea.",
        signature_btn: "Let's build yours",
        hero_entry_label: "What task would you like to solve?",
        hero_entry_placeholder: "Describe your project, website, or task for automation...",
        tag_sales_emp: "Update existing product",
        tag_tg_app: "Migrate website to new architecture",
        tag_process_auto: "Integrate AI into business",
        blueprint_understanding_title: "Live Project Specification (AI-Analysis):",
        u_business: "Business:",
        u_goal: "Goal:",
        u_channel: "Channel:",
        u_integrations: "Integrations:",
        u_users: "Users:",
        chat_header_title: "AI Consultant",
        chat_status_text: "online",
        chat_welcome_msg: 'Hello! Type or voice your idea (e.g. "Need a delivery bot" or "Want a landing page to sell services").<br><br>I will analyze it instantly, suggest the best tech stack, and generate a custom project roadmap right here on this page! 🚀',
        chat_input_placeholder: "Describe your idea...",
        recording_error: "Speech recognition error.",
        recording_denied: "Speech input not supported or permission denied.",
        empty_text_error: "Please describe your idea first.",
        ai_analyzing: "🤖 <i>Analyzing your idea...</i>",
        ai_stacking: "🤖 <i>Selecting the optimal tech stack...</i>",
        ai_planning: "🤖 <i>Formulating a step-by-step roadmap...</i>",
        ai_ready_chat: "🤖 <b>Done!</b> I created a custom roadmap for your project.<br><br>Stack: <code>{stack}</code><br>Timeframe: <b>{time}</b>.<br><br>👇 Check out the plan below!",
        lead_success: "Request sent successfully! We will contact you soon.",
        lead_error: "Error sending request. Please try again.",
        discovery_status_idle: "Waiting for input...",
        discovery_status_thinking: "Analyzing project…",
        ind_type: "Determining project type",
        ind_system: "Studying current system",
        ind_mod: "Searching for modernization points",
        ind_auto: "Analyzing automation opportunities",
        discovery_understood_title: "Project Understood",
        discovery_clarifying_title: "I need to clarify a few details",
        discovery_submit_btn: "Continue analysis",
        discovery_saved_status: "Answers saved successfully",
        discovery_error_msg: "Failed to complete analysis. Please try again.",
        discovery_retry_btn: "Retry analysis"
    }
};

let currentLang = localStorage.getItem('preferred-lang') || 'ru';
window.currentLang = currentLang;

window.updateTranslations = function(lang) {
    currentLang = lang;
    window.currentLang = lang;
    if (typeof setLanguage === 'function') {
        setLanguage(lang);
    }
};

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('preferred-lang', lang);

    // Переводим обычные элементы
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Переводим плейсхолдеры
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Обновляем состояние кнопок переключателя
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Обновляем текст Main Button в Telegram
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.MainButton) {
        window.Telegram.WebApp.MainButton.setParams({
            text: lang === 'en' ? 'SEND INQUIRY' : 'ОТПРАВИТЬ ЗАЯВКУ'
        });
    }
}

const LanguageManager = {
    getUILanguage() {
        let lang = localStorage.getItem('preferred-lang');
        if (!lang) {
            // Проверяем язык юзера в Telegram WebApp SDK
            const tgLang = tg.initDataUnsafe?.user?.language_code;
            if (tgLang) {
                lang = tgLang.toLowerCase().startsWith('ru') ? 'ru' : 'en';
            } else {
                // Проверяем языки браузера (Priority 2)
                const browserLanguages = navigator.languages || [navigator.language || 'en'];
                const isRussian = browserLanguages.some((language) =>
                    language.toLowerCase().startsWith("ru")
                );
                lang = isRussian ? 'ru' : 'en';
            }
        }
        return lang;
    },

    setUILanguage(lang) {
        setLanguage(lang);
    },

    init() {
        const lang = this.getUILanguage();
        this.setUILanguage(lang);

        // Вешаем обработчики на переключатель
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const newLang = btn.getAttribute('data-lang');
                this.setUILanguage(newLang);
            });
        });
    }
};

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    LanguageManager.init();
});

// DOM Элементы
const leadForm = document.getElementById('lead-form');
const submitBtn = document.getElementById('submit-btn');
const directTgLink = document.getElementById('direct-tg-link');
const clientNameInput = document.getElementById('client-name');
const clientContactInput = document.getElementById('client-contact');
const projectDescInput = document.getElementById('project-desc');

// Настройка прямой ссылки в Telegram
if (directTgLink) {
    const defaultText = encodeURIComponent('Привет! Хочу обсудить разработку проекта.');
    directTgLink.href = `https://t.me/${DEVELOPER_USERNAME}?text=${defaultText}`;
    
    directTgLink.addEventListener('click', (e) => {
        e.preventDefault();
        tg.openTelegramLink(`https://t.me/${DEVELOPER_USERNAME}?text=${defaultText}`);
    });
}

// Настройка нативной главной кнопки Telegram (Main Button)
const mainButton = tg.MainButton;
if (mainButton) {
    mainButton.setParams({
        text: 'ОТПРАВИТЬ ЗАЯВКУ',
        color: tg.themeParams.button_color || '#2563eb',
        text_color: tg.themeParams.button_text_color || '#ffffff'
    });
}

// Функция валидации формы
function validateForm() {
    if (!clientNameInput || !clientContactInput || !projectDescInput) return false;
    return clientNameInput.value.trim() !== '' && 
           clientContactInput.value.trim() !== '' && 
           projectDescInput.value.trim() !== '';
}

// Показываем/скрываем Main Button в зависимости от заполненности формы
function updateMainButtonVisibility() {
    if (!mainButton) return;
    if (validateForm()) {
        mainButton.show();
    } else {
        mainButton.hide();
    }
}

// Слушатели событий ввода данных для управления Main Button
if (clientNameInput && clientContactInput && projectDescInput) {
    [clientNameInput, clientContactInput, projectDescInput].forEach(input => {
        input.addEventListener('input', updateMainButtonVisibility);
    });
}

// Обработка нажатия на главную кнопку Telegram
if (mainButton) {
    mainButton.onClick(() => {
        if (validateForm()) {
            submitForm();
        }
    });
}

// Вспомогательная функция для показа Toast-уведомлений
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // Плавное появление
    setTimeout(() => {
        toast.classList.remove('hidden');
    }, 50);

    // Скрытие через 4 секунды
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}

// Функция отправки формы
function submitForm() {
    const isEn = (currentLang === 'en');
    // Считываем параметр перехода (например, startapp=tgchannel)
    const startParam = tg.initDataUnsafe ? (tg.initDataUnsafe.start_param || '') : '';
    let sourceText = '';
    if (startParam) {
        if (startParam === 'tgchannel') {
            sourceText = isEn ? '\n\n📍 Source: Telegram Channel' : '\n\n📍 Источник перехода: Telegram-канал';
        } else if (startParam === 'chat') {
            sourceText = isEn ? '\n\n📍 Source: Group Chat' : '\n\n📍 Источник перехода: Групповой чат';
        } else {
            sourceText = isEn ? `\n\n📍 Source: ${startParam}` : `\n\n📍 Источник перехода: ${startParam}`;
        }
    }

    const formData = {
        name: clientNameInput.value.trim(),
        contact: clientContactInput.value.trim(),
        description: projectDescInput.value.trim() + sourceText
    };

    // Блокируем кнопку отправки в форме
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.querySelector('span').textContent = isEn ? 'Sending...' : 'Отправка...';
    }
    mainButton.showProgress(false); // Показываем лоадер на кнопке Telegram

    // Генерируем красивое сообщение для отправки в ЛС разработчику (как фолбек)
    const messageText = isEn 
        ? `🚀 *New Project Inquiry!*\n\n👤 *Name:* ${formData.name}\n📞 *Contact:* ${formData.contact}\n\n📝 *Project Description:*\n${formData.description}`
        : `🚀 *Новая заявка на разработку!*\n\n👤 *Имя:* ${formData.name}\n📞 *Contact:* ${formData.contact}\n\n📝 *Описание проекта:*\n${formData.description}`;

    // Отправляем лид на наш API-эндпоинт
    fetch('/api/lead', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сервера');
        }
        return response.json();
    })
    .then(data => {
        showToast(translations[currentLang].lead_success, 'success');
        resetForm();
    })
    .catch(error => {
        console.error('Ошибка отправки на API, переключаемся на фолбек:', error);
        
        // Показываем пользователю всплывающее окно Telegram (Popup) с предложением написать в ЛС
        tg.showPopup({
            title: isEn ? 'Send Inquiry' : 'Отправка заявки',
            message: isEn ? 'Direct submission is temporarily unavailable. Would you like to send your request directly in chat?' : 'Прямая отправка временно недоступна. Хотите переслать данные напрямую разработчику в чат?',
            buttons: [
                { id: 'send', type: 'default', text: isEn ? 'Message Developer' : 'Написать разработчику' },
                { id: 'cancel', type: 'cancel', text: isEn ? 'Cancel' : 'Отмена' }
            ]
        }, (buttonId) => {
            if (buttonId === 'send') {
                const link = `https://t.me/${DEVELOPER_USERNAME}?text=${encodeURIComponent(messageText)}`;
                tg.openTelegramLink(link);
                showToast(isEn ? 'Data prepared for sending!' : 'Данные подготовлены для отправки!', 'success');
                resetForm();
            } else {
                // Разблокируем кнопки в случае отмены
                enableButtons();
            }
        });
    });
}

// Функция разблокировки кнопок
function enableButtons() {
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.querySelector('span').textContent = translations[currentLang].form_submit_btn;
    }
    mainButton.hideProgress();
}

// Сброс формы после отправки
function resetForm() {
    if (leadForm) leadForm.reset();
    enableButtons();
    if (mainButton) mainButton.hide();
}

// Обработка стандартной отправки формы по нажатию кнопки в дизайне
if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });
}

// Анимация 3D наклона (Tilt Effect) для карточек услуг на десктопе
const cards = document.querySelectorAll('.service-card');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // координата X внутри элемента
        const y = e.clientY - rect.top;  // координата Y внутри элемента
        
        const width = rect.width;
        const height = rect.height;
        
        // Расчет угла наклона (макс. 8 градусов)
        const rotateX = ((height / 2 - y) / (height / 2)) * 8;
        const rotateY = ((x - width / 2) / (width / 2)) * 8;
        
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// Анимация появления элементов при прокрутке (Scroll Reveal)
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ==================== AI ЧАТ И ГЕНЕРАТОР РОАДМАПОВ ====================

const chatTrigger = document.getElementById('chat-trigger');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatMinimize = document.getElementById('chat-minimize');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const voiceBtn = document.getElementById('voice-btn');
const dynamicRoadmapSection = document.getElementById('dynamic-roadmap');
const dynamicRoadmapContent = document.getElementById('dynamic-roadmap-content');

// Открытие/закрытие чата
if (chatTrigger) {
    chatTrigger.addEventListener('click', () => {
        if (chatWindow) chatWindow.classList.toggle('hidden');
        // Скрываем пульсацию на бабле после первого открытия
        const pulse = chatTrigger.querySelector('.trigger-pulse');
        if (pulse) pulse.remove();
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        if (chatWindow) chatWindow.classList.add('hidden');
    });
}

// Сворачивание чата
if (chatMinimize) {
    chatMinimize.addEventListener('click', (e) => {
        e.stopPropagation();
        if (chatWindow) {
            const isMinimized = chatWindow.classList.toggle('minimized');
            chatMinimize.innerHTML = isMinimized ? '&#9634;' : '&#9472;'; // ▢ or ─
            chatMinimize.title = isMinimized ? 'Развернуть' : 'Свернуть';
        }
    });
}

// Перетаскивание чата за шапку
const chatHeader = document.querySelector('.chat-header');
if (chatHeader && chatWindow) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    chatHeader.addEventListener('mousedown', (e) => {
        // Игнорируем клики по кнопкам управления (закрыть, свернуть)
        if (e.target.closest('.chat-header-actions')) return;

        isDragging = true;
        
        // Получаем текущие координаты окна
        const rect = chatWindow.getBoundingClientRect();
        
        chatWindow.style.position = 'fixed';
        chatWindow.style.bottom = 'auto';
        chatWindow.style.right = 'auto';
        chatWindow.style.left = rect.left + 'px';
        chatWindow.style.top = rect.top + 'px';
        
        startX = e.clientX;
        startY = e.clientY;
        startLeft = rect.left;
        startTop = rect.top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        
        e.preventDefault();
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        let newLeft = startLeft + deltaX;
        let newTop = startTop + deltaY;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const rect = chatWindow.getBoundingClientRect();
        
        if (newLeft < 0) newLeft = 0;
        if (newLeft + rect.width > windowWidth) newLeft = windowWidth - rect.width;
        if (newTop < 0) newTop = 0;
        if (newTop + rect.height > windowHeight) newTop = windowHeight - rect.height;
        
        chatWindow.style.left = newLeft + 'px';
        chatWindow.style.top = newTop + 'px';
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // Touch события для мобильных устройств
    chatHeader.addEventListener('touchstart', (e) => {
        if (e.target.closest('.chat-header-actions')) return;
        
        isDragging = true;
        const rect = chatWindow.getBoundingClientRect();
        
        chatWindow.style.position = 'fixed';
        chatWindow.style.bottom = 'auto';
        chatWindow.style.right = 'auto';
        chatWindow.style.left = rect.left + 'px';
        chatWindow.style.top = rect.top + 'px';
        
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    });

    function onTouchMove(e) {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        let newLeft = startLeft + deltaX;
        let newTop = startTop + deltaY;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const rect = chatWindow.getBoundingClientRect();
        
        if (newLeft < 0) newLeft = 0;
        if (newLeft + rect.width > windowWidth) newLeft = windowWidth - rect.width;
        if (newTop < 0) newTop = 0;
        if (newTop + rect.height > windowHeight) newTop = windowHeight - rect.height;
        
        chatWindow.style.left = newLeft + 'px';
        chatWindow.style.top = newTop + 'px';
        
        e.preventDefault();
    }

    function onTouchEnd() {
        isDragging = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }
}

// Добавление сообщения в чат
function appendMessage(text, sender = 'bot') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv;
}

// Speech Recognition (Распознавание речи)
let recognition;
let isRecording = false;
let activeSpeechInput = null; // 'chat' или 'hero'

const heroInput = document.getElementById('hero-input-field');
const heroSend = document.getElementById('hero-send-btn');
const heroVoice = document.getElementById('hero-voice-btn');

function handleHeroSend() {
    if (!heroInput) return;
    const text = heroInput.value.trim();
    if (!text) {
        showToast(translations[currentLang].empty_text_error, 'error');
        return;
    }
    
    // Копируем текст в чат Workspace
    if (chatInput) {
        chatInput.value = text;
    }
    heroInput.value = '';
    
    // Переключаем приложение в Workspace
    const appRoot = document.getElementById('app-root');
    const workspaceSec = document.getElementById('workspace');
    if (appRoot && workspaceSec) {
        appRoot.classList.remove('state-hero');
        appRoot.classList.add('state-workspace');
        workspaceSec.classList.remove('collapsed');
        
        // Запускаем анализ и генерацию роадмапа
        handleSendMessage();
        
        // Плавный скролл к чату
        setTimeout(() => {
            const chatEl = document.getElementById('chat-window');
            if (chatEl) {
                chatEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    }
}

if (heroSend) {
    heroSend.addEventListener('click', handleHeroSend);
}
if (heroInput) {
    heroInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleHeroSend();
        }
    });
}

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ru-RU';

    recognition.onstart = () => {
        isRecording = true;
        if (activeSpeechInput === 'chat') {
            if (voiceBtn) voiceBtn.classList.add('recording');
            if (chatInput) chatInput.placeholder = currentLang === 'en' ? 'Listening... Speak' : 'Слушаю вас... Говорите';
        } else if (activeSpeechInput === 'hero') {
            if (heroVoice) heroVoice.classList.add('recording');
            if (heroInput) heroInput.placeholder = currentLang === 'en' ? 'Listening... Speak' : 'Слушаю вас... Говорите';
        }
    };

    recognition.onresult = (event) => {
        const resultText = event.results[0][0].transcript;
        if (activeSpeechInput === 'chat') {
            if (chatInput) chatInput.value = resultText;
        } else if (activeSpeechInput === 'hero') {
            if (heroInput) {
                heroInput.value = resultText;
                handleHeroSend(); // Автоматическая отправка при завершении речи
            }
        }
        showToast(currentLang === 'en' ? 'Speech recognized successfully!' : 'Речь успешно распознана!', 'success');
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        showToast(currentLang === 'en' ? 'Speech recognition error.' : 'Ошибка распознавания речи.', 'error');
        stopVoiceRecording();
    };

    recognition.onend = () => {
        stopVoiceRecording();
    };
} else {
    const noSupportCallback = () => {
        showToast(currentLang === 'en' ? 'Voice input is not supported by your browser.' : 'Голосовой ввод не поддерживается вашим браузером.', 'error');
    };
    if (voiceBtn) voiceBtn.addEventListener('click', noSupportCallback);
    if (heroVoice) heroVoice.addEventListener('click', noSupportCallback);
}

function stopVoiceRecording() {
    isRecording = false;
    if (voiceBtn) voiceBtn.classList.remove('recording');
    if (heroVoice) heroVoice.classList.remove('recording');
    
    if (chatInput) chatInput.placeholder = currentLang === 'en' ? 'Describe your idea...' : 'Опишите вашу идею...';
    if (heroInput) heroInput.placeholder = currentLang === 'en' ? 'Describe your task...' : 'Опишите вашу задачу...';
    
    activeSpeechInput = null;
}

if (recognition) {
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            if (isRecording) {
                recognition.stop();
            } else {
                activeSpeechInput = 'chat';
                recognition.start();
            }
        });
    }
    if (heroVoice) {
        heroVoice.addEventListener('click', () => {
            if (isRecording) {
                recognition.stop();
            } else {
                activeSpeechInput = 'hero';
                recognition.start();
            }
        });
    }
}

// Отправка идеи
function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) {
        showToast(translations[currentLang].empty_text_error, 'error');
        return;
    }

    appendMessage(text, 'user');
    chatInput.value = '';
    stopVoiceRecording();

    // Имитация анализа ИИ
    const botMsg = appendMessage(translations[currentLang].ai_analyzing, 'bot');

    setTimeout(() => {
        botMsg.innerHTML = translations[currentLang].ai_stacking;
    }, 1200);

    setTimeout(() => {
        botMsg.innerHTML = translations[currentLang].ai_planning;
    }, 2400);

    setTimeout(() => {
        const roadmapData = generateRoadmap(text);
        
        let readyText = translations[currentLang].ai_ready_chat;
        readyText = readyText.replace('{stack}', roadmapData.stack).replace('{time}', roadmapData.time);
        
        botMsg.innerHTML = readyText;
        
        renderRoadmap(text, roadmapData);
    }, 3600);
}

if (chatSend) {
    chatSend.addEventListener('click', handleSendMessage);
}
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
}

// Генерация роадмапа по ключевым словам
function generateRoadmap(userInput) {
    const isEn = (currentLang === 'en');
    const input = userInput.toLowerCase();
    let stack = "FastAPI + Gemini API + Telegram API";
    let time = isEn ? "today (~4-6 hours)" : "сегодня (~4-6 часов)";
    let steps = [];

    if (input.includes('бот') || input.includes('bot') || input.includes('телеграм') || input.includes('telegram')) {
        stack = "Node.js/FastAPI + Telegraf + Gemini Pro";
        time = isEn ? "today (~5 hours)" : "сегодня (~5 часов)";
        steps = isEn ? [
            { name: "1. Dialogue Logic Design", desc: "We design dialogue flows and chatbot commands structure.", duration: "1 hour" },
            { name: "2. AI API Connection", desc: "Register bot in BotFather, configure Gemini/GPT API for smart replies.", duration: "1.5 hours" },
            { name: "3. Bot Coding & DB Setup", desc: "Implement core message handlers, layouts, and DB (MongoDB/PostgreSQL) integration.", duration: "2 hours" },
            { name: "4. Deployment & Launch", desc: "Deploy the bot to a Linux VDS with systemd/Docker, configure logging.", duration: "30 mins" }
        ] : [
            { name: "1. Проектирование логики диалогов", desc: "Проектируем сценарии общения пользователя с ботом и структуру команд.", duration: "1 час" },
            { name: "2. Настройка ИИ-подключения", desc: "Регистрируем бота в BotFather, настраиваем Gemini API/GPT API для интеллектуальных ответов.", duration: "1.5 часа" },
            { name: "3. Разработка функционала бота", desc: "Создаем обработчики сообщений, клавиатуры и интеграцию с базой данных (MongoDB/PostgreSQL).", duration: "2 часа" },
            { name: "4. Запуск и деплой", desc: "Разворачиваем бота на Linux-сервере (systemd/Docker), настраиваем логирование и запускаем.", duration: "30 минут" }
        ];
    } else if (input.includes('сайт') || input.includes('веб') || input.includes('web') || input.includes('лендинг') || input.includes('app') || input.includes('магазин') || input.includes('страниц')) {
        stack = "HTML5/CSS3 + Vanilla JS + Firebase";
        time = isEn ? "today (~6 hours)" : "сегодня (~6 часов)";
        steps = isEn ? [
            { name: "1. UI/UX Prototyping", desc: "Design interactive and adaptive layout inside Figma.", duration: "1.5 hours" },
            { name: "2. Coding & Styling", desc: "Create semantically clean layout with modern CSS animations and theme support.", duration: "2 hours" },
            { name: "3. Logic & DB Integration", desc: "Connect Firebase Firestore for lead collection and authentication.", duration: "2 hours" },
            { name: "4. Deployment & SSL", desc: "Deploy site to hosting, map custom domain, and configure HTTPS.", duration: "30 mins" }
        ] : [
            { name: "1. UI/UX Проектирование", desc: "Разрабатываем интерактивный адаптивный макет интерфейса в Figma.", duration: "1.5 часа" },
            { name: "2. Верстка и Стилизация", desc: "Создаем чистую семантическую верстку с современными CSS-анимациями и поддержкой тем.", duration: "2 часа" },
            { name: "3. Интеграция базы данных и логики", desc: "Подключаем Firebase Firestore для сбора лидов и авторизации пользователей.", duration: "2 часа" },
            { name: "4. Публикация и SSL", desc: "Деплоим сайт на хостинг, привязываем домен и настраиваем HTTPS.", duration: "30 минут" }
        ];
    } else if (input.includes('автомат') || input.includes('парсинг') || input.includes('сбор') || input.includes('анализ') || input.includes('скрипт') || input.includes('scra') || input.includes('pars') || input.includes('auto')) {
        stack = "Python + BeautifulSoup/Playwright + Pandas";
        time = isEn ? "today (~4 hours)" : "сегодня (~4 часа)";
        steps = isEn ? [
            { name: "1. Data Source Analysis", desc: "Study target websites, API patterns, and anti-bot bypass strategies.", duration: "1 hour" },
            { name: "2. Scraper Script Coding", desc: "Write Python parser utilising BeautifulSoup or Playwright for dynamic pages.", duration: "1.5 hours" },
            { name: "3. Structuring & Cleaning", desc: "Clean and structure data using Pandas, export to Excel/CSV or DB.", duration: "1 hour" },
            { name: "4. Automation Schedule", desc: "Set up cron / systemd timer for automated background runs.", duration: "30 mins" }
        ] : [
            { name: "1. Исследование источников данных", desc: "Анализируем целевые сайты, изучаем структуру API и методы обхода блокировок.", duration: "1 час" },
            { name: "2. Написание парсера/скрипта", desc: "Разрабатываем скрипт на Python для сбора информации с использованием Playwright.", duration: "1.5 часа" },
            { name: "3. Структурирование и обработка", desc: "Обрабатываем данные с помощью Pandas, экспортируем в Excel/CSV или отправляем в базу данных.", duration: "1 час" },
            { name: "4. Настройка автоматического запуска", desc: "Настраиваем cron-расписание для регулярного сбора данных без вашего участия.", duration: "30 минут" }
        ];
    } else {
        stack = "Python/Node.js + Gemini API + Nginx";
        time = isEn ? "today (~5 hours)" : "сегодня (~5 часов)";
        steps = isEn ? [
            { name: "1. Briefing & Specs Audit", desc: "Analyze project concept, structure technical descriptions and steps.", duration: "1 hour" },
            { name: "2. Building Core MVP", desc: "Develop foundational app business logic and hook up AI APIs.", duration: "2.5 hours" },
            { name: "3. Frontend Wiring", desc: "Assemble clean layout (web interface or chatbot) for users interaction.", duration: "1 hour" },
            { name: "4. VPS Config & Launch", desc: "Set up Linux VPS, secure with SSL, map domain name, and boot.", duration: "30 mins" }
        ] : [
            { name: "1. Быстрый аудит и ТЗ", desc: "Анализируем вашу идею, составляем детальное техническое описание этапов.", duration: "1 час" },
            { name: "2. Создание ядра MVP", desc: "Разрабатываем базовый функционал продукта и подключаем ИИ-модели.", duration: "2.5 часа" },
            { name: "3. Интеграция интерфейса", desc: "Создаем минималистичный интерфейс (веб-страницу или бот) для взаимодействия с продуктом.", duration: "1 час" },
            { name: "4. Публикация и запуск", desc: "Заливаем проект на сервер, подключаем доменное имя с SSL-сертификатом.", duration: "30 минут" }
        ];
    }

    return { stack, time, steps };
}

// Отрисовка роадмапа на странице
function renderRoadmap(ideaText, data) {
    const isEn = (currentLang === 'en');
    let stepsHtml = '';
    
    data.steps.forEach((step, index) => {
        stepsHtml += `
            <div class="roadmap-step-item" style="animation-delay: ${index * 150}ms">
                <div class="roadmap-step-dot"></div>
                <div class="roadmap-step-content">
                    <h4>${step.name}</h4>
                    <p>${step.desc}</p>
                    <span class="roadmap-step-time">⏱️ ${isEn ? "Timeframe" : "Срок"}: ${step.duration}</span>
                </div>
            </div>
        `;
    });

    const roadmapCardHtml = `
        <div class="roadmap-card">
            <div class="roadmap-meta">
                <span class="meta-badge stack">🛠️ ${isEn ? "Stack" : "Стек"}: ${data.stack}</span>
                <span class="meta-badge time">⚡ ${isEn ? "Timeframe" : "Срок"}: ${data.time}</span>
            </div>
            
            <div class="roadmap-steps">
                ${stepsHtml}
            </div>
            
            <button id="approve-roadmap-btn" class="roadmap-action-btn">
                <span>${isEn ? "Launch project by this plan" : "Запустить проект по этому плану"}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                </svg>
            </button>
        </div>
    `;

    dynamicRoadmapContent.innerHTML = roadmapCardHtml;
    
    // Показываем секцию
    dynamicRoadmapSection.classList.remove('hidden');
    dynamicRoadmapSection.classList.add('visible');
    
    // Плавный скролл к роадмапу
    setTimeout(() => {
        dynamicRoadmapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);

    // Вешаем обработчик на кнопку запуска
    const approveBtn = document.getElementById('approve-roadmap-btn');
    if (approveBtn) {
        approveBtn.addEventListener('click', () => {
        // Заполняем поле ТЗ в форме обратной связи
        if (isEn) {
            projectDescInput.value = `Approved AI roadmap for idea "${ideaText}":\n` +
                                    `- Stack: ${data.stack}\n` +
                                    `- Timeframe: ${data.time}\n` +
                                    `- Roadmap generated.`;
            showToast('Roadmap copied to the contact form! Fill your name and send.', 'success');
        } else {
            projectDescInput.value = `Утвержденный ИИ-роадмап для идеи "${ideaText}":\n` +
                                    `- Стек: ${data.stack}\n` +
                                    `- Общий срок: ${data.time}\n` +
                                    `- Ссылка на роадмап сгенерирована.`;
            showToast('Роадмап скопирован в форму заявки! Заполните имя и отправьте.', 'success');
        }
                                
        // Скроллим к форме
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Фокусируемся на вводе имени
        setTimeout(() => {
            clientNameInput.focus();
        }, 800);
    });
    }
}

// ==================== ИНТЕРАКТИВНАЯ СФЕРА (3D CRYSTAL SPHERE & AI EMPLOYEE) ====================

(function() {
    const canvas = document.getElementById('crystal-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    let width = canvas.width = container.clientWidth;
    let height = canvas.height = container.clientHeight;

    window.currentHeroState = 'AMBIENT'; // AMBIENT, CINEMATIC, INPUT_FOCUS, PROCESSING, WORKSPACE, HIDDEN

    window.setHeroState = function(state) {
        if (window.currentHeroState === state) return;
        const oldState = window.currentHeroState;
        window.currentHeroState = state;
        console.log(`[HeroState] Transition: ${oldState} -> ${state}`);

        // 1. Очистка предыдущего состояния
        if (oldState === 'CINEMATIC') {
            if (window.cinematicTimeouts) {
                window.cinematicTimeouts.forEach(clearTimeout);
                window.cinematicTimeouts = [];
            }
            const notif = document.getElementById('story-notification');
            if (notif) notif.className = 'story-notification';
        }

        if (state === 'WORKSPACE' || state === 'PROCESSING' || state === 'HIDDEN') {
            if (typeof window.stopDecorativeTimers === 'function') {
                window.stopDecorativeTimers();
            }
            window.stopCanvasLoop();
        }

        // 2. Инициализация нового состояния
        if (state === 'AMBIENT') {
            window.startCanvasLoop();
            if (typeof window.startDecorativeTimers === 'function') {
                window.startDecorativeTimers();
            }
            window.ambientSpeedFactor = 1.0;
        } else if (state === 'CINEMATIC') {
            if (typeof window.stopDecorativeTimers === 'function') {
                window.stopDecorativeTimers();
            }
            window.startCanvasLoop();
            window.ambientSpeedFactor = 0.05;
        } else if (state === 'INPUT_FOCUS') {
            if (typeof window.stopDecorativeTimers === 'function') {
                window.stopDecorativeTimers();
            }
            window.startCanvasLoop();
            window.ambientSpeedFactor = 0.15; // Замедляем орбиты
        } else if (state === 'PROCESSING') {
            const ticker = document.getElementById('live-event-ticker');
            const tickerVal = document.getElementById('ticker-text-val');
            if (ticker && tickerVal) {
                tickerVal.textContent = (currentLang === 'en') ? 'Processing request...' : 'Обрабатываю запрос...';
                ticker.className = 'live-event-ticker visible';
            }
        } else if (state === 'WORKSPACE') {
            // В воркспейсе все остановлено
        }
    };

    // Поддержка высокой плотности пикселей (High DPI Retina)
    function resize() {
        const dpr = window.devicePixelRatio || 1;
        // Используем offsetWidth как fallback на случай если контейнер ещё не отрендерен
        width = container.clientWidth || container.offsetWidth || canvas.offsetWidth || 380;
        height = container.clientHeight || container.offsetHeight || canvas.offsetHeight || 380;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);
    }
    
    resize();
    // Повторная инициализация после полной загрузки DOM на случай delayed render
    if (document.readyState !== 'complete') {
        window.addEventListener('load', resize);
    } else {
        setTimeout(resize, 50);
    }
    window.addEventListener('resize', resize);

    // Переменные состояния анимации
    let lastBlinkTime = 0;
    const blinkDuration = 180; // мс
    let lastBlinkTrigger = 0;

    // Глобальные флаги сюжетного сценария первого визита (Cinematic Experience)
    window.cinematicStep = 0;
    window.ambientSpeedFactor = 0.05; // В начале почти стоим на месте (полный покой)

    // Переменные системы Motion System: скролл и фокус внимания (Attention Breathing)
    let scrollRatio = 0;
    let attentionTarget = 'sphere'; // 'sphere', 'card', 'cta'

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const maxScroll = window.innerHeight || 800;
        scrollRatio = Math.max(0, Math.min(scrolled / maxScroll, 1.0));
    }, { passive: true });

    // Отслеживание курсора/тача для слежения глаз
    const pointer = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        // Координаты относительно центра канваса
        pointer.x = e.clientX - (rect.left + rect.width / 2);
        pointer.y = e.clientY - (rect.top + rect.height / 2);
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            pointer.x = e.touches[0].clientX - (rect.left + rect.width / 2);
            pointer.y = e.touches[0].clientY - (rect.top + rect.height / 2);
        }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            pointer.x = e.touches[0].clientX - (rect.left + rect.width / 2);
            pointer.y = e.touches[0].clientY - (rect.top + rect.height / 2);
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        pointer.x = null;
        pointer.y = null;
    });

    window.addEventListener('mouseleave', () => {
        pointer.x = null;
        pointer.y = null;
    });

    // Класс для парящих документов и задач вокруг ИИ
    class FloatingItem {
        constructor(type) {
            this.type = type; // 'analytics', 'accounting', 'logistics', 'content'
            this.isInteractive = true;
            this.isFocused = false;
            this.focusProgress = 0;
            
            // Физические координаты для клика
            this.screenX = 0;
            this.screenY = 0;
            this.width = 0;
            this.height = 0;

            this.reset(true);
        }

        reset(isInitial = false) {
            // Жестко фиксируем сдвиг фаз на 90 градусов (PI/2), чтобы они летели красивым созвездием
            if (this.type === 'analytics') this.angle = 0;
            else if (this.type === 'accounting') this.angle = Math.PI / 2;
            else if (this.type === 'logistics') this.angle = Math.PI;
            else if (this.type === 'content') this.angle = Math.PI * 1.5;
            
            // Единая 3D-орбита (кольцо) для предотвращения любых пересечений
            this.orbitRadiusX = 115;
            this.orbitRadiusY = 28;
            this.orbitTilt = 0.05;
            this.scale = 0.88;
            
            this.opacity = 0.85;
            this.maxOpacity = 0.85;
            this.life = 0;
            this.maxLife = Infinity;
            this.tilt = 0.03;
            
            // Абсолютно одинаковая скорость для всех плашек, чтобы они двигались синхронно гуськом
            this.speed = 0.007; 
        }

        update() {
            if (this.isFocused) {
                if (this.focusProgress < 1) this.focusProgress += 0.08;
            } else {
                if (this.focusProgress > 0) this.focusProgress -= 0.08;
                this.angle += this.speed * window.ambientSpeedFactor;
            }
        }

        draw(ctx, scx, scy, baseRadius, detachFactor = 1.0) {
            const rawX = Math.cos(this.angle) * this.orbitRadiusX * detachFactor;
            const rawY = Math.sin(this.angle) * this.orbitRadiusY * detachFactor;
            const cosT = Math.cos(this.orbitTilt);
            const sinT = Math.sin(this.orbitTilt);
            
            const orbitX = scx + (rawX * cosT - rawY * sinT);
            const orbitY = scy + (rawX * sinT + rawY * cosT) - 10;
            
            const targetX = scx;
            const targetY = scy + baseRadius * 0.55;

            const x = orbitX + (targetX - orbitX) * this.focusProgress;
            const y = orbitY + (targetY - orbitY) * this.focusProgress;
            
            const z = Math.sin(this.angle);
            const depthScale = 1.0 + z * 0.15;
            
            const normalScale = this.scale * depthScale;
            const targetScale = 1.6;
            const finalScale = normalScale + (targetScale - normalScale) * this.focusProgress;
            
            const finalTilt = this.tilt * (1 - this.focusProgress);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(finalTilt);
            ctx.scale(finalScale, finalScale);
            
            ctx.globalAlpha = this.opacity;
            
            let displayText = "";
            if (this.type === 'analytics') {
                displayText = (currentLang === 'en') ? '📈 Analytics' : '📈 Аналитика';
            } else if (this.type === 'accounting') {
                displayText = (currentLang === 'en') ? '📊 Accounting' : '📊 Бухгалтерия';
            } else if (this.type === 'logistics') {
                displayText = (currentLang === 'en') ? '📦 Logistics' : '📦 Логистика';
            } else if (this.type === 'content') {
                displayText = (currentLang === 'en') ? '✍️ Content' : '✍️ Контент';
            }
            
            ctx.font = '800 8.5px monospace';
            const textWidth = ctx.measureText(displayText).width;
            const px = 7;
            const py = 4;
            const w = textWidth + px * 2;
            const h = 15;
            
            // Сохраняем физические координаты в Canvas-пространстве для обработки кликов
            this.screenX = x;
            this.screenY = y;
            this.width = w * finalScale;
            this.height = h * finalScale;
            
            // Рисуем стеклянную карточку
            if (this.isInteractive && this.focusProgress > 0.2) {
                // Сфокусированная интерактивная плашка (Индиго-стекло)
                const neonGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, w);
                ctx.fillStyle = 'rgba(99, 102, 241, 0.88)';
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
                ctx.lineWidth = 1.0;
                
                ctx.shadowColor = 'rgba(99, 102, 241, 0.5)';
                ctx.shadowBlur = 10;
            } else {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
                ctx.lineWidth = 0.9;
                ctx.shadowBlur = 0;
            }
            
            ctx.beginPath();
            ctx.roundRect(-w/2, -h/2, w, h, 5);
            ctx.fill();
            ctx.stroke();
            
            // Текст плашки
            ctx.fillStyle = '#ffffff';
            if (this.isInteractive && this.focusProgress > 0.2) {
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 4;
            } else {
                ctx.shadowColor = 'rgba(255, 255, 255, 0.15)';
                ctx.shadowBlur = 3;
            }
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(displayText, 0, 0.5);
            
            ctx.restore();
        }
    }

    // Каустика света (Light Caustics) при обработке задач
    let causticAlpha = 0;

    // Сглаживание взгляда во время Cinematic Sequence
    let cinematicLookX = 0;
    let cinematicLookY = 0;
    let cinematicRot = 0;

    // Переменные для голографического 3D глобуса (Business Map)
    let globeActive = false;
    let globeStartTime = 0;
    const globeDuration = 5000; // 5 секунд
    let globeLocation = '';
    let lastGlobeTrigger = Date.now();
    const globeLocations = ["Singapore", "Dubai", "London", "Berlin", "Bali"];

    function triggerGlobe() {
        globeActive = true;
        globeStartTime = Date.now();
        globeLocation = globeLocations[Math.floor(Math.random() * globeLocations.length)];
    }

    // Переменные для пульсации Business Pulse
    let pulseRadius = -1;
    let pulseOpacity = 0;

    window.triggerBusinessPulse = function() {
        pulseRadius = 0; // Стартует из центра сферы
        pulseOpacity = 0.55;
    };

    // Переменные для анимированных линий Data Flow
    let dataFlowStart = 0;
    const dataFlowDuration = 1500; // 1.5 секунды
    let dataFlowFrom = null;
    let dataFlowTo = null;
    let lastDataFlowTrigger = Date.now();

    function triggerDataFlow() {
        if (floatingItems.length < 2) return;
        const fromIdx = Math.floor(Math.random() * floatingItems.length);
        let toIdx = Math.floor(Math.random() * floatingItems.length);
        while (toIdx === fromIdx) {
            toIdx = Math.floor(Math.random() * floatingItems.length);
        }
        dataFlowFrom = floatingItems[fromIdx];
        dataFlowTo = floatingItems[toIdx];
        dataFlowStart = Date.now();
    }

    const floatingItems = [
        new FloatingItem('analytics'),
        new FloatingItem('accounting'),
        new FloatingItem('logistics'),
        new FloatingItem('content')
    ];

    function drawSphere(time) {
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const baseRadius = Math.min(width, height) * 0.40;

        // Обновляем уровень каустики (Light Caustics) в зависимости от работы ИИ
        const isProcessing = (window.cinematicStep >= 1 && window.cinematicStep <= 6) || 
                             (Date.now() - dataFlowStart < dataFlowDuration);
        
        if (isProcessing) {
            if (causticAlpha < 0.70) causticAlpha += 0.03;
        } else {
            if (causticAlpha > 0) causticAlpha -= 0.02;
        }
        
        // Медленное парение сферы с учетом скролла (уезжает вверх и сжимается)
        const floatY = Math.sin(time * 1.5) * 5;
        const floatX = Math.cos(time * 0.9) * 3;
        const scx = cx + floatX;
        
        // Смещение сферы вверх и сжатие при скролле (Scroll Transition)
        const finalScy = cy + floatY - scrollRatio * 155;
        const finalBaseRadius = baseRadius * (1.0 - scrollRatio * 0.32);
        const detachFactor = 1.0 + scrollRatio * 1.8;

        // Обновляем плавающие элементы
        floatingItems.forEach(item => item.update());

        // 1. Отрисовка плавающих элементов сзади сферы (Z < 0)
        floatingItems.forEach(item => {
            if (Math.sin(item.angle) < 0) {
                item.draw(ctx, scx, finalScy, finalBaseRadius, detachFactor);
            }
        });

        // Внутреннее свечение сферы (ИИ)
        const innerGlow = ctx.createRadialGradient(scx, finalScy, 0, scx, finalScy, finalBaseRadius);
        const isEn = (currentLang === 'en');
        const glowColor = isEn ? 'rgba(37, 99, 235, 0.12)' : 'rgba(168, 85, 247, 0.12)';
        const glowColorCenter = isEn ? 'rgba(37, 99, 235, 0.25)' : 'rgba(168, 85, 247, 0.25)';
        
        innerGlow.addColorStop(0, glowColorCenter);
        innerGlow.addColorStop(0.6, glowColor);
        innerGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = innerGlow;
        ctx.beginPath();
        ctx.arc(scx, finalScy, finalBaseRadius * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // --- ОПТИЧЕСКАЯ КАУСТИКА СВЕТА ВНУТРИ КРИСТАЛЛА (Light Caustics) ---
        if (causticAlpha > 0.01) {
            ctx.save();
            // Маскируем каустику строго по внутреннему диаметру сферы
            ctx.beginPath();
            ctx.arc(scx, finalScy, finalBaseRadius * 0.94, 0, Math.PI * 2);
            ctx.clip();

            ctx.strokeStyle = isEn ? 'rgba(99, 102, 241, ' + (causticAlpha * 0.16) + ')' : 'rgba(168, 85, 247, ' + (causticAlpha * 0.16) + ')';
            ctx.lineWidth = 1.6;
            ctx.shadowBlur = 6;
            ctx.shadowColor = isEn ? '#6366f1' : '#a855f7';

            // Рисуем 3 переливающиеся волны света Безье
            for (let j = 0; j < 3; j++) {
                ctx.beginPath();
                const offset = j * Math.PI / 3;
                const waveTime = time * 0.75 + offset;
                
                const yOffset1 = Math.sin(waveTime) * (finalBaseRadius * 0.25);
                const yOffset2 = Math.cos(waveTime * 1.2) * (finalBaseRadius * 0.20);
                
                ctx.moveTo(scx - finalBaseRadius * 0.9, finalScy + yOffset1);
                ctx.bezierCurveTo(
                    scx - finalBaseRadius * 0.3, finalScy - finalBaseRadius * 0.5 * Math.sin(waveTime),
                    scx + finalBaseRadius * 0.3, finalScy + finalBaseRadius * 0.5 * Math.cos(waveTime * 0.8),
                    scx + finalBaseRadius * 0.9, finalScy + yOffset2
                );
                ctx.stroke();
            }
            ctx.restore();
        }

        // --- ГОЛОГРАФИЧЕСКИЙ 3D-ГЛОБУС (BUSINESS MAP) ---
        if (false && window.currentHeroState === 'AMBIENT' && Date.now() - lastGlobeTrigger > 22000) {
            triggerGlobe();
            lastGlobeTrigger = Date.now();
        }

        if (false && globeActive) {
            const elapsedGlobe = Date.now() - globeStartTime;
            if (elapsedGlobe < globeDuration) {
                let globeAlpha = 0.22;
                if (elapsedGlobe < 700) globeAlpha *= (elapsedGlobe / 700);
                else if (elapsedGlobe > globeDuration - 700) globeAlpha *= ((globeDuration - elapsedGlobe) / 700);

                ctx.save();
                ctx.translate(scx, finalScy);
                const rotSpeed = time * 0.35;
                ctx.strokeStyle = isEn ? 'rgba(99, 102, 241, ' + globeAlpha + ')' : 'rgba(168, 85, 247, ' + globeAlpha + ')';
                ctx.lineWidth = 0.65;
                ctx.shadowBlur = 0;

                const globeR = baseRadius * 0.85;

                // Меридианы
                for (let i = 0; i < 6; i++) {
                    const angle = rotSpeed + (i * Math.PI / 6);
                    const w = globeR * Math.cos(angle);
                    ctx.beginPath();
                    ctx.ellipse(0, 0, Math.abs(w), globeR, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Параллели
                for (let i = 1; i < 5; i++) {
                    const y = globeR * Math.cos(i * Math.PI / 5);
                    const w = globeR * Math.sin(i * Math.PI / 5);
                    ctx.beginPath();
                    ctx.ellipse(0, y, w, w * 0.20, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Активная ИИ-Нода (Город)
                const locY = globeR * 0.15;
                const locW = globeR * 0.72;
                const locX = locW * Math.sin(time * 0.7);
                const locZ = Math.cos(time * 0.7);

                if (locZ > 0) {
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = isEn ? '#6366f1' : '#a855f7';
                    ctx.shadowBlur = 10;
                    ctx.beginPath();
                    ctx.arc(locX, locY, 3.5, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = 'rgba(255, 255, 255, ' + (globeAlpha * 3.5) + ')';
                    ctx.font = '800 6.5px monospace';
                    ctx.textAlign = 'center';
                    ctx.fillText(`● AI NODE: ${globeLocation.toUpperCase()}`, locX, locY - 7);
                }
                ctx.restore();
            } else {
                globeActive = false;
            }
        }

        // ------------------ ОТРЕСОВКА РОБОТА (AI EMPLOYEE) ------------------
        // Attention Breathing: ИИ дышит медленнее, когда фокус на других элементах
        const breathAmp = (attentionTarget === 'sphere') ? 0.024 : 0.005;
        const breath = Math.sin(time * 2.0) * breathAmp;
        const scrollScale = finalBaseRadius / baseRadius; // Коэффициент сжатия при скролле
        const robotScale = (1.0 + breath) * scrollScale;
        
        const headW = 74 * robotScale;
        const headH = 74 * robotScale;
        const headY = finalScy - 22 * scrollScale;

        let lookOffsetX = 0;
        let lookOffsetY = 0;
        let rotateAngle = 0;

        if (window.currentHeroState === 'CINEMATIC') {
            // Сюжетный режим первого визита
            let targetLookX = 0;
            let targetLookY = 0;
            let targetRot = 0;

            if (window.cinematicStep === 0 || window.cinematicStep === 1) {
                // Полный покой, легкое блуждание
                targetLookX = Math.sin(time * 0.4) * 0.8;
                targetLookY = Math.cos(time * 0.6) * 0.5;
                targetRot = Math.sin(time * 0.3) * 0.01;
            } else if (window.cinematicStep === 2 || window.cinematicStep === 3 || window.cinematicStep === 4) {
                // Поворот головы влево-вверх к первому уведомлению
                targetLookX = -3.2 * robotScale;
                targetLookY = -1.2 * robotScale;
                targetRot = -0.05;
            } else if (window.cinematicStep === 7) {
                // Поворот вправо-вверх ко второму уведомлению
                targetLookX = 2.8 * robotScale;
                targetLookY = -1.0 * robotScale;
                targetRot = 0.04;
            } else {
                // Плавное центрирование
                targetLookX = 0;
                targetLookY = 0;
                targetRot = 0;
            }

            // Плавное сглаживание переходов
            cinematicLookX += (targetLookX - cinematicLookX) * 0.06;
            cinematicLookY += (targetLookY - cinematicLookY) * 0.06;
            cinematicRot += (targetRot - cinematicRot) * 0.06;

            lookOffsetX = cinematicLookX;
            lookOffsetY = cinematicLookY;
            rotateAngle = cinematicRot;
        } else if (window.currentHeroState === 'INPUT_FOCUS') {
            // Фиксация взгляда на инпуте слева-внизу
            const targetLookX = -3.5 * robotScale;
            const targetLookY = 1.0 * robotScale;
            const targetRot = -0.06;

            cinematicLookX += (targetLookX - cinematicLookX) * 0.08;
            cinematicLookY += (targetLookY - cinematicLookY) * 0.08;
            cinematicRot += (targetRot - cinematicRot) * 0.08;

            lookOffsetX = cinematicLookX;
            lookOffsetY = cinematicLookY;
            rotateAngle = cinematicRot;
        } else if (window.currentHeroState === 'PROCESSING') {
            // При процессинге робот плавно блуждает глазами в концентрации (быстрые вычисления)
            const targetLookX = Math.sin(time * 1.8) * 0.5;
            const targetLookY = Math.cos(time * 2.2) * 0.3;
            const targetRot = Math.sin(time * 1.5) * 0.005;

            cinematicLookX += (targetLookX - cinematicLookX) * 0.08;
            cinematicLookY += (targetLookY - cinematicLookY) * 0.08;
            cinematicRot += (targetRot - cinematicRot) * 0.08;

            lookOffsetX = cinematicLookX;
            lookOffsetY = cinematicLookY;
            rotateAngle = cinematicRot;
        } else {
            // Обычный интерактивный режим AMBIENT (или по умолчанию)
            // Слежение за курсором работает по всему экрану
            const distance = (pointer.x !== null && pointer.y !== null) 
                ? Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y) 
                : 999;
                
            let targetLookX = 0;
            let targetLookY = 0;
            let targetRot = 0;

            if (pointer.x !== null && pointer.y !== null) {
                const angle = Math.atan2(pointer.y, pointer.x);
                const maxLook = 4.8 * robotScale;
                const strength = Math.min(distance / 200, 1.0);
                targetLookX = Math.cos(angle) * maxLook * strength;
                targetLookY = Math.sin(angle) * maxLook * strength;
                // Более заметный поворот головы (до ~14 градусов наклон)
                targetRot = Math.max(-0.24, Math.min(0.24, (pointer.x / 320)));
            } else {
                targetLookX = Math.sin(time * 0.6) * 1.4;
                targetLookY = Math.cos(time * 0.9) * 0.9;
                targetRot = Math.sin(time * 0.4) * 0.015;
            }

            cinematicLookX += (targetLookX - cinematicLookX) * 0.05;
            cinematicLookY += (targetLookY - cinematicLookY) * 0.05;
            cinematicRot += (targetRot - cinematicRot) * 0.05;

            lookOffsetX = cinematicLookX;
            lookOffsetY = cinematicLookY;
            rotateAngle = cinematicRot;
        }

        const eyeColor = isEn ? '#2563eb' : '#a855f7';

        // ------------------ ОТРЕСОВКА ТЕЛА РОБОТА (AI BODY) ------------------
        ctx.save();
        ctx.translate(scx, headY);
        // Тело слегка покачивается вслед за головой
        ctx.rotate(rotateAngle * 0.2);

        // Шея
        ctx.fillStyle = '#d4d4d8';
        ctx.beginPath();
        ctx.roundRect(-6 * robotScale, 15 * robotScale, 12 * robotScale, 18 * robotScale, 3 * robotScale);
        ctx.fill();

        // Маленькое туловище
        const bodyW = 54 * robotScale;
        const bodyH = 38 * robotScale;
        const bodyGradient = ctx.createLinearGradient(-bodyW/2, 24 * robotScale, bodyW/2, (24 + bodyH) * robotScale);
        bodyGradient.addColorStop(0, '#ffffff');
        bodyGradient.addColorStop(0.5, '#e4e4e7');
        bodyGradient.addColorStop(1, '#a1a1aa');
        ctx.fillStyle = bodyGradient;
        
        ctx.beginPath();
        ctx.roundRect(-bodyW/2, 24 * robotScale, bodyW, bodyH, [16 * robotScale, 16 * robotScale, 6 * robotScale, 6 * robotScale]);
        ctx.fill();

        // Светящееся ядро на груди
        ctx.fillStyle = eyeColor;
        ctx.shadowColor = eyeColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 42 * robotScale, 5 * robotScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // сбрасываем

        ctx.restore();

        ctx.save();
        ctx.translate(scx, headY);
        ctx.rotate(rotateAngle);

        ctx.shadowColor = isEn ? 'rgba(37, 99, 235, 0.15)' : 'rgba(168, 85, 247, 0.15)';
        ctx.shadowBlur = 20;

        const шлемGradient = ctx.createLinearGradient(-headW/2, -headH/2, headW/2, headH/2);
        шлемGradient.addColorStop(0, '#ffffff');
        шлемGradient.addColorStop(0.5, '#e4e4e7');
        шлемGradient.addColorStop(1, '#a1a1aa');
        
        ctx.fillStyle = шлемGradient;
        ctx.beginPath();
        ctx.arc(0, 0, headW/2, 0, Math.PI * 2);
        ctx.fill();

        const maskW = 56 * robotScale;
        const maskH = 46 * robotScale;
        const maskOffsetX = lookOffsetX * 0.45;
        const maskOffsetY = lookOffsetY * 0.35;

        ctx.fillStyle = '#09090b';
        ctx.beginPath();
        ctx.ellipse(maskOffsetX, 2 + maskOffsetY, maskW/2, maskH/2, 0, 0, Math.PI * 2);
        ctx.fill();

        const maskHighlight = ctx.createLinearGradient(-maskW/2 + maskOffsetX, -maskH/2 + 2 + maskOffsetY, maskOffsetX, 2 + maskOffsetY);
        maskHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
        maskHighlight.addColorStop(1, 'transparent');
        ctx.fillStyle = maskHighlight;
        ctx.beginPath();
        ctx.ellipse(maskOffsetX, 2 + maskOffsetY, maskW/2, maskH/2, 0, 0, Math.PI * 2);
        ctx.fill();

        const eyeSpacing = 14 * robotScale;
        const eyeW = 8 * robotScale;
        const eyeH = 8 * robotScale;

        let isBlinking = false;
        const now = Date.now();
        if (now - lastBlinkTime < blinkDuration) {
            isBlinking = true;
        } else if (now - lastBlinkTrigger > 4000 + Math.random() * 3000) {
            lastBlinkTime = now;
            lastBlinkTrigger = now;
            isBlinking = true;
        }

        ctx.fillStyle = eyeColor;
        ctx.shadowColor = eyeColor;
        ctx.shadowBlur = 12;

        const finalEyeY = 1 + lookOffsetY;

        if (isBlinking) {
            ctx.fillRect(-eyeSpacing + lookOffsetX - eyeW/2, finalEyeY + eyeH/2 - 1, eyeW, 2);
            ctx.fillRect(eyeSpacing + lookOffsetX - eyeW/2, finalEyeY + eyeH/2 - 1, eyeW, 2);
        } else {
            ctx.beginPath();
            ctx.arc(-eyeSpacing + lookOffsetX, finalEyeY, eyeW/2, 0, Math.PI * 2);
            ctx.arc(eyeSpacing + lookOffsetX, finalEyeY, eyeW/2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();

        // ------------------ СТЕКЛЯННАЯ СФЕРА (GLASS EFFECTS) ------------------
        ctx.save();
        
        // Внешний контур стекла (физический край)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(scx, finalScy, finalBaseRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Внутренний контур (толщина линзы кристалла)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(scx, finalScy, finalBaseRadius - 3.5, 0, Math.PI * 2);
        ctx.stroke();

        // Блик каустики/преломления на краю
        ctx.strokeStyle = isEn ? 'rgba(99, 102, 241, 0.08)' : 'rgba(168, 85, 247, 0.08)';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.arc(scx, finalScy, finalBaseRadius - 1.5, Math.PI * 0.75, Math.PI * 1.25);
        ctx.stroke();

        const topGlow = ctx.createRadialGradient(scx, finalScy - finalBaseRadius * 0.5, 0, scx, finalScy - finalBaseRadius * 0.5, finalBaseRadius * 0.9);
        topGlow.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
        topGlow.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
        topGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = topGlow;
        ctx.beginPath();
        ctx.arc(scx, finalScy, finalBaseRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(scx + finalBaseRadius * 0.1, finalScy - finalBaseRadius * 0.1, finalBaseRadius * 0.9, 0, Math.PI * 2);
        const glassSpecular = ctx.createLinearGradient(scx, finalScy - finalBaseRadius, scx, finalScy);
        glassSpecular.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
        glassSpecular.addColorStop(0.4, 'rgba(255, 255, 255, 0.02)');
        glassSpecular.addColorStop(1, 'transparent');
        ctx.fillStyle = glassSpecular;
        ctx.fill();

        const bottomGlow = ctx.createRadialGradient(scx, finalScy + finalBaseRadius * 0.7, 0, scx, finalScy + finalBaseRadius * 0.7, finalBaseRadius * 0.6);
        bottomGlow.addColorStop(0, isEn ? 'rgba(37, 99, 235, 0.15)' : 'rgba(168, 85, 247, 0.15)');
        bottomGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = bottomGlow;
        ctx.beginPath();
        ctx.arc(scx, finalScy, finalBaseRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // 2. Отрисовка плавающих элементов спереди сферы (Z >= 0)
        floatingItems.forEach(item => {
            if (Math.sin(item.angle) >= 0) {
                item.draw(ctx, scx, finalScy, finalBaseRadius, detachFactor);
            }
        });

        // 3. Отрисовка линий Data Flow (Связь ИИ с плашками)
        if (window.cinematicStep < 8) {
            // Во время сюжетного режима первого визита
            if (window.cinematicStep === 3) {
                const elapsed = Date.now() - dataFlowStart;
                const progress = Math.min(elapsed / 1200, 1.0);
                
                ctx.save();
                ctx.strokeStyle = isEn ? 'rgba(99, 102, 241, 0.45)' : 'rgba(168, 85, 247, 0.45)';
                ctx.lineWidth = 1.2;
                ctx.shadowColor = isEn ? '#2563eb' : '#a855f7';
                ctx.shadowBlur = 6;
                
                const interactiveItem = floatingItems[1];
                if (interactiveItem) {
                    // Рисуем линию
                    ctx.beginPath();
                    ctx.moveTo(interactiveItem.screenX, interactiveItem.screenY);
                    ctx.lineTo(scx, headY);
                    ctx.stroke();
                    
                    // Бегущая световая точка
                    const sigX = interactiveItem.screenX + (scx - interactiveItem.screenX) * progress;
                    const sigY = interactiveItem.screenY + (headY - interactiveItem.screenY) * progress;
                    
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#ffffff';
                    ctx.shadowBlur = 10;
                    ctx.beginPath();
                    ctx.arc(sigX, sigY, 3.2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        } else {
            // Обычный режим вхождений в Idle-состоянии
            if (Date.now() - lastDataFlowTrigger > 7000) {
                triggerDataFlow();
                lastDataFlowTrigger = Date.now();
            }

            const elapsed = Date.now() - dataFlowStart;
            if (elapsed < dataFlowDuration && dataFlowFrom && dataFlowTo && !dataFlowFrom.isFocused && !dataFlowTo.isFocused) {
                const progress = elapsed / dataFlowDuration;
                ctx.save();
                let flowAlpha = 0.30;
                if (progress < 0.2) flowAlpha = 0.30 * (progress / 0.2);
                else if (progress > 0.8) flowAlpha = 0.30 * ((1.0 - progress) / 0.2);

                ctx.strokeStyle = isEn ? 'rgba(99, 102, 241, ' + flowAlpha + ')' : 'rgba(168, 85, 247, ' + flowAlpha + ')';
                ctx.lineWidth = 1.0;
                ctx.shadowColor = isEn ? '#2563eb' : '#a855f7';
                ctx.shadowBlur = 5;

                // Рисуем первую линию от From к ИИ
                ctx.beginPath();
                ctx.moveTo(dataFlowFrom.screenX, dataFlowFrom.screenY);
                ctx.lineTo(scx, headY);
                ctx.stroke();

                // Рисуем вторую линию от ИИ к To
                ctx.beginPath();
                ctx.moveTo(scx, headY);
                ctx.lineTo(dataFlowTo.screenX, dataFlowTo.screenY);
                ctx.stroke();

                // Бегущая световая точка
                let sigX = 0;
                let sigY = 0;
                if (progress < 0.5) {
                    const t = progress * 2;
                    sigX = dataFlowFrom.screenX + (scx - dataFlowFrom.screenX) * t;
                    sigY = dataFlowFrom.screenY + (headY - dataFlowFrom.screenY) * t;
                } else {
                    const t = (progress - 0.5) * 2;
                    sigX = scx + (dataFlowTo.screenX - scx) * t;
                    sigY = headY + (dataFlowTo.screenY - headY) * t;
                }

                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(sigX, sigY, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // 4. Отрисовка Business Pulse (круговая неоновая волна)
        if (pulseRadius >= 0) {
            pulseRadius += 2.4;
            pulseOpacity = 0.55 * (1.0 - (pulseRadius / baseRadius));
            
            if (pulseRadius >= baseRadius) {
                pulseRadius = -1;
            } else {
                ctx.save();
                ctx.strokeStyle = isEn ? 'rgba(99, 102, 241, ' + pulseOpacity + ')' : 'rgba(168, 85, 247, ' + pulseOpacity + ')';
                ctx.lineWidth = 1.6;
                ctx.shadowColor = isEn ? '#2563eb' : '#a855f7';
                ctx.shadowBlur = 8;
                ctx.arc(scx, finalScy, pulseRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }
        }

        // Словарь фраз робота для каждой плашки
        const itemSpeech = {
            ru: {
                analytics: "Хотите настроить аналитику продаж?",
                accounting: "Автоматизировать выставление счетов?",
                logistics: "Оптимизировать маршруты и склад?",
                content: "Создавать контент с помощью AI?",
                default: "Какая у вас задача для меня?"
            },
            en: {
                analytics: "Want to set up sales analytics?",
                accounting: "Automate invoice generation?",
                logistics: "Optimize routes and warehouse?",
                content: "Create content using AI?",
                default: "What is your task for me?"
            }
        };

        let speechBubbleTimer = null;
        window.showRobotSpeech = function(type) {
            const bubble = document.getElementById('robot-bubble');
            const bubbleText = document.getElementById('bubble-text');
            if (!bubble || !bubbleText) return;

            const lang = localStorage.getItem('preferred-lang') || 'ru';
            const text = itemSpeech[lang][type] || itemSpeech[lang].default;

            bubbleText.textContent = text;
            bubble.classList.add('force-show');

            // Запускаем кратковременную реакцию робота (мигание-кивание)
            window.setHeroState('PROCESSING');
            setTimeout(() => {
                window.setHeroState('AMBIENT');
            }, 1200);

            if (speechBubbleTimer) clearTimeout(speechBubbleTimer);
            speechBubbleTimer = setTimeout(() => {
                bubble.classList.remove('force-show');
                bubbleText.textContent = lang === 'en' ? itemSpeech.en.default : itemSpeech.ru.default;
            }, 5000);
        };

        // Управляем фокусом плашек при наведении
        let isOverAnyItem = false;
        if (pointer.x !== null && pointer.y !== null) {
            const mx = cx + pointer.x;
            const my = cy + pointer.y;

            floatingItems.forEach(item => {
                if (
                    mx >= item.screenX - item.width / 2 &&
                    mx <= item.screenX + item.width / 2 &&
                    my >= item.screenY - item.height / 2 &&
                    my <= item.screenY + item.height / 2
                ) {
                    isOverAnyItem = true;
                    item.isFocused = true;
                } else {
                    item.isFocused = false;
                }
            });
        } else {
            floatingItems.forEach(item => item.isFocused = false);
        }
        canvas.style.cursor = isOverAnyItem ? 'pointer' : 'default';
    }

    // Обработка клика по интерактивным плашкам
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        const dpr = window.devicePixelRatio || 1;
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const cxCanvas = (clickX * scaleX) / dpr;
        const cyCanvas = (clickY * scaleY) / dpr;

        floatingItems.forEach(item => {
            if (
                cxCanvas >= item.screenX - item.width / 2 &&
                cxCanvas <= item.screenX + item.width / 2 &&
                cyCanvas >= item.screenY - item.height / 2 &&
                cyCanvas <= item.screenY + item.height / 2
            ) {
                // Воспроизводим реакцию ИИ
                window.showRobotSpeech(item.type);
            }
        });
    });

    window.isCanvasRunning = true;
    window.startCanvasLoop = function() {
        if (!window.isCanvasRunning) {
            window.isCanvasRunning = true;
            animateLoop();
        }
    };
    window.stopCanvasLoop = function() {
        window.isCanvasRunning = false;
    };

    function animateLoop() {
        if (!window.isCanvasRunning) return;
        const time = Date.now() * 0.001;
        drawSphere(time);
        requestAnimationFrame(animateLoop);
    }

    animateLoop();
})();


// ==================== ИНТЕРАКТИВНЫЙ КВИЗ-СИМУЛЯТОР ИИ ====================

(function() {
    const appRoot = document.getElementById('app-root');
    const workspaceSec = document.getElementById('workspace');
    const sphereTrigger = document.getElementById('sphere-trigger');
    const ctaStart = document.getElementById('cta-start-btn');
    const ctaView = document.getElementById('cta-view-btn');
    const runQuizBtn = document.getElementById('run-simulation-btn');
    const optButtons = document.querySelectorAll('.quiz-opt-btn');

    let selectedScenario = 'sales';

    // Описание данных для сценариев
    const scenariosData = {
        ru: {
            sales: {
                chatUser: "Найди необработанные лиды в CRM.",
                chatAi: "Найдено 17 диалогов. Все квалифицированы. Ответы отправлены, счета выставлены.",
                voiceText: "Выставить счет на 45 000 рублей для ООО Вектор...",
                memComm: "Telegram WebApp & CRM",
                memBudget: "Утвержден автоматически",
                memGoals: "Масштабирование воронки",
                webUrl: "mystore.ru",
                webStatus: "✓ CRM Sync OK",
                efficiency: "+68%",
                toastMsg: "Симуляция: ИИ-продажи обрабатывают лиды и CRM! 💼"
            },
            support: {
                chatUser: "Какая гарантия на ваши услуги?",
                chatAi: "Гарантия составляет 1 год по договору. Ответ отправлен клиенту в Telegram.",
                voiceText: "Обнови базу FAQ по гарантийным обязательствам...",
                memComm: "Telegram-бот & FAQ",
                memBudget: "Не требуется",
                memGoals: "Снизить нагрузку на поддержку",
                webUrl: "support-center.ru",
                webStatus: "✓ FAQ Database Sync OK",
                efficiency: "+82%",
                toastMsg: "Симуляция: ИИ-поддержка отвечает на вопросы 24/7! 🛠️"
            },
            parsing: {
                chatUser: "Спарси цены на Ozon и Wildberries.",
                chatAi: "Сбор завершен. 1400 товаров проанализировано. Excel-отчет готов.",
                voiceText: "Запусти ежедневный парсер прайсов конкурентов в 9:00...",
                memComm: "Cloud Parser & Excel",
                memBudget: "SaaS лимиты в норме",
                memGoals: "Динамическое ценообразование",
                webUrl: "competitors-api.ru",
                webStatus: "✓ Data Exported to Sheets",
                efficiency: "+54%",
                toastMsg: "Симуляция: ИИ-аналитик парсит конкурентов! 📈"
            }
        },
        en: {
            sales: {
                chatUser: "Find unanswered leads in CRM.",
                chatAi: "17 conversations processed. Qualified automatically. Invoices sent.",
                voiceText: "Generate invoice for $850 for Vector Corp...",
                memComm: "Telegram WebApp & CRM",
                memBudget: "Approved automatically",
                memGoals: "Scale sales funnel",
                webUrl: "mystore.com",
                webStatus: "✓ CRM Sync OK",
                efficiency: "+68%",
                toastMsg: "Simulation: AI Sales Agent processing CRM leads! 💼"
            },
            support: {
                chatUser: "What is the warranty on services?",
                chatAi: "Warranty is 1 year by contract. Answer sent to client via Telegram.",
                voiceText: "Update FAQ knowledgebase regarding refunds...",
                memComm: "Telegram Bot & FAQ",
                memBudget: "Not applicable",
                memGoals: "Reduce agent load",
                webUrl: "support-center.com",
                webStatus: "✓ FAQ Database Sync OK",
                efficiency: "+82%",
                toastMsg: "Simulation: AI Support answering customer queries 24/7! 🛠️"
            },
            parsing: {
                chatUser: "Scrape prices from Amazon and eBay.",
                chatAi: "Scraping complete. 1,400 items analyzed. Excel report ready.",
                voiceText: "Schedule daily pricing parser for 9:00 AM...",
                memComm: "Cloud Parser & Excel",
                memBudget: "SaaS API quotas OK",
                memGoals: "Dynamic repricing strategy",
                webUrl: "competitors-api.com",
                webStatus: "✓ Data Exported to Sheets",
                efficiency: "+54%",
                toastMsg: "Simulation: AI Parser scraping competitors! 📈"
            }
        }
    };

    // Выбор опций в квизе
    optButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            optButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedScenario = btn.getAttribute('data-scenario');
        });
    });

    // Функция раскрытия рабочей области
    function expandWorkspace() {
        if (appRoot && workspaceSec) {
            appRoot.classList.remove('state-hero');
            appRoot.classList.add('state-workspace');
            workspaceSec.classList.remove('collapsed');
            
            // Скроллим плавно к панели управления
            setTimeout(() => {
                workspaceSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 250);
        }
    }

    // Запуск симуляции под выбранный сценарий
    function runSimulation() {
        expandWorkspace();

        const lang = currentLang;
        const data = scenariosData[lang][selectedScenario];

        // Красивое мигание воркспейса (эффект перезагрузки)
        const cards = document.querySelectorAll('.workspace-card');
        cards.forEach(card => {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.98)';
        });

        setTimeout(() => {
            // Подменяем данные в картах
            // 1. AI Chat
            const chatUserText = document.querySelector('.preview-message.user p');
            const chatAiText = document.querySelector('.preview-message.ai p');
            const voiceTextEl = document.querySelector('.voice-text-indicator span');
            if (chatUserText) chatUserText.textContent = data.chatUser;
            if (chatAiText) chatAiText.textContent = data.chatAi;
            if (voiceTextEl) voiceTextEl.textContent = data.voiceText;

            // 2. AI Team (подсвечиваем только нужных агентов)
            const agentItems = document.querySelectorAll('.agent-item');
            agentItems.forEach(item => {
                item.style.opacity = '0.35';
                const statusDot = item.querySelector('.agent-status-badge');
                if (statusDot) {
                    statusDot.innerHTML = '<span class="status-dot"></span> online';
                }
            });

            if (selectedScenario === 'sales') {
                const salesAgent = agentItems[0];
                const financeAgent = agentItems[3];
                if (salesAgent) {
                    salesAgent.style.opacity = '1';
                    salesAgent.querySelector('.agent-status-badge').innerHTML = '<span class="status-dot-live"></span> processing';
                }
                if (financeAgent) {
                    financeAgent.style.opacity = '1';
                    financeAgent.querySelector('.agent-status-badge').innerHTML = '<span class="status-dot-live"></span> active';
                }
            } else if (selectedScenario === 'support') {
                const supportAgent = agentItems[2];
                if (supportAgent) {
                    supportAgent.style.opacity = '1';
                    supportAgent.querySelector('.agent-status-badge').innerHTML = '<span class="status-dot-live"></span> online';
                }
            } else if (selectedScenario === 'parsing') {
                const marketingAgent = agentItems[1]; // Parser AI
                if (marketingAgent) {
                    marketingAgent.style.opacity = '1';
                    marketingAgent.querySelector('.agent-status-badge').innerHTML = '<span class="status-dot-live"></span> analyzing';
                }
            }

            // 3. Memory
            const memVals = document.querySelectorAll('.memory-val');
            if (memVals.length >= 3) {
                memVals[0].textContent = data.memComm;
                memVals[1].textContent = data.memBudget;
                memVals[2].textContent = data.memGoals;
            }

            // 4. Website Analysis
            const webUrlEl = document.querySelector('.web-url');
            const webStatusEl = document.querySelector('.analysis-status');
            if (webUrlEl) webUrlEl.textContent = data.webUrl;
            if (webStatusEl) {
                webStatusEl.textContent = data.webStatus;
                if (selectedScenario === 'parsing') {
                    webStatusEl.className = 'analysis-status positive';
                } else {
                    webStatusEl.className = 'analysis-status positive';
                }
            }

            // 5. Analytics Graph
            const efficiencyEl = document.querySelector('.efficiency-badge');
            if (efficiencyEl) {
                efficiencyEl.textContent = data.efficiency;
                // Легкое масштабирование
                efficiencyEl.style.transform = 'scale(1.2)';
                setTimeout(() => { efficiencyEl.style.transform = 'scale(1)'; }, 300);
            }

            // Возвращаем видимость картам
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });

            // Показываем Toast с результатом
            showToast(data.toastMsg, 'success');

        }, 400);
    }

    // Слушатели клика для активации
    if (sphereTrigger) sphereTrigger.addEventListener('click', expandWorkspace);
    if (ctaStart) ctaStart.addEventListener('click', () => {
        expandWorkspace();
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1000);
    });
    if (ctaView) ctaView.addEventListener('click', expandWorkspace);
    if (runQuizBtn) runQuizBtn.addEventListener('click', runSimulation);

    // --- СИМУЛЯЦИЯ LIVE BUSINESS PULSE, ТИКЕР, WORKFLOW, ЛОГГЕР ---
    const liveEventsRu = [
        "Telegram: клиент ответил ✓",
        "Website: проведен SEO-анализ ✓",
        "CRM: карточка лида создана",
        "Invoice: выставлен счет на оплату ✓",
        "Calendar: встреча запланирована",
        "CRM: лид успешно квалифицирован",
        "Analytics: воронка продаж обновлена ✓",
        "Support: обращение решено ИИ ✓"
    ];
    const liveEventsEn = [
        "Telegram: customer replied ✓",
        "Website: SEO analysis complete ✓",
        "CRM: lead card created",
        "Invoice: bill generated ✓",
        "Calendar: meeting scheduled",
        "CRM: lead qualified by AI",
        "Analytics: sales funnel updated ✓",
        "Support: ticket resolved by AI ✓"
    ];

    const tickerEl = document.getElementById('live-event-ticker');
    const tickerValEl = document.getElementById('ticker-text-val');
    let eventIdx = 0;

    function updateLiveEventTicker() {
        if (!tickerEl || !tickerValEl) return;
        tickerEl.classList.remove('visible');
        setTimeout(() => {
            const list = (currentLang === 'en') ? liveEventsEn : liveEventsRu;
            tickerValEl.textContent = list[eventIdx];
            eventIdx = (eventIdx + 1) % list.length;
            tickerEl.classList.add('visible');
        }, 500);
    }

    const stepsIds = ['flow-lead', 'flow-qual', 'flow-crm', 'flow-invoice', 'flow-completed'];
    let currentStepIdx = 0;
    let completedTasks = 247;
    const counterEl = document.getElementById('task-counter');

    const activityTemplatesRu = [
        { type: 'info', text: "Сессия Telegram завершена" },
        { type: 'info', text: "Сформировано коммерческое предложение" },
        { type: 'info', text: "Счет успешно выставлен и доставлен" },
        { type: 'info', text: "CRM синхронизирована с базой лидов" },
        { type: 'info', text: "Завершен SEO-аудит лендинга" },
        { type: 'info', text: "Голосовая заметка расшифрована ИИ" },
        { type: 'info', text: "Получен новый лид через форму" },
        { type: 'info', text: "Сформирован ИИ-саммари созвона" },
        { type: 'info', text: "Автоматизация парсинга завершена" },
        { type: 'success', text: "✓ MVP успешно запущен" },
        { type: 'success', text: "✓ Телеграм-бот переведен в прод" },
        { type: 'success', text: "✓ Оплата счета подтверждена CRM" },
        { type: 'success', text: "✓ ИИ-ассистент развернут на Vercel" }
    ];
    const activityTemplatesEn = [
        { type: 'info', text: "Telegram conversation completed" },
        { type: 'info', text: "Proposal generated automatically" },
        { type: 'info', text: "Invoice delivered to client" },
        { type: 'info', text: "CRM synchronized successfully" },
        { type: 'info', text: "Website SEO audit finished" },
        { type: 'info', text: "Voice memo transcribed by AI" },
        { type: 'info', text: "New lead received in database" },
        { type: 'info', text: "AI meeting summary created" },
        { type: 'info', text: "Parsing automation finished" },
        { type: 'success', text: "✓ MVP successfully delivered" },
        { type: 'success', text: "✓ Telegram bot deployed to prod" },
        { type: 'success', text: "✓ Invoice payment confirmed in CRM" },
        { type: 'success', text: "✓ AI Consultant deployed to Vercel" }
    ];

    function addActivityLog(type, text) {
        const feed = document.getElementById('live-activity-feed');
        if (!feed) return;

        const item = document.createElement('div');
        item.className = 'activity-item';

        const dot = document.createElement('span');
        dot.className = `activity-item-dot ${type === 'success' ? 'success' : ''}`;

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        const timeEl = document.createElement('span');
        timeEl.className = 'activity-item-time';
        timeEl.textContent = timeStr;

        const textEl = document.createElement('span');
        textEl.className = 'activity-item-text';
        textEl.textContent = text;

        item.appendChild(dot);
        item.appendChild(timeEl);
        item.appendChild(textEl);

        feed.appendChild(item);

        setTimeout(() => item.classList.add('visible'), 50);

        const items = feed.querySelectorAll('.activity-item');
        if (items.length > 1) {
            for (let i = 0; i < items.length - 1; i++) {
                const oldest = items[i];
                oldest.style.opacity = '0';
                oldest.style.transform = 'translateY(-15px) scale(0.95)';
                setTimeout(() => oldest.remove(), 500);
            }
        }
    }

    function triggerRandomActivity() {
        const list = (currentLang === 'en') ? activityTemplatesEn : activityTemplatesRu;
        const item = list[Math.floor(Math.random() * list.length)];
        addActivityLog(item.type, item.text);
    }

    window.startDecorativeTimers = function() {
        window.stopDecorativeTimers();

        // 1. Симуляция workflow шагов
        window.workflowInterval = setInterval(() => {
            stepsIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('active');
            });

            if ((selectedScenario === 'support' || selectedScenario === 'parsing') && stepsIds[currentStepIdx] === 'flow-invoice') {
                currentStepIdx = (currentStepIdx + 1) % stepsIds.length;
            }

            const activeStep = document.getElementById(stepsIds[currentStepIdx]);
            if (activeStep) {
                activeStep.classList.add('active');
                activeStep.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                setTimeout(() => { if (activeStep) activeStep.style.borderColor = ''; }, 800);
            }

            currentStepIdx = (currentStepIdx + 1) % stepsIds.length;
        }, 2800);

        // 2. Инкремент счетчика задач + Business Pulse (полностью отключен)
        // 3. Живой тикер событий (полностью отключен)
        // 4. Логгер случайной активности в шапке (полностью отключен)

        // 5. Ротация подсказок в инпуте Архитектора
        const hint = document.getElementById('ai-architect-hint');
        const hintsRu = [
            '"Создай чат-бота для техподдержки на сайте."',
            '"Автоматизируй выгрузку лидов из Telegram в CRM."',
            '"Разработай ИИ-ассистента для анализа документов."'
        ];
        const hintsEn = [
            '"I need an internal AI assistant for document analysis."',
            '"Automate CRM pipeline and invoice billing."',
            '"Build an AI consultant for my website."'
        ];
        let hintIdx = 0;
        window.hintInterval = setInterval(() => {
            const list = (currentLang === 'en') ? hintsEn : hintsRu;
            if (hint) {
                hint.textContent = list[hintIdx];
            }
            hintIdx = (hintIdx + 1) % list.length;
        }, 3800);

        // 6. Ротация агентов в команде
        window.agentRotationInterval = setInterval(() => {
            if (typeof window.rotateAgents === 'function') {
                window.rotateAgents();
            }
        }, 4600);
    };

    window.stopDecorativeTimers = function() {
        if (window.workflowInterval) { clearInterval(window.workflowInterval); window.workflowInterval = null; }
        if (window.taskCounterInterval) { clearInterval(window.taskCounterInterval); window.taskCounterInterval = null; }
        if (window.liveTickerInterval) { clearInterval(window.liveTickerInterval); window.liveTickerInterval = null; }
        if (window.activityLoggerInterval) { clearInterval(window.activityLoggerInterval); window.activityLoggerInterval = null; }
        if (window.hintInterval) { clearInterval(window.hintInterval); window.hintInterval = null; }
        if (window.agentRotationInterval) { clearInterval(window.agentRotationInterval); window.agentRotationInterval = null; }
    };

    // --- FIRST VISIT CINEMATIC EXPERIENCE TIMELINE (Living Business Demo) ---
    window.cinematicTimeouts = [];
    function startCinematicSequence() {
        const notif = document.getElementById('story-notification');
        const notifTitle = document.getElementById('story-notif-title');
        const notifBody = document.getElementById('story-notif-body');
        const notifFooter = document.getElementById('story-notif-footer');
        const ticker = document.getElementById('live-event-ticker');
        const tickerVal = document.getElementById('ticker-text-val');

        // Переходим в состояние CINEMATIC
        window.setHeroState('CINEMATIC');
        window.cinematicStep = 0;

        // 0-2 сек: Полный покой (cinematicStep = 0). Робот дышит в Ambient.

        // t = 2.0s (Шаг 1): Появляется уведомление Telegram -> Новое сообщение клиента
        window.cinematicTimeouts.push(setTimeout(() => {
            window.cinematicStep = 1;
            window.ambientSpeedFactor = 0.03;
            
            if (notif && notifTitle && notifBody && notifFooter) {
                notifTitle.textContent = (currentLang === 'en') ? 'Telegram' : 'Telegram';
                notifBody.textContent = (currentLang === 'en') ? 'New customer message' : 'Новое сообщение клиента';
                notifFooter.textContent = '';
                notif.className = 'story-notification visible';
            }
        }, 2000));

        // t = 3.0s (Шаг 2): Робот переводит взгляд влево-вверх. Статус: Анализирую запрос...
        window.cinematicTimeouts.push(setTimeout(() => {
            window.cinematicStep = 2;
            if (ticker && tickerVal) {
                tickerVal.textContent = (currentLang === 'en') ? 'Analyzing request...' : 'Анализирую запрос...';
                ticker.className = 'live-event-ticker visible';
            }
        }, 3000));

        // t = 4.0s (Шаг 3): Уведомление меняется -> ✓ Ответ подготовлен
        window.cinematicTimeouts.push(setTimeout(() => {
            window.cinematicStep = 3;
            if (notif && notifBody && notifFooter) {
                notifBody.textContent = (currentLang === 'en') ? '✓ Reply prepared' : '✓ Ответ подготовлен';
                notifFooter.textContent = '';
            }
            if (tickerVal) {
                tickerVal.textContent = (currentLang === 'en') ? 'Generating response...' : 'Формирую ответ...';
            }
        }, 4000));

        // t = 5.0s (Шаг 4): Business Pulse (волна из центра). Счетчик задач 278 -> 279
        window.cinematicTimeouts.push(setTimeout(() => {
            window.cinematicStep = 4;
            
            const counterEl = document.getElementById('task-counter');
            if (counterEl) {
                counterEl.textContent = '279';
                counterEl.style.transform = 'scale(1.3)';
                counterEl.style.color = '#10b981';
                window.cinematicTimeouts.push(setTimeout(() => {
                    if (counterEl) {
                        counterEl.style.transform = 'scale(1)';
                        counterEl.style.color = '';
                    }
                }, 400));
            }

            // Мягкая волна из центра сферы
            if (window.triggerBusinessPulse) {
                window.triggerBusinessPulse();
            }
        }, 5000));

        // t = 6.0s (Шаг 5): Уведомление исчезает. Робот возвращается в спокойное состояние (взгляд в центр).
        window.cinematicTimeouts.push(setTimeout(() => {
            window.cinematicStep = 5;
            if (notif) {
                notif.className = 'story-notification';
            }
        }, 6000));

        // t = 7.0s (Шаг 6): Hero переходит в Ambient (Idle).
        window.cinematicTimeouts.push(setTimeout(() => {
            window.cinematicStep = 6;
            window.ambientSpeedFactor = 1.0;
            
            if (tickerVal) {
                tickerVal.textContent = (currentLang === 'en') ? 'AI Agent idle' : 'ИИ-сотрудник готов к работе';
            }

            window.setHeroState('AMBIENT');
        }, 7000));
    }

    // --- REAL-TIME CLOCK WIDGET ---
    function updateClock() {
        const timeEl = document.getElementById('system-time');
        if (!timeEl) return;
        const now = new Date();
        const hh = now.getHours().toString().padStart(2, '0');
        const mm = now.getMinutes().toString().padStart(2, '0');
        timeEl.textContent = `${hh}:${mm}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- AMBIENT INTELLIGENCE: CTA HOVER REACTION ---
    const startCta = document.getElementById('cta-start-btn');
    if (startCta) {
        startCta.addEventListener('mouseenter', () => {
            // Реагируем только в режиме Idle (cinematicStep === 8)
            if (window.cinematicStep >= 8) {
                const item = floatingItems[0];
                if (item) {
                    item.customText = (currentLang === 'en') 
                        ? '⚡ New Project → AI Architect Assigned' 
                        : '⚡ Новый проект → Назначен ИИ-архитектор';
                    item.isFocused = true;
                }
            }
        });
        startCta.addEventListener('mouseleave', () => {
            if (window.cinematicStep >= 8) {
                const item = floatingItems[0];
                if (item) {
                    item.customText = null;
                    item.isFocused = false;
                }
            }
        });
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log("[Visibility] Hidden: Pause loops");
            window.stopCanvasLoop();
            window.stopDecorativeTimers();
        } else {
            console.log(`[Visibility] Visible: Resume in ${window.currentHeroState}`);
            if (window.currentHeroState !== 'WORKSPACE' && window.currentHeroState !== 'HIDDEN') {
                window.startCanvasLoop();
            }
            if (window.currentHeroState === 'AMBIENT') {
                window.startDecorativeTimers();
            }
        }
    });

    // Запускаем при загрузке страницы
    window.addEventListener('load', () => {
        startCinematicSequence();

        // Настройка Ambient Intelligence: Attention Breathing
        const attentionCards = document.querySelectorAll('.flow-step, .ai-quiz-container, .memory-card');
        attentionCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                attentionTarget = 'card';
            });
            card.addEventListener('mouseleave', () => {
                attentionTarget = 'sphere';
            });
        });

        const attentionButtons = document.querySelectorAll('.cta-button, .quiz-submit-btn, .lang-btn');
        attentionButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                attentionTarget = 'cta';
            });
            btn.addEventListener('mouseleave', () => {
                attentionTarget = 'sphere';
            });
        });

        // Сфера возвращает фокус внимания при наведении на Canvas
        const crystalCanvas = document.getElementById('crystal-canvas');
        if (crystalCanvas) {
            crystalCanvas.addEventListener('mouseenter', () => {
                attentionTarget = 'sphere';
            });
        }

        // --- РОТАЦИЯ АКТИВНОГО ИИ-АГЕНТА (ИИ-КОМАНДА В ДЕЙСТВИИ) ---
        const agents = document.querySelectorAll('.agent-item');
        let activeAgentIdx = 0;
        
        function rotateAgents() {
            if (!agents.length) return;
            agents.forEach((agent, idx) => {
                const badge = agent.querySelector('.agent-status-badge');
                if (idx === activeAgentIdx) {
                    agent.classList.remove('inactive');
                    agent.classList.add('active');
                    if (badge) {
                        badge.innerHTML = `<span class="status-dot green" style="background-color: #10b981;"></span> ${currentLang === 'en' ? 'processing...' : 'в работе...'}`;
                    }
                } else {
                    agent.classList.remove('active');
                    agent.classList.add('inactive');
                    if (badge) {
                        badge.innerHTML = `<span class="status-dot" style="background-color: rgba(255,255,255,0.25);"></span> online`;
                    }
                }
            });
            activeAgentIdx = (activeAgentIdx + 1) % agents.length;
        }
        
        rotateAgents();
        setInterval(rotateAgents, 4600);

        // Инициализация ИИ-Архитектора
        initAIArchitect();

        // Инициализация сигнатурной мини-сферы в футере
        initSignatureCanvas();

        const sigBtn = document.getElementById('signature-btn');
        if (sigBtn) {
            sigBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });

    // ==================== AI ARCHITECT LOGIC ====================
    function initAIArchitect() {
        let discoveryQuery = '';
        let discoveryAbortController = null;
        let discoveryTimers = [];

        const chatLog = document.getElementById('architect-chat-log');
        const input = document.getElementById('architect-input');
        const sendBtn = document.getElementById('architect-send-btn');
        const typing = document.getElementById('architect-typing');
        const hint = document.getElementById('architect-placeholder-hint');
        const modulesList = document.getElementById('blueprint-modules-list');
        const estimateEl = document.getElementById('blueprint-estimate-weeks');
        const actionsBlock = document.getElementById('blueprint-actions-block');
        const canvas = document.getElementById('blueprint-canvas');

        // Живой ввод в Hero
        const heroInput = document.getElementById('hero-ai-input');
        const heroSend = document.getElementById('hero-send-btn');
        const heroMic = document.getElementById('hero-mic-btn');
        const scenarioTags = document.querySelectorAll('.scenario-tag');

        if (!chatLog || !input || !sendBtn) return;

        const sessionId = Math.random().toString(36).substring(7);

        // Инициализация Canvas
        let ctx = null;
        if (canvas) {
            ctx = canvas.getContext('2d');
            resizeBlueprintCanvas();
            window.addEventListener('resize', resizeBlueprintCanvas);
        }

        function resizeBlueprintCanvas() {
            if (!canvas) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }

        async function runAIDiscovery(query) {
            discoveryQuery = query;

            if (discoveryAbortController) {
                discoveryAbortController.abort();
            }
            discoveryAbortController = new AbortController();

            discoveryTimers.forEach(t => clearTimeout(t));
            discoveryTimers = [];

            // Сброс ответов
            window.discoveryAnswers = {};

            const factsList = document.getElementById('discovery-facts-list');
            const questionsList = document.getElementById('discovery-questions-list');
            if (factsList) factsList.innerHTML = '';
            if (questionsList) questionsList.innerHTML = '';

            // Устанавливаем STATE_THINKING
            setDiscoveryState('THINKING');

            const indicators = document.getElementById('discovery-indicators');
            if (indicators) {
                const currentIndicator = document.getElementById('discovery-current-indicator');

                const steps = currentLang === 'en' ? [
                    'Determining project type...',
                    'Studying current system...',
                    'Searching for automation points...',
                    'Generating clarifying questions...'
                ] : [
                    'Определяю тип проекта...',
                    'Изучаю текущую систему...',
                    'Ищу точки автоматизации...',
                    'Формирую уточняющие вопросы...'
                ];

                if (currentIndicator) {
                    currentIndicator.textContent = steps[0];
                    currentIndicator.style.opacity = '1';
                }

                const delayStep = 1500;
                steps.forEach((stepText, index) => {
                    if (index === 0) return;
                    const timer = setTimeout(() => {
                        if (currentIndicator) {
                            currentIndicator.style.opacity = '0';
                            setTimeout(() => {
                                currentIndicator.textContent = stepText;
                                currentIndicator.style.opacity = '1';
                            }, 200);
                        }
                    }, index * delayStep);
                    discoveryTimers.push(timer);
                });
            }

            try {
                const response = await fetch('/api/discovery', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: query }),
                    signal: discoveryAbortController.signal
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (!data.success || !data.result) {
                    throw new Error('Invalid JSON response or success field is false');
                }

                showDiscoveryFacts(data.result);

            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('Fetch request was aborted.');
                    return;
                }
                console.error('Error during AI Discovery:', err);
                setDiscoveryState('ERROR');
            } finally {
                window.setHeroState('WORKSPACE');
            }
        }

        function setDiscoveryState(state) {
            const workspace = document.getElementById('workspace');
            const spinner = document.getElementById('discovery-spinner-wrapper');
            const statusTitle = document.getElementById('discovery-status-title');
            const indicators = document.getElementById('discovery-indicators');
            const factsPanel = document.getElementById('discovery-facts-panel');
            const questionsPanel = document.getElementById('discovery-questions-panel');
            const errorPanel = document.getElementById('discovery-error-panel');
            const submitBtn = document.getElementById('discovery-submit-btn');
            const savedStatus = document.getElementById('discovery-saved-status');
            const queryCard = document.getElementById('discovery-user-query-card');
            const langCard = document.getElementById('discovery-lang-suggestion-card');

            if (workspace) {
                workspace.classList.add('discovery-mode-active');
            }

            if (queryCard) {
                queryCard.style.display = 'block';
                const queryTextEl = document.getElementById('discovery-user-query-text');
                if (queryTextEl) queryTextEl.textContent = discoveryQuery;
            }

            // По умолчанию скрываем все внутренние панели Discovery
            if (spinner) spinner.style.display = 'none';
            if (indicators) indicators.style.display = 'none';
            if (factsPanel) factsPanel.style.display = 'none';
            if (questionsPanel) questionsPanel.style.display = 'none';
            if (errorPanel) errorPanel.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'none';
            if (savedStatus) savedStatus.style.display = 'none';
            if (langCard) langCard.style.display = 'none';

            switch (state) {
                case 'THINKING':
                    if (statusTitle) {
                        statusTitle.textContent = currentLang === 'en' ? 'Analyzing your request…' : 'Анализирую ваш запрос…';
                    }
                    if (spinner) spinner.style.display = 'flex';
                    if (indicators) indicators.style.display = 'flex';
                    break;

                case 'UNDERSTANDING':
                    if (statusTitle) {
                        statusTitle.textContent = currentLang === 'en' ? 'I understood the task' : 'Я понял задачу';
                    }
                    if (factsPanel) factsPanel.style.display = 'block';
                    break;

                case 'CLARIFYING':
                    if (statusTitle) {
                        statusTitle.textContent = currentLang === 'en' ? 'I understood the task' : 'Я понял задачу';
                    }
                    if (factsPanel) factsPanel.style.display = 'block';
                    if (questionsPanel) questionsPanel.style.display = 'block';
                    if (submitBtn) {
                        submitBtn.style.display = 'block';
                        validateDiscoveryForm();
                    }
                    break;

                case 'SAVED':
                    if (statusTitle) {
                        statusTitle.textContent = currentLang === 'en' ? 'I understood the task' : 'Я понял задачу';
                    }
                    if (factsPanel) factsPanel.style.display = 'block';
                    if (questionsPanel) questionsPanel.style.display = 'block';
                    if (savedStatus) savedStatus.style.display = 'block';
                    break;

                case 'ERROR':
                    if (statusTitle) {
                        statusTitle.textContent = currentLang === 'en' ? 'Analysis failed' : 'Ошибка анализа';
                    }
                    if (errorPanel) errorPanel.style.display = 'flex';
                    break;
            }
        }

        function showDiscoveryFacts(result) {
            const factsList = document.getElementById('discovery-facts-list');

            setDiscoveryState('UNDERSTANDING');

            // Проверка несовпадения языков
            const card = document.getElementById('discovery-lang-suggestion-card');
            if (card) card.style.display = 'none'; // По умолчанию скрываем

            const detectedLang = result.language || 'ru'; // Язык общения AI
            if (detectedLang !== currentLang) {
                // Если языки отличаются, показываем предложение
                const textEl = document.getElementById('discovery-lang-suggestion-text');
                const switchBtn = document.getElementById('discovery-lang-switch-btn');
                const keepBtn = document.getElementById('discovery-lang-keep-btn');

                if (currentLang === 'ru' && detectedLang === 'en') {
                    if (textEl) textEl.textContent = "It looks like you're communicating in English. Switch the interface to English?";
                    if (switchBtn) switchBtn.textContent = "Switch";
                    if (keepBtn) keepBtn.textContent = "Keep Russian";
                } else if (currentLang === 'en' && detectedLang === 'ru') {
                    if (textEl) textEl.textContent = "Похоже, вы общаетесь на русском языке. Переключить интерфейс на русский?";
                    if (switchBtn) switchBtn.textContent = "Переключить";
                    if (keepBtn) keepBtn.textContent = "Оставить английский";
                }

                if (switchBtn) {
                    // Очищаем старые обработчики, чтобы не дублировать
                    const newSwitchBtn = switchBtn.cloneNode(true);
                    switchBtn.replaceWith(newSwitchBtn);
                    newSwitchBtn.addEventListener('click', () => {
                        LanguageManager.setUILanguage(detectedLang);
                        const c = document.getElementById('discovery-lang-suggestion-card');
                        if (c) c.style.display = 'none';
                    });
                }

                if (keepBtn) {
                    const newKeepBtn = keepBtn.cloneNode(true);
                    keepBtn.replaceWith(newKeepBtn);
                    newKeepBtn.addEventListener('click', () => {
                        const c = document.getElementById('discovery-lang-suggestion-card');
                        if (c) c.style.display = 'none';
                    });
                }

                if (card) card.style.display = 'flex';
            }

            if (factsList) {
                factsList.innerHTML = '';

                let facts = [];

                const qLower = discoveryQuery.toLowerCase();
                if (qLower.includes('лид') || qLower.includes('lead') || qLower.includes('заявк') || qLower.includes('обработк')) {
                    facts = currentLang === 'en' ? [
                        'Automation of lead processing required',
                        'Need to identify lead sources',
                        'Lead qualification and routing is possible',
                        'Should clarify the need for CRM integration'
                    ] : [
                        'Требуется автоматизация обработки заявок',
                        'Необходимо определить источники лидов',
                        'Возможна квалификация и маршрутизация',
                        'Следует уточнить необходимость интеграции с CRM'
                    ];
                } else {
                    if (result.project_type) {
                        facts.push(result.project_type);
                    }

                    if (result.existing_product === true) {
                        facts.push(currentLang === 'en' ? 'Existing digital product detected' : 'Обнаружен действующий цифровой продукт');
                    } else if (result.existing_product === false) {
                        facts.push(currentLang === 'en' ? 'New project development' : 'Создание проекта с нуля');
                    }

                    if (result.needs_modernization === true) {
                        facts.push(currentLang === 'en' ? 'Platform modernization required' : 'Требуется модернизация платформы');
                    }

                    if (result.needs_migration === true) {
                        facts.push(currentLang === 'en' ? 'Migration to modern architecture recommended' : 'Рекомендуется миграция на новый стек');
                    }

                    if (facts.length < 4 && result.automation_opportunities && result.automation_opportunities.length > 0) {
                        const cleanOpportunities = result.automation_opportunities.filter(opp => {
                            const oppLow = opp.toLowerCase();
                            return !oppLow.includes('17 диалогов') && !oppLow.includes('найдено 17');
                        });
                        if (cleanOpportunities.length > 0) {
                            const firstOpp = cleanOpportunities[0];
                            const shortOpp = firstOpp.length > 50 ? firstOpp.substring(0, 47) + '...' : firstOpp;
                            facts.push((currentLang === 'en' ? 'AI integration potential: ' : 'Найден потенциал ИИ-интеграции: ') + shortOpp);
                        }
                    }
                }

                const finalFacts = facts.slice(0, 4);

                finalFacts.forEach((factText, index) => {
                    const factItem = document.createElement('div');
                    factItem.className = 'fact-item';
                    factItem.innerHTML = `<span class="fact-icon">✓</span> <span class="fact-text">${factText}</span>`;
                    factsList.appendChild(factItem);

                    const timer = setTimeout(() => {
                        factItem.classList.add('visible');
                    }, index * 300);
                    discoveryTimers.push(timer);
                });

                const clarifyingTimer = setTimeout(() => {
                    showDiscoveryQuestions(result.clarifying_questions);
                }, finalFacts.length * 300 + 400);
                discoveryTimers.push(clarifyingTimer);
            }
        }

        function showDiscoveryQuestions(questions) {
            const questionsPanel = document.getElementById('discovery-questions-panel');
            const questionsList = document.getElementById('discovery-questions-list');

            if (!questions || questions.length === 0) return;

            if (questionsPanel) questionsPanel.style.display = 'block';
            if (questionsList) {
                questionsList.innerHTML = '';

                const groupProductKeywords = ['текущ', 'платформ', 'систем', 'стек', 'технолог', 'база', 'данн', 'legacy', 'существу', 'использует', 'wordpress', 'woocommerce', 'сайт', 'product', 'platform', 'stack', 'technology', 'database'];
                const groupGoalKeywords = ['цел', 'результат', 'бизнес', 'показател', 'конверс', 'метрик', 'задач', 'квалификац', 'goal', 'result', 'business', 'metric', 'conversion', 'kpi'];
                const groupScaleKeywords = ['интеграц', 'crm', 'бюджет', 'срок', 'ограничен', 'масштаб', 'язык', 'канал', 'telegram', 'whatsapp', 'integration', 'budget', 'timeline', 'limit', 'scale', 'channel'];

                let selectedQuestions = [];

                const findForGroup = (keywords) => {
                    return questions.find(q => {
                        const low = q.toLowerCase();
                        return keywords.some(kw => low.includes(kw)) && !selectedQuestions.includes(q);
                    });
                };

                const qProduct = findForGroup(groupProductKeywords);
                if (qProduct) selectedQuestions.push(qProduct);

                const qGoal = findForGroup(groupGoalKeywords);
                if (qGoal) selectedQuestions.push(qGoal);

                const qScale = findForGroup(groupScaleKeywords);
                if (qScale) selectedQuestions.push(qScale);

                for (let q of questions) {
                    if (selectedQuestions.length >= 3) break;
                    if (!selectedQuestions.includes(q)) {
                        selectedQuestions.push(q);
                    }
                }

                const finalQuestions = selectedQuestions.slice(0, 3);

                finalQuestions.forEach((qText, index) => {
                    const qId = `q-${index}`;
                    const card = document.createElement('div');
                    card.className = 'question-card';

                    const label = document.createElement('label');
                    label.setAttribute('for', qId);
                    label.textContent = qText;
                    card.appendChild(label);

                    const lowerQ = qText.toLowerCase();
                    let rendered = false;

                    if (lowerQ.includes('канал') || lowerQ.includes('channel')) {
                        renderOptions(card, qText, index, [
                            currentLang === 'en' ? 'Website' : 'Сайт',
                            'Telegram',
                            'WhatsApp',
                            currentLang === 'en' ? 'Mobile App' : 'Мобильное приложение'
                        ]);
                        rendered = true;
                    }
                    else if (lowerQ.includes('интеграц') || lowerQ.includes('integration') || lowerQ.includes('crm')) {
                        renderOptions(card, qText, index, [
                            'CRM (Amo/Bitrix)',
                            currentLang === 'en' ? 'ERP / 1C' : '1С / ERP',
                            currentLang === 'en' ? 'Payment Gateway' : 'Платежная система',
                            currentLang === 'en' ? 'No integrations' : 'Без интеграций'
                        ]);
                        rendered = true;
                    }
                    else if (lowerQ.includes('wordpress') || lowerQ.includes('woocommerce') || lowerQ.includes('платформ') || lowerQ.includes('platform')) {
                        renderOptions(card, qText, index, [
                            currentLang === 'en' ? 'Keep WordPress' : 'Сохранить WordPress',
                            currentLang === 'en' ? 'Migrate from WordPress' : 'Мигрировать с WordPress',
                            currentLang === 'en' ? 'Next.js / Headless' : 'Next.js / Headless',
                            currentLang === 'en' ? 'Not sure' : 'Не уверен'
                        ]);
                        rendered = true;
                    }
                    else if (lowerQ.includes('планируете') || lowerQ.includes('нужен') || lowerQ.includes('do you') || lowerQ.includes('is it')) {
                        renderOptions(card, qText, index, [
                            currentLang === 'en' ? 'Yes' : 'Да',
                            currentLang === 'en' ? 'No' : 'Нет',
                            currentLang === 'en' ? 'Discuss later' : 'Обсудим позже'
                        ]);
                        rendered = true;
                    }

                    if (!rendered) {
                        const inputField = document.createElement('input');
                        inputField.type = 'text';
                        inputField.id = qId;
                        inputField.className = 'question-input';
                        inputField.required = true;
                        inputField.placeholder = currentLang === 'en' ? 'Your answer...' : 'Ваш ответ...';
                        inputField.addEventListener('input', () => {
                            window.discoveryAnswers[qText] = inputField.value.trim();
                            validateDiscoveryForm();
                        });
                        card.appendChild(inputField);
                    }

                    questionsList.appendChild(card);
                });

                validateDiscoveryForm();
            }
        }

        function renderOptions(container, questionText, index, options) {
            const optionsWrapper = document.createElement('div');
            optionsWrapper.className = 'question-options';

            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.className = 'question-input';
            textInput.style.display = 'none';
            textInput.style.marginTop = '10px';
            textInput.placeholder = currentLang === 'en' ? 'Describe your option...' : 'Опишите ваш вариант...';

            textInput.addEventListener('input', () => {
                window.discoveryAnswers[questionText] = textInput.value.trim();
                validateDiscoveryForm();
            });

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'option-btn';
                btn.textContent = opt;

                btn.addEventListener('click', () => {
                    optionsWrapper.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    textInput.style.display = 'none';
                    window.discoveryAnswers[questionText] = opt;
                    validateDiscoveryForm();
                });

                optionsWrapper.appendChild(btn);
            });

            const otherBtn = document.createElement('button');
            otherBtn.type = 'button';
            otherBtn.className = 'option-btn';
            otherBtn.textContent = currentLang === 'en' ? 'Other...' : 'Другое...';
            optionsWrapper.appendChild(otherBtn);

            otherBtn.addEventListener('click', () => {
                optionsWrapper.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                otherBtn.classList.add('selected');
                textInput.style.display = 'block';
                textInput.focus();
                window.discoveryAnswers[questionText] = textInput.value.trim();
                validateDiscoveryForm();
            });

            container.appendChild(optionsWrapper);
            container.appendChild(textInput);
        }

        function validateDiscoveryForm() {
            const submitBtn = document.getElementById('discovery-submit-btn');
            const questionsList = document.getElementById('discovery-questions-list');
            if (!submitBtn || !questionsList) return;

            const cards = questionsList.querySelectorAll('.question-card');
            let allFilled = true;

            cards.forEach((card) => {
                const label = card.querySelector('label');
                const qText = label ? label.textContent : '';

                if (!window.discoveryAnswers[qText] || window.discoveryAnswers[qText].toString().trim() === "") {
                    allFilled = false;
                }
            });

            submitBtn.disabled = !allFilled;
        }

        // Привязываем обработчики для сабмита и ретрая
        const discoveryForm = document.getElementById('discovery-questions-form');
        if (discoveryForm) {
            discoveryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                setDiscoveryState('SAVED');
                console.log('AI Discovery answers saved:', window.discoveryAnswers);
            });
        }

        const retryBtn = document.getElementById('discovery-retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                if (discoveryQuery) {
                    runAIDiscovery(discoveryQuery);
                }
            });
        }

        if (heroInput && heroSend) {
            function handleHeroSend() {
                const text = heroInput.value.trim();
                if (!text) return;

                heroInput.value = '';
                expandWorkspace();
                runAIDiscovery(text);
            }

            heroSend.addEventListener('click', handleHeroSend);
            heroInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') handleHeroSend();
            });
        }

        // Быстрые сценарии в Hero
        scenarioTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const text = currentLang === 'en' ? tag.getAttribute('data-text-en') : tag.getAttribute('data-text-ru');
                if (heroInput) {
                    heroInput.value = text;
                    heroInput.focus();
                }
            });
        });

        // --- Голосовой ввод (Web Speech API) ---
        if (heroMic && heroInput) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = currentLang === 'en' ? 'en-US' : 'ru-RU';

                let isListening = false;

                heroMic.addEventListener('click', () => {
                    if (isListening) {
                        recognition.stop();
                    } else {
                        recognition.start();
                    }
                });

                recognition.onstart = () => {
                    isListening = true;
                    heroMic.classList.add('listening');
                    heroInput.placeholder = currentLang === 'en' ? 'Listening...' : 'Слушаю вас...';
                };

                recognition.onend = () => {
                    isListening = false;
                    heroMic.classList.remove('listening');
                    heroInput.placeholder = currentLang === 'en' ? 'Describe your task...' : 'Расскажите о своей задаче...';
                };

                recognition.onresult = (event) => {
                    const resultText = event.results[0][0].transcript;
                    heroInput.value = resultText;
                };

                recognition.onerror = (err) => {
                    console.error('Speech recognition error:', err);
                    heroMic.classList.remove('listening');
                };
            } else {
                heroMic.style.display = 'none';
            }
        }
    }

    // ==================== SIGNATURE FOOTER CANVAS LOGIC ====================
    function initSignatureCanvas() {
        const canvas = document.getElementById('signature-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        function draw() {
            const time = Date.now() * 0.001;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const baseRadius = Math.min(canvas.width, canvas.height) * 0.38;

            const floatY = Math.sin(time * 1.2) * 3;
            const scx = cx;
            const scy = cy + floatY;

            // Свечение центра
            const isEn = (currentLang === 'en');
            const innerGlow = ctx.createRadialGradient(scx, scy, 0, scx, scy, baseRadius);
            const glowColor = isEn ? 'rgba(37, 99, 235, 0.15)' : 'rgba(168, 85, 247, 0.15)';
            innerGlow.addColorStop(0, glowColor);
            innerGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = innerGlow;
            ctx.beginPath();
            ctx.arc(scx, scy, baseRadius * 1.2, 0, Math.PI * 2);
            ctx.fill();

            // Тонкий контур кристалла
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.arc(scx, scy, baseRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Specular блик
            ctx.beginPath();
            ctx.arc(scx + baseRadius * 0.1, scy - baseRadius * 0.1, baseRadius * 0.9, 0, Math.PI * 2);
            const glassSpecular = ctx.createLinearGradient(scx, scy - baseRadius, scx, scy);
            glassSpecular.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
            glassSpecular.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
            glassSpecular.addColorStop(1, 'transparent');
            ctx.fillStyle = glassSpecular;
            ctx.fill();

            requestAnimationFrame(draw);
        }
        draw();
    }
})();

