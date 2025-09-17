from fastapi import APIRouter, Depends, Body
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated
from schemas.card_schema import CardCreate, CardUpdate
from db.session import get_db
from crud.cards_crud import get_one_user_cards, get_all_users_cards, create_card, update_card, delete_card

# Создаем роутер
router = APIRouter()

@router.get("/cards")
async def get_user_cards(user_id: str, db: AsyncSession = Depends(get_db)):
    result = await get_one_user_cards(user_id, db)
    return result

@router.post("/cards")
async def create_new_card(card: Annotated[CardCreate, Body(description="The card to create")], db: AsyncSession = Depends(get_db)):
    """Create new card"""
    result = await create_card(card, db)
    return result

@router.get("/cards/{card_id}")
async def get_card(card_id: str, db: AsyncSession = Depends(get_db)):
    """Get card by ID"""
    result = await get_one_user_cards(card_id, db)
    return result

@router.put("/cards/{card_id}")
async def update_existing_card(card_id: str, card: Annotated[CardUpdate, Body(description="The card to update")], db: AsyncSession = Depends(get_db)):
    """Update card"""
    result = await update_card(card_id, card, db)
    return result

@router.delete("/cards/{card_id}")
async def delete_existing_card(card_id: str, db: AsyncSession = Depends(get_db)):
    """Delete card"""
    result = await delete_card(card_id, db)
    return result
