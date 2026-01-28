from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import (
    HeroHome, HomeAtuacao, HomeEquipe, 
    Atuacao, MembroEquipe, BlogPost,
    PaginaQuemSomos, QuemSomos,
    HomeBlog, HomeContato, Historia, Diferencial
)
from .serializers import (
    HeroHomeSerializer, HomeAtuacaoSerializer, HomeEquipeSerializer,
    AtuacaoSerializer, MembroEquipeSerializer, BlogPostSerializer,
    PaginaQuemSomosSerializer, HomeBlogSerializer, HomeContatoSerializer,
    HistoriaSerializer, DiferencialSerializer, QuemSomosSerializer
)

# ==============================================================================
# 1. VIEWS DE CONTEÚDO (Listagem e Internas)
# ==============================================================================

class AtuacaoViewSet(viewsets.ReadOnlyModelViewSet):
    # Filtra apenas as ativas e ordena
    queryset = Atuacao.objects.filter(ativo=True).order_by('ordem')
    serializer_class = AtuacaoSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug' # Permite acessar via /api/atuacoes/direito-civil/

class MembroEquipeViewSet(viewsets.ReadOnlyModelViewSet):
    # Alterado de Equipe para MembroEquipe
    queryset = MembroEquipe.objects.all().order_by('ordem')
    serializer_class = MembroEquipeSerializer
    permission_classes = [AllowAny]

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.all().order_by('-publicado_em')
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    # Adicionamos um filtro extra para pegar apenas os destaques na Home se quiser
    # Ex: /api/blog/?destaque=true
    def get_queryset(self):
        queryset = super().get_queryset()
        destaque = self.request.query_params.get('destaque')
        if destaque == 'true':
            queryset = queryset.filter(destaque=True)
        return queryset

# ==============================================================================
# 2. VIEWS DA HOME PAGE
# ==============================================================================

class HeroHomeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroHome.objects.filter(ativo=True).order_by('-id') 
    serializer_class = HeroHomeSerializer
    permission_classes = [AllowAny]

class QuemSomosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = QuemSomos.objects.filter(ativo=True).order_by('-id')
    serializer_class = QuemSomosSerializer
    permission_classes = [AllowAny]

class DiferencialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Diferencial.objects.filter(ativo=True).order_by('ordem')
    serializer_class = DiferencialSerializer
    permission_classes = [AllowAny]

class HomeAtuacaoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeAtuacao.objects.filter(ativo=True).order_by('-id')
    serializer_class = HomeAtuacaoSerializer
    permission_classes = [AllowAny]

class HistoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Historia.objects.filter(ativo=True).order_by('-id')
    serializer_class = HistoriaSerializer
    permission_classes = [AllowAny]

class HomeEquipeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeEquipe.objects.filter(ativo=True).order_by('-id')
    serializer_class = HomeEquipeSerializer
    permission_classes = [AllowAny]

class HomeBlogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeBlog.objects.filter(ativo=True).order_by('-id')
    serializer_class = HomeBlogSerializer
    permission_classes = [AllowAny]

class HomeContatoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeContato.objects.filter(ativo=True).order_by('-id')
    serializer_class = HomeContatoSerializer
    permission_classes = [AllowAny]

# ==============================================================================
# 3. PÁGINAS ESTÁTICAS
# ==============================================================================

class PaginaQuemSomosViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PaginaQuemSomos.objects.all()
    serializer_class = PaginaQuemSomosSerializer
    permission_classes = [AllowAny]