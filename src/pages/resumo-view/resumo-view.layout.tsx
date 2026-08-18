import { ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router';
import { useResumoHook } from './resumo-view.hook';
import DOMPurify from 'dompurify';

export const ResumoViewLayout = () => {
  const { resumo, favoritar } = useResumoHook();

  if (!resumo) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-6 text-center text-slate-900">
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
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
      <div className="mx-auto flex w-full max-w-350 items-start gap-6 flex-row">
        <article className="min-h-[calc(100vh-3rem)] w-full flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="mx-auto max-w-250 px-6 py-12">
            <div className="mb-4 flex items-start gap-3">
              <button
                type="button"
                onClick={favoritar}
                className="mt-1 p-1 text-yellow-400"
              >
                <Star
                  size={30}
                  className={resumo.favorito ? 'fill-yellow-400' : ''}
                />
              </button>
              <h1 className="text-4xl font-bold text-slate-700">
                {resumo.titulo}
              </h1>
            </div>
            <div className="mb-10 h-0.5 bg-slate-700" />
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
    </main>
  );
};
