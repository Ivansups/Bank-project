# API Documentation

Документация по API endpoints FastAPI бэкенда.

## Базовый URL

- **Разработка**: `http://localhost:8000`
- **Продакшен**: `https://yourdomain.com`

## Аутентификация

Все endpoints (кроме `/api/v1/auth/sync`) требуют аутентификации.

## Endpoints

### Пользователи

#### Получить всех пользователей

```http
GET /api/v1/users
```

**Ответ:**
```json
[
  {
    "id": "uuid",
    "yandex_id": "string",
    "name": "string",
    "email": "string",
    "avatar": "string",
    "isAdmin": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Получить пользователя по ID

```http
GET /api/v1/users/{user_id}
```

**Параметры:**
- `user_id` (UUID) - ID пользователя

**Ответ:**
```json
{
  "id": "uuid",
  "yandex_id": "string",
  "name": "string",
  "email": "string",
  "avatar": "string",
  "isAdmin": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Создать пользователя

```http
POST /api/v1/users
```

**Тело запроса:**
```json
{
  "name": "string",
  "email": "string"
}
```

**Ответ:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "isAdmin": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Обновить пользователя

```http
PUT /api/v1/users/{user_id}
```

**Параметры:**
- `user_id` (UUID) - ID пользователя

**Тело запроса:**
```json
{
  "name": "string",
  "email": "string"
}
```

**Ответ:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "isAdmin": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Удалить пользователя

```http
DELETE /api/v1/users/{user_id}
```

**Параметры:**
- `user_id` (UUID) - ID пользователя

**Ответ:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "isAdmin": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Аутентификация

#### Синхронизация пользователя из Яндекс OAuth

```http
POST /api/v1/auth/sync
```

**Тело запроса:**
```json
{
  "yandex_id": "string",
  "email": "string",
  "name": "string",
  "avatar": "string"
}
```

**Ответ:**
```json
{
  "id": "uuid",
  "yandex_id": "string",
  "name": "string",
  "email": "string",
  "avatar": "string",
  "isAdmin": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Коды ответов

- `200` - Успешный запрос
- `201` - Ресурс создан
- `400` - Неверный запрос
- `401` - Не авторизован
- `404` - Ресурс не найден
- `422` - Ошибка валидации
- `500` - Внутренняя ошибка сервера

## Обработка ошибок

### Формат ошибки

```json
{
  "detail": "Описание ошибки"
}
```

### Примеры ошибок

#### 400 Bad Request
```json
{
  "detail": "Invalid user data"
}
```

#### 401 Unauthorized
```json
{
  "detail": "Not authenticated"
}
```

#### 404 Not Found
```json
{
  "detail": "User not found"
}
```

#### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

## Интерактивная документация

FastAPI автоматически генерирует интерактивную документацию:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Тестирование API

### С помощью curl

```bash
# Получить всех пользователей
curl -X GET http://localhost:8000/api/v1/users

# Создать пользователя
curl -X POST http://localhost:8000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### С помощью Python

```python
import requests

# Получить всех пользователей
response = requests.get("http://localhost:8000/api/v1/users")
print(response.json())

# Создать пользователя
data = {"name": "John Doe", "email": "john@example.com"}
response = requests.post("http://localhost:8000/api/v1/users", json=data)
print(response.json())
```

## Middleware

### CORS

Настроен для работы с фронтендом на `localhost:3000`.

### Логирование

Все HTTP запросы логируются с временем выполнения.

### Сжатие

Ответы сжимаются с помощью Gzip для файлов больше 1000 байт.

## Безопасность

- Валидация всех входящих данных
- Защита от SQL инъекций через SQLAlchemy
- CORS настроен для локальной разработки
- Логирование всех запросов
