export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginFormProps {
  showPassword: boolean;
  isLoading: boolean;
  error: string;
  onTogglePassword: () => void;
  onSubmit: (data: LoginFormData) => void;
}
