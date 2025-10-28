from email.policy import default
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

class Status(PyEnum):
    PROCESS = "In the process"
    DENIED = "Denied"
    ACCEPT = "Accept"

class TransactionModel(Base):
    __tablename__ = "transactions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    amount = Column(Float, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    card_id = Column(UUID(as_uuid=True), ForeignKey('cards.id'), nullable=False)  # Добавили связь с картой
    transaction_type = Column(Enum(TransactionType), nullable=False)
    status = Column(Enum(Status), default=Status.PROCESS, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship('UserModel', back_populates='transactions')
    card = relationship('CardModel', back_populates='transactions')  # Добавили связь