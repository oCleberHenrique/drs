from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField  # <--- Importante para o editor de texto

# ==============================================================================
# 1. BLOCO: CONTEÚDO INTERNO (Páginas de Detalhe)
# ==============================================================================

class Atuacao(models.Model):
    titulo = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    icone = models.CharField(max_length=50, default="star", help_text="Nome do ícone (Lucide/Heroicons)")
    descricao_curta = models.TextField(help_text="Resumo para a Home")
    
    # Campos para a Página Interna
    imagem_capa = models.ImageField(upload_to="atuacoes/", blank=True, null=True, help_text="Capa da página interna")
    conteudo = RichTextField(help_text="Conteúdo completo da página", blank=True, null=True)
    
    ordem = models.IntegerField(default=0)
    ativo = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Conteúdo - Atuação"
        verbose_name_plural = "Conteúdo - Atuações"
        ordering = ["ordem", "titulo"]

    def __str__(self):
        return self.titulo

class MembroEquipe(models.Model):  # Renomeado de Equipe para MembroEquipe
    nome = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    foto = models.ImageField(upload_to="equipe/", blank=True, null=True)
    
    # Novos campos para o Modal
    bio = models.TextField("Biografia / Currículo", blank=True, null=True)
    linkedin = models.URLField(blank=True)
    email = models.EmailField("E-mail Profissional", blank=True, null=True)
    
    ordem = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Conteúdo - Membro da Equipe"
        verbose_name_plural = "Conteúdo - Equipe"
        ordering = ["ordem", "nome"]

    def __str__(self):
        return self.nome

class BlogPost(models.Model):
    titulo = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    capa = models.ImageField(upload_to="blog/")
    resumo = models.TextField()
    
    # Alterado para RichTextField
    conteudo = RichTextField(verbose_name="Conteúdo Completo") 
    
    publicado_em = models.DateTimeField(auto_now_add=True)
    destaque = models.BooleanField(default=False)
    
    # Simplificado para CharField para facilitar edição manual se não usar sistema de usuários complexo
    autor_nome = models.CharField("Nome do Autor", max_length=100, default="DSR Equipe")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Conteúdo - Artigo Blog"
        verbose_name_plural = "Conteúdo - Blog"
        ordering = ["-publicado_em"]

    def __str__(self):
        return self.titulo

# ==============================================================================
# 2. BLOCO: GESTÃO DA HOME PAGE (Banners e Seções)
# ==============================================================================

class HeroHome(models.Model):
    titulo = models.TextField(help_text="Use HTML básico se precisar, ex: <br> para quebrar linha.")
    subtitulo = models.TextField()
    texto_botao = models.CharField(max_length=50, default="Conhecer áreas de atuação")
    link_botao = models.CharField(max_length=200, default="/atuacoes")
    imagem_fundo = models.ImageField(upload_to="hero/", help_text="Recomendado: 1920x1080px")
    ativo = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Home - 1. Banner Principal"
        verbose_name_plural = "Home - 1. Banners Principal"

    def __str__(self):
        return self.titulo[:50]

class QuemSomos(models.Model): # Quem Somos da HOME (Resumo)
    titulo = models.CharField(max_length=200, help_text="Ex: Um escritório humano...")
    texto = models.TextField(help_text="Texto completo da descrição.")
    imagem_fundo = models.ImageField(upload_to="quem_somos/", help_text="Imagem menor (Fundo). Ideal: 263x283px")
    imagem_frente = models.ImageField(upload_to="quem_somos/", help_text="Imagem maior (Frente). Ideal: 450x290px")
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Home - Seção Quem Somos"
        verbose_name_plural = "Home - Seção Quem Somos"

    def __str__(self):
        return self.titulo

