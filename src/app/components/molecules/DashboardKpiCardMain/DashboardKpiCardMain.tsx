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

  // Optional custom colors
  color?: string;
  bgColor?: string;
  borderColor?: string;
  iconBg?: string;
}

const DashboardKpiCardMain: React.FC<DashboardKpiCardProps> = ({
  title,
  violationsCount,
  lastDetection,
  lastDetectionTime,
  icon: IconComponent,
  route,
  tooltipMessage,

  // custom optional colors
  color,
  bgColor,
  borderColor,
  iconBg,
}) => {
  const router = useRouter();

  // existing auto-color logic
  const getAutoStyles = () => {
    const numericValue = Number(violationsCount);

    if (!isNaN(numericValue)) {
      if (numericValue === 0) {
        return {
          color: "#4caf50",
          bgColor: "#e8f5e9",
          borderColor: "#4caf50",
          iconBg: "#c8e6c9",
        };
      } else if (numericValue > 0) {
        return {
          color: "#f44336",
          bgColor: "#ffebee",
          borderColor: "#f44336",
          iconBg: "#ffcdd2",
        };
      }
    }

    return {
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    };
  };

  const auto = getAutoStyles();

  // NEW: Merge custom props with auto colors
  const variantStyles = {
    color: color || auto.color,
    bgColor: bgColor || auto.bgColor,
    borderColor: borderColor || auto.borderColor,
    iconBg: iconBg || auto.iconBg,
  };

  return (
    <Card
      onClick={() => route && router.push(route)}
      sx={{
        backgroundColor: variantStyles.bgColor,
        border: `1px solid ${variantStyles.borderColor}40`,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: route ? "pointer" : "default",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 110, // <-- reduced height
        // minWidth: 120,
        // maxWidth: 170,
        width: "100%",

        "&:hover": {
          boxShadow: route
            ? "0 4px 16px rgba(0,0,0,0.12)"
            : "0 2px 8px rgba(0,0,0,0.08)",
          transform: route ? "translateY(-2px)" : "none",
          borderColor: variantStyles.borderColor,
        },
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          backgroundColor: variantStyles.iconBg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 1,
          height: "100%", // full height of card
        }}
      >
        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: "bold",
            color: variantStyles.color,
            lineHeight: 1,
          }}
        >
          {violationsCount}
        </Typography>
      </Box>
      {/* Right Section */}
      <CardContent
        sx={{
          flex: 1,
          p: "10px !important",
          pr: "35px !important",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: variantStyles.color,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
      </CardContent>

      {/* Tooltip icon */}
      {/* {tooltipMessage && (
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
              "&:hover": { color: "#6b7280" },
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
        </Tooltip>
      )} */}
    </Card>
  );
};

export default DashboardKpiCardMain;
export type { DashboardKpiCardProps };
