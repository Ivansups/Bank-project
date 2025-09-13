from fastapi import APIRouter
from crud.transactions_crud import get_one_user_transactions, get_all_users_transactions, create_transaction
from schemas.transaction_schema import TransactionCreate
from db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from typing import Annotated
from fastapi import Body

# Создаем роутер
router = APIRouter()

@router.get("/transactions")
async def get_users_transactions(db: AsyncSession = Depends(get_db)):
    result = await get_all_users_transactions(db)
    return result

@router.post("/transactions")
async def create_transaction(transaction: Annotated[TransactionCreate, Body(description="The transaction to create"), Depends()], db: AsyncSession = Depends(get_db)):
    result = await create_transaction(transaction, db)
    return result

@router.get("/transactions/{transaction_id}")
async def get_transaction(transaction_id: str, db: AsyncSession = Depends(get_db)):
    """Get transaction by ID"""
    result = await get_transaction(transaction_id, db)
    return result

@router.post("/transactions/transfer")
async def transfer_money():
    """Transfer money between accounts"""
    # TODO: Implement money transfer
    return {"message": "Money transfer - to be implemented"}

@router.get("/transactions/history")
async def get_transaction_history():
    """Get transaction history with filters"""
    # TODO: Implement transaction history with filters
    return {"message": "Transaction history - to be implemented"}
