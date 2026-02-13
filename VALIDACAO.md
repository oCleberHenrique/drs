# Checklist de Validação - DSR

## ✅ Páginas Internas no Admin

### 1. Home Page - Seções
- [x] **Hero Home** - Banner principal
  - Campos: título, subtitulo, texto_botao, link_botao, imagem_fundo, ativo
  - Endpoint: `/api/hero/`
  
- [x] **Quem Somos (Home)** - Seção Quem Somos da home
  - Campos: titulo, texto, imagem_fundo, imagem_frente, ativo
  - Endpoint: `/api/quem-somos-home/`
  
- [x] **Diferenciais** - Cards de diferenciais
  - Campos: titulo, descricao, ordem, ativo
  - Endpoint: `/api/diferenciais/`
  
- [x] **Home Atuação** - Texto da seção de atuações
  - Campos: titulo, descricao, texto_cta, texto_botao, link_botao, ativo
  - Endpoint: `/api/home-atuacao/`
  
- [x] **História** - Seção história
  - Campos: subtitulo, titulo, texto, texto_botao, link_botao, imagem_fundo, imagem_frente, ativo
  - Endpoint: `/api/historia/`
  
- [x] **Home Equipe** - Seção equipe
  - Campos: subtitulo, titulo, descricao, textura_fundo, texto_botao, link_botao, ativo
  - Endpoint: `/api/home-equipe/`
  
- [x] **Home Blog** - Seção blog
  - Campos: subtitulo, titulo, descricao, texto_botao, link_botao, imagem_1, imagem_2, ativo
  - Endpoint: `/api/home-blog/`
  
- [x] **Home Contato** - Seção contato
  - Campos: subtitulo, titulo, descricao, texto_whatsapp, link_whatsapp, texto_botao_form, ativo
  - Endpoint: `/api/home-contato/`

### 2. Conteúdo - Páginas Internas
- [x] **Atuações** - Lista e páginas internas
  - Campos: titulo, slug, icone, descricao_curta, imagem_capa, conteudo, ordem, ativo
  - Endpoints: `/api/atuacoes/` (lista), `/api/atuacoes/{slug}/` (detalhe)
  
- [x] **Blog Posts** - Artigos do blog
  - Campos: titulo, slug, capa, resumo, conteudo, publicado_em, autor_nome, destaque
  - Endpoints: `/api/blog/` (lista), `/api/blog/{slug}/` (detalhe)
  
- [x] **Membros da Equipe** - Equipe completa
  - Campos: nome, cargo, foto, bio, linkedin, email, ordem
  - Endpoint: `/api/equipe/`

### 3. Páginas Únicas
- [x] **Página Quem Somos** - Página interna completa
  - Campos: banner_topo, titulo_principal, subtitulo_principal, descricao_principal, imagem_lateral, missao, visao, valores, iframe_mapa
  - Galeria: imagens_galeria (inline)
  - Endpoint: `/api/pagina-quem-somos/`

### 4. Formulário de Contato
- [x] **Contato** - Mensagens recebidas
  - Campos: nome, email, telefone, mensagem, lido, respondido, criado_em
  - Endpoint: `POST /api/contato/`

## 🔍 Validação Frontend vs Backend

### Campos Esperados pelo Frontend

#### HeroSection
- ✅ titulo, subtitulo, texto_botao, link_botao, imagem_fundo

#### AboutSection (QuemSomosHome)
- ✅ titulo, texto, imagem_fundo, imagem_frente

#### DifferentialsSection
- ✅ titulo, descricao

#### PracticeSection
- ✅ titulo, descricao, texto_cta, texto_botao, link_botao (HomeAtuacao)
- ✅ titulo, slug, descricao_curta, icone (Atuacao)

#### HistorySection
- ✅ subtitulo, titulo, texto, texto_botao, link_botao, imagem_fundo, imagem_frente

#### TeamHomeSection
- ✅ subtitulo, titulo, descricao, textura_fundo, texto_botao, link_botao (HomeEquipe)
- ✅ nome, cargo, foto (MembroEquipe)

#### BlogHomeSection
- ✅ subtitulo, titulo, descricao, texto_botao, link_botao, imagem_1, imagem_2

#### ContactHomeSection
- ✅ subtitulo, titulo, descricao, texto_whatsapp, link_whatsapp, texto_botao_form

#### AtuacaoInterna
- ✅ titulo, slug, descricao_curta, conteudo, imagem_capa

#### BlogPostInterna
- ✅ titulo, slug, capa, resumo, conteudo, publicado_em, autor_nome

#### QuemSomosPage
- ✅ banner_topo, titulo_principal, subtitulo_principal, descricao_principal, imagem_lateral, missao, visao, valores, iframe_mapa, imagens_galeria

## 📋 Checklist de Testes

### Antes de Subir para Produção

1. **Banco de Dados**
   - [ ] Migrações aplicadas
   - [ ] Superusuário criado
   - [ ] Dados de teste inseridos

2. **Backend**
   - [ ] Todas as APIs respondendo corretamente
   - [ ] Admin acessível e funcional
   - [ ] Upload de imagens funcionando
   - [ ] CKEditor funcionando nos campos de conteúdo

3. **Frontend**
   - [ ] Todas as páginas renderizando
   - [ ] Imagens carregando corretamente
   - [ ] Formulário de contato enviando
   - [ ] Links e navegação funcionando

4. **Integração**
   - [ ] CORS configurado corretamente
   - [ ] Variáveis de ambiente configuradas
   - [ ] URLs da API corretas

## 🚀 Como Subir o Projeto

### Windows
```bash
start.bat
```

### Linux/Mac
```bash
chmod +x start.sh
./start.sh
```

### Manual
```bash
docker-compose up --build
```

## 📝 Próximos Passos

1. Executar migrações:
   ```bash
   docker-compose exec backend uv run python manage.py migrate
   ```

2. Criar superusuário:
   ```bash
   docker-compose exec backend uv run python manage.py createsuperuser
   ```

3. Acessar admin e preencher dados:
   - http://localhost:8080/admin/

4. Testar frontend:
   - http://localhost:3000
