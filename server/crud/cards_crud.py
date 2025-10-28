from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete, insert
from sqlalchemy.orm import selectinload
from typing import List, Optional
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime   

from db.models.cards_model import CardModel
from schemas.card_schema import CardCreate

async def create_card(card_data: CardCreate, db: AsyncSession) -> CardModel:
    """Создание новой карты"""
    new_card = CardModel(
        amount=card_data.amount,
        user_id=card_data.user_id
    )
    db.add(new_card)
    await db.commit()
    await db.refresh(new_card)
    return new_card

async def get_one_user_cards(user_id: str, db: AsyncSession) -> List[CardModel]:
    """Получение карт пользователя"""
    result = await db.execute(
        select(CardModel)
        .where(CardModel.user_id == user_id)
        .options(selectinload(CardModel.user))
    )
    return result.scalars().all()

async def get_all_users_cards(db: AsyncSession) -> List[CardModel]:
    """Получение всех карт"""
    result = await db.execute(
        select(CardModel).options(selectinload(CardModel.user))
    )
    return result.scalars().all()

async def delete_card(card_id: str, db: AsyncSession) -> bool:
    """Удаление карты"""
    result = await db.execute(
        delete(CardModel).where(CardModel.id == card_id)
    )
    await db.commit()
    return result.rowcount > 0

async def get_card_by_id(card_id: UUID, db: AsyncSession) -> CardModel:
    """Get card by ID"""
    result = await db.execute(
        select(CardModel)
        .where(CardModel.id == card_id)
        .options(selectinload(CardModel.user))
    )
    return result.scalar_one_or_none()