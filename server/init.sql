-- Создание базы данных (если не существует)
-- База данных уже создается через переменные окружения PostgreSQL

-- Создание расширений
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    yandex_id VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar VARCHAR(500),
    "isAdmin" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_users_yandex_id ON users(yandex_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Создание функции для автоматического обновления updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Создание триггера для автоматического обновления updatedAt
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
