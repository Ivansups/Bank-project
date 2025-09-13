import uuid
from uuid import UUID
from enum import Enum as PyEnum
from pydantic import BaseModel, Field, EmailStr


class TransactionType(PyEnum):
    ADD = "ADD"
    SUB = "SUB"

class Transaction(BaseModel):
    id: UUID = Field(description="Transaction ID")
    amount: float = Field(nullable=False)
    user_id: UUID = Field(nullable=False)
    transaction_type: TransactionType = Field(default=TransactionType.ADD)
    createdAt: str = Field(description="Creation timestamp")
    updatedAt: str = Field(description="Last update timestamp")
    
class TransactionCreate(BaseModel):
    amount: float = Field(nullable=False)
    user_id: UUID = Field(nullable=False)
    transaction_type: TransactionType = Field(default=TransactionType.ADD)