import uuid
from uuid import UUID
from pydantic import BaseModel, Field, EmailStr

class User(BaseModel):
    id: UUID = Field(default_factory=uuid.uuid4, nullable=False)
    name: str = Field(min_length=3, max_length=255)
    email: EmailStr = Field(min_length=3, max_length=255)

class UserCreate(BaseModel):
    name: str = Field(min_length=3, max_length=255)
    email: EmailStr = Field(min_length=3, max_length=255)

class UserUpdate(BaseModel):
    name: str = Field(min_length=3, max_length=255)
    email: EmailStr = Field(min_length=3, max_length=255)

class UserResponse(BaseModel):
    id: UUID = Field(description="User ID")
    yandex_id: str | None = Field(default=None, description="Yandex user ID")
    name: str = Field(description="User name")
    email: EmailStr = Field(description="User email")
    avatar: str | None = Field(default=None, description="User avatar URL")
    isAdmin: bool = Field(default=False, description="Is user admin")
    createdAt: str = Field(description="Creation timestamp")
    updatedAt: str = Field(description="Last update timestamp")

class UserDelete(BaseModel):
    id: UUID = Field(nullable=False)

class UserGet(BaseModel):
    id: UUID = Field(nullable=False)

class UserSync(BaseModel):
    yandex_id: str = Field(description="Yandex user ID")
    email: EmailStr = Field(description="User email from Yandex")
    name: str = Field(description="User name from Yandex")
    avatar: str | None = Field(default=None, description="User avatar URL from Yandex")