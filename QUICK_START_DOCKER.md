# Быстрый запуск с Docker

## 🚀 Запуск проекта

### 1. Убедитесь, что Docker запущен
```bash
docker --version
docker-compose --version
```

### 2. Запустите все сервисы
```bash
docker-compose up -d
```

### 3. Проверьте статус
```bash
docker-compose ps
```

### 4. Откройте приложение
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🔧 Настройка Яндекс OAuth

### 1. Обновите настройки в Яндекс OAuth
- Перейдите на https://oauth.yandex.ru/
- Найдите приложение с ID: `70c2cd90aac248daaef482c7b4c228da`
- В разделе "Доступы" добавьте:
  - ✅ `login:email`
  - ✅ `login:info`
- **Redirect URI**: `http://localhost:3000/api/auth/callback/yandex`
- **Suggest Hostname**: `localhost:3000`

### 2. Сохраните изменения
- Нажмите "Сохранить"
- Дождитесь активации (несколько минут)

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

### Перезапуск сервисов
```bash
# Все сервисы
docker-compose restart

# Конкретный сервис
docker-compose restart frontend
```

### Остановка
```bash
docker-compose down
```

### Полная очистка
```bash
docker-compose down -v --rmi all
```

## 🐛 Решение проблем

### Проблема: "invalid_scope"
**Решение**: Обновите настройки Яндекс OAuth (см. выше)

### Проблема: "Connection refused"
**Решение**: Убедитесь, что все сервисы запущены:
```bash
docker-compose ps
```

### Проблема: "Port already in use"
**Решение**: Остановите другие сервисы на портах 3000, 8000, 5432

### Проблема: "Build failed"
**Решение**: Пересоберите образы:
```bash
docker-compose build --no-cache
```

## 📁 Структура проекта

```
Bank-project/
├── .env                    # Переменные окружения (создается автоматически)
├── docker-compose.yml      # Конфигурация Docker
├── front/                  # Next.js фронтенд
├── server/                 # FastAPI бэкенд
└── docs/                   # Документация
```

## 🔐 Безопасность

- Все пароли и ключи хранятся в `.env` файле
- `.env` файл добавлен в `.gitignore`
- Используйте сильные пароли для продакшена
