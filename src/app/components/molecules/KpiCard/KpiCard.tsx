"use client";

import React from "react";
import { Card, CardContent, Box, Typography, Chip } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  trendColor: string;
  color: string;
  bgColor: string;
  icon: SvgIconComponent;
  variant?: "default" | "success" | "info" | "critical";
  size?: "small" | "medium" | "large";
  // Custom sizing props for Storybook and flexible layouts
  customWidth?: number;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendColor,
  color,
  bgColor,
  icon: IconComponent,
  variant = "default",
  size = "medium",
  customWidth,
  // customHeight,
}) => {
  // Get variant-specific styling
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          color: "#2e7d32",
          bgColor: "#e8f5e9",
          borderColor: "#4caf50",
          iconBg: "rgba(76, 175, 80, 0.1)",
        };
      case "info":
        return {
          color: "#1565c0",
          bgColor: "#e3f2fd",
          borderColor: "#2196f3",
          iconBg: "rgba(33, 150, 243, 0.1)",
        };
      case "critical":
        return {
          color: "#c62828",
          bgColor: "#ffebee",
          borderColor: "#f44336",
          iconBg: "rgba(244, 67, 54, 0.1)",
        };
      default:
        return {
          color: color,
          bgColor: bgColor,
          borderColor: color,
          iconBg: "rgba(255, 255, 255, 0.8)",
        };
    }
  };

  // Get size-specific styling
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          minHeight: "120px",

          padding: "16px",
          iconSize: 18,
          valueSize: "20px",
          titleSize: "13px",
          subtitleSize: "11px",
          iconBoxSize: 32,
        };
      case "large":
        return {
          minHeight: "200px",
          padding: "24px",
          iconSize: 24,
          valueSize: "36px",
          titleSize: "16px",
          subtitleSize: "14px",
          iconBoxSize: 44,
        };
      default:
        return {
          minHeight: "160px",
          padding: "20px",
          iconSize: 20,
          valueSize: "28px",
          titleSize: "14px",
          subtitleSize: "12px",
          iconBoxSize: 36,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  // Override with custom dimensions if provided
  const finalWidth = customWidth ? `${customWidth}px` : "auto";

  return (
    <Card
      sx={{
        backgroundColor: variantStyles.bgColor,
        border: `1px solid ${variantStyles.borderColor}40`,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        height: "100%",
        // minHeight: finalHeight,
        width: finalWidth,
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          transform: "translateY(-2px)",
          borderColor: variantStyles.borderColor,
        },
      }}
    >
      <CardContent
        sx={{
          p: `${sizeStyles.padding} !important`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header with Icon and Trend */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: sizeStyles.iconBoxSize,
              height: sizeStyles.iconBoxSize,
              backgroundColor: variantStyles.iconBg,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: variantStyles.color,
            }}
          >
            <IconComponent sx={{ fontSize: sizeStyles.iconSize }} />
          </Box>

          <Chip
            label={trend}
            size="small"
            sx={{
              fontSize: "11px",
              fontWeight: 600,
              color: trendColor,
              backgroundColor: "rgba(255,255,255,0.9)",
              border: `1px solid ${trendColor}40`,
              height: size === "small" ? 20 : 24,
            }}
          />
        </Box>

        {/* Value */}
        <Typography
          sx={{
            fontSize: sizeStyles.valueSize,
            fontWeight: "bold",
            color: variantStyles.color,
            lineHeight: 1.1,
            mb: 0.5,
          }}
        >
          {value}
        </Typography>

        {/* Title */}
        <Typography
          sx={{
            fontSize: sizeStyles.titleSize,
            fontWeight: 600,
            color: variantStyles.color,
            mb: 0.5,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: sizeStyles.subtitleSize,
            color: "#6b7280",
            lineHeight: 1.3,
            mt: "auto",
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
export type { KpiCardProps };
