import type { ResumoFormData } from '../../services/resumos/resumos.service';

export interface ResumoFormModalProps {
  isSubmitting: boolean;
  initialData?: ResumoFormData;
  initialContent?: string;
  mode?: 'resumo' | 'anotacao';
  onClose: () => void;
  onSubmit: (data: ResumoFormData) => Promise<void | boolean>;
}
