import { ArrowLeft, Pencil, Star } from 'lucide-react';
import { Link } from 'react-router';
import { useResumoHook } from './resumo-view.hook';
import DOMPurify from 'dompurify';
import { ResumoFormModal } from '../../components/resumo-form-modal/resumo-form-modal.layout';

export const ResumoViewLayout = () => {
  const {
    resumo,
    favoritar,
    editarResumo,
    isEditModalOpen,
    setIsEditModalOpen,
    isSubmitting,
  } = useResumoHook();

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
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="mt-1 rounded p-2 text-slate-600 hover:bg-gray-100 hover:text-sky-800 hover:cursor-pointer"
              >
                <Pencil size={24} />
              </button>
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
          <h2 className="text-lg font-semibold text-slate-600">
            Minhas Anotações
          </h2>
          <div className="flex min-h-36 items-center justify-center text-center text-sm text-slate-400">
            Suas anotações aparecerão aqui.
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
    </main>
  );
};
