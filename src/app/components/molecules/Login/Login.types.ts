// Login.types.ts
export interface LoginFormData {
  userName: string;
  password: string;
}

export interface LoginFormProps {
  showPassword: boolean;
  isLoading: boolean;
  error?: string;
  onSubmit: (data: LoginFormData) => void | Promise<void>; // ✅ FIXED
  onTogglePassword: () => void;
}
