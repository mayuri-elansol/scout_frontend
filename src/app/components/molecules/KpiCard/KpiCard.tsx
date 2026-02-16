"use client";
import React, { memo } from "react";
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
  value: string | number;
  route?: string;
  icon: SvgIconComponent;
  size?: "small" | "medium" | "large";
  customWidth?: number;

  tooltipMessage?: string;
  colour?: "red" | "green" | "blue";
}

// ✅ Define the component first
const KpiCardComponent: React.FC<KpiCardProps> = ({
  title,
  value,
  route,
  icon: IconComponent,
  size = "medium",
  customWidth,

  tooltipMessage,
  colour,
}) => {
  const COLOUR_THEME_MAP = {
    red: {
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      borderColor: "#f44336",
      iconBg: "rgba(244, 67, 54, 0.1)",
    },
    green: {
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      borderColor: "#4caf50",
      iconBg: "rgba(76, 175, 80, 0.1)",
    },
    blue: {
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "rgba(33, 150, 243, 0.1)",
    },
  } as const;

  const getVariantStyles = () => {
    /** 🟢 1. Backend-driven colour ALWAYS wins */
    if (colour && COLOUR_THEME_MAP[colour]) {
      return COLOUR_THEME_MAP[colour];
    }

    /** 🟡 2. Optional fallback (for older dashboards / PPE etc) */
    const numericValue = Number(value);

    if (!isNaN(numericValue)) {
      return numericValue > 0 ? COLOUR_THEME_MAP.red : COLOUR_THEME_MAP.green;
    }

    /** 🔵 3. Neutral default */
    return COLOUR_THEME_MAP.blue;
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
          valueSize: "24px",
          titleSize: "14px",
          subtitleSize: "12px",
          iconBoxSize: 36,
        };
    }
  };

  // ✅ Only log on actual re-renders
  console.log(`🔄 KpiCard re-rendered: ${title} = ${value}`);

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const router = useRouter();
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
        width: finalWidth,

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
            <Tooltip title={tooltipMessage} arrow placement="top">
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
                  border: `1px solid ${variantStyles.trendColor}`,
                  backgroundColor: "rgba(255,255,255,0.95)",
                },
                "&:focus": {
                  border: `1px solid ${variantStyles.trendColor}`,
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

// ✅ Wrap with memo and export
const KpiCard = memo(KpiCardComponent, (prevProps, nextProps) => {
  // Custom comparison: only re-render if value, title, or critical props changed
  return (
    prevProps.value === nextProps.value &&
    prevProps.title === nextProps.title &&
    prevProps.route === nextProps.route &&
    prevProps.size === nextProps.size
  );
});

// ✅ Set display name for debugging
KpiCard.displayName = "KpiCard";

// ✅ Export as default
export default KpiCard;
export type { KpiCardProps };
