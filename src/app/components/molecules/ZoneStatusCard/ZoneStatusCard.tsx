"use client";

import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Circle } from "@mui/icons-material";
import ScoutProgressBar from "../../atoms/ProgressBar/ProgressBar";

interface ZoneStatusCardProps {
  zoneName: string;
  currentPersonnel: number;
  requiredPersonnel: number;
  shift: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  certificationRequired: string;
  status?: "optimal" | "understaffed" | "overstaffed" | "critical";
  onClick?: () => void;
}

const StyledCard = styled(Card)<{ priority?: string }>(({ priority }) => {
  const getPriorityColor = () => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "#ef4444";
      case "high":
        return "#f97316";
      case "medium":
        return "#eab308";
      case "low":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };

  return {
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s ease",
    cursor: "pointer",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "4px",
      backgroundColor: getPriorityColor(),
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
    },
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transform: "translateY(-1px)",
    },
  };
});

const ZoneStatusCard: React.FC<ZoneStatusCardProps> = ({
  zoneName,
  currentPersonnel,
  requiredPersonnel,
  shift,
  priority,
  certificationRequired,
  status,
  onClick,
}) => {
  const getPersonnelStatus = () => {
    const percentage = (currentPersonnel / requiredPersonnel) * 100;
    if (percentage >= 100) return "optimal";
    if (percentage >= 75) return "understaffed";
    return "critical";
  };

  const getStatusColor = () => {
    const statusValue = status || getPersonnelStatus();
    switch (statusValue) {
      case "optimal":
        return "#22c55e";
      case "understaffed":
        return "#f97316";
      case "overstaffed":
        return "#3b82f6";
      case "critical":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getPriorityColor = () => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "#ef4444";
      case "high":
        return "#f97316";
      case "medium":
        return "#eab308";
      case "low":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };

  // Calculate personnel percentage
  const personnelPercentage = Math.min(
    (currentPersonnel / requiredPersonnel) * 100,
    100
  );

  // Extract nested ternary into a separate variable
  let personnelColor: "success" | "warning" | "error";
  if (personnelPercentage >= 100) {
    personnelColor = "success";
  } else if (personnelPercentage >= 75) {
    personnelColor = "warning";
  } else {
    personnelColor = "error";
  }

  return (
    <StyledCard priority={priority} onClick={onClick}>
      <CardContent sx={{ p: 2 }}>
        {/* Zone Name and Personnel Count */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              color: "#1c2025",
              lineHeight: 1.2,
            }}
          >
            {zoneName}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Circle
              sx={{
                fontSize: 8,
                color: getStatusColor(),
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "14px",
                color: getStatusColor(),
              }}
            >
              {currentPersonnel}/{requiredPersonnel}
            </Typography>
          </Box>
        </Box>

        {/* Certification and Shift */}
        <Typography
          variant="body2"
          sx={{
            color: "#6b7280",
            fontSize: "12px",
            mb: 0.5,
          }}
        >
          {certificationRequired}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#6b7280",
            fontSize: "12px",
            mb: 1.5,
          }}
        >
          {shift}
        </Typography>

        {/* Priority */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
              fontSize: "11px",
            }}
          >
            Priority:
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: getPriorityColor(),
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            {priority}
          </Typography>
        </Box>

        {/* Personnel Progress Bar */}
        <ScoutProgressBar
          value={personnelPercentage}
          variant="capacity"
          size="small"
          showLabel={false}
          showPercentage={false}
          color={personnelColor}
        />
      </CardContent>
    </StyledCard>
  );
};

export default ZoneStatusCard;
