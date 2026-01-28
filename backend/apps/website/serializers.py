from rest_framework import serializers
from .models import (
    HeroHome, HomeAtuacao, HomeEquipe, 
    Atuacao, MembroEquipe, BlogPost,
    PaginaQuemSomos, GaleriaQuemSomos,
    HomeBlog, HomeContato, Historia, Diferencial,
    QuemSomos # <--- Importante: Importar o model da Home
)

# ==============================================================================
# 1. SERIALIZERS DA HOME (Dados curtos)
# ==============================================================================

class HeroHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroHome
        fields = '__all__'

class QuemSomosSerializer(serializers.ModelSerializer): # <--- ADICIONADO (Faltava este)
    class Meta:
        model = QuemSomos
        fields = '__all__'

class HomeAtuacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeAtuacao
        fields = '__all__'

class HomeEquipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeEquipe
        fields = '__all__'

class HomeBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeBlog
        fields = '__all__'

class HomeContatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeContato
        fields = '__all__'

class HistoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historia
        fields = '__all__'

class DiferencialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diferencial
        fields = '__all__'

# ==============================================================================
# 2. SERIALIZERS DE CONTEÚDO (Listas e Internas)
# ==============================================================================

class AtuacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atuacao
        fields = '__all__'

class MembroEquipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembroEquipe
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    publicado_em_formatado = serializers.DateTimeField(source='publicado_em', format="%d/%m/%Y", read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'titulo', 'slug', 'capa', 'resumo', 'conteudo', 'publicado_em', 'publicado_em_formatado', 'autor_nome', 'destaque']

# ==============================================================================
# 3. SERIALIZERS DE PÁGINAS ESTÁTICAS
# ==============================================================================

class GaleriaQuemSomosSerializer(serializers.ModelSerializer):
    class Meta:
        model = GaleriaQuemSomos
        fields = ['id', 'imagem', 'legenda']

class PaginaQuemSomosSerializer(serializers.ModelSerializer):
    imagens_galeria = GaleriaQuemSomosSerializer(many=True, read_only=True)

    class Meta:
        model = PaginaQuemSomos
        fields = '__all__'