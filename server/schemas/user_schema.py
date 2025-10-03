import uuid
from uuid import UUID
from pydantic import BaseModel, Field, EmailStr

class User(BaseModel):
    id: UUID = Field(default_factory=uuid.uuid4, nullable=False)
    name: str = Field(min_length=3, max_length=255)
    email: EmailStr = Field(min_length=3, max_length=255)
    phone: str | None = Field(default=None, description="User phone")
    age: int | None = Field(default=None, description="User age")
    gender: str | None = Field(default=None, description="User gender")
    passport_series: str | None = Field(default=None, description="User passport series")
    passport_number: str | None = Field(default=None, description="User passport number")
    place_of_registration: str | None = Field(default=None, description="User place of registration")
    place_of_work: str | None = Field(default=None, description="User place of work")
    position: str | None = Field(default=None, description="User position")
    cout_of_credits: int | None = Field(default=None, description="User count of credits")
    count_of_cards: int | None = Field(default=None, description="User count of cards")

class UserCreate(BaseModel):
    name: str = Field(min_length=3, max_length=255)
    email: EmailStr = Field(min_length=3, max_length=255)

class UserUpdate(BaseModel):
    name: str = Field(min_length=3, max_length=255)
    email: EmailStr = Field(min_length=3, max_length=255)
    phone: str | None = Field(default=None, description="User phone")
    age: int | None = Field(default=None, description="User age")
    gender: str | None = Field(default=None, description="User gender")
    passport_series: str | None = Field(default=None, description="User passport series")
    passport_number: str | None = Field(default=None, description="User passport number")
    place_of_registration: str | None = Field(default=None, description="User place of registration")
    place_of_work: str | None = Field(default=None, description="User place of work")
    position: str | None = Field(default=None, description="User position")
    cout_of_credits: int | None = Field(default=None, description="User count of credits")
    count_of_cards: int | None = Field(default=None, description="User count of cards")

class UserResponse(BaseModel):
    id: UUID = Field(description="User ID")
    yandex_id: str | None = Field(default=None, description="Yandex user ID")
    name: str = Field(description="User name")
    email: EmailStr = Field(description="User email")
    avatar: str | None = Field(default=None, description="User avatar URL")
    createdAt: str = Field(description="Creation timestamp")
    updatedAt: str = Field(description="Last update timestamp")
    phone: str | None = Field(default=None, description="User phone")
    age: int | None = Field(default=None, description="User age")
    gender: str | None = Field(default=None, description="User gender")
    passport_series: str | None = Field(default=None, description="User passport series")
    passport_number: str | None = Field(default=None, description="User passport number")
    place_of_registration: str | None = Field(default=None, description="User place of registration")
    place_of_work: str | None = Field(default=None, description="User place of work")
    position: str | None = Field(default=None, description="User position")
    cout_of_credits: int | None = Field(default=None, description="User count of credits")
    count_of_cards: int | None = Field(default=None, description="User count of cards")

class UserDelete(BaseModel):
    id: UUID = Field(nullable=False)

class UserGet(BaseModel):
    id: UUID = Field(nullable=False)

class UserSync(BaseModel):
    yandex_id: str = Field(description="Yandex user ID")
    email: EmailStr = Field(description="User email from Yandex")
    name: str = Field(description="User name from Yandex")
    avatar: str | None = Field(default=None, description="User avatar URL from Yandex")