from uuid import UUID
from enum import Enum as PyEnum
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime 

class TransactionType(str, PyEnum):
    ADD = "ADD"
    SUB = "SUB"

class Status(str, PyEnum):
    PROCESS = "In the process"
    DENIED = "Denied"
    ACCEPT = "Accept"

class TransactionBase(BaseModel):
    amount: float = Field(..., gt=0, description="Transaction amount")
    user_id: UUID = Field(..., description="User ID")
    card_id: UUID = Field(..., description="Card ID")  # Добавили card_id
    transaction_type: TransactionType = Field(..., description="Transaction type")

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: UUID
    status: Status
    createdAt: datetime
    updatedAt: datetime
    
    class Config:
        from_attributes = True