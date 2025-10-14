"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme/theme";
import LoginForm from "../../components/molecules/Login/LoginForm";
import { useAuth, User as AuthUser } from "@/customhooks/useAuth";
interface LoginFormData {
  username: string;
  password: string;
}

interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  lastLogin: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const { login } = useAuth();

  const handleSubmit = async (data: LoginFormData) => {
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch("/data/user.json");
      const users: User[] = await response.json();

      const foundUser = users.find(
        (u) => u.username === data.username && u.password === data.password
      );

      if (foundUser) {
        const token = `token-${Date.now()}`;
        const userData: AuthUser = {
          ...foundUser,
          lastLogin: new Date().toISOString(),
        };

        login(userData, token);

        setTimeout(() => {
          router.push("/LiveStreamingPage");
        }, 100);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginForm
        showPassword={showPassword}
        isLoading={isLoading}
        error={error}
        onTogglePassword={handleTogglePassword}
        onSubmit={handleSubmit}
      />
    </ThemeProvider>
  );
};

export default Login;
