import type { ResumoFormData } from '../../services/resumos/resumos.service';

export interface ResumoFormModalProps {
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: ResumoFormData) => Promise<void>;
}
