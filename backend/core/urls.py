from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from apps.website.views import AtuacaoViewSet, DiferencialViewSet, EquipeViewSet, BlogViewSet, HeroHomeViewSet, HistoriaViewSet, HomeAtuacaoViewSet, HomeBlogViewSet, HomeContatoViewSet, HomeEquipeViewSet, PaginaQuemSomosViewSet, QuemSomosViewSet

# Configuração do Roteador da API
router = DefaultRouter()
router.register(r'atuacoes', AtuacaoViewSet)
router.register(r'equipe', EquipeViewSet)
router.register(r'blog', BlogViewSet)
router.register(r'hero', HeroHomeViewSet)
router.register(r'quem-somos', QuemSomosViewSet)
router.register(r'diferenciais', DiferencialViewSet)
router.register(r'home-atuacao', HomeAtuacaoViewSet)
router.register(r'historia', HistoriaViewSet)
router.register(r'home-equipe', HomeEquipeViewSet)
router.register(r'home-blog', HomeBlogViewSet)
router.register(r'home-contato', HomeContatoViewSet)
router.register(r'pagina-quem-somos', PaginaQuemSomosViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)), # Prefixo /api/ para tudo
]

# Servir arquivos de media (imagens) em desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)