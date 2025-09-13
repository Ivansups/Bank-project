import uuid
from enum import Enum as PyEnum
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Enum, Float
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship
from .base import Base

class TransactionType(PyEnum):
    ADD = "ADD"
    SUB = "SUB"

class TransactionModel(Base):
    __tablename__ = "transactions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    amount = Column(Float, nullable=False) # Тут будет сумма транзакции
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    transaction_type = Column(Enum(TransactionType), nullable=False)

    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship('UserModel', back_populates='transactions')