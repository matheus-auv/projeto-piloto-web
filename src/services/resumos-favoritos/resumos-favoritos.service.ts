import api from '../api';
import type { ResumoFavorito } from './resumos-favoritos.type';

const resumosFavoritosService = {
  toggle: async (resumoId: string): Promise<ResumoFavorito> => {
    const res = await api.post<ResumoFavorito>(
      `/resumos/${resumoId}/favoritos`
    );
    return res.data;
  },
};

export default resumosFavoritosService;
