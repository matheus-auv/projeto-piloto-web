import api from '../api';
import type { Resumos } from './resumos.type';

interface ResumosResponse {
  content: Resumos;
}

const resumosService = {
  getAll: async (): Promise<Resumos> => {
    const res = await api.get<ResumosResponse>('/resumos');
    return res.data.content ?? [];
  },
};

export default resumosService;
