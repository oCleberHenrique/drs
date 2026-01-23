from django.contrib import admin
from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin
from unfold.decorators import display
from .models import Atuacao, Diferencial, Equipe, BlogPost, HeroHome, Historia, HomeAtuacao, HomeBlog, HomeContato, HomeEquipe, QuemSomos

@admin.register(Atuacao)
class AtuacaoAdmin(ModelAdmin):
    # CORREÇÃO: Os campos em list_editable devem estar em list_display
    list_display = ["titulo", "ordem", "ativo"] 
    list_editable = ["ordem", "ativo"]
    search_fields = ["titulo"]

@admin.register(Equipe)
class EquipeAdmin(ModelAdmin):
    list_display = ["nome", "cargo", "ordem", "foto_preview"]
    list_editable = ["ordem"]
    search_fields = ["nome", "cargo"]

    # CORREÇÃO: Removemos header=True e usamos mark_safe
    @display(description="Foto") 
    def foto_preview(self, obj):
        if obj.foto:
            return mark_safe(f'<img src="{obj.foto.url}" width="50" height="50" style="object-fit:cover; border-radius: 50%;" />')
        return "-"

@admin.register(BlogPost)
class BlogAdmin(ModelAdmin):
    list_display = ["titulo", "publicado_em", "destaque_badge", "autor"]
    list_filter = ["publicado_em", "destaque"]
    search_fields = ["titulo", "resumo"]

    @display(description="Destaque", label={True: "warning", False: "default"})
    def destaque_badge(self, obj):
        return obj.destaque
    
@admin.register(HeroHome)
class HeroHomeAdmin(ModelAdmin):
    list_display = ["titulo_preview", "ativo", "imagem_preview"]
    list_editable = ["ativo"]

    @display(description="Título")
    def titulo_preview(self, obj):
        return obj.titulo[:50] + "..."

    @display(description="Imagem") 
    def imagem_preview(self, obj):
        if obj.imagem_fundo:
             return mark_safe(f'<img src="{obj.imagem_fundo.url}" style="width: 100px; height: auto; border-radius: 4px;">')
        return "-"
    
@admin.register(QuemSomos)
class QuemSomosAdmin(ModelAdmin):
    list_display = ["titulo", "ativo"]
    list_editable = ["ativo"]

@admin.register(Diferencial)
class DiferencialAdmin(ModelAdmin):
    list_display = ["titulo", "ordem", "ativo"]
    list_editable = ["ordem", "ativo"]

@admin.register(HomeAtuacao)
class HomeAtuacaoAdmin(ModelAdmin):
    list_display = ["titulo", "ativo"]

@admin.register(Historia)
class HistoriaAdmin(ModelAdmin):
    list_display = ["titulo", "ativo"]

@admin.register(HomeEquipe)
class HomeEquipeAdmin(ModelAdmin):
    list_display = ["titulo", "ativo"]

@admin.register(HomeBlog)
class HomeBlogAdmin(ModelAdmin):
    list_display = ["titulo", "ativo"]

@admin.register(HomeContato)
class HomeContatoAdmin(ModelAdmin):
    list_display = ["titulo", "ativo"]

from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import (
    # ... outros models ...
    PaginaQuemSomos, GaleriaQuemSomos
)


class GaleriaInline(TabularInline):
    model = GaleriaQuemSomos
    extra = 1
    tab = True

@admin.register(PaginaQuemSomos)
class PaginaQuemSomosAdmin(ModelAdmin):
    inlines = [GaleriaInline] 
    
