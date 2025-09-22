export interface ForgotPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormProps {
  formData: ForgotPasswordFormData;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading: boolean;
  error: string;
  onInputChange: (
    field: keyof ForgotPasswordFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: (event: React.FormEvent) => void;
  setError: (error: string) => void;
}
