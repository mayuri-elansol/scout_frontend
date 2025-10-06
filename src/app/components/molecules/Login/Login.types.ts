export interface LoginFormData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginFormProps {
  showPassword: boolean;
  isLoading: boolean;
  error: string;
  onTogglePassword: () => void;
  onSubmit: (data: LoginFormData) => void | Promise<void>;
}
