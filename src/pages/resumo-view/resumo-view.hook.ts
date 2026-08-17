import { useEffect, useState } from 'react';
import type { Resumo } from '../../services/resumos/resumos.type';
import resumosService from '../../services/resumos/resumos.service';
import { useParams } from 'react-router';

export const useResumoHook = () => {
  const { id } = useParams<{ id: string }>();
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const buscarResumo = async () => {
      if (!id) {
        return;
      }

      setIsLoading(true);
      try {
        const data = await resumosService.findById(id);
        setResumo(data);
      } catch {
        console.log('Erro ao carregar resumo');
      } finally {
        setIsLoading(false);
      }
    };

    buscarResumo();
  }, [id]);

  return {
    resumo,
    isLoading,
  };
};
