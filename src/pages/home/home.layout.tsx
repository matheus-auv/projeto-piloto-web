import { PlusCircle } from 'lucide-react';
import { ResumoCard } from './components/resumo-card';
import { useResumosHook } from './home.hook';
import { useState } from 'react';
import { ResumoFormModal } from './components/resumo-form-modal';

export const HomeLayout = () => {
  const { resumos, salvarResumo, isSubmitting } = useResumosHook();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async (data: Parameters<typeof salvarResumo>[0]) => {
    const salvo = await salvarResumo(data);
    if (salvo) {
      setIsModalOpen(false);
    }
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

        <div className="grid grid-cols-3">
          {resumos.map(resumo => (
            <ResumoCard
              key={resumo.id}
              titulo={resumo.titulo}
              conteudo={resumo.conteudo}
            />
          ))}
        </div>
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
