type ResumoCardProps = {
  titulo: string;
  conteudo: string;
};

export const ResumoCard = ({ titulo, conteudo }: ResumoCardProps) => {
  return (
    <div
      className="rounded-lg border border-slate-400 bg-white p-4
      shadow-sm transition hover:shadow-lg mr-4 mt-4"
    >
      <h1 className="text-lg font-bold flex items-center">{titulo}</h1>
      <p>{conteudo}</p>
    </div>
  );
};
