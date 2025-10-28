from uuid import UUID
from pydantic import BaseModel, Field
from datetime import datetime

class CardBase(BaseModel):
    amount: float = Field(..., ge=0, description="Card balance")
    user_id: UUID = Field(..., description="User ID")

class CardCreate(CardBase):
    pass

class Card(CardBase):
    id: UUID
    createdAt: datetime
    updatedAt: datetime
    
    class Config:
        from_attributes = True

class CardUpdate(BaseModel):
    amount: float = Field(None, ge=0)
    # status поле удалено, так как у карты нет статуса