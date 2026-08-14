import { useEffect, useState } from 'react';
import resumosService from '../../services/resumos/resumos.service';
import type { Resumos } from '../../services/resumos/resumos.type';

export const useResumosHook = () => {
  const [resumos, setResumos] = useState<Resumos>([]);

  useEffect(() => {
    const buscarResumos = async () => {
      try {
        const data = await resumosService.getAll();
        console.log(data);
        setResumos(data);
      } catch {
        console.log('Erro ao carregar resumos');
      }
    };

    buscarResumos();
  }, []);

  return {
    resumos,
  };
};
