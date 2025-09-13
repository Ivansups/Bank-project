# Bank Project

Полнофункциональное банковское приложение с веб-интерфейсом на Next.js и API на FastAPI.

## 🚀 Быстрый старт

```bash
# Клонирование репозитория
git clone <repository-url>
cd Bank-project

# Настройка переменных окружения
cp env.docker.example .env
# Отредактируйте .env файл с вашими настройками

# Запуск всех сервисов
docker-compose up -d
```

**Доступ к приложению:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📚 Документация

Вся документация находится в папке [`docs/`](./docs/):

- [**📖 Полная документация**](./docs/INDEX.md) - Главная страница документации
- [**🐳 Docker Setup**](./docs/DOCKER.md) - Настройка с Docker
- [**🔐 Authentication**](./docs/AUTHENTICATION.md) - Система аутентификации
- [**🔧 Development Guide**](./docs/DEVELOPMENT.md) - Руководство по разработке
- [**📡 API Documentation**](./docs/API.md) - Документация API

## 🏗️ Архитектура

- **Frontend**: Next.js 15 + TypeScript + TailwindCSS
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL  
- **Аутентификация**: NextAuth.js v5 + Yandex OAuth
- **Контейнеризация**: Docker + Docker Compose

## 🛠️ Основные функции

- ✅ Аутентификация через Яндекс OAuth
- ✅ Защищенные маршруты
- ✅ RESTful API
- ✅ Управление пользователями
- ✅ Автоматическая синхронизация данных
- ✅ Docker контейнеризация

## 🔧 Разработка

```bash
# Запуск только базы данных
docker-compose up -d postgres

# Backend (в отдельном терминале)
cd server
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (в отдельном терминале)
cd front
npm install
npm run dev
```

## 📋 Требования

- Docker & Docker Compose
- Node.js 18+ (для локальной разработки)
- Python 3.11+ (для локальной разработки)
- PostgreSQL 15+ (для локальной разработки)

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📞 Поддержка

При возникновении проблем:

1. Изучите [документацию](./docs/INDEX.md)
2. Проверьте логи: `docker-compose logs -f`
3. Создайте issue в репозитории

---

**📖 [Перейти к полной документации](./docs/INDEX.md)**