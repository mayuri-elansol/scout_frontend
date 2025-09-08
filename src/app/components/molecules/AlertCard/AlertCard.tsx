import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { Warning, AccessTime, LocationOn, Person } from "@mui/icons-material";
import { SvgIconComponent } from "@mui/icons-material";
import ViewAlertPopup from "../ViewAlertPopup/ViewAlertPopup";

interface AlertCardProps {
  id: string;
  title: string;
  description: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "ACTIVE" | "ESCALATED" | "ACKNOWLEDGED" | "RESOLVED";
  category: string;
  location: string;
  time: string;
  assignedTo: string;
  duration: string;
  actions: string[];
  icon?: SvgIconComponent;
  onActionClick?: (action: string) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({
  title,
  description,
  severity,
  // status,
  category,
  location,
  time,
  assignedTo,
  duration,

  icon: IconComponent = Warning,
}) => {
  const [open, setOpen] = useState(false);

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "ACTIVE":
  //       return { color: "#f44336", bgColor: "#ffebee" };
  //     case "ESCALATED":
  //       return { color: "#d32f2f", bgColor: "#ffcdd2" };
  //     case "ACKNOWLEDGED":
  //       return { color: "#ff9800", bgColor: "#fff8e1" };
  //     case "RESOLVED":
  //       return { color: "#4caf50", bgColor: "#e8f5e9" };
  //     default:
  //       return { color: "#666", bgColor: "#f5f5f5" };
  //   }
  // };

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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 0.5,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#333", fontSize: "16px" }}
                >
                  {title}
                </Typography>
              </Box>
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
            {/* <Typography
              sx={{ color: "#999", fontSize: "12px", fontFamily: "monospace" }}
            >
              {id}
            </Typography> */}
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
              location="Reactor Control Room - Camera 3"
              time="10:30 AM"
              assignedTo="Safety Officer"
              duration="2 hours"
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

        {/* Quick Actions */}
        {/* <Box>
          <Typography
            sx={{ fontSize: "12px", color: "#666", mb: 1, fontWeight: 500 }}
          >
            Quick Actions:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {actions.map((action: string, index: number) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                onClick={() => onActionClick?.(action)}
                sx={{
                  fontSize: "11px",
                  textTransform: "none",
                  borderColor: "#e0e0e0",
                  color: "#1976d2",
                  py: 0.5,
                  px: 1.5,
                  minHeight: 28,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "#1976d2",
                  },
                }}
              >
                {action}
              </Button>
            ))}
          </Box>
        </Box> */}
      </CardContent>
    </Card>
  );
};

export default AlertCard;
export type { AlertCardProps };
