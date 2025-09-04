import React from "react";
import { Paper, Typography } from "@mui/material";

interface AlertStatsCardProps {
  value: string;
  label: string;
  color: string;
  borderColor: string;
  size?: "small" | "medium" | "large";
}

const AlertStatsCard: React.FC<AlertStatsCardProps> = ({
  value,
  label,
  color,
  borderColor,
  size = "medium",
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { padding: 1.5, fontSize: "20px" };
      case "large":
        return { padding: 3, fontSize: "32px" };
      default:
        return { padding: 2, fontSize: "24px" };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <Paper
      sx={{
        p: sizeStyles.padding,
        textAlign: "center",
        border: `1px solid ${borderColor}`,
        borderRadius: 1,
        backgroundColor: "white",
        display: "flex",
        flex: 1,
        minHeight:
          size === "small" ? "60px" : size === "large" ? "120px" : "80px",

        flexDirection: "column",
        justifyContent: "center",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: 2,
          transform: "translateY(-1px)",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: sizeStyles.fontSize,
          fontWeight: "bold",
          color: color,
          mb: 0.5,
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize:
            size === "small" ? "11px" : size === "large" ? "14px" : "12px",
          color: "#666",
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
};

export default AlertStatsCard;
export type { AlertStatsCardProps };
