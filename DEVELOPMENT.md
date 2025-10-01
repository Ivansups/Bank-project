# Development Guide

## Режимы работы

### Production mode (docker-compose.yml)
```bash
docker-compose up -d
```
- Frontend: production build, нет hot reload
- Backend: hot reload через volume
- Используется для тестирования production сборки

### Development mode (docker-compose.dev.yml) ✅ РЕКОМЕНДУЕТСЯ
```bash
docker-compose -f docker-compose.dev.yml up -d
```
- Frontend: dev mode с hot reload
- Backend: hot reload через volume
- Изменения в коде применяются автоматически
- Быстрая разработка

## Управление контейнерами

### Запуск dev режима
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Остановка
```bash
docker-compose -f docker-compose.dev.yml down
```

### Просмотр логов
```bash
# Все сервисы
docker-compose -f docker-compose.dev.yml logs -f

# Конкретный сервис
docker logs bank_frontend -f
docker logs bank_backend -f
docker logs bank_postgres -f
```

### Перезапуск после изменения docker-compose
```bash
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up -d --force-recreate
```

## Hot Reload

### Frontend
- Файлы монтируются через volume: `./front:/app`
- Изменения применяются автоматически
- Next.js Turbopack обеспечивает быструю перезагрузку

### Backend
- Файлы монтируются через volume: `./server:/app`
- Uvicorn запускается с флагом `--reload`
- Изменения применяются автоматически

## Доступ к сервисам

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Backend Docs: http://localhost:8000/docs
- PostgreSQL: localhost:5432

## Работа с базой данных

### Создание тестовых данных
```bash
cd server
source venv/bin/activate
python create_data_for_my_user.py
```

### Прямой доступ к PostgreSQL
```bash
docker exec -it bank_postgres psql -U bank_user -d bank_db
```

### Полезные SQL команды
```sql
-- Показать все таблицы
\dt

-- Показать пользователей
SELECT id, name, email, yandex_id FROM users;

-- Показать карты
SELECT id, amount, user_id FROM cards;

-- Показать транзакции
SELECT id, amount, transaction_type, user_id FROM transactions;

-- Очистить данные
DELETE FROM cards;
DELETE FROM transactions;
DELETE FROM users;
```

## Переменные окружения

Создай файл `.env` в корне проекта:
```env
YANDEX_CLIENT_ID=your-client-id
YANDEX_CLIENT_SECRET=your-client-secret
AUTH_SECRET=your-secret-key-here
```

## Troubleshooting

### Порт 3000 занят
```bash
lsof -ti:3000 | xargs kill -9
docker-compose -f docker-compose.dev.yml restart frontend
```

### Очистить старые cookies
1. Открой DevTools (F12)
2. Application → Cookies → http://localhost:3000
3. Удали все cookies
4. Или используй режим инкогнито

### Пересоздать БД
```bash
docker-compose -f docker-compose.dev.yml down
docker volume rm bank-project_postgres_data
docker-compose -f docker-compose.dev.yml up -d
```

### Frontend не обновляется
```bash
docker-compose -f docker-compose.dev.yml restart frontend
docker logs bank_frontend -f
```

### Backend не обновляется
```bash
docker-compose -f docker-compose.dev.yml restart backend
docker logs bank_backend -f
```

## Рекомендуемый workflow

1. **Запусти dev режим:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Следи за логами:**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f
   ```

3. **Редактируй код в IDE** — изменения применятся автоматически

4. **Проверяй результат в браузере** — http://localhost:3000

5. **По окончании работы:**
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

## Production build

Для тестирования production сборки:
```bash
docker-compose down
docker-compose up -d --build
```

Это займет больше времени, но даст точный результат как в production.

