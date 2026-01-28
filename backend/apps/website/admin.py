from django.contrib import admin
from .models import (
    HeroHome, HomeAtuacao, HomeEquipe, 
    Atuacao, MembroEquipe, BlogPost,
    PaginaQuemSomos, GaleriaQuemSomos,
    HomeBlog, HomeContato, Historia, Diferencial, QuemSomos
)

# ==============================================================================
# 1. HOME PAGE
# ==============================================================================

@admin.register(HeroHome)
class HeroHomeAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(QuemSomos)
class QuemSomosAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(Diferencial)
class DiferencialAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'ordem', 'ativo')
    list_editable = ('ordem', 'ativo')

@admin.register(HomeAtuacao)
class HomeAtuacaoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(Historia)
class HistoriaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(HomeEquipe)
class HomeEquipeAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(HomeBlog)
class HomeBlogAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'ativo')

@admin.register(HomeContato)
class HomeContatoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'ativo')

# ==============================================================================
# 2. CONTEÚDO (Listas e Internas)
# ==============================================================================

@admin.register(Atuacao)
class AtuacaoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'slug', 'ordem', 'ativo')
    prepopulated_fields = {'slug': ('titulo',)}
    list_editable = ('ordem', 'ativo')
    search_fields = ('titulo',)

@admin.register(MembroEquipe) # <--- Corrigido de Equipe para MembroEquipe
class MembroEquipeAdmin(admin.ModelAdmin):
    list_display = ('nome', 'cargo', 'ordem')
    list_editable = ('ordem',)
    search_fields = ('nome', 'cargo')
    list_filter = ('cargo',)

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'publicado_em', 'destaque')
    list_filter = ('publicado_em', 'destaque')
    search_fields = ('titulo', 'resumo')
    prepopulated_fields = {'slug': ('titulo',)}

# ==============================================================================
# 3. PÁGINAS ÚNICAS
# ==============================================================================

class GaleriaInline(admin.TabularInline):
    model = GaleriaQuemSomos
    extra = 1

@admin.register(PaginaQuemSomos)
class PaginaQuemSomosAdmin(admin.ModelAdmin):
    inlines = [GaleriaInline]
    
  
    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return True