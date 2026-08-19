import api from '../api';
import type { Anotacao, Anotacoes } from './anotacoes.type';

export interface AnotacaoFormData {
  texto: string;
}

export interface AnotacaoFavoritoResponse {
  id_anotacao: string;
  favorito: boolean;
}

const anotacoesService = {
  getAll: async (resumoId: string): Promise<Anotacoes> => {
    const res = await api.get<Anotacoes>(`/resumos/${resumoId}/anotacoes`);
    return res.data;
  },
  create: async (
    resumoId: string,
    data: AnotacaoFormData
  ): Promise<Anotacao> => {
    const res = await api.post<Anotacao>(
      `/resumos/${resumoId}/anotacoes`,
      data
    );
    return res.data;
  },
  update: async (anotacaoId: string, texto: string): Promise<Anotacao> => {
    const res = await api.put<Anotacao>(
      `/resumos/${anotacaoId}/anotacoes`,
      null,
      { params: { texto } }
    );
    return res.data;
  },
  delete: async (anotacaoId: string): Promise<boolean> => {
    const res = await api.delete<boolean>(
      `/resumos/${anotacaoId}/anotacoes`
    );
    return res.data;
  },
  toggleFavorite: async (
    anotacaoId: string
  ): Promise<AnotacaoFavoritoResponse> => {
    const res = await api.post<AnotacaoFavoritoResponse>(
      `/anotacoes/${anotacaoId}/favoritos`
    );
    return res.data;
  },
};

export default anotacoesService;
