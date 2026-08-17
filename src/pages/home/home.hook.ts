import { useEffect, useState } from 'react';
import resumosService, {
  type ResumoFormData,
} from '../../services/resumos/resumos.service';
import type { Resumos, ResumosPage } from '../../services/resumos/resumos.type';
import resumosFavoritosService from '../../services/resumos-favoritos/resumos-favoritos.service';

export const useResumosHook = () => {
  const [resumos, setResumos] = useState<Resumos>([]);
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState<ResumosPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const buscarResumos = async () => {
      setIsLoading(true);
      try {
        const data = await resumosService.getAll(page);
        setResumos(data.content ?? []);
        setPagination(data);
      } catch {
        console.log('Erro ao carregar resumos');
      } finally {
        setIsLoading(false);
      }
    };

    buscarResumos();
  }, [page]);

  const salvarResumo = async (data: ResumoFormData) => {
    setIsSubmitting(true);
    try {
      const resumo = await resumosService.create(data);
      if (page === 0) {
        setResumos(current => {
          const pageSize = pagination?.size ?? 20;

          if (current.length >= pageSize) {
            return current;
          }

          return [{ ...resumo, favorito: false }, ...current];
        });
        setPagination(current =>
          current
            ? {
                ...current,
                totalElements: current.totalElements + 1,
                totalPages: Math.ceil(
                  (current.totalElements + 1) / current.size
                ),
              }
            : current
        );
      } else {
        setPage(0);
      }
      return true;
    } catch {
      console.log('Erro ao salvar resumo');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const favoritar = async (resumoId: string) => {
    try {
      const data = await resumosFavoritosService.toggle(resumoId);
      setResumos(current =>
        current.map(resumo =>
          resumo.id === resumoId
            ? { ...resumo, favorito: data.favorito }
            : resumo
        )
      );
      return data.favorito;
    } catch {
      console.log('Erro ao atualizar favorito');
      return null;
    }
  };

  const irParaPagina = (pagina: number) => {
    if (!pagination || pagina < 0 || pagina >= pagination.totalPages) {
      return;
    }

    setPage(pagina);
  };

  return {
    resumos,
    page,
    pagination,
    isLoading,
    salvarResumo,
    favoritar,
    irParaPagina,
    isSubmitting,
  };
};
