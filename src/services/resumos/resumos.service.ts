import api from '../api';
import type { Resumo, Resumos } from './resumos.type';

interface ResumosResponse {
  content: Resumos;
}

export interface ResumoFormData {
  titulo: string;
  conteudo: string;
}

const resumosService = {
  getAll: async (): Promise<Resumos> => {
    const res = await api.get<ResumosResponse>('/resumos');
    return res.data.content ?? [];
  },
  create: async (data: ResumoFormData): Promise<Resumo> => {
    const res = await api.post<Resumo>('/resumos', data);
    return res.data;
  },
};

export default resumosService;
