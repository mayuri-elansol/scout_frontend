"use client";

import React from "react";
import { Card, CardContent, Box, Typography, Tooltip } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface DashboardKpiCardProps {
  title: string;
  violationsCount: number;
  lastDetection: string;
  lastDetectionTime: string;
  route?: string;
  icon: SvgIconComponent;
  tooltipMessage?: string;
  colour: "red" | "green" | "blue" | "gray";
}

const DashboardKpiCard: React.FC<DashboardKpiCardProps> = ({
  title,
  violationsCount,
  lastDetection,
  lastDetectionTime,
  icon: IconComponent,
  route,
  tooltipMessage,
  colour,
}) => {
  const router = useRouter();
  const COLOR_STYLES = {
    red: {
      color: "#f44336",
      bgColor: "#ffebee",
      borderColor: "#f44336",
      iconBg: "#ffcdd2",
    },
    green: {
      color: "#4caf50",
      bgColor: "#e8f5e9",
      borderColor: "#4caf50",
      iconBg: "#c8e6c9",
    },
    blue: {
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
    gray: {
      color: "#9ca3af",
      bgColor: "#f3f4f6",
      borderColor: "#d1d5db",
      iconBg: "#e5e7eb",
    },
  } as const;

  const variantStyles = COLOR_STYLES[colour];
  let cursorStyle: "not-allowed" | "pointer" | "default";

  if (colour === "gray") {
    cursorStyle = "not-allowed";
  } else if (route) {
    cursorStyle = "pointer";
  } else {
    cursorStyle = "default";
  }
  return (
    <Card
      onClick={() => {
        if (route && colour !== "gray") {
          router.push(route);
        }
      }}
      sx={{
        backgroundColor: variantStyles.bgColor,
        border: `1px solid ${variantStyles.borderColor}`,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        height: "94%",
        cursor: cursorStyle,
        opacity: colour === "gray" ? 0.7 : 1,
        pointerEvents: colour === "gray" ? "none" : "auto",
        transition: "all 0.3s ease",
        display: "flex",
        position: "relative",
        "&:hover": {
          boxShadow:
            colour !== "gray" && route
              ? "0 4px 16px rgba(0,0,0,0.12)"
              : "0 2px 8px rgba(0,0,0,0.08)",
          transform: colour !== "gray" && route ? "translateY(-2px)" : "none",
          borderColor: variantStyles.borderColor,
        },
      }}
    >
      {/* Left Section - Icon and Count */}
      <Box
        sx={{
          backgroundColor: variantStyles.iconBg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          px: 1,
          py: 2,
          minWidth: "90px",
        }}
      >
        <IconComponent
          sx={{
            fontSize: 28,
            color: variantStyles.color,
            mb: 1.5,
          }}
        />
        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: "bold",
            color: variantStyles.color,
            lineHeight: 1,
          }}
        >
          {colour === "gray" ? "--" : violationsCount}
        </Typography>
      </Box>

      {/* Right Section - Content */}
      <CardContent
        sx={{
          flex: 1,
          p: "10px !important",
          pr: "35px !important",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: variantStyles.color,
            mb: 0.5,
            // lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        <Typography sx={{ fontSize: "14px", color: "#6b7280" }}>
          {colour === "gray"
            ? "Usecase not enabled"
            : `last detection location: ${lastDetection}`}
        </Typography>

        <Typography sx={{ fontSize: "14px", color: "#9ca3af" }}>
          {colour === "gray" ? "" : `last detection time: ${lastDetectionTime}`}
        </Typography>
      </CardContent>

      {/* Info Icon - Top Right */}
      {tooltipMessage && (
        <Tooltip title={tooltipMessage} arrow placement="top">
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#9ca3af",
              transition: "color 0.2s ease",
              "&:hover": {
                color: "#6b7280",
              },
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
        </Tooltip>
      )}
    </Card>
  );
};

export default DashboardKpiCard;
export type { DashboardKpiCardProps };
