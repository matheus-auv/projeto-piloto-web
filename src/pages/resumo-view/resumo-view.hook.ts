import { useEffect, useState } from 'react';
import type { Resumo } from '../../services/resumos/resumos.type';
import resumosService from '../../services/resumos/resumos.service';
import resumosFavoritosService from '../../services/resumos-favoritos/resumos-favoritos.service';
import { useNavigate, useParams } from 'react-router';
import type { ResumoFormData } from '../../services/resumos/resumos.service';
import anotacoesService from '../../services/anotacoes/anotacoes.service';
import type { Anotacoes } from '../../services/anotacoes/anotacoes.type';
import type { AnotacaoFormData } from '../../services/anotacoes/anotacoes.service';

export const useResumoHook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anotacoes, setAnotacoes] = useState<Anotacoes>([]);
  const [isSubmittingAnotacao, setIsSubmittingAnotacao] = useState(false);
  const [isDeletingAnotacao, setIsDeletingAnotacao] = useState(false);

  useEffect(() => {
    const buscarResumo = async () => {
      if (!id) {
        return;
      }

      try {
        const data = await resumosService.findById(id);
        setResumo(data);
        const anotacoesData = await anotacoesService.getAll(id);
        setAnotacoes(anotacoesData);
      } catch {
        console.log('Erro ao carregar resumo');
      }
    };

    buscarResumo();
  }, [id]);

  const salvarAnotacao = async (data: AnotacaoFormData) => {
    if (!id) return false;

    setIsSubmittingAnotacao(true);
    try {
      const anotacao = await anotacoesService.create(id, data);
      setAnotacoes(current => {
        const atualizadas = [anotacao, ...current];

        return atualizadas.sort(
          (a, b) => Number(Boolean(b.favorita)) - Number(Boolean(a.favorita))
        );
      });
      return true;
    } catch {
      console.log('Erro ao salvar anotação');
      return false;
    } finally {
      setIsSubmittingAnotacao(false);
    }
  };

  const editarAnotacao = async (anotacaoId: string, texto: string) => {
    setIsSubmittingAnotacao(true);
    try {
      const anotacaoAtualizada = await anotacoesService.update(
        anotacaoId,
        texto
      );
      setAnotacoes(current =>
        current.map(anotacao =>
          anotacao.id === anotacaoId ? anotacaoAtualizada : anotacao
        )
      );
      return true;
    } catch {
      return false;
    } finally {
      setIsSubmittingAnotacao(false);
    }
  };

  const excluirAnotacao = async (anotacaoId: string) => {
    if (!id) return false;
    console.log(anotacaoId);
    setIsDeletingAnotacao(true);
    try {
      const deleted = await anotacoesService.delete(anotacaoId);
      if (deleted) {
        setAnotacoes(current =>
          current.filter(anotacao => anotacao.id !== anotacaoId)
        );
      }
      return deleted;
    } catch {
      return false;
    } finally {
      setIsDeletingAnotacao(false);
    }
  };

  const favoritarAnotacao = async (anotacaoId: string) => {
    try {
      const data = await anotacoesService.toggleFavorite(anotacaoId);
      setAnotacoes(current => {
        const atualizadas = current.map(anotacao =>
          anotacao.id === anotacaoId
            ? { ...anotacao, favorita: data.favorito }
            : anotacao
        );

        return atualizadas.sort(
          (a, b) => Number(Boolean(b.favorita)) - Number(Boolean(a.favorita))
        );
      });
      return data.favorito;
    } catch {
      return null;
    }
  };

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

  const excluirResumo = async () => {
    if (!resumo) {
      return false;
    }

    setIsSubmitting(true);
    try {
      await resumosService.delete(resumo.id);
      navigate('/');
      return true;
    } catch {
      console.log('Erro ao excluir resumo');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    resumo,
    anotacoes,
    favoritar,
    editarResumo,
    excluirResumo,
    isEditModalOpen,
    setIsEditModalOpen,
    isSubmitting,
    salvarAnotacao,
    isSubmittingAnotacao,
    editarAnotacao,
    excluirAnotacao,
    favoritarAnotacao,
    isDeletingAnotacao,
  };
};
