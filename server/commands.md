```bash
# Создаем миграцию, применение будет сразу в контейнере
# Изменение направлено на стабильность работы БД
alembic revision --autogenerate -m "Описание изменений"
docker-compose exec server alembic revision --autogenerate -m "Работа над транзакциями 1"
```