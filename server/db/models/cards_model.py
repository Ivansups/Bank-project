import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship
from .base import Base


class CardModel(Base):
    __tablename__ = "cards"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    amount = Column(Integer, nullable=False) # Тут будет сумма на баллансе карты
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)

    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship('UserModel', back_populates='cards')
    transactions = relationship('TransactionModel', back_populates='card')