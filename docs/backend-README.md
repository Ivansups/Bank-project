# Bank API Server

FastAPI сервер для мультиплатформенного банковского приложения.

## Установка и настройка

### 1. Активация виртуального окружения

```bash
# Активация виртуального окружения
source venv/bin/activate

# Или используйте скрипт
./activate.sh
```

### 2. Установка зависимостей

```bash
pip install -r requirements.txt
```

### 3. Запуск сервера

```bash
# Запуск в режиме разработки
uvicorn main:app --reload

# Запуск на определенном хосте и порту
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Доступные эндпоинты

- `GET /` - Главная страница API
- `GET /health` - Проверка состояния сервера
- `GET /docs` - Swagger UI документация
- `GET /redoc` - ReDoc документация

## Структура проекта

```
server/
├── venv/                 # Виртуальное окружение
├── api/                  # API эндпоинты
│   └── endpoints/
├── crud/                 # CRUD операции
├── db/                   # Настройки базы данных
├── schemas/              # Pydantic схемы
├── main.py              # Главный файл приложения
├── requirements.txt     # Зависимости Python
├── .gitignore          # Git ignore файл
├── activate.sh         # Скрипт активации окружения
└── README.md           # Документация
```

## Технологии

- **FastAPI** - современный веб-фреймворк для создания API
- **Uvicorn** - ASGI сервер для запуска FastAPI приложения
- **SQLAlchemy** - ORM для работы с базами данных
- **Alembic** - инструмент для миграций базы данных
- **Pydantic** - валидация данных и сериализация
- **asyncpg** - асинхронный драйвер для PostgreSQL
- **python-jose** - для работы с JWT токенами
- **passlib** - для хеширования паролей
- **pytest** - для тестирования

## Разработка

### Добавление новых зависимостей

```bash
# Активируйте виртуальное окружение
source venv/bin/activate

# Установите новую зависимость
pip install package_name

# Обновите requirements.txt
pip freeze > requirements.txt
```

### Тестирование

```bash
# Запуск тестов
pytest

# Запуск тестов с покрытием
pytest --cov=.
```

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost/bank_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Поддержка платформ

API поддерживает:
- **Мобильные приложения** (iOS/Android)
- **Веб-приложения** (Next.js)
- **Десктопные приложения** (Electron, Tauri и др.)
