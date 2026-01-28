from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

# Importando as Views com os NOMES NOVOS que definimos no views.py
# Note que mudamos EquipeViewSet para MembroEquipeViewSet e BlogViewSet para BlogPostViewSet
from apps.website.views import (
    HeroHomeViewSet, HomeAtuacaoViewSet, HomeEquipeViewSet,
    AtuacaoViewSet, MembroEquipeViewSet, BlogPostViewSet,
    PaginaQuemSomosViewSet, HomeBlogViewSet, HomeContatoViewSet,
    HistoriaViewSet, DiferencialViewSet, QuemSomosViewSet
)

# Configuração do Roteador da API
router = DefaultRouter()

# --- 1. HOME PAGE (Seções) ---
router.register(r'hero', HeroHomeViewSet)
router.register(r'quem-somos-home', QuemSomosViewSet) # Renomeado rota para diferenciar da página interna
router.register(r'diferenciais', DiferencialViewSet)
router.register(r'home-atuacao', HomeAtuacaoViewSet)
router.register(r'historia', HistoriaViewSet)
router.register(r'home-equipe', HomeEquipeViewSet)
router.register(r'home-blog', HomeBlogViewSet)
router.register(r'home-contato', HomeContatoViewSet)

# --- 2. CONTEÚDOS (Listas e Internas) ---
router.register(r'atuacoes', AtuacaoViewSet)
router.register(r'equipe', MembroEquipeViewSet) # <--- Atualizado
router.register(r'blog', BlogPostViewSet)       # <--- Atualizado

# --- 3. PÁGINAS ÚNICAS ---
router.register(r'pagina-quem-somos', PaginaQuemSomosViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)), # Prefixo /api/ para tudo
]

# Servir arquivos de media (imagens) em desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)