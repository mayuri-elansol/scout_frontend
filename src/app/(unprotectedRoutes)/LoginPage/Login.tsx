

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
  firstName: string;
  lastName: string;
  role:string;
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
      // Simulate delay (optional)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Fetch the user list
      const response = await fetch("/data/user.json");
      const users: User[] = await response.json();

      // Find the matching user
      const foundUser = users.find(
        (u) => u.username === data.username && u.password === data.password
      );

      if (foundUser) {
        // Create a fake token
        const token = `token-${Date.now()}`;

        // Store all details in localStorage
        localStorage.setItem("scout_auth_token", token);
        localStorage.setItem(
          "scout_user",
          JSON.stringify({
            username: foundUser.username,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            role:foundUser.role,
            lastLogin: new Date().toISOString(),
          })
        );

        // Redirect to dashboard
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
