import { StarIcon } from 'lucide-react';
import { Link } from 'react-router';

interface ResumoCardProps {
  id: string;
  titulo: string;
  conteudo: string;
  favorito: boolean;
  isLastColumn?: boolean;
}

export const ResumoCard = ({
  id,
  titulo,
  conteudo,
  favorito,
  isLastColumn = false,
}: ResumoCardProps) => {
  return (
    <Link
      to={`/resumos/${id}`}
      className={`relative my-4 w-full max-w-xs rounded-lg border-2 border-slate-400
      bg-white p-6 shadow-sm transition hover:cursor-pointer hover:shadow-lg ${
        isLastColumn ? '' : 'mr-4'
      }`}
    >
      <h1 className="flex justify-center text-center text-xl font-bold">
        {titulo}
      </h1>

      <StarIcon
        className={
          favorito
            ? 'fill-yellow-400 text-yellow-400 absolute top-4 right-4'
            : 'absolute top-4 right-4 text-transparent'
        }
      />
      <p className="mt-4 line-clamp-5">{conteudo}</p>
    </Link>
  );
};
