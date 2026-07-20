# CreateMind v2 Migration Map

Настоящая миграционная карта определяет судьбу каждого компонента CreateMind v1 при переходе к версии v2. Она разработана на основе проведенного аудита кодовой базы.

---

## 1. KEEP
Компоненты, которые отлично решают свои задачи и переносятся в v2 без изменений:

1. **Визуальная атмосфера Hero (стилизация)**
   * *Исходный файл*: [style.css](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/style.css) (строки 350-520)
   * *Причина*: Соответствует утвержденному дизайн-коду.
   * *Как использовать в v2*: Сохранить CSS-классы сеток, размытий и фонов без изменений.
   * *Зависимости*: CSS design tokens.

2. **Canvas 3D rendering сферы**
   * *Исходный файл*: [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 760-1898)
   * *Причина*: Премиальная интерактивная шейдерная анимация.
   * *Как использовать в v2*: Сохранить рендерер и обработчики курсора.
   * *Зависимости*: Canvas DOM element.

3. **Robot 3D assets и шейдеры**
   * *Исходный файл*: [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 800-950)
   * *Причина*: Полностью готовые математические формулы сжатия, свечения и отражений.
   * *Как использовать в v2*: Рендерить кристалл сферы.
   * *Зависимости*: `crystal-canvas`.

4. **LanguageManager логика**
   * *Исходный файл*: [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 419-465)
   * *Причина*: Поддерживает localStorage `uiLanguage` и приоритеты браузера.
   * *Как использовать в v2*: Использовать как единый класс смены локализации.
   * *Зависимости*: `translations` object.

5. **AI Discovery API**
   * *Исходный файл*: [server.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/server.js) (строки 607-673)
   * *Причина*: Эндпоинт `/api/discovery` стабильно обрабатывает POST-запросы.
   * *Как использовать в v2*: Использовать для первичного анализа задачи.
   * *Зависимости*: `callOpenAIAPI`.

6. **Discovery JSON Schema**
   * *Исходный файл*: [server.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/server.js) (строки 684-714)
   * *Причина*: JSON-схема возвращает валидную структуру.
   * *Как использовать в v2*: Сохранить в Responses API.
   * *Зависимости*: OpenAI Responses API.

7. **Telegram WebApp SDK integration**
   * *Исходный файл*: [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 1-25)
   * *Причина*: Обеспечивает расширение и темизацию в Telegram.
   * *Как использовать в v2*: Оставить инициализацию `tg.ready()` и `tg.expand()`.
   * *Зависимости*: Внешний скрипт Telegram SDK.

8. **CSS design tokens**
   * *Исходный файл*: [style.css](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/style.css) (строки 20-100)
   * *Причина*: Цветовая палитра и размытия (glassmorphism) отлично настроены.
   * *Как использовать в v2*: Импортировать глобальные переменные темы.
   * *Зависимости*: Нет.

9. **Server configuration**
   * *Исходный файл*: [server.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/server.js) (строки 1-133)
   * *Причина*: Настройки HTTP-сервера, SSL и поллинга корректны.
   * *Как использовать в v2*: Оставить без изменений.
   * *Зависимости*: Node.js `https` module.

10. **OpenAI integration**
    * *Исходный файл*: [server.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/server.js) (строки 674-774)
    * *Причина*: GPT-5.5-pro работает без нареканий.
    * *Как использовать в v2*: Использовать `callOpenAIAPI`.
    * *Зависимости*: OpenAI API Key.

---

## 2. ADAPT
Компоненты, требующие небольшой адаптации или доработки:

1. **Sphere integration (attention targets)**
   * *Исходный файл*: [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 2508-2535)
   * *Причина*: Фокусировка внимания сферы должна реагировать на новые элементы интерфейса v2.
   * *Как использовать в v2*: Заменить старые селекторы карточек в `querySelectorAll` на новые селекторы v2.
   * *Зависимости*: `crystal-canvas`, `attentionTarget`.

2. **Translations object**
   * *Исходный файл*: [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 26-378)
   * *Причина*: Необходим перевод новых элементов интерфейса v2.
   * *Как использовать в v2*: Добавить новые ключи в переводы для русского и английского языков.
   * *Зависимости*: Нет.

3. **Responsive styles (media queries)**
   * *Исходный файл*: [style.css](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/style.css) (строки 2800-3295)
   * *Причина*: Сетка Workspace v2 будет другой, правила адаптивности нужно скорректировать.
   * *Как использовать в v2*: Адаптировать брейкпоинты под новые блоки.
   * *Зависимости*: CSS design tokens.

