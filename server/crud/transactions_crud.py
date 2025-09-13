from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete, insert
from sqlalchemy.orm import selectinload
from typing import List, Optional
import uuid
from datetime import datetime

from db.models.transaction_model import TransactionModel
from schemas.transaction_schema import TransactionCreate, TransactionType

async def create_transaction(transaction_data: TransactionCreate, db: AsyncSession) -> TransactionModel:
    """Создание новой транзакции"""
    new_transaction = TransactionModel(
        amount=transaction_data.amount,
        user_id=transaction_data.user_id,
        transaction_type=transaction_data.transaction_type
    )
    match transaction_data.transaction_type:
        case TransactionType.ADD:
            new_transaction.amount += new_transaction.amount
        case TransactionType.SUB:
            new_transaction.amount -= new_transaction.amount
    db.add(new_transaction)
    await db.commit()
    await db.refresh(new_transaction)
    return new_transaction

async def get_one_user_transactions(user_id: str, db: AsyncSession) -> List[TransactionModel]:
    """Получение транзакций пользователя"""
    result = await db.execute(
        select(TransactionModel).where(TransactionModel.user_id == user_id).options(selectinload(TransactionModel.user))    
    )
    return result.scalars().all()
async def get_all_users_transactions(db: AsyncSession) -> List[TransactionModel]:
    """Получение транзакций пользователя"""
    result = await db.execute(
        select(TransactionModel).options(selectinload(TransactionModel.user))
    )
    return result.scalars().all()
