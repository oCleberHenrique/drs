from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Atuacao, Diferencial, Equipe, BlogPost, HeroHome, Historia, HomeAtuacao, HomeBlog, HomeContato, HomeEquipe, PaginaQuemSomos, QuemSomos
from .serializers import (
    AtuacaoSerializer, 
    AtuacaoDetalheSerializer,
    DiferencialSerializer, 
    EquipeSerializer, 
    BlogPostSerializer, HeroHomeSerializer,
    HistoriaSerializer,
    HomeAtuacaoSerializer,
    HomeBlogSerializer,
    HomeContatoSerializer,
    HomeEquipeSerializer,
    PaginaQuemSomosSerializer, QuemSomosSerializer
)

class AtuacaoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Atuacao.objects.filter(ativo=True).order_by('ordem')
    permission_classes = [AllowAny]
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return AtuacaoDetalheSerializer
        return AtuacaoSerializer

class EquipeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Equipe.objects.all().order_by('ordem')
    serializer_class = EquipeSerializer
    permission_classes = [AllowAny]

class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.all().order_by('-publicado_em')
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


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

class PaginaQuemSomosViewSet(viewsets.ReadOnlyModelViewSet):
    # Pega o primeiro registro encontrado
    queryset = PaginaQuemSomos.objects.all()
    serializer_class = PaginaQuemSomosSerializer
    permission_classes = [AllowAny]