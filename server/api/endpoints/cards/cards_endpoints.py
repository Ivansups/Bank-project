from fastapi import APIRouter, Depends, Body, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated
from uuid import UUID

from schemas.card_schema import CardCreate
from db.session import get_db
from crud.cards_crud import get_one_user_cards, get_all_users_cards, create_card, delete_card, get_card_by_id

router = APIRouter()

@router.get("/")
async def get_user_cards(user_id: str, db: AsyncSession = Depends(get_db)):
    """Get all cards for a specific user"""
    result = await get_one_user_cards(user_id, db)
    return result

@router.get("/all")
async def get_all_cards(db: AsyncSession = Depends(get_db)):
    """Get all cards (admin only)"""
    result = await get_all_users_cards(db)
    return result

@router.post("/")
async def create_new_card(
    card: Annotated[CardCreate, Body(description="The card to create")], 
    db: AsyncSession = Depends(get_db)
):
    """Create new card"""
    result = await create_card(card, db)
    return result

@router.get("/{card_id}")
async def get_card(card_id: UUID, db: AsyncSession = Depends(get_db)):
    """Get card by ID"""
    result = await get_card_by_id(card_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Card not found")
    return result

@router.delete("/{card_id}")
async def delete_existing_card(card_id: UUID, db: AsyncSession = Depends(get_db)):
    """Delete card"""
    result = await delete_card(card_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Card not found")
    return {"message": "Card deleted successfully"}