---

## 3. REWRITE
Компоненты, которые будут спроектированы и написаны заново:

1. **Hero HTML/DOM structure**
   * *Исходный файл*: [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 44-128)
   * *Причина*: Нужно выделить разметку Hero в изолированный чистый контейнер, отделив его от Workspace.
   * *Как использовать в v2*: Переписать структуру в HTML с сохранением стилей.

2. **Hero input event handling & lifecycle**
   * *Исходный файл*: [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 3111-3126)
   * *Причина*: Логика отправки ввода из Hero должна бесшовно передавать управление стейт-машине v2.
   * *Как использовать в v2*: Привязать события к `handleHeroSend` через новый стейт-менеджер.

3. **Discovery UI**
   * *Исходный файл*: [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 142-207)
   * *Причина*: В v2 Discovery UI расширяется, требуется более элегантное разделение на шаги.
   * *Как использовать в v2*: Создать новый чистый CSS и DOM контейнер для Discovery.

4. **Discovery state machine**
   * *Исходный файл*: [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 2710-2790)
   * *Причина*: Текущая функция `setDiscoveryState` оперирует прямыми манипуляциями DOM, что не масштабируется. Нужна декларативная стейт-машина.
   * *Как использовать в v2*: Написать класс `StateMachine` для управления переходами.

---

## 4. REMOVE
Устаревшие компоненты, полностью исключаемые из CreateMind v2:

1. **Robot Cinematic sequence & Cinematic Story**
   * *Исходный файл*: [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 2356-2448)
   * *Причина*: Сценарий «Новое сообщение клиента» с жестко зашитыми таймаутами больше не актуален.
   * *Исключение*: Полностью удалить логику и таймеры.

2. **Старый Workspace**
   * *Исходный файл*: [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 210-367)
   * *Причина*: Демонстрационный Workspace конфликтует с Discovery.
   * *Исключение*: Удалить DOM-блоки `.workspace-grid` и workflow panels.

3. **CRM demo**
   * *Исходный файл*: [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 2072-2115)
   * *Причина*: Фейковая CRM-активность удаляется.
   * *Исключение*: Полностью очистить логику подмены текста.

4. **Agent cards**
   * *Исходный файл*: [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 230-316)
   * *Причина*: Карты агентов будут заменены на новый интерактивный бэклог.
   * *Исключение*: Удалить из разметки.

---

## 5. Backend Reuse
* **Что переносится**: API Responses-интеграция с GPT-5.5-pro, серверный роутинг статики и webhook-обработчики.
* **Что удаляется**: Устаревшие эндпоинты `/api/chat` (ИИ-Архитектор) и вызовы Gemini.

## 6. Frontend Reuse
* **Что переносится**: Рендеринг сферы на Canvas, модуль `LanguageManager`, глобальная дизайн-система токенов (Glassmorphism).

## 7. Visual Assets Reuse
* **Что переносится**: Все фоновые 3D-изображения, сфера, логотип и шрифты.

---

## 8. Migration Risks
1. **Проблемы с кэшированием**: Внедрение новых классов и структуры UI требует жесткого сброса кэша через cache-busting.
2. **Асинхронные утечки**: При прерывании запросов старые таймеры `setTimeout` могут продолжать обновлять DOM. Требуется строгая очистка таймеров при переходах стейт-машины.

---

## 9. Recommended Build Order
1. **Шаг 1**: Удалить разметку Legacy Workspace и CRM demo из `index.html`.
2. **Шаг 2**: Очистить неиспользуемую JS-логику симулятора и cinematic таймеров в `app.js`.
3. **Шаг 3**: Удалить старые неиспользуемые CSS стили в `style.css`.
4. **Шаг 4**: Очистить бэкенд `server.js` от неиспользуемых эндпоинтов `/api/chat` и старого Gemini-кода.
5. **Шаг 5**: Разработать чистую стейт-машину (State Machine) для фронтенда в `app.js`.
6. **Шаг 6**: Создать новый UI Discovery (Thinking -> Understanding -> Clarifying -> Saved) на базе новой стейт-машины.
7. **Шаг 7**: Разработать интерфейс Project Workspace v2 для вывода спецификации и архитектуры проекта.
8. **Шаг 8**: Прописать переводы для новых элементов в `translations` и выполнить локальную верификацию.
