from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline  # <-- IMPORTANTE: Importando do Unfold
from .models import (
    HeroHome, HomeAtuacao, HomeEquipe, 
    Atuacao, MembroEquipe, BlogPost,
    PaginaQuemSomos, GaleriaQuemSomos,
    HomeBlog, HomeContato, Historia, Diferencial, QuemSomos,
    Contato
)

# ==============================================================================
# 1. HOME PAGE
# ==============================================================================

@admin.register(HeroHome)
class HeroHomeAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo', 'id')
    list_filter = ('ativo',)
    search_fields = ('titulo', 'subtitulo')
    fieldsets = (
        ('Conteúdo', {
            'fields': ('titulo', 'subtitulo', 'texto_botao', 'link_botao')
        }),
        ('Imagem', {
            'fields': ('imagem_fundo',)
        }),
        ('Configuração', {
            'fields': ('ativo',)
        }),
    )

@admin.register(QuemSomos)
class QuemSomosAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo', 'id')
    list_filter = ('ativo',)
    search_fields = ('titulo', 'texto')
    fieldsets = (
        ('Conteúdo', {
            'fields': ('titulo', 'texto')
        }),
        ('Imagens', {
            'fields': ('imagem_fundo', 'imagem_frente')
        }),
        ('Configuração', {
            'fields': ('ativo',)
        }),
    )

@admin.register(Diferencial)
class DiferencialAdmin(ModelAdmin):
    list_display = ('titulo', 'ordem', 'ativo')
    list_editable = ('ordem', 'ativo')

@admin.register(HomeAtuacao)
class HomeAtuacaoAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo', 'id')
    list_filter = ('ativo',)
    search_fields = ('titulo', 'descricao')
    fieldsets = (
        ('Conteúdo', {
            'fields': ('titulo', 'descricao', 'texto_cta', 'texto_botao', 'link_botao')
        }),
        ('Configuração', {
            'fields': ('ativo',)
        }),
    )

@admin.register(Historia)
class HistoriaAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo', 'id')
    list_filter = ('ativo',)
    search_fields = ('titulo', 'subtitulo', 'texto')
    fieldsets = (
        ('Conteúdo', {
            'fields': ('subtitulo', 'titulo', 'texto', 'texto_botao', 'link_botao')
        }),
        ('Imagens', {
            'fields': ('imagem_fundo', 'imagem_frente')
        }),
        ('Configuração', {
            'fields': ('ativo',)
        }),
    )

@admin.register(HomeEquipe)
class HomeEquipeAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo', 'id')
    list_filter = ('ativo',)
    search_fields = ('titulo', 'subtitulo', 'descricao')
    fieldsets = (
        ('Conteúdo', {
            'fields': ('subtitulo', 'titulo', 'descricao', 'texto_botao', 'link_botao')
        }),
        ('Imagem', {
            'fields': ('textura_fundo',)
        }),
        ('Configuração', {
            'fields': ('ativo',)
        }),
    )

@admin.register(HomeBlog)
class HomeBlogAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo', 'id')
    list_filter = ('ativo',)
    search_fields = ('titulo', 'subtitulo', 'descricao')
    fieldsets = (
        ('Conteúdo', {
            'fields': ('subtitulo', 'titulo', 'descricao', 'texto_botao', 'link_botao')
        }),
        ('Imagens', {
            'fields': ('imagem_1', 'imagem_2')
        }),
        ('Configuração', {
            'fields': ('ativo',)
        }),
    )

@admin.register(HomeContato)
class HomeContatoAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo', 'id')
    list_filter = ('ativo',)
    search_fields = ('titulo', 'subtitulo', 'descricao')
    fieldsets = (
        ('Conteúdo', {
            'fields': ('subtitulo', 'titulo', 'descricao')
        }),
        ('Botões e Links', {
            'fields': ('texto_whatsapp', 'link_whatsapp', 'texto_botao_form')
        }),
        ('Configuração', {
            'fields': ('ativo',)
        }),
    )

# ==============================================================================
# 2. CONTEÚDO (Listas e Internas)
# ==============================================================================

@admin.register(Atuacao)
class AtuacaoAdmin(ModelAdmin):
    list_display = ('titulo', 'slug', 'ordem', 'ativo', 'id')
    prepopulated_fields = {'slug': ('titulo',)}
    list_editable = ('ordem', 'ativo')
    list_filter = ('ativo',)
    search_fields = ('titulo', 'descricao_curta')
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('titulo', 'slug', 'icone', 'descricao_curta')
        }),
        ('Página Interna', {
            'fields': ('imagem_capa', 'conteudo')
        }),
        ('Configuração', {
            'fields': ('ordem', 'ativo')
        }),
    )

@admin.register(MembroEquipe)
class MembroEquipeAdmin(ModelAdmin):
    list_display = ('nome', 'cargo', 'ordem')
    list_editable = ('ordem',)
    search_fields = ('nome', 'cargo')
    list_filter = ('cargo',)

@admin.register(BlogPost)
class BlogPostAdmin(ModelAdmin):
    list_display = ('titulo', 'publicado_em', 'destaque', 'autor_nome', 'id')
    list_filter = ('publicado_em', 'destaque')
    search_fields = ('titulo', 'resumo', 'autor_nome')
    prepopulated_fields = {'slug': ('titulo',)}
    readonly_fields = ('publicado_em',)
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('titulo', 'slug', 'autor_nome', 'destaque')
        }),
        ('Conteúdo', {
            'fields': ('capa', 'resumo', 'conteudo')
        }),
        ('Data', {
            'fields': ('publicado_em',)
        }),
    )

# ==============================================================================
# 3. PÁGINAS ÚNICAS
# ==============================================================================

class GaleriaInline(TabularInline): # <-- Trocado admin.TabularInline por TabularInline
    model = GaleriaQuemSomos
    extra = 1

@admin.register(PaginaQuemSomos)
class PaginaQuemSomosAdmin(ModelAdmin):
    list_display = ('titulo_principal', 'id')
    search_fields = ('titulo_principal', 'subtitulo_principal', 'descricao_principal')
    inlines = [GaleriaInline]
    fieldsets = (
        ('Banner e Conteúdo Principal', {
            'fields': ('banner_topo', 'titulo_principal', 'subtitulo_principal', 'descricao_principal', 'imagem_lateral')
        }),
        ('Missão, Visão e Valores', {
            'fields': ('missao', 'visao', 'valores')
        }),
        ('Mapa', {
            'fields': ('iframe_mapa',)
        }),
    )

# ==============================================================================
# 4. CONTATO
# ==============================================================================

@admin.register(Contato)
class ContatoAdmin(ModelAdmin):
    list_display = ('nome', 'email', 'lido', 'respondido', 'criado_em')
    list_filter = ('lido', 'respondido', 'criado_em')
    search_fields = ('nome', 'email', 'mensagem')
    readonly_fields = ('criado_em',)
    list_editable = ('lido', 'respondido')