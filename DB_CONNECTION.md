# 🐘 Подключение к PostgreSQL в Docker

## 📋 Параметры подключения

```
Host:     localhost (или 127.0.0.1)
Port:     5432
Database: bank_db
Username: bank_user
Password: bank_password
```

## 🔧 Способы подключения

### 1. Через командную строку (psql)

```bash
# Если у тебя установлен PostgreSQL клиент:
psql -h localhost -p 5432 -U bank_user -d bank_db

# Или через Docker:
docker exec -it bank_postgres psql -U bank_user -d bank_db
```

### 2. DBeaver

1. Нажми `+` (Новое соединение)
2. Выбери **PostgreSQL**
3. Заполни:
   - **Host:** `localhost`
   - **Port:** `5432`
   - **Database:** `bank_db`
   - **Username:** `bank_user`
   - **Password:** `bank_password`
4. Нажми **Test Connection** → **OK**

### 3. pgAdmin

1. Right-click **Servers** → **Register** → **Server**
2. **General** tab:
   - **Name:** `Bank Project`
3. **Connection** tab:
   - **Host:** `localhost`
   - **Port:** `5432`
   - **Maintenance database:** `bank_db`
   - **Username:** `bank_user`
   - **Password:** `bank_password`
4. Save

### 4. DataGrip (JetBrains)

1. `+` → **Data Source** → **PostgreSQL**
2. Заполни:
   - **Host:** `localhost`
   - **Port:** `5432`
   - **Database:** `bank_db`
   - **User:** `bank_user`
   - **Password:** `bank_password`
3. **Test Connection** → **OK**

### 5. VS Code (SQLTools Extension)

1. Установи расширение **SQLTools** и **SQLTools PostgreSQL Driver**
2. `Cmd+Shift+P` → **SQLTools: Add New Connection**
3. Выбери **PostgreSQL**
4. Заполни параметры
5. **Test Connection** → **Save**

## 🔗 Connection String (для скриптов)

```
postgresql://bank_user:bank_password@localhost:5432/bank_db
```

### Для asyncpg (Python):

```python
DATABASE_URL = "postgresql+asyncpg://bank_user:bank_password@localhost:5432/bank_db"
```

### Для psycopg2 (Python):

```python
DATABASE_URL = "postgresql://bank_user:bank_password@localhost:5432/bank_db"
```

## 📊 Полезные команды

### Проверка подключения:

```bash
docker exec bank_postgres pg_isready -U bank_user -d bank_db
```

### Список таблиц:

```bash
docker exec bank_postgres psql -U bank_user -d bank_db -c "\dt"
```

### Количество пользователей:

```bash
docker exec bank_postgres psql -U bank_user -d bank_db -c "SELECT COUNT(*) FROM users;"
```

### Посмотреть всех пользователей:

```bash
docker exec bank_postgres psql -U bank_user -d bank_db -c "SELECT id, name, email FROM users;"
```

### Очистить таблицу users:

```bash
docker exec bank_postgres psql -U bank_user -d bank_db -c "TRUNCATE TABLE users CASCADE;"
```

## 🛑 Остановить/Запустить БД

```bash
# Остановить
docker stop bank_postgres

# Запустить
docker start bank_postgres

# Перезапустить
docker restart bank_postgres
```

## 🗑️ Очистить все данные и пересоздать БД

```bash
# Удалить контейнер и volume
docker stop bank_postgres
docker rm bank_postgres
docker volume rm bank-project_postgres_data

# Запустить заново (через docker-compose)
docker-compose up -d postgres
```

