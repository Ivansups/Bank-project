# Docker Setup

Инструкции по настройке и запуску проекта с помощью Docker.

## Быстрый старт

### 1. Настройка переменных окружения

```bash
cp env.docker.example .env
```

Отредактируйте `.env` файл с вашими настройками:

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

## Сервисы

- **postgres**: PostgreSQL база данных (порт 5432)
- **backend**: FastAPI приложение (порт 8000)
- **frontend**: Next.js приложение (порт 3000)

## Полезные команды

```bash
# Пересборка образов
docker-compose build --no-cache

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down

# Очистка всех данных
docker-compose down -v --rmi all
```

## Разработка

### Запуск только базы данных

```bash
docker-compose up -d postgres
```

### Подключение к базе данных

```bash
docker-compose exec postgres psql -U bank_user -d bank_db
```

## Переменные окружения

См. файл `env.docker.example` для полного списка переменных.
