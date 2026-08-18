import { CalendarIcon, StarIcon } from 'lucide-react';
import { Link } from 'react-router';
import { formatarDataCriacao } from '../../../../utils/date';

interface ResumoCardProps {
  id: string;
  titulo: string;
  dataCriacao: string;
  favorito: boolean;
}

export const ResumoCard = ({
  id,
  titulo,
  dataCriacao,
  favorito,
}: ResumoCardProps) => {
  return (
    <Link
      to={`/resumos/${id}`}
      className="my-4 flex w-full max-w-64 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:cursor-pointer hover:shadow-lg"
    >
      <div className="flex h-6">
        <StarIcon
          size={24}
          className={
            favorito ? 'fill-yellow-400 text-yellow-400' : 'text-transparent'
          }
        />
      </div>

      <h1 className="line-clamp-3 pt-4 text-center text-2xl font-bold">
        {titulo}
      </h1>

      <p className="mt-auto flex items-center justify-center pt-6 text-center text-base font-semibold text-slate-500">
        <CalendarIcon size={18} className="mr-2" />
        {formatarDataCriacao(dataCriacao)}
      </p>
    </Link>
  );
};
