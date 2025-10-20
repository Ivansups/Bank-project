from fastapi import APIRouter
from crud.transactions_crud import get_one_user_transactions, get_all_users_transactions, create_transaction
from schemas.transaction_schema import TransactionCreate
from db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from typing import Annotated
from fastapi import Body

router = APIRouter()

@router.get("/transactions")
async def get_users_transactions(db: AsyncSession = Depends(get_db)):
    result = await get_all_users_transactions(db)
    return result

@router.post("/transactions")
async def create_transaction(transaction: Annotated[TransactionCreate, Body(description="The transaction to create"), Depends()], db: AsyncSession = Depends(get_db)):
    result = await create_transaction(transaction, db)
    return result

@router.get("/transactions/one_user/{user_id}")
async def get_one_transactions(user_id: str, db: AsyncSession = Depends(get_db)):
    result = await get_one_user_transactions(user_id, db)
    return result
