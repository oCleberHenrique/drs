export interface Atuacao {
  id: number;
  titulo: string;
  descricao_curta: string;
  conteudo?: string;
  icone: string;
  slug: string;
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

export interface QuemSomosData {
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