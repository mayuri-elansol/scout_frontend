"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme/theme";
import LoginForm from "../../components/molecules/Login/LoginForm";

interface LoginFormData {
  username: string;
  password: string;
}

interface User {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

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
        localStorage.setItem("scout_auth_token", token);
        localStorage.setItem(
          "scout_user",
          JSON.stringify({
            username: foundUser.username,
            lastLogin: new Date().toISOString(),
          })
        );
        router.push("/DashboardPage");
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
