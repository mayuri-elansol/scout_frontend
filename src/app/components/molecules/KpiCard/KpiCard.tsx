"use client";

import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
interface KpiCardProps {
  title: string;
  value: string;
  route?: string;
  icon: SvgIconComponent;
  size?: "small" | "medium" | "large";
  customWidth?: number;

  trendColor?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  iconBg?: string;
  tooltipMessage?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  route,
  icon: IconComponent,
  size = "medium",
  customWidth,
  trendColor,
  color,
  bgColor,
  borderColor,
  iconBg = "rgba(76, 175, 80, 0.1)",
  tooltipMessage,
}) => {
  const getVariantStyles = () => {
    // If custom colors are passed, use them directly
    if (trendColor && color && bgColor && borderColor && iconBg) {
      return { trendColor, color, bgColor, borderColor, iconBg };
    }
    if (value === "Safe") {
      return {
        trendColor: "#4caf50",
        color: "#4caf50",
        bgColor: "#e8f5e9",
        borderColor: "#4caf50",
        iconBg: "rgba(76, 175, 80, 0.1)",
      };
    }
    if (value === "Unsafe") {
      return {
        trendColor: "#4caf50",
        color: "#4caf50",
        bgColor: "#e8f5e9",
        borderColor: "#4caf50",
        iconBg: "rgba(76, 175, 80, 0.1)",
      };
    }
    // Default logic if no custom colors provided
    const numericValue = Number(value);

    if (!isNaN(numericValue)) {
      if (numericValue === 0) {
        return {
          trendColor: "#4caf50",
          color: "#4caf50",
          bgColor: "#e8f5e9",
          borderColor: "#4caf50",
          iconBg: "rgba(76, 175, 80, 0.1)",
        };
      } else if (numericValue > 0) {
        return {
          trendColor: "#f44336",
          color: "#f44336",
          bgColor: "#ffebee",
          borderColor: "#f44336",
          iconBg: "rgba(244, 67, 54, 0.1)",
        };
      }
    }

    // Default neutral style
    return {
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "rgba(33, 150, 243, 0.1)",
    };
  };

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
          valueSize: "25px",
          titleSize: "14px",
          subtitleSize: "12px",
          iconBoxSize: 36,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const router = useRouter();
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
        height: "95%",
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
          {tooltipMessage && (
            <Tooltip title={tooltipMessage} arrow>
              <Box
                sx={{
                  width: sizeStyles.iconBoxSize,
                  height: sizeStyles.iconBoxSize,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: variantStyles.color,
                }}
              >
                <InfoOutlineIcon />
              </Box>
            </Tooltip>
          )}

          {route && (
            <Button
              variant="outlined"
              size="small"
              sx={{
                fontSize: "11px",
                fontWeight: 600,
                color: variantStyles.trendColor,
                backgroundColor: "rgba(255,255,255,0.9)",
                border: `1px solid ${variantStyles.trendColor}40`,
                height: "20px",
                textTransform: "none",
                lineHeight: 1.2,
                minWidth: "unset",
                padding: "0 6px",
                "&:hover": {
                  border: `1px solid ${variantStyles.trendColor}`, // keep your custom border
                  backgroundColor: "rgba(255,255,255,0.95)", // optional hover bg
                },
                "&:focus": {
                  border: `1px solid ${variantStyles.trendColor}`, // fix focus blue border
                },
              }}
              onClick={() => {
                if (route) {
                  router.push(route);
                }
              }}
            >
              View
            </Button>
          )}
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
      </CardContent>
    </Card>
  );
};

export default KpiCard;
export type { KpiCardProps };
