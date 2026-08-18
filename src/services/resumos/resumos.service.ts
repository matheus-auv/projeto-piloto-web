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
  update: async (id: string, data: ResumoFormData): Promise<Resumo> => {
    const res = await api.put<Resumo>(`/resumos/${id}`, data);
    return res.data;
  },
  findById: async (id: string): Promise<Resumo> => {
    const res = await api.get<Resumo>(`/resumos/${id}`);
    return res.data;
  },
};

export default resumosService;
