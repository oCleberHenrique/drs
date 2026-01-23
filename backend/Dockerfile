FROM python:3.12-slim

# Instalar UV (Gerenciador de pacotes rápido)
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Configurações de ambiente Python
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_SYSTEM_PYTHON=1

WORKDIR /app

# Instalar dependências do sistema necessárias para compilação (se houver) e postgres
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de dependência primeiro para cache layer
COPY pyproject.toml uv.lock* /app/

# Instalar dependências via UV
# Nota: Criamos o arquivo pyproject.toml na inicialização se não existir, 
# mas o Docker precisa dele para o build inicial.
RUN if [ -f pyproject.toml ]; then uv pip install -r pyproject.toml --system; fi

COPY . /app/

EXPOSE 8000