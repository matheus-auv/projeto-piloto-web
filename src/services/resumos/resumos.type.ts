export interface Resumo {
  id: string;
  titulo: string;
  conteudo: string;
  dataCriacao: string;
  favorito: boolean;
}

export type Resumos = Resumo[];
