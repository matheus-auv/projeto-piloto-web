import { useEffect, useState } from 'react';
import type { Resumo } from '../../services/resumos/resumos.type';
import resumosService from '../../services/resumos/resumos.service';
import resumosFavoritosService from '../../services/resumos-favoritos/resumos-favoritos.service';
import { useParams } from 'react-router';

export const useResumoHook = () => {
  const { id } = useParams<{ id: string }>();
  const [resumo, setResumo] = useState<Resumo | null>(null);

  useEffect(() => {
    const buscarResumo = async () => {
      if (!id) {
        return;
      }

      try {
        const data = await resumosService.findById(id);
        setResumo(data);
      } catch {
        console.log('Erro ao carregar resumo');
      }
    };

    buscarResumo();
  }, [id]);

  const favoritar = async () => {
    if (!resumo) {
      return null;
    }

    try {
      const data = await resumosFavoritosService.toggle(resumo.id);
      setResumo(current =>
        current ? { ...current, favorito: data.favorito } : current
      );
      return data.favorito;
    } catch {
      console.log('Erro ao atualizar favorito');
      return null;
    }
  };

  return {
    resumo,
    favoritar,
  };
};
