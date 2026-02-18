# Passo a passo: configurar a VPS e subir o painel DSR

Siga na ordem. Substitua `<URL_DO_REPOSITORIO>` pela URL do seu repositório (ex.: `https://github.com/oCleberHenrique/drs.git`).

---

## Passo 1 – Conectar na VPS

No seu computador (PowerShell ou terminal):

```bash
ssh root@31.97.242.139
```

Digite a senha do root quando pedir. Você ficará no terminal da VPS.

---

## Passo 2 – Instalar Docker (se ainda não tiver)

Na VPS:

```bash
curl -fsSL https://get.docker.com | sh
```

Verifique:

```bash
docker --version
docker compose version
```

Se aparecer a versão, pode seguir. Se já tinha Docker, pule para o passo 3.

---

## Passo 3 – Instalar Nginx (se ainda não tiver)

```bash
apt update
apt install -y nginx
systemctl enable nginx
systemctl status nginx
```

Se aparecer "active (running)", está ok. Se o Nginx já existia, pule.

---

## Passo 4 – Clonar o projeto

Escolha um diretório. Exemplo usando `/var/www/dsr`:

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/oCleberHenrique/drs.git dsr
cd dsr
```

Se o repositório for privado, use SSH ou um token no lugar da URL. Exemplo com branch específica:

```bash
git clone -b backend-port-a0d14 https://github.com/oCleberHenrique/drs.git dsr
cd dsr
```

Confirme que está na raiz do projeto (onde existe `docker-compose.vps.yml`):

```bash
ls -la docker-compose.vps.yml
```

---

## Passo 5 – Criar pasta de mídia e arquivo .env

Ainda dentro de `/var/www/dsr` (ou o caminho que você usou):

```bash
mkdir -p data/media
cp deploy/.env.vps.example .env
nano .env
```

No editor, preencha:

- **SECRET_KEY** – Troque por uma chave aleatória longa (ex.: gere em https://djecrety.ir ou use `openssl rand -base64 48`).
- **POSTGRES_PASSWORD** – Senha forte para o banco (ex.: `MinhaS3nhaSegura!`).
- **CORS_ALLOWED_ORIGINS** – URL do frontend na Vercel. Ex.: `https://drs.vercel.app,https://dsr.v4jasson.com.br` (sem espaços, separado por vírgula).
- **CSRF_TRUSTED_ORIGINS** – Deixe `https://dsr.v4jasson.com.br`.

Exemplo de `.env`:

```env
SECRET_KEY=sua-chave-secreta-longa-aqui
POSTGRES_PASSWORD=MinhaS3nhaSegura!
CORS_ALLOWED_ORIGINS=https://drs.vercel.app,https://dsr.v4jasson.com.br
CSRF_TRUSTED_ORIGINS=https://dsr.v4jasson.com.br
```

Salve: no `nano`, `Ctrl+O`, Enter, depois `Ctrl+X`.

---

## Passo 6 – Subir o backend e o banco (porta 9000)

Na raiz do projeto (onde está o `.env`):

```bash
docker compose -f docker-compose.vps.yml up -d --build
```

Aguarde terminar (pode levar alguns minutos na primeira vez). Depois confira:

```bash
docker compose -f docker-compose.vps.yml ps
```

Os dois containers (`dsr_backend` e `dsr_db`) devem estar "Up". Se um estiver com erro:

```bash
docker compose -f docker-compose.vps.yml logs backend
```

---

## Passo 7 – Criar usuário do painel (admin)

```bash
docker compose -f docker-compose.vps.yml exec backend uv run python manage.py createsuperuser
```

Informe:

- **Email** (ou deixe em branco se pedir usuário): ex. `admin@dsr.com.br`
- **Password**: senha de acesso ao painel (digite duas vezes)

Guarde esse usuário e senha para acessar o admin.

---

## Passo 8 – Configurar o Nginx (domínio → porta 9000)

Se você clonou em **/var/www/dsr**, use direto:

```bash
cp /var/www/dsr/deploy/nginx-dsr.conf /etc/nginx/sites-available/dsr
ln -sf /etc/nginx/sites-available/dsr /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

Se você clonou em **outro caminho** (ex.: `/root/dsr`), antes ajuste o caminho no config:

```bash
nano /etc/nginx/sites-available/dsr
```

Troque **todas** as ocorrências de `/var/www/dsr` pelo seu caminho (ex.: `/root/dsr`). Salve e depois:

```bash
ln -sf /etc/nginx/sites-available/dsr /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## Passo 9 – Testar em HTTP

No seu navegador:

- **API:** `http://dsr.v4jasson.com.br/api/`
- **Admin:** `http://dsr.v4jasson.com.br/admin/`

Faça login no admin com o usuário criado no passo 7. Se carregar, a VPS e o painel estão ok.

---

## Passo 10 – Ativar HTTPS (SSL) com Certbot

Na VPS:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d dsr.v4jasson.com.br
```

Siga as perguntas:

- Email: informe um e-mail válido.
- Termos: aceite (Y).
- Redirect HTTP → HTTPS: escolha **2** (Redirect) para forçar HTTPS.

Depois do Certbot, o Nginx já fica com SSL. Teste de novo:

- **Admin:** `https://dsr.v4jasson.com.br/admin/`
- **API:** `https://dsr.v4jasson.com.br/api/`

---

## Resumo do que fica pronto

| O que              | URL |
|--------------------|-----|
| Painel (admin)     | https://dsr.v4jasson.com.br/admin/ |
| API                | https://dsr.v4jasson.com.br/api/ |
| Uploads (mídia)    | https://dsr.v4jasson.com.br/media/ |

Backend roda na porta **9000** internamente (Nginx faz o proxy). O outro projeto na 8000 não é alterado.

---

## Comandos úteis depois

```bash
# Ver logs do backend
docker compose -f docker-compose.vps.yml logs -f backend

# Parar tudo
docker compose -f docker-compose.vps.yml down

# Atualizar após git pull
cd /var/www/dsr   # ou o seu caminho
git pull
docker compose -f docker-compose.vps.yml up -d --build

# Rodar migrações
docker compose -f docker-compose.vps.yml exec backend uv run python manage.py migrate
```

Se em algum passo aparecer erro, copie a mensagem e o comando que rodou para conseguir depurar.
