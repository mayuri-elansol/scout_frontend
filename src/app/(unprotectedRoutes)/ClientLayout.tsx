"use client";
import React, { ReactNode, useState } from "react";

import {
  Box,
  Card,
  Container,
  ThemeProvider,
  CssBaseline,
  Typography,
  Grid,
  Chip,
  Link,
  Button,
} from "@mui/material";
import { theme } from "@/app/theme/theme";
import {
  Analytics,
  NotificationsActive,
  Search,
  Security,
  SmartToy,
  Timeline,
  CameraAlt,
} from "@mui/icons-material";

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      elevation={hovered ? 3 : 1}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        p: 2.5,
        height: "100%",
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        borderLeft: "4px solid #1976d2",
        background: "#ffffff",
        transform: hovered
          ? "translateY(-2px) translateX(2px)"
          : "translateY(0) translateX(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          background: "#f8f9fa",
          borderLeft: "4px solid #42a5f5",
          boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "#1976d2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1976d2",
              fontSize: "1.2rem",
              mb: 0.5,
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#666666",
              fontSize: "1rem",
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [cardHovered, setCardHovered] = useState(false);

  const features = [
    {
      icon: <SmartToy sx={{ fontSize: 20 }} />,
      title: "AI-Powered Detection",
      description:
        "Advanced computer vision algorithms for real-time object, person, and anomaly detection across multiple camera feeds.",
    },
    {
      icon: <Analytics sx={{ fontSize: 20 }} />,
      title: "Smart Analytics Dashboard",
      description:
        "Comprehensive reporting with heat maps, traffic patterns, and behavioral analysis for data-driven security decisions.",
    },
    {
      icon: <NotificationsActive sx={{ fontSize: 20 }} />,
      title: "Real-Time Alerts",
      description:
        "Instant notifications for security breaches, unusual activities, and predefined events with customizable alert thresholds.",
    },
    {
      icon: <Search sx={{ fontSize: 20 }} />,
      title: "Advanced Search & Forensics",
      description:
        "Powerful search capabilities with facial recognition, license plate detection, and timeline-based investigation tools.",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* Header */}
        <Box
          sx={{
            pl: 6,
            pr: 6,
            pt: 0.8,
            pb: 0.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#ffffff",
            position: "relative", // Add this
            boxShadow: "0 1px 2.8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            component="img"
            src="/scoutLogo.png"
            alt="Scout Logo"
            sx={{
              height: { xs: 40, sm: 60 },
              width: "auto",
            }}
            loading="lazy"
          />

          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              // fontWeight: 600,
              borderRadius: "8px",
              // px: { xs: 2, sm: 4 },
              // py: 1,
              // backgroundColor: "#1976d2",
              backgroundColor: "#336590",

              fontSize: { xs: "0.875rem", sm: "0.9rem" },
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Enquiry
          </Button>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            pl: 5,
            pr: 5,
            backgroundColor: "#f8f9fa",
          }}
        >
          <Container
            maxWidth={false}
            sx={{
              py: { xs: 3, md: 12 },
              px: { xs: 2, md: 4 },
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container spacing={{ xs: 3, md: 4 }} sx={{ width: "100%" }}>
              {/* Left Section - Features */}
              <Grid size={{ xs: 12, lg: 7 }}>
                <Box
                  sx={{
                    pr: { lg: 4 },
                    textAlign: { xs: "center", lg: "left" },
                    px: { xs: 1, sm: 0, lg: 0 },
                  }}
                >
                  <Box sx={{ mb: { xs: 4, md: 6 } }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "2.6rem",
                        mb: { xs: 2, md: 4 },
                        background:
                          "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "#336590",
                        lineHeight: 1.2,
                      }}
                    >
                      From Surveillance to Intelligence
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: "1rem", md: "1.1rem" },
                        lineHeight: 1.8,
                        color: "#666666",
                        mb: { xs: 3, md: 5 },
                        maxWidth: { xs: "100%", md: "900px" },
                        mx: { xs: "auto", lg: 0 },
                      }}
                    >
                      Your Smart CCTV Analysis Partner. SCOUT transforms
                      traditional surveillance into intelligent monitoring,
                      delivering real-time insights, automated threat detection,
                      and comprehensive analytics for enhanced security
                      operations.
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: { xs: 1, sm: 2 },
                        justifyContent: { xs: "center", lg: "flex-start" },
                        mb: { xs: 4, md: 6.5 },
                      }}
                    >
                      <Chip
                        icon={<CameraAlt />}
                        label="Multi-Camera Support"
                        sx={{
                          backgroundColor: "rgba(25, 118, 210, 0.1)",
                          color: "#1976d2",
                          border: "1px solid rgba(25, 118, 210, 0.3)",
                          fontSize: { xs: "14px", sm: "16px" },
                          height: { xs: 36, sm: 40 },
                        }}
                      />
                      <Chip
                        icon={<Timeline />}
                        label="24/7 Monitoring"
                        sx={{
                          backgroundColor: "rgba(25, 118, 210, 0.1)",
                          color: "#1976d2",
                          border: "1px solid rgba(25, 118, 210, 0.3)",
                          fontSize: { xs: "14px", sm: "16px" },
                          height: { xs: 36, sm: 40 },
                        }}
                      />
                      <Chip
                        icon={<Security />}
                        label="Enterprise Security"
                        sx={{
                          backgroundColor: "rgba(25, 118, 210, 0.1)",
                          color: "#1976d2",
                          border: "1px solid rgba(25, 118, 210, 0.3)",
                          height: { xs: 36, sm: 40 },
                          fontSize: { xs: "14px", sm: "16px" },
                        }}
                      />
                    </Box>
                  </Box>

                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    {features.map((feature, index) => (
                      <Grid size={{ xs: 12, md: 6 }} key={feature.title}>
                        <FeatureCard
                          icon={feature.icon}
                          title={feature.title}
                          description={feature.description}
                          delay={index * 150}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>

              {/* Right Section - Login Form */}
              <Grid size={{ xs: 12, lg: 5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    px: { xs: 1, sm: 0 },
                  }}
                >
                  <Card
                    elevation={cardHovered ? 8 : 4}
                    onMouseEnter={() => setCardHovered(true)}
                    onMouseLeave={() => setCardHovered(false)}
                    sx={{
                      height: "600px",
                      borderRadius: 3,
                      maxWidth: 500,
                      width: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      transform: cardHovered
                        ? "translateY(-4px)"
                        : "translateY(0)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: cardHovered
                        ? "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(25, 118, 210, 0.1)"
                        : "0 10px 30px rgba(0,0,0,0.1), 0 1px 8px rgba(0,0,0,0.06)",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background:
                          "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                        borderRadius: "12px 12px 0 0",
                      },
                    }}
                  >
                    {children}
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#ffffff",
            lineHeight: 2,
            py: 2,
            // boxShadow: "0 -1px 2.8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="#"
              sx={{
                color: "#666666",
                fontSize: "15px",
                textDecoration: "none",
                "&:hover": {
                  color: "#1976d2",
                  textDecoration: "underline",
                },
              }}
            >
              Privacy Policy
            </Link>
            <Typography sx={{ color: "#9aa0a6", fontSize: "14px" }}>
              |
            </Typography>
            <Link
              href="#"
              sx={{
                color: "#666666",
                fontSize: "14px",
                textDecoration: "none",
                "&:hover": {
                  color: "#1976d2",
                  textDecoration: "underline",
                },
              }}
            >
              Terms of Use
            </Link>
            <Typography sx={{ color: "#9aa0a6", fontSize: "14px" }}>
              |
            </Typography>
            <Typography
              sx={{
                color: "#666666",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              © 2025 Elansol Technologies Private Limited.
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
