# User CRUD

CRUD-приложение для управления сущностью **Пользователь** (User), выполненное на Vue 3.

## Возможности

- 📋 Просмотр списка пользователей в виде таблицы
- ➕ Создание нового пользователя
- ✏️ Редактирование существующего
- 🗑️ Удаление с подтверждением
- 🔍 Поиск по имени
- 💾 Сохранение данных в `localStorage`

Сущность пользователя содержит обязательные поля **ID**, **Имя**, **Фамилия**,
**Дата рождения** и опциональные **E-mail** и **Город**. Возраст вычисляется
автоматически.

## Стек

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vite](https://vitejs.dev/) — сборка и dev-сервер
- [Pinia](https://pinia.vuejs.org/) — стейт-менеджер
- [Vuetify 3](https://vuetifyjs.com/) — Material Design компоненты

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
```

## Сборка

```bash
npm run build    # результат в dist/
npm run preview  # предпросмотр собранной версии
```

## Структура

```
src/
├── components/   # UserTable, UserFormDialog, ConfirmDialog
├── views/        # UsersView — главная страница
├── stores/       # Pinia-стор пользователей
├── models/       # модель User и хелперы
├── data/         # демо-данные
└── plugins/      # настройка Vuetify
```
