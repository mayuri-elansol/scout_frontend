import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Box, Typography, Card, CardContent, Grid, Chip } from "@mui/material";
import {
  Shield,
  Visibility,
  People,
  BarChart,
  Warning,
  VideoCall,
} from "@mui/icons-material";

const Introduction = () => {
  const features = [
    {
      icon: Shield,
      title: "PPE Detection",
      description: "Personal Protective Equipment compliance monitoring",
    },
    {
      icon: Visibility,
      title: "Intrusion Detection",
      description: "Perimeter security and breach alerts",
    },
    {
      icon: People,
      title: "Personnel Tracking",
      description: "Employee presence and activity monitoring",
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Real-time insights and KPI tracking",
    },
    {
      icon: Warning,
      title: "Alert Management",
      description: "Priority-based notification system",
    },
    {
      icon: VideoCall,
      title: "Live Streaming",
      description: "Real-time camera feeds with AI overlays",
    },
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              backgroundColor: "#1976d2",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "28px",
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
            }}
          >
            S
          </Box>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            SCOUT
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{ color: "#5c6b7d", mb: 2, fontWeight: 300 }}
        >
          CCTV Analytics Portal - Component Library
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            maxWidth: 700,
            mx: "auto",
            fontSize: "18px",
            lineHeight: 1.6,
          }}
        >
          Explore the comprehensive component library for SCOUT, a cutting-edge
          surveillance analytics platform designed for industrial safety,
          security, and operational insights powered by AI technology.
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 1,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Chip label="React 18" color="primary" variant="outlined" />
          <Chip label="Material-UI 5" color="primary" variant="outlined" />
          <Chip label="TypeScript" color="primary" variant="outlined" />
          <Chip label="Atomic Design" color="primary" variant="outlined" />
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              textAlign: "center",
              p: 2,
              height: "100%",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h3"
                color="primary"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                35+
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Components
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              textAlign: "center",
              p: 2,
              height: "100%",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h3"
                sx={{ color: "#4caf50", fontWeight: "bold", mb: 1 }}
              >
                60+
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Component Stories
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              textAlign: "center",
              p: 2,
              height: "100%",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h3"
                sx={{ color: "#ff9800", fontWeight: "bold", mb: 1 }}
              >
                7
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Page Templates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              textAlign: "center",
              p: 2,
              height: "100%",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h3"
                sx={{ color: "#9c27b0", fontWeight: "bold", mb: 1 }}
              >
                4
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Design Levels
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Features */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, color: "#1c2025", fontWeight: 600, textAlign: "center" }}
        >
          SCOUT Platform Features
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    p: 3,
                    height: "100%",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#e3f2fd",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <IconComponent sx={{ color: "#1976d2", fontSize: 20 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#1c2025" }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#5c6b7d", lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Getting Started */}
      <Card sx={{ backgroundColor: "#f8f9fa", border: "1px solid #e0e0e0" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, color: "#1c2025", fontWeight: 600 }}
          >
            Getting Started with the Component Library
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, color: "#1c2025" }}>
                Atomic Design Structure
              </Typography>
              <Box
                component="ul"
                sx={{ pl: 2, color: "#5c6b7d", lineHeight: 2 }}
              >
                <li>
                  <strong>Atoms</strong>: Basic elements (buttons, badges,
                  avatars, inputs)
                </li>
                <li>
                  <strong>Molecules</strong>: Component combinations (cards,
                  panels)
                </li>
                <li>
                  <strong>Organisms</strong>: Complex sections (header, sidebar,
                  feeds)
                </li>
                <li>
                  <strong>Templates</strong>: Full page layouts and compositions
                </li>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, color: "#1c2025" }}>
                Navigation Tips
              </Typography>
              <Box
                component="ul"
                sx={{ pl: 2, color: "#5c6b7d", lineHeight: 2 }}
              >
                <li>Use the sidebar to browse components by category</li>
                <li>Each story includes interactive controls and variants</li>
                <li>View source code using the &quot;Show code&quot; button</li>
                <li>
                  Check the &quot;Component Showcase&quot; for integration
                  examples
                </li>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: "white",
              borderRadius: 1,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#666", textAlign: "center", fontStyle: "italic" }}
            >
              Built with React 18, TypeScript, Material-UI 5, and Storybook for
              the SCOUT CCTV Analytics Portal
              <br />
              Powered by Elansol Technologies
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const meta: Meta<typeof Introduction> = {
  title: "SCOUT/Introduction",
  component: Introduction,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Welcome to the SCOUT Component Library - A comprehensive design system for CCTV analytics powered by AI technology.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {};
