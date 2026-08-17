import { StarIcon } from 'lucide-react';

interface ResumoCardProps {
  titulo: string;
  conteudo: string;
  favorito: boolean;
  onFavoritar: () => void;
}

export const ResumoCard = ({
  titulo,
  conteudo,
  favorito,
  onFavoritar,
}: ResumoCardProps) => {
  return (
    <div
      className="relative my-4 mr-4 w-full max-w-xs rounded-lg border-2 border-slate-400
      bg-white p-6 shadow-sm transition hover:cursor-pointer hover:shadow-lg"
    >
      <h1 className="flex justify-center text-center text-xl font-bold">
        {titulo}
      </h1>
      <button
        type="button"
        onClick={onFavoritar}
        className="absolute top-4 right-4 hover:cursor-pointer"
      >
        <StarIcon
          className={
            favorito ? 'fill-yellow-400 text-yellow-400' : 'text-yellow-400'
          }
        />
      </button>
      <p className="mt-4 line-clamp-5">{conteudo}</p>
    </div>
  );
};
