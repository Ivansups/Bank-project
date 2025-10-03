import uuid
from enum import Enum as PyEnum
from sqlalchemy import Column, String, Boolean, DateTime, Integer, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base

class Gender(PyEnum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class UserModel(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    yandex_id = Column(String(255), nullable=True, unique=True)

    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    avatar = Column(String(500), nullable=True)
    
    last_login = Column(DateTime, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    #Данные, требуемые для создания карты, кредита и транзакции
    city = Column(String(255), nullable=True)
    phone = Column(String(16), nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(Enum(Gender), nullable=True)
    passport_series = Column(String(4), nullable=True)
    passport_number = Column(String(6), nullable=True)
    place_of_registration = Column(String(255), nullable=True)
    place_of_work = Column(String(255), nullable=True)
    position = Column(String(255), nullable=True)

    cout_of_credits = Column(Integer, nullable=True)
    count_of_cards = Column(Integer, nullable=True)
    
    # Связи
    admins = relationship('AdminModel', back_populates='user')
    cards = relationship('CardModel', back_populates='user')
    transactions = relationship('TransactionModel', back_populates='user')
    credits = relationship('CreditsModel', back_populates='user')