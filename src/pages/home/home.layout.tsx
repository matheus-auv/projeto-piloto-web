import { PlusCircle } from 'lucide-react';
import { ResumoCard } from './components/resumo-card';
import { useResumosHook } from './home.hook';
import { useState } from 'react';
import { ResumoFormModal } from './components/resumo-form-modal';
import type { ResumoFormData } from '../../services/resumos/resumos.service';

export const HomeLayout = () => {
  const {
    resumos,
    pagination,
    salvarResumo,
    favoritar,
    irParaPagina,
    isLoading,
    isSubmitting,
  } = useResumosHook();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async (data: ResumoFormData) => {
    const resumo = await salvarResumo(data);
    if (resumo) {
      setIsModalOpen(false);
    }
  };

  const handleFavorito = async (resumoId: string) => {
    await favoritar(resumoId);
  };

  return (
    <main className="min-h-screen p-8 bg-sky-50 text-slate-900">
      <header className="mx-auto w-full max-w-300">
        <h1 className="text-4xl font-bold">Projeto Piloto</h1>
      </header>

      <section className="mx-auto mt-12 w-full max-w-300">
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-slate-50 bg-sky-600 hover:bg-sky-700 hover:cursor-pointer font-bold rounded-md py-2 px-4 flex justify-center items-center"
          >
            <PlusCircle className="mr-2" />
            Adicionar resumo
          </button>
        </div>

        {isLoading ? (
          <p>Carregando resumos...</p>
        ) : (
          <>
            <div className="grid grid-cols-3">
              {resumos.map((resumo, index) => (
                <ResumoCard
                  key={resumo.id}
                  id={resumo.id}
                  titulo={resumo.titulo}
                  conteudo={resumo.conteudo}
                  favorito={resumo.favorito}
                  isLastColumn={index % 3 === 2}
                />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <nav className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => irParaPagina(pagination.number - 1)}
                  disabled={pagination.first}
                  className="rounded bg-sky-600 px-4 py-2 font-semibold text-white hover:cursor-pointer hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Anterior
                </button>

                <span>
                  Página {pagination.number + 1} de {pagination.totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => irParaPagina(pagination.number + 1)}
                  disabled={pagination.last}
                  className="rounded bg-sky-600 px-4 py-2 font-semibold text-white hover:cursor-pointer hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Próxima
                </button>
              </nav>
            )}
          </>
        )}
      </section>

      {isModalOpen && (
        <ResumoFormModal
          isSubmitting={isSubmitting}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
};
