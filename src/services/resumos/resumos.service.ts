import api from '../api';
import type { Resumo, ResumosPage } from './resumos.type';

export interface ResumoFormData {
  titulo: string;
  conteudo: string;
}

const resumosService = {
  getAll: async (page = 0, size = 20): Promise<ResumosPage> => {
    const res = await api.get<ResumosPage>('/resumos', {
      params: { page, size },
    });
    return res.data;
  },
  create: async (data: ResumoFormData): Promise<Resumo> => {
    const res = await api.post<Resumo>('/resumos', data);
    return res.data;
  },
  findById: async (id: string): Promise<Resumo> => {
    const res = await api.get<Resumo>(`/api/resumos/${id}`);
    return res.data;
  },
};

export default resumosService;
