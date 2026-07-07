"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { DASHBOARD_COLORS, MuiIcon } from "@/app/config/dashboardTheme";

export type EventSeverity = "critical" | "warning" | "healthy" | "info";

const SEVERITY_STYLES: Record<EventSeverity, { dot: string; bg: string; color: string }> = {
  critical: { dot: DASHBOARD_COLORS.error, bg: DASHBOARD_COLORS.errorTint, color: DASHBOARD_COLORS.error },
  warning: { dot: DASHBOARD_COLORS.warning, bg: DASHBOARD_COLORS.warningTint, color: DASHBOARD_COLORS.warningText },
  healthy: { dot: DASHBOARD_COLORS.success, bg: DASHBOARD_COLORS.successTint, color: DASHBOARD_COLORS.success },
  info: { dot: DASHBOARD_COLORS.accent, bg: DASHBOARD_COLORS.accentTint, color: "#0369A1" },
};

export interface EventCardProps {
  severity: EventSeverity;
  icon: MuiIcon;
  title: string;
  meta: string;
  time: string;
}

/** Mirrors the mockup's `.event-row` — a single row in the Recent Events feed. */
const EventCard: React.FC<EventCardProps> = ({ severity, icon: Icon, title, meta, time }) => {
  const { dot, bg, color } = SEVERITY_STYLES[severity];

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "11px", py: "11px" }}>
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          mt: "8px",
          flexShrink: 0,
          backgroundColor: dot,
        }}
      />
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          backgroundColor: bg,
          color,
        }}
      >
        <Icon sx={{ fontSize: 17 }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
          <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: DASHBOARD_COLORS.textPrimary, lineHeight: 1.35 }}>
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "10.5px",
              color: DASHBOARD_COLORS.textSecondary,
              fontWeight: 600,
              whiteSpace: "nowrap",
              ml: "8px",
              flexShrink: 0,
            }}
          >
            {time}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "11px", color: DASHBOARD_COLORS.textSecondary, mt: "2px", fontWeight: 500 }}>
          {meta}
        </Typography>
      </Box>
    </Box>
  );
};

export default EventCard;
