import { ArrowLeft, Pencil, PlusCircle, Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { useResumoHook } from './resumo-view.hook';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { ResumoFormModal } from '../../components/resumo-form-modal/resumo-form-modal.layout';
import type { ResumoFormData } from '../../services/resumos/resumos.service';
import type { AnotacaoFormData } from '../../services/anotacoes/anotacoes.service';
import type { Anotacao } from '../../services/anotacoes/anotacoes.type';
import { formatarDataCriacao } from '../../utils/date';
import { ConfirmModal } from './components/confirm-modal';
export const ResumoViewLayout = () => {
  const {
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
  } = useResumoHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anotacaoEmEdicao, setAnotacaoEmEdicao] = useState<string | null>(null);
  const [anotacaoParaExcluir, setAnotacaoParaExcluir] =
    useState<Anotacao | null>(null);
  const [isResumoParaExcluir, setIsResumoParaExcluir] = useState(false);
  const [mensagem, setMensagem] = useState<{
    tipo: 'sucesso' | 'erro';
    texto: string;
  } | null>(null);

  const fecharModal = () => {
    if (!isSubmittingAnotacao) {
      setIsModalOpen(false);
      setAnotacaoEmEdicao(null);
    }
  };

  const handleSubmit = async (data: ResumoFormData) => {
    if (anotacaoEmEdicao) {
      const updated = await editarAnotacao(
        anotacaoEmEdicao,
        data.conteudo.trim()
      );
      setMensagem({
        tipo: updated ? 'sucesso' : 'erro',
        texto: updated
          ? 'Anotação atualizada com sucesso.'
          : 'Não foi possível atualizar a anotação.',
      });
      setAnotacaoEmEdicao(null);
      setIsModalOpen(false);
      return;
    }

    const anotacaoData: AnotacaoFormData = { texto: data.conteudo };
    const saved = await salvarAnotacao(anotacaoData);
    if (saved) setIsModalOpen(false);
  };

  const abrirEdicao = (anotacao: { id: string }) => {
    setAnotacaoEmEdicao(anotacao.id);
    setIsModalOpen(true);
  };

  const confirmarExclusao = async () => {
    if (!anotacaoParaExcluir) return;

    const deleted = await excluirAnotacao(anotacaoParaExcluir.id);
    setMensagem({
      tipo: deleted ? 'sucesso' : 'erro',
      texto: deleted
        ? 'Anotação excluída com sucesso.'
        : 'Não foi possível excluir a anotação.',
    });
    setAnotacaoParaExcluir(null);
  };

  const confirmarExclusaoResumo = async () => {
    const deleted = await excluirResumo();
    if (deleted) {
      setIsResumoParaExcluir(false);
    }
  };

  if (!resumo) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-sky-50 p-6 text-center text-slate-900">
        <p>Não foi possível encontrar este resumo.</p>
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-sky-700 hover:text-sky-600"
        >
          <ArrowLeft size={20} />
          Voltar para os resumos
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sky-50 px-4 py-6 text-slate-900">
      <div className="mx-auto flex w-full max-w-350 items-start gap-6 flex-row">
        <article className="min-h-[calc(100vh-3rem)] w-full flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="mx-auto max-w-250 px-6 py-12">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={favoritar}
                  className="mt-1 p-1 text-yellow-400 hover:cursor-pointer"
                >
                  <Star
                    size={30}
                    className={resumo.favorito ? 'fill-yellow-400' : ''}
                  />
                </button>
                <h1 className="text-4xl font-bold text-slate-800">
                  {resumo.titulo}
                </h1>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  disabled={isSubmitting}
                  className="mt-1 rounded p-2 text-slate-600 hover:bg-gray-100 hover:text-yellow-800 hover:cursor-pointer"
                >
                  <Pencil size={24} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsResumoParaExcluir(true)}
                  disabled={isSubmitting}
                  className="mt-1 rounded p-2 text-slate-600 hover:bg-gray-100 hover:text-red-800 hover:cursor-pointer"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
            <div className="mb-10 h-0.5 bg-slate-800" />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(resumo.conteudo),
              }}
            />
          </div>
        </article>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm w-90">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-600">
              Minhas Anotações
            </h2>
            <button
              type="button"
              onClick={() => {
                setAnotacaoEmEdicao(null);
                setIsModalOpen(true);
              }}
              className="flex items-center rounded bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-sky-700"
            >
              <PlusCircle size={18} className="mr-2" />
              Adicionar
            </button>
          </div>
          {mensagem && (
            <p
              className={`mt-4 rounded p-3 text-sm ${
                mensagem.tipo === 'sucesso'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {mensagem.texto}
            </p>
          )}
          <div className="mt-4 space-y-3">
            {anotacoes.length === 0 ? (
              <p className="flex min-h-28 items-center justify-center text-center text-sm text-slate-400">
                Suas anotações aparecerão aqui.
              </p>
            ) : (
              anotacoes.map(anotacao => (
                <div key={anotacao.id} className="rounded border border-slate-200 bg-slate-50 p-3">
                  <p
                    className="text-sm">
                    {anotacao.texto}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <small className="text-slate-500">
                      {formatarDataCriacao(anotacao.dataCriacao)}
                    </small>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title={anotacao.favorita ? 'Desfavoritar' : 'Favoritar'}
                        onClick={() => favoritarAnotacao(anotacao.id)}
                        className="rounded p-1 text-yellow-500 hover:bg-yellow-100"
                      >
                        <Star size={16} className={anotacao.favorita ? 'fill-yellow-400' : ''} />
                      </button>
                      <button
                        type="button"
                        title="Editar anotação"
                        onClick={() => abrirEdicao(anotacao)}
                        className="rounded p-1 text-slate-500 hover:bg-slate-200"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        title="Excluir anotação"
                        onClick={() => {
                          setMensagem(null);
                          setAnotacaoParaExcluir(anotacao);
                        }}
                        className="rounded p-1 text-red-500 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
      {isEditModalOpen && (
        <ResumoFormModal
          isSubmitting={isSubmitting}
          initialData={{
            titulo: resumo.titulo,
            conteudo: resumo.conteudo,
          }}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={editarResumo}
        />
      )}

      {isModalOpen && (
        <ResumoFormModal
          mode="anotacao"
          initialContent={
            anotacaoEmEdicao
              ? anotacoes.find(anotacao => anotacao.id === anotacaoEmEdicao)?.texto
              : ''
          }
          isSubmitting={isSubmittingAnotacao}
          onClose={fecharModal}
          onSubmit={handleSubmit}
        />
      )}
      {anotacaoParaExcluir !== null && (
        <ConfirmModal
          isSubmitting={isDeletingAnotacao}
          onCancel={() => setAnotacaoParaExcluir(null)}
          onConfirm={confirmarExclusao}
        />
      )}
      {isResumoParaExcluir && (
        <ConfirmModal
          title="Excluir resumo?"
          description="Todas as anotações vinculadas também serão excluídas. Essa ação não poderá ser desfeita."
          isSubmitting={isSubmitting}
          onCancel={() => setIsResumoParaExcluir(false)}
          onConfirm={confirmarExclusaoResumo}
        />
      )}
    </main>
  );
};
