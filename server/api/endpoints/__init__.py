from fastapi import APIRouter
from .user.user_endpoints import router as user_router
from .auth.auth_endpoints import router as auth_router
from .admin.admin_endpoints import router as admin_router
from .cards.cards_endpoints import router as cards_router
from .transactions.transactions_endpoints import router as transactions_router

# Создаем главный роутер
main_router = APIRouter()

# Подключаем все модули
main_router.include_router(user_router, prefix="/users", tags=["users"])
main_router.include_router(auth_router, prefix="/auth", tags=["auth"])
main_router.include_router(admin_router, prefix="/admin", tags=["admin"])
main_router.include_router(cards_router, prefix="/cards", tags=["cards"])
main_router.include_router(transactions_router, prefix="/transactions", tags=["transactions"])