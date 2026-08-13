import { ResumoCard } from './components/resumo-card';

const MOCK_RESUMOS = [
  {
    titulo: 'sei la',
    conteudo: 'sei la sei la 1',
  },
  {
    titulo: 'sei la',
    conteudo: 'sei la sei la 2',
  },
  {
    titulo: 'sei la',
    conteudo: 'sei la sei la 3',
  },
  {
    titulo: 'sei la',
    conteudo: 'sei la sei la 4',
  },
];

export const HomeLayout = () => {
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
          {MOCK_RESUMOS.map(resumo => (
            <ResumoCard titulo={resumo.titulo} conteudo={resumo.conteudo} />
          ))}
        </div>
      </section>
    </main>
  );
};
