#!/usr/bin/env python3
"""
Скрипт для создания данных для вашего пользователя
"""

import asyncio
import uuid
import random
import os
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

# Устанавливаем URL базы данных для локального подключения
DATABASE_URL = "postgresql+asyncpg://bank_user:bank_password@localhost:5432/bank_db"

# Создаем движок и сессию
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def create_data_for_my_user(db: AsyncSession):
    """Создать данные для вашего пользователя"""
    
    # Получаем всех пользователей (должен быть только один - вы)
    result = await db.execute(
        text("SELECT id, name, email, yandex_id FROM users")
    )
    users = result.fetchall()
    
    if not users:
        print("❌ Пользователи не найдены!")
        print("💡 Сначала войдите в систему через Yandex OAuth")
        return False
    
    if len(users) > 1:
        print(f"⚠️  Найдено {len(users)} пользователей, но должен быть только один")
        print("👥 Пользователи:")
        for user in users:
            print(f"  - {user[1]} ({user[2]}) - Yandex ID: {user[3]}")
        print()
        print("💡 Оставьте только одного пользователя и запустите скрипт снова")
        return False
    
    user = users[0]
    user_id, name, email, yandex_id = user
    print(f"✅ Найден ваш пользователь: {name} ({email}) - Yandex ID: {yandex_id}")
    
    # Создаем карточки
    amounts = [
        5000, 15000, 25000, 50000, 75000, 100000, 150000, 200000, 300000, 500000, 
        750000, 1000000, 1500000, 2000000, 3000000
    ]
    
    created_cards = 0
    
    for i, amount in enumerate(amounts):
        days_ago = random.randint(1, 365)
        created_date = datetime.utcnow() - timedelta(days=days_ago)
        
        card_id = str(uuid.uuid4())
        
        await db.execute(
            text("""
                INSERT INTO cards (id, amount, user_id, "createdAt", "updatedAt")
                VALUES (:id, :amount, :user_id, :createdAt, :updatedAt)
            """),
            {
                "id": card_id,
                "amount": amount,
                "user_id": user_id,
                "createdAt": created_date,
                "updatedAt": created_date
            }
        )
        
        created_cards += 1
        print(f"📄 Создана карточка #{i+1}: {amount:,} руб (создана {created_date.strftime('%d.%m.%Y')})")
    
    await db.commit()
    
    # Обновляем updatedAt для некоторых карточек (имитируем недавние операции)
    result = await db.execute(
        text("SELECT id FROM cards WHERE user_id = :user_id ORDER BY RANDOM() LIMIT 5"),
        {"user_id": user_id}
    )
    recent_cards = result.fetchall()
    
    for card in recent_cards:
        await db.execute(
            text('UPDATE cards SET "updatedAt" = :updatedAt WHERE id = :id'),
            {
                "id": card[0],
                "updatedAt": datetime.utcnow() - timedelta(days=random.randint(1, 7))
            }
        )
    
    await db.commit()
    
    # Создаем транзакции
    transaction_types = ["deposit", "withdrawal", "transfer", "payment", "refund"]
    descriptions = [
        "Пополнение счета", "Снятие наличных", "Перевод на другую карту", "Оплата покупки", 
        "Возврат средств", "Зарплата", "Пенсия", "Стипендия", "Доход от инвестиций", "Комиссия банка"
    ]
    
    created_transactions = 0
    
    for i in range(20):
        amount = random.randint(1000, 100000)
        transaction_type = random.choice(transaction_types)
        description = random.choice(descriptions)
        
        days_ago = random.randint(1, 90)
        created_date = datetime.utcnow() - timedelta(days=days_ago)
        
        transaction_id = str(uuid.uuid4())
        
        await db.execute(
            text("""
                INSERT INTO transactions (id, amount, user_id, transaction_type, description, "createdAt", "updatedAt")
                VALUES (:id, :amount, :user_id, :transaction_type, :description, :createdAt, :updatedAt)
            """),
            {
                "id": transaction_id,
                "amount": amount,
                "user_id": user_id,
                "transaction_type": transaction_type,
                "description": description,
                "createdAt": created_date,
                "updatedAt": created_date
            }
        )
        
        created_transactions += 1
        print(f"💸 Создана транзакция #{i+1}: {amount:,} руб ({transaction_type}) - {description}")
    
    await db.commit()
    
    # Показываем итоговую статистику
    result = await db.execute(
        text("SELECT COUNT(*) FROM cards WHERE user_id = :user_id"),
        {"user_id": user_id}
    )
    cards_count = result.scalar()
    
    result = await db.execute(
        text("SELECT SUM(amount) FROM cards WHERE user_id = :user_id"),
        {"user_id": user_id}
    )
    total_amount = result.scalar() or 0
    
    result = await db.execute(
        text("SELECT COUNT(*) FROM transactions WHERE user_id = :user_id"),
        {"user_id": user_id}
    )
    transactions_count = result.scalar()
    
    print(f"\n🎉 Готово!")
    print(f"👤 Пользователь: {name} ({email})")
    print(f"💳 Карточек: {cards_count}")
    print(f"💰 Общая сумма: {total_amount:,} руб")
    print(f"📊 Средняя сумма на карте: {total_amount // cards_count if cards_count > 0 else 0:,} руб")
    print(f"💸 Транзакций: {transactions_count}")
    
    return True

async def main():
    """Основная функция"""
    print("🚀 Создаем данные для вашего пользователя")
    
    async with AsyncSessionLocal() as db:
        try:
            success = await create_data_for_my_user(db)
            if not success:
                print("❌ Не удалось создать данные")
        except Exception as e:
            print(f"❌ Ошибка: {e}")
            await db.rollback()
        finally:
            await db.close()

if __name__ == "__main__":
    asyncio.run(main())
