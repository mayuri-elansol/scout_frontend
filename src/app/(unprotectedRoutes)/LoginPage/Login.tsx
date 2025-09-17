
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {

  ThemeProvider,
  CssBaseline,
 
} from "@mui/material";
import { theme } from "@/app/theme/theme";
import LoginForm from "../../components/molecules/Login/LoginForm";

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface User {
  username: string;
  password: string;
}



const Login: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");



  const handleInputChange =
    (field: keyof LoginFormData) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value =
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (error) setError("");
      };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("/data/user.json");
      const users: User[] = await response.json();

      const foundUser = users.find(
        (u) =>
          u.username === formData.username && u.password === formData.password
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
        formData={formData}
        showPassword={showPassword}
        isLoading={isLoading}
        error={error}
        onInputChange={handleInputChange}
        onTogglePassword={handleTogglePassword}
        onSubmit={handleSubmit}
        setError={setError}
      />

    </ThemeProvider>
  );
};

export default Login;