import uuid
from enum import Enum as PyEnum
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Enum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship
from .base import Base

class CreditType(PyEnum):
    CREDIT = "credit"
    DEBT = "debt"

class CreditsModel(Base):
    __tablename__ = "credits"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    amount = Column(Integer, nullable=False) # Тут будет сумма кредита
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    credit_type = Column(Enum(CreditType), nullable=False)

    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship('UserModel', back_populates='credits')