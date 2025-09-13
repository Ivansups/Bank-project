# Bank App Frontend

Веб-приложение для банковского сервиса, построенное на Next.js с NextAuth и TailwindCSS.

## Технологии

- **Next.js 15** - React фреймворк с App Router
- **TypeScript** - типизированный JavaScript
- **TailwindCSS** - utility-first CSS фреймворк
- **NextAuth.js v5** - современная аутентификация для Next.js
- **Yandex OAuth** - авторизация через Яндекс
- **React Hook Form** - управление формами
- **Zod** - валидация схем
- **Headless UI** - доступные UI компоненты
- **Heroicons** - иконки

## Установка и запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Скопируйте файл `env.example` в `.env` и настройте переменные:

```bash
cp env.example .env
```

Отредактируйте `.env`:

```env
# NextAuth Configuration (v5)
AUTH_SECRET=your-secret-key-here
AUTH_URL=http://localhost:3000

# Yandex OAuth Configuration
YANDEX_CLIENT_ID=your-yandex-client-id
YANDEX_CLIENT_SECRET=your-yandex-client-secret

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Структура проекта

```
front/
├── src/
│   ├── app/                    # App Router страницы
│   │   ├── auth/              # Страницы аутентификации
│   │   │   ├── signin/        # Страница входа
│   │   │   └── signup/        # Страница регистрации
│   │   ├── dashboard/         # Панель управления
│   │   ├── api/               # API routes
│   │   │   └── auth/          # NextAuth API routes
│   │   ├── layout.tsx         # Корневой layout
│   │   └── page.tsx           # Главная страница
│   ├── components/            # React компоненты
│   │   └── providers/         # Провайдеры контекста
│   └── lib/                   # Утилиты и конфигурация
│       └── auth.ts            # Конфигурация NextAuth
├── public/                    # Статические файлы
├── tailwind.config.ts         # Конфигурация TailwindCSS
├── next.config.js             # Конфигурация Next.js
└── package.json               # Зависимости проекта
```

## Функциональность

### Аутентификация
- Авторизация через Яндекс OAuth
- Защищенные маршруты
- Управление сессиями
- Статус администратора

### UI/UX
- Адаптивный дизайн
- Современный интерфейс
- Темная/светлая тема (готово к добавлению)
- Анимации и переходы

### Интеграция с API
- Подключение к FastAPI backend
- Обработка ошибок
- Типизированные запросы

## Доступные скрипты

```bash
# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен сборки
npm start

# Линтинг кода
npm run lint

# Проверка типов TypeScript
npm run type-check
```

## Страницы

- `/` - Главная страница (лендинг)
- `/auth/signin` - Страница авторизации через Яндекс
- `/dashboard` - Панель управления (требует аутентификации)

## API Routes

- `/api/auth/[...nextauth]` - NextAuth API endpoints

## Настройка Яндекс OAuth

Для работы авторизации через Яндекс необходимо:

1. **Создать приложение в Яндекс OAuth**:
   - Перейдите на https://oauth.yandex.ru/
   - Создайте новое приложение
   - Укажите callback URL: `http://localhost:3000/api/auth/callback/yandex`

2. **Получить ключи**:
   - Скопируйте Client ID и Client Secret
   - Добавьте их в `.env`

## Интеграция с Backend

Приложение настроено для работы с FastAPI backend:

1. **Аутентификация**: NextAuth v5 с Яндекс OAuth провайдером
2. **API запросы**: Используется axios для HTTP запросов
3. **Статус администратора**: Автоматически определяется по email
4. **Современный подход**: Использует новейшие возможности NextAuth v5

## Разработка

### Добавление новых страниц

1. Создайте папку в `src/app/`
2. Добавьте `page.tsx` файл
3. Экспортируйте React компонент по умолчанию

### Добавление новых компонентов

1. Создайте файл в `src/components/`
2. Используйте TypeScript для типизации
3. Применяйте TailwindCSS для стилизации

### Работа с формами

Используйте React Hook Form с Zod валидацией:

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
})
```

## Безопасность

- Все формы защищены от CSRF атак
- Пароли хешируются на backend
- JWT токены для аутентификации
- Защищенные API routes

## Производительность

- Server-side rendering (SSR)
- Статическая генерация где возможно
- Оптимизация изображений
- Code splitting
- Lazy loading компонентов

## Развертывание

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Деплой автоматически при push в main

### Другие платформы

```bash
npm run build
npm start
```

## Поддержка браузеров

- Chrome (последние 2 версии)
- Firefox (последние 2 версии)
- Safari (последние 2 версии)
- Edge (последние 2 версии)