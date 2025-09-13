# Bank Project Documentation

Добро пожаловать в документацию банковского проекта!

## 📚 Содержание

### Основные документы

- [**README**](./README.md) - Общий обзор проекта и быстрый старт
- [**Development Guide**](./DEVELOPMENT.md) - Руководство по разработке
- [**Docker Setup**](./DOCKER.md) - Настройка и запуск с Docker

### Компоненты

- [**Frontend**](./frontend-README.md) - Next.js приложение
- [**Backend**](./backend-README.md) - FastAPI сервер

### Функциональность

- [**Authentication**](./AUTHENTICATION.md) - Система аутентификации
- [**API Documentation**](./API.md) - Документация API endpoints

## 🚀 Быстрый старт

1. **Клонируйте репозиторий**
   ```bash
   git clone <repository-url>
   cd Bank-project
   ```

2. **Настройте переменные окружения**
   ```bash
   cp env.docker.example .env
   # Отредактируйте .env файл
   ```

3. **Запустите с Docker**
   ```bash
   docker-compose up -d
   ```

4. **Откройте приложение**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 🏗️ Архитектура

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   FastAPI       │    │   PostgreSQL    │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
│                 │    │                 │    │                 │
│ NextAuth +      │───▶│ SQLAlchemy +    │───▶│ User data       │
│ Яндекс OAuth    │    │ JWT validation  │    │ Sessions        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Технологии

### Frontend
- **Next.js 15** - React фреймворк
- **TypeScript** - типизированный JavaScript
- **TailwindCSS** - utility-first CSS
- **NextAuth.js v5** - аутентификация
- **Yandex OAuth** - авторизация

### Backend
- **FastAPI** - современный Python веб-фреймворк
- **SQLAlchemy** - ORM для работы с БД
- **PostgreSQL** - реляционная база данных
- **Pydantic** - валидация данных
- **Alembic** - миграции БД

### DevOps
- **Docker** - контейнеризация
- **Docker Compose** - оркестрация контейнеров

## 📋 Основные функции

- ✅ Аутентификация через Яндекс OAuth
- ✅ Защищенные маршруты
- ✅ RESTful API
- ✅ Управление пользователями
- ✅ Автоматическая синхронизация данных
- ✅ Docker контейнеризация
- ✅ Интерактивная документация API

## 🔧 Разработка

### Локальная разработка

```bash
# Запуск только БД
docker-compose up -d postgres

# Backend
cd server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd front
npm install
npm run dev
```

### Полезные команды

```bash
# Пересборка Docker образов
docker-compose build --no-cache

# Просмотр логов
docker-compose logs -f

# Подключение к БД
docker-compose exec postgres psql -U bank_user -d bank_db
```

## 🔐 Безопасность

- JWT токены для аутентификации
- Хеширование паролей
- CORS настройки
- Валидация данных
- Защита от CSRF атак

## 📊 Мониторинг

- Логирование HTTP запросов
- Health checks для сервисов
- Автоматическое восстановление контейнеров

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📞 Поддержка

При возникновении проблем:

1. Проверьте [Development Guide](./DEVELOPMENT.md)
2. Изучите [API Documentation](./API.md)
3. Проверьте логи: `docker-compose logs -f`
4. Создайте issue в репозитории

## 📄 Лицензия

Этот проект лицензирован под MIT License.

---

**Последнее обновление**: 2024
