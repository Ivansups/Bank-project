from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.user_schema import UserSync
from crud.users_crud import sync_yandex_user, is_user_admin
from db.session import get_db

# Создаем роутер
router = APIRouter()

@router.post("/sync")
async def sync_yandex_user_endpoint(user_data: UserSync, db: AsyncSession = Depends(get_db)):
    """Sync Yandex user data with backend"""
    try:
        return await sync_yandex_user(user_data, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/check-admin")
async def check_admin_status(user_id: Annotated[str, Query(description="User ID to check admin status")], db: AsyncSession = Depends(get_db)):
    """Check if user is admin"""
    try:
        is_admin = await is_user_admin(user_id, db)
        return {"isAdmin": is_admin}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
