import { StarIcon } from 'lucide-react';
import { useState } from 'react';

interface ResumoCardProps {
  titulo: string;
  conteudo: string;
  // Colocar data de criação depois
}

export const ResumoCard = ({ titulo, conteudo }: ResumoCardProps) => {
  const [favorito, setFavorito] = useState(false);

  return (
    <div
      className="relative my-4 mr-4 w-full max-w-xs rounded-lg border border-slate-400
      bg-white p-6 shadow-sm transition hover:cursor-pointer hover:shadow-lg"
    >
      <h1 className="flex justify-center text-center text-xl font-bold">
        {titulo}
      </h1>
      <button
        type="button"
        onClick={() => setFavorito(!favorito)}
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
