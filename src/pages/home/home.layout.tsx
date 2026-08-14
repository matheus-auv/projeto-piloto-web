import { ResumoCard } from './components/resumo-card';
import { useResumosHook } from './home.hook';

export const HomeLayout = () => {
  const { resumos } = useResumosHook();

  return (
    <main className="min-h-screen p-8 bg-sky-50 text-slate-900">
      <header className="mx-auto w-full max-w-300">
        <h1 className="text-4xl font-bold">Projeto Piloto</h1>
      </header>

      <section className="mx-auto mt-12 w-full max-w-300">
        <div className="mb-4">
          <button>Adicionar resumo</button>
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
    </main>
  );
};
