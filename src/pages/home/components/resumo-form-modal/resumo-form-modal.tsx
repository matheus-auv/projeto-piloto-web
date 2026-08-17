import { useState } from 'react';
import type { ResumoFormData } from '../../../../services/resumos/resumos.service';

interface ResumoFormModalProps {
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: ResumoFormData) => Promise<void>;
}

export const ResumoFormModal = ({
  isSubmitting,
  onClose,
  onSubmit,
}: ResumoFormModalProps) => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({
      titulo: titulo.trim(),
      conteudo: conteudo.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={event => {
        if (event.currentTarget === event.target && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">
        <h2 id="resumo-form-title" className="text-2xl font-bold">
          Adicionar resumo
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block font-bold">Título</span>
            <input
              autoFocus
              required
              value={titulo}
              onChange={event => setTitulo(event.target.value)}
              className="w-full rounded border-2 border-slate-300 p-2 outline-none focus:border-sky-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block font-bold">Conteúdo</span>
            <textarea
              required
              rows={6}
              value={conteudo}
              onChange={event => setConteudo(event.target.value)}
              className="w-full resize-y rounded border-2 border-slate-300 p-2 outline-none focus:border-sky-500"
            />
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded px-4 py-2 hover:bg-gray-100 font-semibold hover:cursor-pointer disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-sky-600 px-4 py-2 text-white font-semibold hover:bg-sky-700 hover:cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
