# Docker Setup

Инструкции по настройке и запуску проекта с помощью Docker.

## 🚀 Быстрый старт

### 1. Настройка переменных окружения

```bash
cp env.docker.example .env
```

Отредактируйте `.env` файл:

```env
# Yandex OAuth Configuration
YANDEX_CLIENT_ID=your-yandex-client-id
YANDEX_CLIENT_SECRET=your-yandex-client-secret

# NextAuth Configuration
AUTH_SECRET=your-secret-key-here

# Database Configuration
POSTGRES_DB=bank_db
POSTGRES_USER=bank_user
POSTGRES_PASSWORD=bank_password
```

### 2. Запуск всех сервисов

```bash
docker-compose up -d
```

### 3. Проверка статуса

```bash
docker-compose ps
```

### 4. Доступ к приложению

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🔧 Настройка Яндекс OAuth

### 1. Создание приложения

1. Перейдите на https://oauth.yandex.ru/
2. Создайте новое приложение
3. В настройках укажите:
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/yandex`
   - **Suggest Hostname**: `localhost:3000`

### 2. Настройка доступов

**В разделе "Доступы":**
- ✅ **"Доступ к адресу электронной почты"** (login:email)
- ✅ **"Доступ к имени, фамилии, полу и дате рождения"** (login:info)

### 3. Получение ключей

Скопируйте Client ID и Client Secret в `.env` файл.

## 📊 Полезные команды

### Просмотр логов
```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Управление сервисами
```bash
# Пересборка образов
docker-compose build --no-cache

# Перезапуск сервисов
docker-compose restart

# Остановка
docker-compose down

# Полная очистка
docker-compose down -v --rmi all
```

### Разработка
```bash
# Запуск только базы данных
docker-compose up -d postgres

# Подключение к базе данных
docker-compose exec postgres psql -U bank_user -d bank_db
```

## 🐛 Решение проблем

### "invalid_scope"
**Решение**: Обновите настройки Яндекс OAuth (см. выше)

### "Connection refused"
**Решение**: Убедитесь, что все сервисы запущены:
```bash
docker-compose ps
```

### "Port already in use"
**Решение**: Остановите другие сервисы на портах 3000, 8000, 5432

### "Build failed"
**Решение**: Пересоберите образы:
```bash
docker-compose build --no-cache
```

## 🔐 Безопасность

- Все пароли и ключи хранятся в `.env` файле
- `.env` файл добавлен в `.gitignore`
- Используйте сильные пароли для продакшена