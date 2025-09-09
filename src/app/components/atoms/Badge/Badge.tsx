'use client';

import React from "react";
import { Chip, ChipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ScoutBadgeProps extends Omit<ChipProps, "variant" | "color"> {
  variant?: "status" | "priority" | "category" | "count";
  status?:
    | "active"
    | "inactive"
    | "pending"
    | "resolved"
    | "investigating"
    | "critical"
    | "warning"
    | "success"
    | "info"
    | "break"
    | "offline";
  priority?: "critical" | "high" | "medium" | "low";
  category?:
    | "ppe"
    | "intrusion"
    | "employee"
    | "fire"
    | "security"
    | "operational";
}

const StyledChip = styled(Chip)<{
  badgevariant?: string;
  status?: string;
  priority?: string;
  category?: string;
}>(({ badgevariant, status, priority, category }) => {
  const baseStyles = {
    fontSize: "12px",
    fontWeight: 500,
    height: "24px",
    borderRadius: "12px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  };

  // Status variant colors
  if (badgevariant === "status") {
    const statusColors = {
      active: { bg: "#e8f5e9", color: "#2e7d32", border: "#4caf50" },
      inactive: { bg: "#f5f5f5", color: "#666666", border: "#9e9e9e" },
      pending: { bg: "#e3f2fd", color: "#1565c0", border: "#2196f3" },
      resolved: { bg: "#e8f5e9", color: "#2e7d32", border: "#4caf50" },
      investigating: { bg: "#fff8e1", color: "#f57c00", border: "#ff9800" },
      critical: { bg: "#ffebee", color: "#c62828", border: "#f44336" },
      warning: { bg: "#fff8e1", color: "#f57c00", border: "#ff9800" },
      success: { bg: "#e8f5e9", color: "#2e7d32", border: "#4caf50" },
      info: { bg: "#e3f2fd", color: "#1565c0", border: "#2196f3" },
      break: { bg: "#fff8e1", color: "#f57c00", border: "#ff9800" },
      offline: { bg: "#ffebee", color: "#c62828", border: "#f44336" },
    };

    const statusStyle =
      statusColors[status as keyof typeof statusColors] || statusColors.active;
    return {
      ...baseStyles,
      backgroundColor: statusStyle.bg,
      color: statusStyle.color,
      border: `1px solid ${statusStyle.border}40`,
    };
  }

  // Priority variant colors
  if (badgevariant === "priority") {
    const priorityColors = {
      critical: { bg: "#ffebee", color: "#c62828", border: "#f44336" },
      high: { bg: "#fff3e0", color: "#ef6c00", border: "#ff9800" },
      medium: { bg: "#fff8e1", color: "#f57c00", border: "#ffc107" },
      low: { bg: "#e8f5e9", color: "#2e7d32", border: "#4caf50" },
    };

    const priorityStyle =
      priorityColors[priority as keyof typeof priorityColors] ||
      priorityColors.medium;
    return {
      ...baseStyles,
      backgroundColor: priorityStyle.bg,
      color: priorityStyle.color,
      border: `1px solid ${priorityStyle.border}40`,
    };
  }

  // Category variant colors
  if (badgevariant === "category") {
    const categoryColors = {
      ppe: { bg: "#f3e5f5", color: "#7b1fa2", border: "#9c27b0" },
      intrusion: { bg: "#ffebee", color: "#c62828", border: "#f44336" },
      employee: { bg: "#e3f2fd", color: "#1565c0", border: "#2196f3" },
      fire: { bg: "#fff3e0", color: "#ef6c00", border: "#ff9800" },
      security: { bg: "#fce4ec", color: "#ad1457", border: "#e91e63" },
      operational: { bg: "#e0f2f1", color: "#00695c", border: "#009688" },
    };

    const categoryStyle =
      categoryColors[category as keyof typeof categoryColors] ||
      categoryColors.operational;
    return {
      ...baseStyles,
      backgroundColor: categoryStyle.bg,
      color: categoryStyle.color,
      border: `1px solid ${categoryStyle.border}40`,
    };
  }

  // Count variant (for notification badges)
  if (badgevariant === "count") {
    return {
      ...baseStyles,
      backgroundColor: "#f44336",
      color: "white",
      border: "1px solid #f44336",
      minWidth: "20px",
      height: "20px",
      fontSize: "11px",
      fontWeight: 600,
    };
  }

  // Default variant
  return {
    ...baseStyles,
    backgroundColor: "#e3f2fd",
    color: "#1565c0",
    border: "1px solid #2196f340",
  };
});

const ScoutBadge: React.FC<ScoutBadgeProps> = ({
  variant = "status",
  status,
  priority,
  category,
  ...props
}) => {
  return (
    <StyledChip
      badgevariant={variant}
      status={status}
      priority={priority}
      category={category}
      {...props}
    />
  );
};

export default ScoutBadge;
