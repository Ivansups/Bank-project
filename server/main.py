from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from api.endpoints import main_router
import time
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Bank API", version="1.0.0")

# 1. CORS middleware - для работы с Next.js фронтендом
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Trusted Host middleware - безопасность
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost", "127.0.0.1"])

# 3. Gzip compression - производительность
app.add_middleware(GZipMiddleware, minimum_size=1000)

# 4. Custom logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"{request.method} {request.url} - {response.status_code} - {process_time:.4f}s")
    return response

# Подключаем главный роутер
app.include_router(main_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Bank API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
