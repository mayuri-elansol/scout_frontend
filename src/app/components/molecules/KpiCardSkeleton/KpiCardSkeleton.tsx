"use client";

import React from "react";
import { Card, CardContent, Box, Skeleton } from "@mui/material";

interface KpiCardSkeletonProps {
  size?: "small" | "medium" | "large";
  customWidth?: number;
  customHeight?: number;
}

const KpiCardSkeleton: React.FC<KpiCardSkeletonProps> = ({
  size = "medium",
  customWidth,
  customHeight,
}) => {
  // Size-specific styling
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          minHeight: "120px",
          padding: "16px",
          valueHeight: 24,
          titleHeight: 16,
          subtitleHeight: 14,
          iconBoxSize: 32,
        };
      case "large":
        return {
          minHeight: "200px",
          padding: "24px",
          valueHeight: 40,
          titleHeight: 20,
          subtitleHeight: 16,
          iconBoxSize: 44,
        };
      default:
        return {
          minHeight: "160px",
          padding: "20px",
          valueHeight: 32,
          titleHeight: 18,
          subtitleHeight: 14,
          iconBoxSize: 36,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const finalWidth = customWidth ? `${customWidth}px` : "auto";
  const finalHeight = customHeight ? `${customHeight}px` : sizeStyles.minHeight;

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
        minHeight: finalHeight,
        width: finalWidth,
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
        {/* Header with Icon + Trend */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          {/* Icon Box */}
          <Skeleton
            variant="circular"
            width={sizeStyles.iconBoxSize}
            height={sizeStyles.iconBoxSize}
          />

          {/* Trend Chip */}
          <Skeleton variant="rounded" width={60} height={20} />
        </Box>

        {/* Value */}
        <Skeleton
          variant="text"
          width="40%"
          height={sizeStyles.valueHeight}
          sx={{ mb: 1 }}
        />

        {/* Title */}
        <Skeleton
          variant="text"
          width="60%"
          height={sizeStyles.titleHeight}
          sx={{ mb: 1 }}
        />

        {/* Subtitle */}
        {/* <Skeleton
          variant="text"
          width="50%"
          height={sizeStyles.subtitleHeight}
        /> */}
      </CardContent>
    </Card>
  );
};

export default KpiCardSkeleton;
export type { KpiCardSkeletonProps };
