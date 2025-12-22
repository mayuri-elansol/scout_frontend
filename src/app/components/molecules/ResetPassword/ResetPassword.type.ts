export interface ResetPasswordFormData {
  email: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordFormProps {
  formData: ResetPasswordFormData;
  showCurrentPassword: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading: boolean;
  error: string;
  onInputChange: (
    field: keyof ResetPasswordFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleCurrentPassword: () => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;

  onSubmit: (data: ResetPasswordFormData) => void | Promise<void>;
  setError: (error: string) => void;
}
