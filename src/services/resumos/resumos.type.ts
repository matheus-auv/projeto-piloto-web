export interface Resumo {
  id: string;
  titulo: string;
  conteudo: string;
  dataCriacao: string;
  favorito: boolean;
}

export type Resumos = Resumo[];

export interface ResumosPage {
  content: Resumos;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
