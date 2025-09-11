"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import {
  Warning,
  AccessTime,
  LocationOn,
  Person,
  SvgIconComponent,
} from "@mui/icons-material";
import ViewAlertPopup from "../ViewAlertPopup/ViewAlertPopup";

// AlertCard.tsx
interface AlertCardProps {
  id: string;
  title: string;
  description: string;
  severity: string;
  //status?: "ACTIVE" | "ESCALATED" | "ACKNOWLEDGED" | "RESOLVED";
  category: string;
  location: string;
  time: string;
  assignedTo: string;
  duration: string;
  icon?: SvgIconComponent;
  //  actions?: string[];
  //onActionClick?: (action: string) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({
  id,
  title,
  description,
  severity,
  category,
  location,
  time,
  assignedTo,
  duration,

  icon: IconComponent = Warning,
}) => {
  const [open, setOpen] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return { color: "#d32f2f", bgColor: "#ffcdd2", borderColor: "#f44336" };
      case "HIGH":
        return { color: "#ff9800", bgColor: "#fff8e1", borderColor: "#ff9800" };
      case "MEDIUM":
        return { color: "#ffa726", bgColor: "#fff3e0", borderColor: "#ffa726" };
      case "LOW":
        return { color: "#4caf50", bgColor: "#e8f5e9", borderColor: "#4caf50" };
      default:
        return { color: "#666", bgColor: "#f5f5f5", borderColor: "#e0e0e0" };
    }
  };

  const severityColors = getSeverityColor(severity);

  return (
    <Card
      data-id={id}
      sx={{
        mb: 2,
        borderLeft: `4px solid ${severityColors.borderColor}`,
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-1px)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}
          >
            <IconComponent
              sx={{ color: severityColors.borderColor, fontSize: 20 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#333",
                  fontSize: "16px",
                  mb: 0.5,
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontSize: "14px",
                  mb: 1.5,
                  lineHeight: 1.4,
                }}
              >
                {description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "#1976d2",
                fontSize: "11px",
                textTransform: "none",
                minWidth: "auto",
                px: 2,
                py: 0.5,
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              View Details
            </Button>

            <ViewAlertPopup
              open={open}
              handleClose={() => setOpen(false)}
              location={location}
              time={time}
              assignedTo={assignedTo}
              duration={duration}
              imageUrl="https://via.placeholder.com/400"
            />
          </Box>
        </Box>

        {/* Alert Metadata */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 2,
            fontSize: "12px",
            color: "#666",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOn sx={{ fontSize: 14 }} />
            <span>{location}</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AccessTime sx={{ fontSize: 14 }} />
            <span>{time}</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Person sx={{ fontSize: 14 }} />
            <span>Assigned: {assignedTo}</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <span>Duration: {duration}</span>
          </Box>
          <Chip
            label={category}
            size="small"
            variant="outlined"
            sx={{
              fontSize: "10px",
              height: 18,
              "& .MuiChip-label": { px: 1 },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
export type { AlertCardProps };
