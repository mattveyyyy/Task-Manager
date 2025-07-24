
# 🗂 Task Manager — менеджер задач

## 📌 Описание

**Task Manager** — это удобное приложение для управления задачами в стиле канбан-доски с системой пользователей. Проект состоит из frontend и backend части, реализованных с использованием современных технологий и архитектурных подходов.

---

## ✅ Реализованный функционал

### Фронтенд:
- Главная страница с таблицей пользователей `/`
- Страница создания пользователя `/user/create`
- Страница редактирования пользователя `/user/:id/edit`
- Страница логина `/login`
- Перенаправление и защита маршрутов в зависимости от авторизации
- Навигационное меню слева
- Хедер сверху (отображается на всех страницах, кроме логина)
- Формы с валидацией (Formik + Zod)
- После создания или редактирования пользователя — редирект на главную
- Главная таблица: обязательные столбцы `id`, `email`

### Kanban (управление задачами):
- Создание, редактирование и удаление задач
- Drag-and-drop задач между статусами
- Визуальные теги и цветовая маркировка
- Хранение задач в `localStorage`

---

## ⚙️ Fake API (для задач)

```http
GET    /tasks             // Получение всех задач  
GET    /tasks/:id         // Получение задачи по ID  
POST   /tasks             // Создание задачи  
PATCH  /tasks/:id         // Обновление задачи  
DELETE /tasks/:id         // Удаление задачи  
GET    /tasks?query=...   // Поиск задач по названию
```

Все данные сохраняются в `localStorage`.

---

## 📡 Реальное REST API (Backend NestJS)

### 🔐 Auth

```http
POST   /api/v1/auth/login      // Авторизация  
POST   /api/v1/auth/logout     // Выход из системы  
GET    /api/v1/auth/me         // Получить текущего пользователя
```

### 👤 Users

```http
GET    /api/v1/users           // Список всех пользователей  
POST   /api/v1/users           // Создание пользователя  
GET    /api/v1/users/{id}      // Получить пользователя по ID  
PATCH  /api/v1/users/{id}      // Обновление пользователя  
DELETE /api/v1/users/{id}      // Удаление пользователя
```

---

## 🛠 Используемые технологии

### Фронтенд:
- **React**, **TypeScript**, **Vite**
- **MUI (Material UI)**, **Redux Toolkit**
- **React Router DOM**, **React Query**
- **Formik + Zod**
- **@hello-pangea/dnd**
- **Lucide-react**, **Storybook**
- **ESLint + Prettier**, **CSS Modules**
- **Path Aliases** (`@entities`, `@shared` и др.)

### Бэкенд:
- **NestJS**, **Express**
- **TypeScript**
- **JWT**, **Zod**
- **Swagger**, **CORS**

---

## 🧱 Архитектура (Feature-Sliced Design)

```
app/         — инициализация приложения, роутинг, стор, темы  
entities/    — бизнес-логика (например, users, tasks)  
features/    — отдельные функциональные блоки (формы и пр.)  
widgets/     — крупные UI-элементы (TaskBoard, Header, Sidebar)  
pages/       — страницы (Login, CreateUserPage, TaskBoardPage)  
shared/      — общие компоненты, утилиты и стили
```

---

## 🚀 Инструкция по запуску

1. Клонировать репозиторий:

```bash
git clone https://github.com/mattveyyyy/Task-Manager.git
cd Task-Manager
```

2. Установить зависимости:

```bash
npm install
```

3. Запустить проект:

```bash
npm run dev
```

📍 Оба сервера (frontend и backend) запускаются **из корня проекта**.

- Frontend доступен по: [http://localhost:5173](http://localhost:5173)
- Swagger: [http://localhost:4000/api#/api/v1](http://localhost:4000/api#/api/v1)

---
