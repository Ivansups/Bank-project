from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from sqlalchemy.orm import selectinload
from typing import List, Optional
import uuid
from datetime import datetime

from db.models.user_model import UserModel
from db.models.admin_model import AdminModel
from schemas.user_schema import UserCreate, UserUpdate, UserSync


async def create_user(user_data: UserCreate, db: AsyncSession) -> UserModel:
    """Создание нового пользователя"""
    new_user = UserModel(
        name=user_data.name,
        email=user_data.email,
        isAdmin=user_data.isAdmin or False
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user


async def get_user(user_id: str, db: AsyncSession) -> Optional[UserModel]:
    """Получение пользователя по ID"""
    result = await db.execute(
        select(UserModel).where(UserModel.id == user_id)
    )
    return result.scalar_one_or_none()


async def get_user_by_email(email: str, db: AsyncSession) -> Optional[UserModel]:
    """Получение пользователя по email"""
    result = await db.execute(
        select(UserModel).where(UserModel.email == email)
    )
    return result.scalar_one_or_none()


async def get_users(skip: int = 0, limit: int = 100, db: AsyncSession = None) -> List[UserModel]:
    """Получение списка пользователей с пагинацией"""
    result = await db.execute(
        select(UserModel).offset(skip).limit(limit)
    )
    return result.scalars().all()


async def update_user(user_id: str, user_data: UserUpdate, db: AsyncSession) -> Optional[UserModel]:
    """Обновление пользователя"""
    result = await db.execute(
        select(UserModel).where(UserModel.id == user_id)
    )
    user = result.scalar_one_or_none()
    
    if not user:
        return None
    
    # Обновляем только переданные поля
    update_data = user_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    user.updatedAt = datetime.utcnow()
    await db.commit()
    await db.refresh(user)
    return user


async def delete_user(user_id: str, db: AsyncSession) -> bool:
    """Удаление пользователя"""
    result = await db.execute(
        delete(UserModel).where(UserModel.id == user_id)
    )
    await db.commit()
    return result.rowcount > 0


async def sync_yandex_user(user_data: UserSync, db: AsyncSession):
    """Синхронизация пользователя из Яндекс OAuth с базой данных"""
    # Ищем по email (приоритет) или yandex_id
    result_email = await db.execute(
        select(UserModel).where(UserModel.email == user_data.email)
    )
    existing_user = result_email.scalar_one_or_none()
    
    if not existing_user:
        result_yandex = await db.execute(
            select(UserModel).where(UserModel.yandex_id == user_data.yandex_id)
        )
        existing_user = result_yandex.scalar_one_or_none()
    
    if existing_user:
        # Обновляем существующего пользователя
        existing_user.yandex_id = user_data.yandex_id  # Обновляем yandex_id на случай если он изменился
        existing_user.name = user_data.name
        existing_user.email = user_data.email
        existing_user.avatar = user_data.avatar
        existing_user.last_login = datetime.utcnow()
        existing_user.updatedAt = datetime.utcnow()
        await db.commit()
        await db.refresh(existing_user)
        
        # Возвращаем пользователя с админским статусом
        return await get_user_with_admin_status(str(existing_user.id), db)
    else:
        # Создаем нового пользователя
        new_user = UserModel(
            yandex_id=user_data.yandex_id,
            name=user_data.name,
            email=user_data.email,
            avatar=user_data.avatar,
            last_login=datetime.utcnow()
        )
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
        
        # Возвращаем пользователя с админским статусом
        return await get_user_with_admin_status(str(new_user.id), db)


async def is_user_admin(user_id: str, db: AsyncSession) -> bool:
    """Проверка, является ли пользователь администратором"""
    result = await db.execute(
        select(AdminModel).where(AdminModel.user_id == user_id)
    )
    admin_record = result.scalar_one_or_none()
    return admin_record is not None


async def get_user_with_admin_status(user_id: str, db: AsyncSession) -> Optional[dict]:
    """Получение пользователя с информацией об админском статусе"""
    result = await db.execute(
        select(UserModel).where(UserModel.id == user_id)
    )
    user = result.scalar_one_or_none()
    
    if not user:
        return None
    
    is_admin = await is_user_admin(user_id, db)
    
    return {
        "id": str(user.id),
        "yandex_id": user.yandex_id,
        "name": user.name,
        "email": user.email,
        "avatar": user.avatar,
        "isAdmin": is_admin,
        "last_login": user.last_login,
        "createdAt": user.createdAt,
        "updatedAt": user.updatedAt
    }
