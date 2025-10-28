from fastapi import APIRouter, Depends, Body, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated
from uuid import UUID

from schemas.transaction_schema import TransactionCreate
from db.session import get_db
from crud.transactions_crud import get_one_user_transactions, get_all_users_transactions, process_transaction

router = APIRouter()

@router.get("/")
async def get_all_transactions(db: AsyncSession = Depends(get_db)):
    """Get all transactions (admin only)"""
    result = await get_all_users_transactions(db)
    return result

@router.post("/")
async def create_new_transaction(
    transaction: Annotated[TransactionCreate, Body(description="The transaction to process")], 
    db: AsyncSession = Depends(get_db)
):
    """Create and process transaction atomically"""
    try:
        result = await process_transaction(transaction, db)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}")
async def get_user_transactions(user_id: UUID, db: AsyncSession = Depends(get_db)):
    """Get all transactions for a specific user"""
    result = await get_one_user_transactions(str(user_id), db)
    return result