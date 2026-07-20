# CreateMind v1 Code Audit

В данном документе проведен аудит текущей кодовой базы CreateMind v1 с целью выявления неиспользуемого кода, конфликтующих обработчиков и определения компонентов, которые будут переиспользованы или переписаны в версии v2.

---

## 1. Current Architecture
Текущая кодовая база построена на монолитной клиент-серверной архитектуре без сторонних фреймворков сборки:
* **Frontend**: `index.html` (разметка), `style.css` (стилизация) и `app.js` (интерактивность, рендеринг 3D-сферы на Canvas, WebSpeech API, управление локализацией).
* **Backend**: `server.js` (Node.js HTTP-сервер, обслуживающий Telegram Webhook, Telegram Polling, а также проксирующий запросы к OpenAI API и Gemini API).

---

## 2. Hero
* **Файлы**: 
  * [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 44-128) — разметка стеклянного инпута ввода задачи и тегов быстрого выбора.
  * [style.css](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/style.css) (строки 350-520) — стили хедера, инпутов и тегов.
  * [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 3111-3180) — обработка ввода (`handleHeroSend`, голосовой ввод через Web Speech API).
* **Назначение**: Стартовая точка входа для пользователя, сбор текстовой формулировки задачи.
* **Текущий статус**: Активен, полностью заблокирован от визуальных изменений по условиям ТЗ.
* **Рекомендация**: **KEEP** (логика отправки данных в Discovery отличная, изменения не требуются).

---

## 3. AI Discovery
* **Файлы**:
  * [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 142-207) — контейнер `.ai-discovery-container` (карточка запроса, спиннер, факты, опросник, кнопка отправки ответов и панель ошибок).
  * [style.css](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/style.css) (строки 2140-2385, 2480-2540) — стили состояний спиннера, карточек опросников, кнопок-таблеток (pills).
  * [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 2619-3110) — логика переключения состояний (`setDiscoveryState`), анимации Thinking-статусов, рендеринг фактов и опросника.
* **Назначение**: Пошаговый сбор информации и понимание проекта с помощью ИИ.
* **Текущий статус**: Внедрен в продакшн, работает.
* **Рекомендация**: **KEEP / REVIEW** (основной каркас сохраняем; на следующих этапах расширим логику для вывода Архитектуры и Бэклога на базе ответов опросника).

---

## 4. Legacy Workspace
* **Файлы**:
  * [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 210-316) — сетка `.workspace-grid` с четырьмя старыми демо-картами.
  * [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 317-367) — старая секция спецификации Workflow.
  * [style.css](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/style.css) (строки 1500-1920) — стили карт воркспейса, старого чата и списков.
  * [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 1945-2570) — анонимный блок квиз-симулятора, ротация ИИ-агентов.
* **Назначение**: Устаревшая статичная демонстрация ИИ-сотрудников и CRM.
* **Текущий статус**: Скрыт через `.discovery-mode-active` при анализе, но физически присутствует в DOM.
* **Рекомендация**: **REMOVE** (полностью удалить разметку, стили и JS-логику симулятора в v2, чтобы очистить кодовую базу).

---

## 5. CRM Demo
* **Файлы**:
  * [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 217-226) — превью чата с CRM-сообщениями и SVG-волной.
  * [style.css](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/style.css) (строки 1700-1780) — стили CRM чата.
  * [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 2072-2115) — логика подмены текстов и эмуляции CRM активности.
* **Назначение**: Симуляция обработки лидов.
* **Текущий статус**: Скрыт.
* **Рекомендация**: **REMOVE** (удалить из разметки и JS).

---

## 6. Sphere and Cinematic
* **Файлы**:
  * [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 96-127) — контейнер 3D-сферы.
  * [style.css](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/style.css) (строки 1100-1300) — стилизация canvas-контейнера и свечений.
  * [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 760-1898) — математический рендеринг 3D-сферы (кристалла) на Canvas с отслеживанием мыши.
  * [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 2356-2448) — сценарий `startCinematicSequence` (мигания и анимация робота при входе).
