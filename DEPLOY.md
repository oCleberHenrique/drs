# Deploy DSR – Hostinger (VPS) + Vercel

- **Backend (API + Admin):** VPS Hostinger `31.97.242.139`, subdomínio `dsr.v4jasson.com.br`, porta **9000** (evita conflito com outro projeto na 8000).
- **Frontend:** Vercel (deploy automático a partir do repositório).

---

## 1. DNS (subdomínio na Hostinger)

No painel do domínio `v4jasson.com.br`:

- **Tipo:** A  
- **Nome:** `dsr` (ou `dsr.v4jasson.com.br` conforme o painel)  
- **Valor/Aponta para:** `31.97.242.139`

Aguarde a propagação (alguns minutos até 48h). Teste com:

```bash
ping dsr.v4jasson.com.br
```

---

## 2. Backend na VPS (Hostinger)

### 2.1 Acesso SSH

```bash
ssh root@31.97.242.139
```

### 2.2 Pré-requisitos na VPS

- Docker e Docker Compose instalados.
- Nginx instalado (geralmente já existe em VPS Hostinger).

Se não tiver Docker:

```bash
curl -fsSL https://get.docker.com | sh
```

### 2.3 Clonar o projeto e preparar ambiente

Escolha um diretório (ex.: `/var/www/dsr` ou `/root/dsr`). Exemplo com `/var/www/dsr`:

```bash
mkdir -p /var/www
cd /var/www
git clone <URL_DO_SEU_REPOSITORIO> dsr
cd dsr
```

Crie a pasta de mídia e arquivo de ambiente:

```bash
mkdir -p data/media
cp deploy/.env.vps.example .env
nano .env   # ou vim .env
```

No `.env`, defina:

- `SECRET_KEY`: chave longa e aleatória (produção).
- `POSTGRES_PASSWORD`: senha forte para o PostgreSQL.
- `CORS_ALLOWED_ORIGINS`: URL do frontend na Vercel (ex.: `https://seu-projeto.vercel.app`) e, se usar, `https://dsr.v4jasson.com.br`, separadas por vírgula.
- `CSRF_TRUSTED_ORIGINS`: `https://dsr.v4jasson.com.br`.

Salve e feche o editor.

### 2.4 Subir backend e banco (porta 9000)

Na raiz do projeto (`/var/www/dsr`):

```bash
docker compose -f docker-compose.vps.yml up -d --build
```

Verifique se os containers estão rodando:

```bash
docker compose -f docker-compose.vps.yml ps
```

Crie um superusuário para o admin:

```bash
docker compose -f docker-compose.vps.yml exec backend uv run python manage.py createsuperuser
```

### 2.5 Nginx (dsr.v4jasson.com.br → porta 9000)

Ajuste o caminho do projeto no arquivo de configuração (onde está `alias` e comentários): troque `/var/www/dsr` pelo caminho real se tiver usado outro (ex.: `/root/dsr`).

```bash
sudo cp /var/www/dsr/deploy/nginx-dsr.conf /etc/nginx/sites-available/dsr
sudo ln -sf /etc/nginx/sites-available/dsr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Se o projeto estiver em `/root/dsr`, edite o site antes de ativar:

```bash
sudo nano /etc/nginx/sites-available/dsr
# Troque /var/www/dsr por /root/dsr nos alias e no comentário do bloco SSL
```

### 2.6 SSL (HTTPS) com Certbot

Depois que o site responder em HTTP:

```bash
sudo certbot --nginx -d dsr.v4jasson.com.br
```

Siga as instruções. Em seguida, no mesmo arquivo de site do Nginx, descomente o bloco `server` que faz redirect 80 → 443 e o bloco `server` com `listen 443 ssl` (e ajuste os caminhos do `alias` se precisar). Depois:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

URLs do backend em produção:

- API: `https://dsr.v4jasson.com.br/api/`
- Admin: `https://dsr.v4jasson.com.br/admin/`
- Mídia: `https://dsr.v4jasson.com.br/media/`

---

## 3. Frontend na Vercel

### 3.1 Conectar o repositório

- Acesse [vercel.com](https://vercel.com) e importe o repositório do projeto.
- **Root Directory:** se o repositório for monorepo (backend + frontend na mesma raiz), defina como `frontend`. Se o repositório contiver só o frontend, deixe em branco.

### 3.2 Variáveis de ambiente no Vercel

No projeto da Vercel, em **Settings → Environment Variables**:

| Nome                     | Valor                           | Ambiente   |
|--------------------------|----------------------------------|------------|
| `NEXT_PUBLIC_API_URL`    | `https://dsr.v4jasson.com.br`   | Production (e Preview se quiser) |
| `API_URL_SERVER`         | `https://dsr.v4jasson.com.br`   | Production (e Preview se quiser) |

Não use barra no final. O `API_URL_SERVER` é usado no SSR (server-side) da Vercel para chamar a API; sem ele o frontend tentaria usar `localhost` e as requisições falhariam.

### 3.3 Deploy

Faça o deploy (push no repositório ou “Redeploy” no painel). A URL do frontend será algo como `https://seu-projeto.vercel.app`.

### 3.4 CORS no backend

No `.env` da VPS, inclua a URL exata do frontend na Vercel em `CORS_ALLOWED_ORIGINS`, por exemplo:

```env
CORS_ALLOWED_ORIGINS=https://seu-projeto.vercel.app,https://dsr.v4jasson.com.br
```

Se usar domínio customizado no frontend (ex.: `www.dsr.v4jasson.com.br`), adicione também. Depois:

```bash
cd /var/www/dsr
docker compose -f docker-compose.vps.yml up -d --force-recreate backend
```

---

## 4. Resumo de portas e URLs

| Onde        | Porta | Uso                          |
|------------|-------|------------------------------|
| VPS        | 9000  | Backend (interno; Nginx proxy)|
| Nginx      | 80/443| dsr.v4jasson.com.br → 9000   |
| Outro projeto | 8000 | Mantido como já está         |

- **Frontend (usuário):** URL da Vercel (ex.: `https://seu-projeto.vercel.app`).
- **API e Admin:** `https://dsr.v4jasson.com.br` (Nginx + SSL).

---

## 5. Comandos úteis (VPS)

```bash
# Logs do backend
docker compose -f docker-compose.vps.yml logs -f backend

# Parar
docker compose -f docker-compose.vps.yml down

# Atualizar após git pull
docker compose -f docker-compose.vps.yml up -d --build

# Migrations
docker compose -f docker-compose.vps.yml exec backend uv run python manage.py migrate
```

Com isso, o deploy na Hostinger (backend na porta 9000, Nginx, SSL) e na Vercel (frontend) fica completo e documentado.
