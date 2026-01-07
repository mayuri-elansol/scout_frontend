export interface ResetPasswordFormData {
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordFormProps {
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: (data: ResetPasswordFormData) => void;
}
