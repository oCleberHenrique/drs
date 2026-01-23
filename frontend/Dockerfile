FROM node:22-alpine

WORKDIR /app

# Instalar dependências
COPY package.json package-lock.json* ./
RUN npm install

# Copiar código fonte
COPY . .

EXPOSE 3000

# Comando de desenvolvimento
CMD ["npm", "run", "dev"]