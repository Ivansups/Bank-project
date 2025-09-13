# Development Guide

Руководство по разработке проекта.

## Требования

- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Docker (опционально)

## Настройка окружения разработки

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd Bank-project
```

### 2. Настройка базы данных

#### С Docker (рекомендуется)

```bash
docker-compose up -d postgres
```

#### Локальная установка

1. Установите PostgreSQL
2. Создайте базу данных:

```sql
CREATE DATABASE bank_db;
CREATE USER bank_user WITH PASSWORD 'bank_password';
GRANT ALL PRIVILEGES ON DATABASE bank_db TO bank_user;
```

### 3. Настройка бэкенда

```bash
cd server

# Создание виртуального окружения
python -m venv venv

# Активация виртуального окружения
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Установка зависимостей
pip install -r requirements.txt

# Запуск сервера
uvicorn main:app --reload
```

### 4. Настройка фронтенда

```bash
cd front

# Установка зависимостей
npm install

# Настройка переменных окружения
cp env.example .env

# Запуск в режиме разработки
npm run dev
```

## Структура проекта

```
Bank-project/
├── docs/                   # Документация
├── front/                  # Next.js фронтенд
│   ├── src/
│   │   ├── app/           # App Router страницы
│   │   ├── components/    # React компоненты
│   │   └── lib/           # Утилиты и конфигурация
│   ├── Dockerfile
│   └── package.json
├── server/                 # FastAPI бэкенд
│   ├── api/               # API endpoints
│   ├── crud/              # CRUD операции
│   ├── db/                # Модели и сессии БД
│   ├── schemas/           # Pydantic схемы
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml      # Docker Compose конфигурация
└── env.docker.example      # Пример переменных окружения
```

## Конвенции кода

### Python (FastAPI)

- Используйте type hints
- Следуйте PEP 8
- Используйте async/await для I/O операций
- Документируйте функции с docstrings

```python
async def get_user(user_id: UUID, db: AsyncSession) -> UserModel | None:
    """Get user by ID from database.
    
    Args:
        user_id: User UUID
        db: Database session
        
    Returns:
        User model or None if not found
    """
    result = await db.execute(select(UserModel).where(UserModel.id == user_id))
    return result.scalar_one_or_none()
```

### TypeScript (Next.js)

- Используйте строгую типизацию
- Следуйте ESLint правилам
- Используйте функциональные компоненты
- Применяйте React Hook Form для форм

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const UserComponent: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};
```

## Тестирование

### Backend тесты

```bash
cd server
pytest
```

### Frontend тесты

```bash
cd front
npm test
```

## Отладка

### Backend

1. Используйте `print()` или `logging` для отладки
2. Проверьте логи FastAPI
3. Используйте интерактивную документацию на `/docs`

### Frontend

1. Используйте React DevTools
2. Проверьте консоль браузера
3. Используйте Next.js DevTools

## Git workflow

### Ветки

- `main` - основная ветка
- `develop` - ветка разработки
- `feature/*` - ветки для новых функций
- `bugfix/*` - ветки для исправления багов

### Коммиты

Используйте conventional commits:

```
feat: add user authentication
fix: resolve CORS issue
docs: update API documentation
style: format code with prettier
refactor: simplify user model
test: add unit tests for auth
```

## Добавление новых функций

### 1. Backend

1. Создайте модель в `db/models/`
2. Создайте схему в `schemas/`
3. Добавьте CRUD операции в `crud/`
4. Создайте endpoint в `api/endpoints/`
5. Добавьте тесты

### 2. Frontend

1. Создайте компонент в `components/`
2. Добавьте страницу в `app/`
3. Обновите API клиент в `lib/`
4. Добавьте типы в `types/`

## Производительность

### Backend

- Используйте async/await
- Оптимизируйте SQL запросы
- Используйте индексы в базе данных
- Кэшируйте часто используемые данные

### Frontend

- Используйте React.memo для компонентов
- Применяйте lazy loading
- Оптимизируйте изображения
- Используйте code splitting

## Безопасность

### Backend

- Валидируйте все входящие данные
- Используйте prepared statements
- Хешируйте пароли
- Настройте CORS правильно

### Frontend

- Санитизируйте пользовательский ввод
- Используйте HTTPS в продакшене
- Не храните секреты в коде
- Валидируйте формы

## Развертывание

### Локальное тестирование

```bash
docker-compose up -d
```

### Продакшен

1. Обновите переменные окружения
2. Настройте SSL сертификаты
3. Используйте внешнюю базу данных
4. Настройте мониторинг

## Полезные команды

### Docker

```bash
# Пересборка образов
docker-compose build --no-cache

# Просмотр логов
docker-compose logs -f

# Очистка
docker-compose down -v --rmi all
```

### Database

```bash
# Подключение к БД
docker-compose exec postgres psql -U bank_user -d bank_db

# Создание миграции
alembic revision --autogenerate -m "description"

# Применение миграций
alembic upgrade head
```

### Frontend

```bash
# Анализ bundle
npm run analyze

# Проверка типов
npm run type-check

# Линтинг
npm run lint
```
