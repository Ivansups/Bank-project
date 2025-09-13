#!/bin/bash
# Скрипт для активации виртуального окружения

echo "Активация виртуального окружения..."
source venv/bin/activate

echo "Виртуальное окружение активировано!"
echo "Для запуска FastAPI сервера используйте:"
echo "uvicorn main:app --reload"
echo ""
echo "Для деактивации окружения используйте:"
echo "deactivate"
