#!/bin/bash

echo "========================================"
echo "  DSR - Iniciando Projeto"
echo "========================================"
echo ""

echo "[1/3] Parando containers existentes..."
docker-compose down

echo ""
echo "[2/3] Construindo e iniciando containers..."
docker-compose up --build -d

echo ""
echo "[3/3] Aguardando serviços iniciarem..."
sleep 10

echo ""
echo "========================================"
echo "  Projeto iniciado com sucesso!"
echo "========================================"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:8080/api/"
echo "Admin Django: http://localhost:8080/admin/"
echo ""
echo "Para ver os logs: docker-compose logs -f"
echo "Para parar: docker-compose down"
echo ""
