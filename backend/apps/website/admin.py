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
class HeroHomeAdmin(ModelAdmin): # <-- Trocado admin.ModelAdmin por ModelAdmin
    list_display = ('titulo', 'ativo')

@admin.register(QuemSomos)
class QuemSomosAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(Diferencial)
class DiferencialAdmin(ModelAdmin):
    list_display = ('titulo', 'ordem', 'ativo')
    list_editable = ('ordem', 'ativo')

@admin.register(HomeAtuacao)
class HomeAtuacaoAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(Historia)
class HistoriaAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(HomeEquipe)
class HomeEquipeAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(HomeBlog)
class HomeBlogAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(HomeContato)
class HomeContatoAdmin(ModelAdmin):
    list_display = ('titulo', 'ativo')

# ==============================================================================
# 2. CONTEÚDO (Listas e Internas)
# ==============================================================================

@admin.register(Atuacao)
class AtuacaoAdmin(ModelAdmin):
    list_display = ('titulo', 'slug', 'ordem', 'ativo')
    prepopulated_fields = {'slug': ('titulo',)}
    list_editable = ('ordem', 'ativo')
    search_fields = ('titulo',)

@admin.register(MembroEquipe)
class MembroEquipeAdmin(ModelAdmin):
    list_display = ('nome', 'cargo', 'ordem')
    list_editable = ('ordem',)
    search_fields = ('nome', 'cargo')
    list_filter = ('cargo',)

@admin.register(BlogPost)
class BlogPostAdmin(ModelAdmin):
    list_display = ('titulo', 'publicado_em', 'destaque')
    list_filter = ('publicado_em', 'destaque')
    search_fields = ('titulo', 'resumo')
    prepopulated_fields = {'slug': ('titulo',)}

# ==============================================================================
# 3. PÁGINAS ÚNICAS
# ==============================================================================

class GaleriaInline(TabularInline): # <-- Trocado admin.TabularInline por TabularInline
    model = GaleriaQuemSomos
    extra = 1

@admin.register(PaginaQuemSomos)
class PaginaQuemSomosAdmin(ModelAdmin):
    inlines = [GaleriaInline]

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