class Diferencial(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    ordem = models.IntegerField(default=0, help_text="Ordem de exibição (ex: 1, 2, 3)")
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Home - Diferencial"
        verbose_name_plural = "Home - Diferenciais"
        ordering = ['ordem']

    def __str__(self):
        return self.titulo

class HomeAtuacao(models.Model):
    titulo = models.CharField(max_length=200, help_text="Ex: Atuação jurídica com foco...")
    descricao = models.TextField(help_text="Texto explicativo abaixo do título.")
    texto_cta = models.CharField(max_length=100, default="Clique para conhecer cada especialidade")
    texto_botao = models.CharField(max_length=50, default="Ver todas as áreas de atuação")
    link_botao = models.CharField(max_length=200, default="/atuacoes")
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Home - Seção Atuação (Texto)"
        verbose_name_plural = "Home - Seção Atuação (Texto)"

    def __str__(self):
        return self.titulo

class Historia(models.Model):
    subtitulo = models.CharField(max_length=100, help_text="Ex: A DSR por dentro")
    titulo = models.CharField(max_length=200, help_text="Ex: Uma história construída...")
    texto = models.TextField()
    texto_botao = models.CharField(max_length=50, default="Conhecer nossa história")
    link_botao = models.CharField(max_length=200, default="/quem-somos")
    
    # Imagens
    imagem_fundo = models.ImageField(upload_to="historia/", help_text="Imagem de fundo (Ex: Livros). Ideal: Vertical/Quadrada")
    imagem_frente = models.ImageField(upload_to="historia/", help_text="Imagem da frente (Ex: Reunião). Ideal: Horizontal")
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Home - Seção História"
        verbose_name_plural = "Home - Seção História"

    def __str__(self):
        return self.titulo

class HomeEquipe(models.Model):
    subtitulo = models.CharField(max_length=100, help_text="Ex: A DSR por dentro")
    titulo = models.CharField(max_length=200, help_text="Ex: Quem cuida de você...")
    descricao = models.TextField(help_text="Texto alinhado à direita.")
    textura_fundo = models.ImageField(
        upload_to="home_equipe/", 
        blank=True, 
        null=True, 
        help_text="PNG transparente com linhas/formas geométricas. Será aplicada sobre a cor vinho."
    )
    texto_botao = models.CharField(max_length=50, default="Conheça a equipe completa")
    link_botao = models.CharField(max_length=200, default="/quem-somos")
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Home - Seção Equipe (Texto)"
        verbose_name_plural = "Home - Seção Equipe (Texto)"

    def __str__(self):
        return self.titulo

class HomeBlog(models.Model):
    subtitulo = models.CharField(max_length=100, help_text="Ex: Conteúdos e Artigos")
    titulo = models.CharField(max_length=200, help_text="Ex: Entenda seus direitos...")
    descricao = models.TextField(help_text="Texto explicativo.")
    texto_botao = models.CharField(max_length=50, default="Acessar blog")
    link_botao = models.CharField(max_length=200, default="/blog")
    imagem_1 = models.ImageField(upload_to="home_blog/", help_text="Imagem superior esquerda")
    imagem_2 = models.ImageField(upload_to="home_blog/", help_text="Imagem inferior direita")
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Home - Seção Blog"
        verbose_name_plural = "Home - Seção Blog"

    def __str__(self):
        return self.titulo

class HomeContato(models.Model):
    subtitulo = models.CharField(max_length=100, help_text="Ex: Entre em contato")
    titulo = models.CharField(max_length=200, help_text="Ex: Precisa de orientação jurídica?")
    descricao = models.TextField(help_text="Texto explicativo sobre o atendimento.")
    texto_whatsapp = models.CharField(max_length=50, default="Falar com a DSR no WhatsApp")
    link_whatsapp = models.CharField(max_length=200, help_text="Link do wpp (https://wa.me/...)")
    texto_botao_form = models.CharField(max_length=50, default="Enviar Formulário")
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Home - Seção Contato"
        verbose_name_plural = "Home - Seção Contato"

    def __str__(self):
        return self.titulo

# ==============================================================================
# 3. BLOCO: PÁGINAS ESTÁTICAS (Quem Somos Interna)
# ==============================================================================

class PaginaQuemSomos(models.Model):
    # Dobra 1: Banner e Conteúdo Principal
    banner_topo = models.ImageField(upload_to="quem_somos_interna/", help_text="Banner largo (1920x300px)")
    titulo_principal = models.CharField(max_length=200)
    subtitulo_principal = models.CharField(max_length=200)
    descricao_principal = models.TextField()
    imagem_lateral = models.ImageField(upload_to="quem_somos_interna/", help_text="Imagem que fica ao lado do texto")

    # Dobra 2: Missão, Visão e Valores
    missao = models.TextField(verbose_name="Missão")
    visao = models.TextField(verbose_name="Visão")
    valores = models.TextField(verbose_name="Valores")

    # Dobra 4: Mapa
    iframe_mapa = models.TextField(help_text="Cole o código <iframe> do Google Maps aqui")

    class Meta:
        verbose_name = "Página Interna - Quem Somos"
        verbose_name_plural = "Página Interna - Quem Somos"

    def __str__(self):
        return "Configuração Quem Somos"

class GaleriaQuemSomos(models.Model):
    pagina = models.ForeignKey(PaginaQuemSomos, related_name="imagens_galeria", on_delete=models.CASCADE)
    imagem = models.ImageField(upload_to="galeria/")
    legenda = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.legenda or "Imagem Galeria"