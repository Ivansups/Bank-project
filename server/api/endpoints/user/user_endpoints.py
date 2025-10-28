from typing import Annotated
from fastapi import APIRouter, Depends, Path, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from schemas.user_schema import UserCreate, UserUpdate
from crud.users_crud import create_user, get_user, get_users, update_user, delete_user, sync_yandex_user, check_user_data_is_valid
from db.session import get_db

router = APIRouter()

@router.post("/")
async def create_user_endpoint(user: UserCreate, db: AsyncSession = Depends(get_db)):
    """Create a new user"""
    result = await create_user(user, db)
    return result

@router.get("/{user_id}")
async def get_user_endpoint(
    user_id: Annotated[UUID, Path(description="The id of the user to get")], 
    db: AsyncSession = Depends(get_db)
):
    """Get a user by id"""
    result = await get_user(str(user_id), db)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result

@router.get("/")
async def get_users_endpoint(db: AsyncSession = Depends(get_db)):
    """Get all users"""
    result = await get_users(db)
    return result

@router.get("/check-user-data-is-valid/{user_id}")
async def check_user_data_is_valid_endpoint(
    user_id: Annotated[UUID, Path(description="The id of the user to check")], 
    db: AsyncSession = Depends(get_db)
):
    """Check if user data is valid"""
    result = await check_user_data_is_valid(str(user_id), db)
    return result

@router.put("/{user_id}")
async def update_user_endpoint(
    user_id: Annotated[UUID, Path(description="The id of the user to update")], 
    user: UserUpdate, 
    db: AsyncSession = Depends(get_db)
):
    """Update a user by id"""
    result = await update_user(str(user_id), user, db)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result

@router.delete("/{user_id}")
async def delete_user_endpoint(
    user_id: Annotated[UUID, Path(description="The id of the user to delete")], 
    db: AsyncSession = Depends(get_db)
):
    """Delete a user by id"""
    result = await delete_user(str(user_id), db)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}