* **Назначение**: Интерактивный 3D-визуал бренда.
* **Текущий статус**: Активен.
* **Рекомендация**: **KEEP** (сохранить без изменений, это ключевой премиальный элемент).

---

## 7. Localization
* **Файлы**:
  * [index.html](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/index.html) (строки 34-38) — переключатель RU/EN в Header.
  * [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 26-378) — объект словаря `translations`.
  * [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 419-465) — логика `LanguageManager` с проверкой `navigator.languages.some(startsWith('ru'))` и localStorage.
* **Назначение**: Двуязычный интерфейс (русский / английский).
* **Текущий статус**: Работает стабильно.
* **Рекомендация**: **KEEP / REVIEW** (система готова к v2, нужно лишь добавлять новые ключи переводов по мере разработки UI).

---

## 8. Discovery API
* **Файлы**:
  * [server.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/server.js) (строки 607-673) — обработчик `/api/discovery`.
  * [server.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/server.js) (строки 674-774) — функция `callOpenAIAPI` (интеграция GPT-5.5-pro через OpenAI Responses API).
* **Назначение**: Первичный бизнес-анализ задачи.
* **Текущий статус**: Активен.
* **Рекомендация**: **KEEP** (бэкенд готов к интеграции новых шагов v2).

---

## 9. Dead or Unused Code
* **Файлы**:
  * [server.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/server.js) (строки 295-358) — эндпоинт `/api/chat` (не используется в Discovery).
  * [server.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/server.js) (строки 359-520) — функция `runFallbackArchitect` (старый опросник спецификации).
  * [server.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/server.js) (строки 521-606) — интеграция Gemini API (не используется, перешли на GPT-5.5).
  * [app.js](file:///Users/andreidobrosvet/.gemini/antigravity/scratch/telegram-portfolio-app/app.js) (строки 2060-2158) — функция `runSimulation` и обработчики старых квизов.
* **Назначение**: Устаревшие части v1.
* **Текущий статус**: Не используется.
* **Рекомендация**: **REMOVE** (удалить для оптимизации кодовой базы перед внедрением v2).

---

## 10. Duplicate or Conflicting Logic
* **Фронтенд-логика раскрытия воркспейса**: 
  * Функция `expandWorkspace()` убирает класс `collapsed` с `#workspace`, но не активирует Discovery UI. Из-за этого при клике на сферу или кнопки «Смотреть решения» открывается пустой старый Workspace.
  * *Рекомендация*: **REWRITE** (в v2 клики по кнопкам должны вести на пустой или предзаполненный Discovery UI, старый воркспейс показываться не должен).
* **Логика перевода**: 
  * Внутри функций рендеринга графиков и 3D-сферы присутствуют ручные ветвления `(currentLang === 'en') ? ... : ...`. 
  * *Рекомендация*: **REVIEW** (перенести эти тексты в общий объект `translations`).

---

## 11. Safe to Reuse in v2
1. **3D-кристалл на Canvas** (`crystal-canvas`) — полностью готов к рендерингу в v2.
2. **LanguageManager** — стабильно работает, определяет языки, обрабатывает смену UI без сброса контекста AI.
3. **Бэкенд-интеграция GPT-5.5-pro** (`/api/discovery`) — отличная кодовая база для расширения функционала.
4. **CSS-переменные темы** (`style.css`) — поддерживают правильную цветовую гамму.

---

## 12. Risks
* **Кэширование статики в Telegram WebApp**: Любое изменение в JS/CSS требует обновления параметров версий в `index.html` (например, `?v=1.15`), иначе пользователи будут видеть некорректный UI.
* **Отказоустойчивость OpenAI API**: Responses API работает синхронно с долгим временем ожидания (~10-15 сек). Нужно предусмотреть обработку таймаутов на фронтенде во избежание бесконечного Thinking-состояния.
* **Неочищенные асинхронные таймеры**: Массив `discoveryTimers` очищается при повторном запуске Discovery, но если пользователь переключает вкладки или быстро отправляет повторные запросы, могут возникать гонки условий (race conditions) при отрисовке фактов.
