from typing import Annotated
from fastapi import APIRouter, Body, Depends, Path, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from schemas.user_schema import UserCreate, UserUpdate, UserSync
from crud.users_crud import create_user, get_user, get_users, update_user, delete_user, sync_yandex_user
from db.session import get_db

# Создаем роутер
router = APIRouter()

@router.post("/")
async def create_user_endpoint(user: UserCreate, db: AsyncSession = Depends(get_db)):
    """Create a new user"""
    return await create_user(user, db)

@router.get("/{user_id}")
async def get_user_endpoint(user_id: Annotated[UUID, Path(description="The id of the user to get")], db: AsyncSession = Depends(get_db)):
    """Get a user by id"""
    return await get_user(str(user_id), db)

@router.get("/")
async def get_users_endpoint(db: AsyncSession = Depends(get_db)):
    """Get all users"""
    return await get_users(db)

@router.put("/{user_id}")
async def update_user_endpoint(user_id: Annotated[UUID, Path(description="The id of the user to update")], user: UserUpdate, db: AsyncSession = Depends(get_db)):
    """Update a user by id"""
    return await update_user(str(user_id), user, db)

@router.delete("/{user_id}")
async def delete_user_endpoint(user_id: Annotated[UUID, Path(description="The id of the user to delete")], db: AsyncSession = Depends(get_db)):
    """Delete a user by id"""
    return await delete_user(str(user_id), db)