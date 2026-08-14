import { useEffect, useState } from 'react';
import resumosService, {
  type ResumoFormData,
} from '../../services/resumos/resumos.service';
import type { Resumos } from '../../services/resumos/resumos.type';

export const useResumosHook = () => {
  const [resumos, setResumos] = useState<Resumos>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const salvarResumo = async (data: ResumoFormData) => {
    setIsSubmitting(true);
    try {
      const resumo = await resumosService.create(data);
      setResumos(current => [resumo, ...current]);
      return true;
    } catch {
      console.log('Erro ao salvar resumo');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    resumos,
    salvarResumo,
    isSubmitting,
  };
};
