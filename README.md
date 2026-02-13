# DSR - Projeto Web

Sistema web completo para escritório jurídico com backend Django REST Framework e frontend Next.js.

## 📋 Estrutura do Projeto

```
DSR/
├── backend/          # API Django REST Framework
├── frontend/         # Aplicação Next.js
└── docker-compose.yml
```

## 🚀 Instalação e Execução

### Pré-requisitos

- Docker e Docker Compose
- Node.js 22+ (se executar frontend localmente)
- Python 3.12+ (se executar backend localmente)

### Executando com Docker (Recomendado)

1. **Clone o repositório** (se aplicável)

2. **Configure as variáveis de ambiente:**

   **Backend** (`backend/.env`):
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=1
   ALLOWED_HOSTS=localhost,127.0.0.1
   DATABASE_URL=postgres://dsr_user:dsr_password@db:5432/dsr_db
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   CSRF_TRUSTED_ORIGINS=https://dsrpainel.v4jasson.com.br
   ```

   **Frontend** (`frontend/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Execute o Docker Compose:**

   **Windows:**
   ```bash
   start.bat
   ```
   
   **Linux/Mac:**
   ```bash
   chmod +x start.sh
   ./start.sh
   ```
   
   **Ou manualmente:**
   ```bash
   docker-compose up --build
   ```

4. **Acesse:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api/
   - Admin Django: http://localhost:8080/admin/

### Executando Localmente (Sem Docker)

#### Backend

1. Entre no diretório `backend/`
2. Instale as dependências com `uv`:
   ```bash
   uv pip install -r pyproject.toml
   ```
3. Execute as migrações:
   ```bash
   python manage.py migrate
   ```
4. Crie um superusuário:
   ```bash
   python manage.py createsuperuser
   ```
5. Execute o servidor:
   ```bash
   python manage.py runserver
   ```

#### Frontend

1. Entre no diretório `frontend/`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🔧 Configuração

### Variáveis de Ambiente

#### Backend

- `SECRET_KEY`: Chave secreta do Django (obrigatório em produção)
- `DEBUG`: Modo debug (0 ou 1)
- `ALLOWED_HOSTS`: Hosts permitidos (separados por vírgula)
- `DATABASE_URL`: URL de conexão com PostgreSQL
- `CORS_ALLOWED_ORIGINS`: Origens permitidas para CORS
- `CSRF_TRUSTED_ORIGINS`: Origens confiáveis para CSRF

#### Frontend

- `NEXT_PUBLIC_API_URL`: URL da API backend

## 📚 Funcionalidades

### Backend (Django)

- **API REST** com Django REST Framework
- **Admin Panel** com Django Unfold
- **Editor de Texto Rico** (CKEditor) para blog e atuações
- **Upload de Imagens** para mídia
- **Sistema de Contato** com formulário funcional

### Frontend (Next.js)

- **Home Page** com seções dinâmicas
- **Página de Atuações** com detalhes
- **Blog** com artigos
- **Página Quem Somos** com galeria
- **Página de Contato** com formulário funcional
- **Página de Equipe** com membros

## 🗄️ Banco de Dados

O projeto usa PostgreSQL com pgvector. As migrações são executadas automaticamente no Docker Compose.

Para criar migrações manualmente:
```bash
python manage.py makemigrations
python manage.py migrate
```

## 🔐 Segurança

### Produção

1. **Altere a SECRET_KEY** para um valor seguro
2. **Desative DEBUG** (`DEBUG=0`)
3. **Configure ALLOWED_HOSTS** com os domínios corretos
4. **Configure SSL/HTTPS** (as configurações de segurança já estão ativadas quando `DEBUG=False`)
5. **Use variáveis de ambiente** para dados sensíveis

## 📝 Endpoints da API

### Home Page
- `GET /api/hero/` - Banner principal
- `GET /api/quem-somos-home/` - Seção Quem Somos
- `GET /api/diferenciais/` - Diferenciais
- `GET /api/home-atuacao/` - Seção Atuação
- `GET /api/historia/` - Seção História
- `GET /api/home-equipe/` - Seção Equipe
- `GET /api/home-blog/` - Seção Blog
- `GET /api/home-contato/` - Seção Contato

### Conteúdo
- `GET /api/atuacoes/` - Lista de atuações
- `GET /api/atuacoes/{slug}/` - Detalhe de atuação
- `GET /api/blog/` - Lista de posts
- `GET /api/blog/{slug}/` - Detalhe de post
- `GET /api/equipe/` - Lista de membros

### Páginas
- `GET /api/pagina-quem-somos/` - Página Quem Somos completa

### Contato
- `POST /api/contato/` - Enviar mensagem de contato

## 🛠️ Desenvolvimento

### Criar Migrações

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### Coletar Arquivos Estáticos

```bash
cd backend
python manage.py collectstatic
```

### Acessar Admin

1. Crie um superusuário:
   ```bash
   python manage.py createsuperuser
   ```
2. Acesse: http://localhost:8080/admin/

## 📦 Dependências Principais

### Backend
- Django 6.0+
- Django REST Framework
- Django Unfold (Admin)
- CKEditor
- PostgreSQL (psycopg)
- WhiteNoise (servir arquivos estáticos)

### Frontend
- Next.js 16.1
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React (ícones)

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se o container do PostgreSQL está rodando
- Confirme a `DATABASE_URL` no `.env`

### Erro de CORS
- Adicione a origem do frontend em `CORS_ALLOWED_ORIGINS`

### Imagens não aparecem
- Verifique se o `MEDIA_ROOT` está configurado corretamente
- Em desenvolvimento, as imagens são servidas automaticamente
- Em produção, configure um servidor de arquivos estáticos ou use WhiteNoise

## 📄 Licença

Este projeto é proprietário.

## ✅ Validação e Checklist

Consulte o arquivo `VALIDACAO.md` para:
- Checklist completo de validação
- Verificação de alinhamento frontend/backend
- Lista de todos os endpoints e campos
- Checklist de testes antes de produção

## 📝 Primeiros Passos Após Iniciar

1. **Criar superusuário do admin:**
   ```bash
   docker-compose exec backend uv run python manage.py createsuperuser
   ```

2. **Acessar o painel admin:**
   - URL: http://localhost:8080/admin/
   - Use as credenciais criadas no passo anterior

3. **Preencher conteúdo:**
   - Configure as seções da Home Page
   - Adicione Atuações, Blog Posts e Membros da Equipe
   - Configure a página "Quem Somos"

4. **Testar o frontend:**
   - Acesse: http://localhost:3000
   - Verifique se todas as seções estão aparecendo corretamente

## 👥 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
