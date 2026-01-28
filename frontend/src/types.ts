// frontend/src/types.ts

// --- Tipos da Home e Gerais ---

export interface Atuacao {
  id: number;
  titulo: string;
  slug: string;
  descricao_curta: string;
  conteudo?: string;
  icone: string;
  imagem_capa?: string;
}

export interface BlogPost {
  id: number;
  titulo: string;
  slug: string;
  capa: string;
  resumo: string;
  conteudo?: string;
  publicado_em: string;
  autor_nome: string;
  destaque: boolean;
}

export interface HeroData {
  id: number;
  titulo: string;
  subtitulo: string;
  texto_botao: string;
  link_botao: string;
  imagem_fundo: string;
}

export interface HomeAtuacaoData {
  titulo: string;
  descricao: string;
  texto_cta: string;
  texto_botao: string;
  link_botao: string;
}

export interface HomeEquipeData {
  subtitulo: string;
  titulo: string;
  descricao: string;
  textura_fundo: string;
  texto_botao: string;
  link_botao: string;
}

export interface QuemSomosHomeData {
  id: number;
  titulo: string;
  texto: string;
  imagem_fundo: string;
  imagem_frente: string;
}

export interface Diferencial {
  id: number;
  titulo: string;
  descricao: string;
}

// --- Novos Tipos: Página Interna "Quem Somos" ---

export interface GaleriaItem {
  id: number;
  imagem: string;
  legenda: string;
}

export interface PaginaQuemSomosData {
  id?: number;
  banner_topo: string;
  titulo_principal: string;
  subtitulo_principal: string;
  descricao_principal: string;
  imagem_lateral: string;
  missao: string;
  visao: string;
  valores: string;
  iframe_mapa: string;
  imagens_galeria: GaleriaItem[];
}

// --- Novo Tipo: Membro da Equipe (Correção do erro vermelho) ---

export interface MembroEquipe {
  id: number;
  nome: string;
  cargo: string;
  foto: string;
  bio?: string;   
  linkedin?: string; 
  email?: string;   
}