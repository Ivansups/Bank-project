from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete, insert
from sqlalchemy.orm import selectinload
from typing import List, Optional
import uuid
from datetime import datetime

from db.models.transaction_model import TransactionModel, Status, TransactionType
from db.models.cards_model import CardModel
from schemas.transaction_schema import TransactionCreate
from fastapi import HTTPException

async def process_transaction(transaction_data: TransactionCreate, db: AsyncSession) -> TransactionModel:
    """Атомарная обработка транзакции - создание + обновление баланса + изменение статуса"""
    try:
        async with db.begin():
            # 1. Блокируем карту для избежания race condition
            card_result = await db.execute(
                select(CardModel)
                .where(CardModel.id == transaction_data.card_id)
                .with_for_update()  # Блокировка строки
            )
            card = card_result.scalar_one_or_none()
            
            if not card:
                raise HTTPException(status_code=404, detail="Card not found")
            
            # 2. Проверяем бизнес-логику для списания
            if (transaction_data.transaction_type == TransactionType.SUB and 
                card.amount < transaction_data.amount):
                raise HTTPException(status_code=400, detail="Insufficient funds")
            
            # 3. Обновляем баланс карты
            if transaction_data.transaction_type == TransactionType.ADD:
                card.amount += transaction_data.amount
            else:  # SUB
                card.amount -= transaction_data.amount
            
            # 4. Создаем транзакцию со статусом ACCEPT
            new_transaction = TransactionModel(
                amount=transaction_data.amount,
                user_id=transaction_data.user_id,
                card_id=transaction_data.card_id,
                transaction_type=transaction_data.transaction_type,
                status=Status.ACCEPT  # Сразу ставим ACCEPT, так как операция успешна
            )
            db.add(new_transaction)
            
            # Все операции в одной транзакции - коммит произойдет автоматически
            await db.commit()
            
            # Обновляем объект из БД
            await db.refresh(new_transaction)
            await db.refresh(card)
            
            return new_transaction
            
    except HTTPException:
        await db.rollback()
        raise
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"Transaction failed: {str(e)}")

async def get_one_user_transactions(user_id: str, db: AsyncSession) -> List[TransactionModel]:
    """Получение транзакций пользователя"""
    result = await db.execute(
        select(TransactionModel)
        .where(TransactionModel.user_id == user_id)
        .options(selectinload(TransactionModel.user))
    )
    return result.scalars().all()

async def get_all_users_transactions(db: AsyncSession) -> List[TransactionModel]:
    """Получение всех транзакций"""
    result = await db.execute(
        select(TransactionModel).options(selectinload(TransactionModel.user))
    )
    return result.scalars().all()