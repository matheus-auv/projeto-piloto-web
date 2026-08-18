import { useEffect, useState } from 'react';
import type { Resumo } from '../../services/resumos/resumos.type';
import resumosService from '../../services/resumos/resumos.service';
import resumosFavoritosService from '../../services/resumos-favoritos/resumos-favoritos.service';
import { useParams } from 'react-router';
import type { ResumoFormData } from '../../services/resumos/resumos.service';

export const useResumoHook = () => {
  const { id } = useParams<{ id: string }>();
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const editarResumo = async (data: ResumoFormData) => {
    if (!resumo) {
      return;
    }

    setIsSubmitting(true);
    try {
      const dataAtualizada = await resumosService.update(resumo.id, data);
      setResumo(dataAtualizada);
      setIsEditModalOpen(false);
    } catch {
      console.log('Erro ao atualizar resumo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    resumo,
    favoritar,
    editarResumo,
    isEditModalOpen,
    setIsEditModalOpen,
    isSubmitting,
  };
};
