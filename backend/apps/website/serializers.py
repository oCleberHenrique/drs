from rest_framework import serializers
from .models import Atuacao, Diferencial, Equipe, BlogPost, HeroHome, Historia, HomeAtuacao, HomeBlog, HomeContato, HomeEquipe, QuemSomos


class AtuacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atuacao
        fields = ["id", "titulo", "descricao_curta", "icone", "slug"]

class AtuacaoDetalheSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atuacao
        fields = "__all__"

class EquipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipe
        fields = "__all__"

class BlogPostSerializer(serializers.ModelSerializer):
    autor_nome = serializers.CharField(source="autor.username", read_only=True)
    
    class Meta:
        model = BlogPost
        fields = ["id", "titulo", "slug", "capa", "resumo", "publicado_em", "autor_nome", "destaque"]

class HeroHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroHome
        fields = "__all__"

class QuemSomosSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuemSomos
        fields = "__all__"

class DiferencialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diferencial
        fields = "__all__"

class HomeAtuacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeAtuacao
        fields = "__all__"

class HistoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historia
        fields = "__all__"

class HomeEquipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeEquipe
        fields = "__all__"

class HomeBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeBlog
        fields = "__all__"

class HomeContatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeContato
        fields = "__all__"

from .models import PaginaQuemSomos, GaleriaQuemSomos

class GaleriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GaleriaQuemSomos
        fields = "__all__"

class PaginaQuemSomosSerializer(serializers.ModelSerializer):
    imagens_galeria = GaleriaSerializer(many=True, read_only=True)

    class Meta:
        model = PaginaQuemSomos
        fields = "__all__"