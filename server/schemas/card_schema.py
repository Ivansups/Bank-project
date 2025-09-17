import uuid
from uuid import UUID
from enum import Enum as PyEnum
from pydantic import BaseModel, Field, EmailStr

class Card(BaseModel):
    id: UUID = Field(description="Card ID")
    amount: float = Field(nullable=False)
    user_id: UUID = Field(nullable=False)
    createdAt: str = Field(description="Creation timestamp")
    updatedAt: str = Field(description="Last update timestamp")
    
class CardCreate(BaseModel):
    amount: float = Field(nullable=False)
    user_id: UUID = Field(nullable=False)

class CardUpdate(BaseModel):
    amount: float = Field(nullable=True)
    status: str = Field(nullable=True)