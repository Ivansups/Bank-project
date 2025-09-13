import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship
from .base import Base

class AdminModel(Base):
    __tablename__ = "admins"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)

    user = relationship('UserModel', back_populates='admins')