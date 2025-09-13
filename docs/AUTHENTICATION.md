# Аутентификация

Документация по системе аутентификации в проекте.

## Обзор

Проект использует NextAuth.js v5 с Яндекс OAuth провайдером для аутентификации пользователей.

## Архитектура

```
Яндекс OAuth → NextAuth → FastAPI → PostgreSQL
```

## Настройка Яндекс OAuth

### 1. Создание приложения

1. Перейдите на https://oauth.yandex.ru/
2. Нажмите "Создать приложение"
3. Заполните форму:
   - **Название**: Bank App
   - **Описание**: Банковское приложение
   - **Платформы**: Веб-сервисы

### 2. Настройка Redirect URI

В поле "Redirect URI" укажите:
- **Для разработки**: `http://localhost:3000/api/auth/callback/yandex`
- **Для продакшена**: `https://yourdomain.com/api/auth/callback/yandex`

В поле "Suggest Hostname" укажите:
- **Для разработки**: `localhost:3000`
- **Для продакшена**: `yourdomain.com`

### 3. Получение ключей

После создания приложения скопируйте:
- **Client ID**
- **Client Secret**

Добавьте их в файл `.env`:

```env
YANDEX_CLIENT_ID=your-client-id
YANDEX_CLIENT_SECRET=your-client-secret
```

## Поток аутентификации

1. Пользователь нажимает "Войти через Яндекс"
2. NextAuth перенаправляет на Яндекс OAuth
3. Пользователь авторизуется в Яндексе
4. Яндекс перенаправляет обратно с кодом авторизации
5. NextAuth обменивает код на токен доступа
6. NextAuth получает данные пользователя от Яндекса
7. Данные пользователя синхронизируются с FastAPI
8. Пользователь перенаправляется в приложение

## Синхронизация с бэкендом

При успешной аутентификации NextAuth автоматически вызывает endpoint `/api/v1/auth/sync` для синхронизации данных пользователя с базой данных.

### Данные пользователя

```typescript
{
  yandex_id: string;    // ID пользователя в Яндексе
  email: string;        // Email пользователя
  name: string;         // Имя пользователя
  avatar?: string;      // URL аватара
}
```

## Защита маршрутов

### Next.js Middleware

Middleware автоматически защищает все маршруты, кроме публичных:

```typescript
const publicRoutes = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/api/auth/signin',
  '/api/auth/signout',
  '/api/auth/callback'
];
```

### FastAPI Endpoints

Все API endpoints требуют аутентификации (кроме `/api/v1/auth/sync`).

## Переменные окружения

### Frontend

```env
AUTH_SECRET=your-secret-key-here
YANDEX_CLIENT_ID=your-yandex-client-id
YANDEX_CLIENT_SECRET=your-yandex-client-secret
AUTH_URL=http://localhost:3000
```

### Backend

```env
DATABASE_URL=postgresql://user:password@host:port/database
```

## Безопасность

- Все пароли хешируются
- JWT токены для сессий
- CORS настроен для локальной разработки
- Валидация данных с помощью Pydantic
- Защита от CSRF атак

## Отладка

### Проверка сессии

```typescript
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();
console.log("Session:", session);
console.log("Status:", status);
```

### Логи NextAuth

Добавьте в `.env`:

```env
NEXTAUTH_DEBUG=true
```

### Проверка API

```bash
curl -X GET http://localhost:8000/api/v1/users \
  -H "Authorization: Bearer your-token"
```

## Частые проблемы

### 1. "Invalid redirect URI"

Убедитесь, что Redirect URI в Яндекс OAuth точно совпадает с настройками в приложении.

### 2. "Client ID not found"

Проверьте, что `YANDEX_CLIENT_ID` правильно указан в `.env` файле.

### 3. "CORS error"

Убедитесь, что CORS настроен в FastAPI для вашего домена.

### 4. "Database connection error"

Проверьте, что PostgreSQL запущен и `DATABASE_URL` правильный.
