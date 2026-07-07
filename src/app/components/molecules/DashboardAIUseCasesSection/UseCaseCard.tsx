"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Lock } from "@mui/icons-material";
import { DASHBOARD_COLORS, MuiIcon } from "@/app/config/dashboardTheme";

export interface UseCaseCardProps {
  icon: MuiIcon;
  title: string;
  value?: number;
  /** Category accent used for the border + icon tint on unlocked cards. */
  accentColor?: string;
  accentTint?: string;
  locked?: boolean;
  onClick?: () => void;
}

/** Mirrors the mockup's `.status-tile` — a single AI Use Case Status tile (+ locked/upgrade variant). */
const UseCaseCard: React.FC<UseCaseCardProps> = ({
  icon: Icon,
  title,
  value,
  accentColor = DASHBOARD_COLORS.primary,
  accentTint = DASHBOARD_COLORS.primaryTint,
  locked = false,
  onClick,
}) => {
  if (locked) {
    return (
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "11px",
          padding: "10px 12px",
          border: `1.5px dashed ${DASHBOARD_COLORS.border}`,
          borderRadius: "10px",
          backgroundColor: DASHBOARD_COLORS.bg,
          cursor: "pointer",
          transition: "border-color .12s ease",
          "&:hover": { borderColor: "#C7CFDA" },
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            backgroundColor: DASHBOARD_COLORS.hover,
            color: DASHBOARD_COLORS.textSecondary,
          }}
        >
          <Lock sx={{ fontSize: 17 }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 700,
              color: DASHBOARD_COLORS.textSecondary,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "11px",
              color: "#9CA3AF",
              fontStyle: "italic",
              mt: "2px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Unlock with an upgrade
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "11px",
        padding: "14px",
        border: `1.5px solid ${accentColor}`,
        borderRadius: "10px",
        cursor: "pointer",
        transition: "box-shadow .12s ease",
        "&:hover": { boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 1px 3px 1px rgba(0,0,0,.06)" },
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          backgroundColor: accentTint,
          color: accentColor,
        }}
      >
        <Icon sx={{ fontSize: 17 }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 700,
            color: DASHBOARD_COLORS.textPrimary,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
      </Box>
      {value !== undefined && (
        <Typography sx={{ fontSize: "18px", fontWeight: 800, color: DASHBOARD_COLORS.textPrimary, flexShrink: 0 }}>
          {value}
        </Typography>
      )}
    </Box>
  );
};

export default UseCaseCard;
