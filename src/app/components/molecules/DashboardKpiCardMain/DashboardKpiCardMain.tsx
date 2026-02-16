"use client";

import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface DashboardKpiCardProps {
  title: string;
  violationsCount?: number;
  colour: "red" | "blue" | "green" | "gray";
  route?: string;
}

const DashboardKpiCardMain: React.FC<DashboardKpiCardProps> = ({
  title,
  violationsCount,
  route,
  colour,
}) => {
  const router = useRouter();
  type KpiColour = "red" | "blue" | "green" | "gray";

  const KPI_STYLES: Record<
    KpiColour,
    {
      color: string;
      bgColor: string;
      borderColor: string;
      iconBg: string;
    }
  > = {
    red: {
      color: "#f44336",
      bgColor: "#ffebee",
      borderColor: "#f44336",
      iconBg: "#ffcdd2",
    },
    blue: {
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
    green: {
      color: "#4caf50",
      bgColor: "#e8f5e9",
      borderColor: "#4caf50",
      iconBg: "#c8e6c9",
    },
    gray: {
      color: "#9e9e9e",
      bgColor: "#f5f5f5",
      borderColor: "#e0e0e0",
      iconBg: "#eeeeee",
    },
  };

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

  const variantStyles = KPI_STYLES[colour];
  const isDisabled = colour === "gray";
  return (
    <Card
      onClick={() => !isDisabled && route && router.push(route)}
      sx={{
        backgroundColor: variantStyles.bgColor,
        border: `1px solid ${variantStyles.borderColor}40`,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.7 : 1,
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
        {/* <Typography
          sx={{
            fontSize: "36px",
            fontWeight: "bold",
            color: variantStyles.color,
            lineHeight: 1,
          }}
        >
          {violationsCount}
        </Typography> */}

        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: "bold",
            color: variantStyles.color,
            lineHeight: 1,
          }}
        >
          {isDisabled ? "--" : violationsCount}
        </Typography>
      </Box>
      {/* Right Section */}
      <CardContent
        sx={{
          flex: 1,
          p: "10px",
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
    </Card>
  );
};

export default DashboardKpiCardMain;
export type { DashboardKpiCardProps };
