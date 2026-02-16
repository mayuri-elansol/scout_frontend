import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Card, Container } from "@mui/material";
import { theme } from "@/app/theme/theme";
import LoginForm from "./LoginForm";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginFormProps {
  formData: LoginFormData;
  showPassword: boolean;
  isLoading: boolean;
  error: string;
  onInputChange: (
    field: keyof LoginFormData,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onSubmit: (data: LoginFormData) => void;
  onForgotPassword: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const LoginFormWrapper = (args: Partial<LoginFormProps>) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange =
    (field: keyof LoginFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (error) setError("");
    };

  const handleSubmit = (data: LoginFormData) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (data.username === "demo" && data.password === "password") {
        console.log("Login successful!", data);
      } else {
        setError("Invalid username or password");
      }
    }, 1500);
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleForgotPassword = () => console.log("Forgot password clicked");

  return (
    <LoginForm
      formData={formData}
      showPassword={showPassword}
      isLoading={isLoading}
      error={error}
      onInputChange={handleInputChange}
      onTogglePassword={handleTogglePassword}
      onSubmit={handleSubmit}
      onForgotPassword={handleForgotPassword}
      setError={setError}
      {...args}
    />
  );
};

const meta: Meta<typeof LoginForm> = {
  title: "Components/Molecules/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A login form component with username, password fields and forgot password functionality. The remember me option has been removed.",
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <Container maxWidth="sm">
            <Card
              sx={{
                borderRadius: 2,
                maxWidth: 520,
                margin: "0 auto",
                backgroundColor: "#ffffff",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                  borderRadius: "8px 8px 0 0",
                },
              }}
            >
              <Story />
            </Card>
          </Container>
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  render: () => <LoginFormWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          "Default login form with username and password fields. Try demo/password for successful login.",
      },
    },
  },
};

export const WithError: Story = {
  render: () => <LoginFormWrapper />,
  parameters: {
    docs: {
      description: {
        story:
          "Login form displaying an error message after failed login attempt.",
      },
    },
  },
};

export const Loading: Story = {
  render: () => <LoginFormWrapper />,
  parameters: {
    docs: {
      description: {
        story: "Login form in loading state during authentication process.",
      },
    },
  },
};
