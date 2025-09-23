# Настройка Yandex OAuth для банковского приложения

## Шаги для получения Yandex OAuth credentials:

### 1. Перейдите в Yandex Developer Console
- Откройте https://oauth.yandex.ru/
- Войдите в свой аккаунт Yandex (sup45gg-1@yandex.ru)

### 2. Создайте новое приложение
- Нажмите "Создать приложение"
- Заполните форму:
  - **Название**: Bank App
  - **Описание**: Банковское приложение для управления финансами
  - **Платформы**: Web-сервис
  - **Callback URL**: http://localhost:3000/api/auth/callback/yandex

### 3. Получите credentials
После создания приложения вы получите:
- **Client ID** (ID приложения)
- **Client Secret** (Пароль приложения)

### 4. Настройте переменные окружения
Создайте файл `.env` в корне проекта:

```bash
# Yandex OAuth Configuration
YANDEX_CLIENT_ID=ваш-client-id-здесь
YANDEX_CLIENT_SECRET=ваш-client-secret-здесь

# NextAuth Configuration  
AUTH_SECRET=bank-auth-secret-key-2024
```

### 5. Перезапустите Docker
```bash
docker compose down
docker compose up --build
```

## Важные моменты:

1. **Callback URL** должен быть точно: `http://localhost:3000/api/auth/callback/yandex`
2. **Client ID** и **Client Secret** должны быть реальными, не тестовыми
3. **AUTH_SECRET** должен быть уникальной строкой (можно сгенерировать: `openssl rand -base64 32`)

## Проверка работы:
После настройки откройте http://localhost:3000 и попробуйте войти через Yandex.
