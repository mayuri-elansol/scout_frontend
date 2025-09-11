"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  Container,
  ThemeProvider,
  CssBaseline,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Alert,
  Button,
  OutlinedInput,
} from "@mui/material";
import { Email, ArrowBack, CheckCircle, LockReset } from "@mui/icons-material";
import { theme } from "@/app/theme/theme";
import LoginHeader from "../../components/molecules/Login/LoginHeader";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [cardHovered, setCardHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string>("");

  const currentDateTime = new Date().toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, we'll always show success
      // In real implementation, you'd call your password reset API
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (error) setError("");
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleBackToLogin = () => {
    router.push("/LoginPage");
  };

  const handleResendEmail = () => {
    setIsSubmitted(false);
    setEmail("");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        {/* Header */}
        <LoginHeader currentDateTime={currentDateTime} />

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 88px)",
            padding: 4,
          }}
        >
          <Container maxWidth="sm">
            <Card
              elevation={cardHovered ? 4 : 2}
              onMouseEnter={() => setCardHovered(true)}
              onMouseLeave={() => setCardHovered(false)}
              sx={{
                borderRadius: 2,
                maxWidth: 520,
                margin: "0 auto",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: cardHovered
                  ? "translateY(-8px) scale(1.02)"
                  : "translateY(0) scale(1)",
                boxShadow: cardHovered
                  ? "0 8px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(76, 175, 80, 0.1)"
                  : "0 2px 8px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)",
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
              {/* Card Header */}
              <Box
                sx={{
                  padding: 4,
                  paddingTop: 5,
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#1976d2",
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    margin: "0 auto 20px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isSubmitted ? (
                    <CheckCircle sx={{ fontSize: 28 }} />
                  ) : (
                    <LockReset sx={{ fontSize: 28 }} />
                  )}
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "#000000",
                    fontSize: "28px",
                  }}
                >
                  {isSubmitted ? "Check Your Email" : "Reset Your Password"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#5c6b7d",
                    fontSize: "16px",
                  }}
                >
                  {isSubmitted
                    ? "We&apos;ve sent you a password reset link"
                    : "Enter your email to reset your password"}
                </Typography>
              </Box>

              {/* Form Content */}
              {isSubmitted ? (
                // Success State
                <Box sx={{ padding: 4, textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#5c6b7d",
                      mb: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    We&apos;ve sent password reset instructions to{" "}
                    <Box
                      component="span"
                      sx={{ fontWeight: 600, color: "#1976d2" }}
                    >
                      {email}
                    </Box>
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7280",
                      mb: 4,
                      fontSize: "14px",
                    }}
                  >
                    Didn&apos;t receive the email? Check your spam folder or try
                    again.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleBackToLogin}
                      startIcon={<ArrowBack />}
                      sx={{
                        flex: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "#e5e7eb",
                        color: "#6b7280",
                        "&:hover": {
                          borderColor: "#1976d2",
                          backgroundColor: "rgba(76, 175, 80, 0.04)",
                        },
                      }}
                    >
                      Back to Sign In
                    </Button>

                    <Button
                      variant="contained"
                      onClick={handleResendEmail}
                      sx={{
                        flex: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: "#1976d2",
                        "&:hover": {
                          backgroundColor: "#1976d2",
                        },
                      }}
                    >
                      Resend Email
                    </Button>
                  </Box>
                </Box>
              ) : (
                // Form State
                <Box sx={{ padding: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    <Button
                      variant="text"
                      onClick={handleBackToLogin}
                      startIcon={<ArrowBack />}
                      sx={{
                        color: "#6b7280",
                        textTransform: "none",
                        fontWeight: 500,
                        mb: 2,
                        "&:hover": {
                          backgroundColor: "rgba(107, 114, 128, 0.04)",
                        },
                      }}
                    >
                      Back to Sign In
                    </Button>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "#5c6b7d",
                        lineHeight: 1.5,
                        mb: 3,
                      }}
                    >
                      Enter your email address and we&apos;ll send you a link to
                      reset your password.
                    </Typography>
                  </Box>

                  <form onSubmit={handleSubmit} autoComplete="off">
                    {error && (
                      <Paper
                        elevation={1}
                        sx={{
                          mb: 3,
                          p: 2,
                          backgroundColor: "#fff5f5",
                          border: "1px solid #fecaca",
                          borderRadius: 2,
                        }}
                      >
                        <Alert
                          severity="error"
                          sx={{
                            backgroundColor: "transparent",
                            "& .MuiAlert-message": {
                              color: "#dc2626",
                              fontSize: "14px",
                              fontWeight: 500,
                            },
                          }}
                          onClose={() => setError("")}
                        >
                          {error}
                        </Alert>
                      </Paper>
                    )}

                    <Box sx={{ mb: 4 }}>
                      <Typography
                        component="label"
                        variant="body2"
                        sx={{
                          color: "#1c2025",
                          fontWeight: 600,
                          mb: 1.5,
                          fontSize: "15px",
                          display: "block",
                        }}
                      >
                        Email Address
                      </Typography>

                      <TextField
                        fullWidth
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email address"
                        autoComplete="new-email"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        slots={{ input: OutlinedInput }} // 👈 force OutlinedInput
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email />
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#fafafa",
                            borderRadius: 2,
                            transition: "all 0.2s ease-in-out",
                            "& fieldset": {
                              borderColor: "#e5e7eb",
                              borderWidth: "2px",
                            },
                            "&:hover": {
                              backgroundColor: "#ffffff",
                              "& fieldset": {
                                borderColor: "#1976d2",
                              },
                            },
                            "&.Mui-focused": {
                              backgroundColor: "#ffffff",
                              boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.1)",
                              "& fieldset": {
                                borderColor: "#1976d2",
                              },
                            },
                            "& input": {
                              "&:-webkit-autofill": {
                                WebkitBoxShadow:
                                  "0 0 0 1000px #ffffff inset !important",
                                WebkitTextFillColor: "#1c2025 !important",
                                transition:
                                  "background-color 5000s ease-in-out 0s !important",
                                backgroundColor: "transparent !important",
                              },
                            },
                          },
                        }}
                        disabled={isLoading}
                      />
                    </Box>

                    <button
                      type="submit"
                      disabled={isLoading || !email || !isValidEmail(email)}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        fontSize: "16px",
                        fontWeight: 600,
                        textTransform: "none",
                        backgroundColor:
                          isLoading || !email || !isValidEmail(email)
                            ? "#e5e7eb"
                            : "#1976d2",
                        color:
                          isLoading || !email || !isValidEmail(email)
                            ? "#9ca3af"
                            : "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        cursor:
                          isLoading || !email || !isValidEmail(email)
                            ? "not-allowed"
                            : "pointer",
                        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
                        transition: "all 0.2s ease-in-out",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading && email && isValidEmail(email)) {
                          e.currentTarget.style.backgroundColor = "#1565c0";
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(25, 118, 210, 0.2)";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoading && email && isValidEmail(email)) {
                          e.currentTarget.style.backgroundColor = "#1976d2";
                          e.currentTarget.style.boxShadow =
                            "0 2px 8px rgba(76, 175, 80, 0.2)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }
                      }}
                      onMouseDown={(e) => {
                        if (!isLoading && email && isValidEmail(email)) {
                          e.currentTarget.style.transform = "translateY(0)";
                        }
                      }}
                    >
                      {isLoading
                        ? "Sending Reset Email..."
                        : "Send Reset Email"}
                    </button>
                  </form>
                </Box>
              )}

              {/* Footer */}
              <Paper
                elevation={0}
                sx={{
                  textAlign: "center",
                  py: 3,
                  backgroundColor: "#fafafa",
                  borderTop: "1px solid #f0f0f0",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontSize: "13px", fontWeight: 500 }}
                >
                  © 2025 SCOUT Security System. All rights reserved.
                </Typography>
              </Paper>
            </Card>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;
