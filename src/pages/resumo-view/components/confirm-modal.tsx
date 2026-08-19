interface ConfirmModalProps {
  descricao?: string;
  isSubmitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  titulo?: string;
}

export const ConfirmModal = ({
  descricao = 'Essa ação não poderá ser desfeita.',
  isSubmitting,
  onCancel,
  onConfirm,
  titulo = 'Excluir anotação?',
}: ConfirmModalProps) => {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={event => {
        if (event.currentTarget === event.target && !isSubmitting) {
          onCancel();
        }
      }}
    >
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-800">{titulo}</h2>
        <p className="mt-2 text-sm text-slate-600">{descricao}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded px-4 py-2 font-semibold hover:bg-slate-100 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
};
