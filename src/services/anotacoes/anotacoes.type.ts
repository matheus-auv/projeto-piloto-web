export interface Anotacao {
  id: string;
  texto: string;
  dataCriacao: string;
  favorita?: boolean;
}

export type Anotacoes = Anotacao[];
