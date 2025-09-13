# Bank Project

Полнофункциональное банковское приложение с веб-интерфейсом на Next.js и API на FastAPI.

## Архитектура

- **Frontend**: Next.js 15 + TypeScript + TailwindCSS
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Аутентификация**: NextAuth.js v5 + Yandex OAuth
- **Контейнеризация**: Docker + Docker Compose

## Быстрый старт с Docker

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd Bank-project
```

### 2. Настройка переменных окружения

Скопируйте файл с примером переменных окружения:

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

### 3. Настройка Яндекс OAuth

1. Перейдите на https://oauth.yandex.ru/
2. Создайте новое приложение
3. В настройках приложения укажите:
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/yandex`
   - **Suggest Hostname**: `localhost:3000`
4. Скопируйте Client ID и Client Secret в `.env` файл

### 4. Запуск приложения

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down
```

### 5. Доступ к приложению

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432

## Разработка

### Запуск в режиме разработки

```bash
# Запуск только базы данных
docker-compose up -d postgres

# Запуск бэкенда локально
cd server
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload

# Запуск фронтенда локально
cd front
npm install
npm run dev
```

### Полезные команды Docker

```bash
# Пересборка образов
docker-compose build --no-cache

# Перезапуск конкретного сервиса
docker-compose restart frontend

# Просмотр логов конкретного сервиса
docker-compose logs -f backend

# Подключение к базе данных
docker-compose exec postgres psql -U bank_user -d bank_db

# Очистка всех контейнеров и образов
docker-compose down -v --rmi all
```

## Структура проекта

```
Bank-project/
├── front/                 # Next.js фронтенд
│   ├── src/
│   │   ├── app/          # App Router страницы
│   │   ├── components/   # React компоненты
│   │   └── lib/          # Утилиты и конфигурация
│   ├── Dockerfile
│   └── package.json
├── server/               # FastAPI бэкенд
│   ├── api/              # API endpoints
│   ├── crud/             # CRUD операции
│   ├── db/               # Модели и сессии БД
│   ├── schemas/          # Pydantic схемы
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml    # Docker Compose конфигурация
├── env.docker.example    # Пример переменных окружения
└── README.md
```

## API Endpoints

### Пользователи
- `GET /api/v1/users` - Получить всех пользователей
- `GET /api/v1/users/{id}` - Получить пользователя по ID
- `POST /api/v1/users` - Создать пользователя
- `PUT /api/v1/users/{id}` - Обновить пользователя
- `DELETE /api/v1/users/{id}` - Удалить пользователя

### Аутентификация
- `POST /api/v1/auth/sync` - Синхронизация пользователя из Яндекс OAuth

## Переменные окружения

### Frontend (.env)
- `NEXT_PUBLIC_API_URL` - URL бэкенд API
- `YANDEX_CLIENT_ID` - Client ID от Яндекс OAuth
- `YANDEX_CLIENT_SECRET` - Client Secret от Яндекс OAuth
- `AUTH_SECRET` - Секретный ключ для NextAuth
- `AUTH_URL` - URL фронтенда

### Backend
- `DATABASE_URL` - URL подключения к PostgreSQL
- `PYTHONPATH` - Путь для Python модулей

### Database
- `POSTGRES_DB` - Имя базы данных
- `POSTGRES_USER` - Пользователь базы данных
- `POSTGRES_PASSWORD` - Пароль базы данных

## Безопасность

- Все пароли хешируются
- JWT токены для аутентификации
- CORS настроен для локальной разработки
- Защищенные API endpoints
- Валидация данных с помощью Pydantic

## Мониторинг и логирование

- Логирование всех HTTP запросов в FastAPI
- Health check для PostgreSQL
- Автоматическое восстановление контейнеров

## Развертывание в продакшене

1. Обновите переменные окружения для продакшена
2. Измените CORS настройки в `server/main.py`
3. Обновите Redirect URI в Яндекс OAuth
4. Используйте внешнюю базу данных PostgreSQL
5. Настройте SSL сертификаты

## Поддержка

При возникновении проблем:

1. Проверьте логи: `docker-compose logs -f`
2. Убедитесь, что все переменные окружения настроены
3. Проверьте настройки Яндекс OAuth
4. Убедитесь, что порты 3000, 8000, 5432 свободны
