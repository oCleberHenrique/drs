from django.db import models
from django.utils.text import slugify

class Atuacao(models.Model):
    titulo = models.CharField(max_length=100)
    descricao_curta = models.TextField(help_text="Resumo para a Home")
    conteudo = models.TextField(help_text="Conteúdo completo da página")
    icone = models.CharField(max_length=50, default="star", help_text="Nome do ícone (Lucide/Heroicons)")
    ordem = models.IntegerField(default=0)
    ativo = models.BooleanField(default=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Atuação"
        verbose_name_plural = "Atuações"
        ordering = ["ordem", "titulo"]

    def __str__(self):
        return self.titulo

class Equipe(models.Model):
    nome = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    foto = models.ImageField(upload_to="equipe/", blank=True, null=True)
    linkedin = models.URLField(blank=True)
    ordem = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Membro da Equipe"
        verbose_name_plural = "Equipe"
        ordering = ["ordem", "nome"]

    def __str__(self):
        return self.nome

class BlogPost(models.Model):
    titulo = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    capa = models.ImageField(upload_to="blog/")
    resumo = models.TextField()
    conteudo = models.TextField() # Futuramente podemos por um Editor Rich Text
    publicado_em = models.DateTimeField(auto_now_add=True)
    destaque = models.BooleanField(default=False)
    autor = models.ForeignKey("auth.User", on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Artigo"
        verbose_name_plural = "Blog"
        ordering = ["-publicado_em"]

    def __str__(self):
        return self.titulo

class HeroHome(models.Model):
    titulo = models.TextField(help_text="Use HTML básico se precisar, ex: <br> para quebrar linha.")
    subtitulo = models.TextField()
    texto_botao = models.CharField(max_length=50, default="Conhecer áreas de atuação")
    link_botao = models.CharField(max_length=200, default="/atuacoes")
    imagem_fundo = models.ImageField(upload_to="hero/", help_text="Recomendado: 1920x1080px")
    ativo = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Banner da Home"
        verbose_name_plural = "Banners da Home"

    def __str__(self):
        return self.titulo[:50]
    
class QuemSomos(models.Model):
    titulo = models.CharField(max_length=200, help_text="Ex: Um escritório humano...")
    texto = models.TextField(help_text="Texto completo da descrição.")
    imagem_fundo = models.ImageField(upload_to="quem_somos/", help_text="Imagem menor (Fundo). Ideal: 263x283px")
    imagem_frente = models.ImageField(upload_to="quem_somos/", help_text="Imagem maior (Frente). Ideal: 450x290px")
    
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Seção Quem Somos"
        verbose_name_plural = "Seção Quem Somos"

    def __str__(self):
        return self.titulo
    
class Diferencial(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    ordem = models.IntegerField(default=0, help_text="Ordem de exibição (ex: 1, 2, 3)")
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Diferencial"
        verbose_name_plural = "Diferenciais"
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
        verbose_name = "Home - Seção Atuação"
        verbose_name_plural = "Home - Seção Atuação"

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
    
    # Imagem da textura de fundo
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
        verbose_name = "Home - Seção Equipe"
        verbose_name_plural = "Home - Seção Equipe"

    def __str__(self):
        return self.titulo
    
class HomeBlog(models.Model):
    subtitulo = models.CharField(max_length=100, help_text="Ex: Conteúdos e Artigos")
    titulo = models.CharField(max_length=200, help_text="Ex: Entenda seus direitos...")
    descricao = models.TextField(help_text="Texto explicativo.")
    texto_botao = models.CharField(max_length=50, default="Acessar blog")
    link_botao = models.CharField(max_length=200, default="/blog")
    
    # Imagens para composição
    imagem_1 = models.ImageField(upload_to="home_blog/", help_text="Imagem superior esquerda (Ex: Mãos escrevendo)")
    imagem_2 = models.ImageField(upload_to="home_blog/", help_text="Imagem inferior direita (Ex: Advogado em pé)")
    
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
    
    # Botão do WhatsApp (Esquerda)
    texto_whatsapp = models.CharField(max_length=50, default="Falar com a DSR no WhatsApp")
    link_whatsapp = models.CharField(max_length=200, help_text="Link do wpp (https://wa.me/...)")
    
    # Texto do Botão do Formulário (Direita)
    texto_botao_form = models.CharField(max_length=50, default="Enviar Formulário")
    
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Home - Seção Contato"
        verbose_name_plural = "Home - Seção Contato"

    def __str__(self):
        return self.titulo


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

# Modelo para a Galeria (Dobra 3)
class GaleriaQuemSomos(models.Model):
    pagina = models.ForeignKey(PaginaQuemSomos, related_name="imagens_galeria", on_delete=models.CASCADE)
    imagem = models.ImageField(upload_to="galeria/")
    legenda = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.legenda or "Imagem Galeria"