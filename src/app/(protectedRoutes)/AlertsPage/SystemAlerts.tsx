import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  Warning,
  Person,
  ErrorOutline,
  InfoOutlined,
  Circle,
} from "@mui/icons-material";

import AlertCard from "../../components/molecules/AlertCard/AlertCard";
import  AlertStatsCard  from "../../components/molecules/AlertStatsCard/AlertStatsCard";

import { AlertsFilterPanel } from "@/app/components/organisms";
const SystemAlerts: React.FC = () => {
  const alertStats = [
    {
      value: "10",
      label: "Total Alerts",
      color: "#666",
      borderColor: "#e0e0e0",
    },
    {
      value: "2",
      label: "Safety and Compliances",
      color: "#f44336",
      borderColor: "#f44336",
    },
    // { value: "2", label: "Critical", color: "#d32f2f", borderColor: "#d32f2f" },
    {
      value: "3",
      label: "Security Monitoring",
      color: "#ff9800",
      borderColor: "#ff9800",
    },
    // { value: "3", label: "Medium", color: "#ffa726", borderColor: "#ffa726" },
    {
      value: "2",
      label: "Workforce Monitoring",
      color: "#4caf50",
      borderColor: "#4caf50",
    },
    {
      value: "3",
      label: "Oprational Insight",
      color: "#ffa726",
      borderColor: "#ffa726",
    },
  ];

  const alertsData = [
    {
      id: "ALT-7892",
      title: "Hard hat missing in reactor zone",
      description:
        "Worker W-4521 detected without hard hat in critical reactor control area",
      severity: "CRITICAL",
      status: "ACTIVE",
      category: "Safety",
      location: "Reactor Control Room - Camera 3",
      time: "16:45",
      assignedTo: "Safety Officer",
      duration: "8m",
      icon: ErrorOutline,
      actions: ["Notify Worker", "Send Safety Alert", "Log Incident"],
      borderColor: "#f44336",
    },
    {
      id: "ALT-7891",
      title: "Unauthorized person at main gate",
      description:
        "Unknown individual attempting unauthorized access at main entrance perimeter",
      severity: "CRITICAL",
      status: "ESCALATED",
      category: "Security",
      location: "Main Entrance - Camera 1",
      time: "16:32",
      assignedTo: "Security Team",
      duration: "15m",
      icon: ErrorOutline,
      actions: ["Alert Security", "Lock Down", "Call Authorities"],
      borderColor: "#f44336",
    },
    {
      id: "ALT-7890",
      title: "Equipment blocking emergency exit",
      description: "Large machinery cart left blocking Emergency Route B",
      severity: "HIGH",
      status: "ACTIVE",
      category: "Safety",
      location: "Emergency Route B - Camera 9",
      time: "16:18",
      assignedTo: "Maintenance",
      duration: "23m",
      icon: Warning,
      actions: ["Clear Path", "Relocate Equipment", "Update Logs"],
      borderColor: "#ff9800",
    },
    {
      id: "ALT-7889",
      title: "Missing personnel in critical area",
      description:
        "Required Level 3 operator not present in chemical processing unit",
      severity: "HIGH",
      status: "ACKNOWLEDGED",
      category: "Workforce",
      location: "Chemical Processing Unit",
      time: "16:05",
      assignedTo: "Shift Supervisor",
      duration: "35m",
      icon: Person,
      actions: ["Assign Replacement", "Notify HR", "Log Absence"],
      borderColor: "#ff9800",
    },
    {
      id: "ALT-7888",
      title: "High occupancy in break room",
      description: "Break room exceeding maximum capacity during shift change",
      severity: "MEDIUM",
      status: "ACTIVE",
      category: "Operational",
      location: "Break Room A - Camera 12",
      time: "15:52",
      assignedTo: "Facility Manager",
      duration: "48m",
      icon: InfoOutlined,
      actions: ["Manage Crowd", "Open Additional Area", "Update Schedule"],
      borderColor: "#ffa726",
    },
  ];

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Warning sx={{ fontSize: 28, color: "#f44336" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            System Alerts & Notifications
          </Typography>
        </Box>
      </Box>

      {/* Alert Statistics */}
      <Grid container spacing={2} sx={{ mb: 4, alignItems: "stretch" }}>
        {alertStats.map((stat) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
            key={stat.label}
            sx={{ display: "flex" }}
          >
            <AlertStatsCard
              label={stat.label}
              value={stat.value}
              color={stat.color || "black"}
              borderColor={stat.borderColor || "red"}
            />
          </Grid>
        ))}
      </Grid>

      {/* Search and Filters */}

      <AlertsFilterPanel />

      {/* Alert Summary */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: "14px", color: "#666" }}>
          Showing 10 of 10 alerts
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Circle sx={{ fontSize: 8, color: "#4caf50" }} />
          <Typography sx={{ fontSize: "12px", color: "#666" }}>
            Real-time monitoring
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#999", ml: 2 }}>
            Last updated: 3:53:18 PM
          </Typography>
        </Box>
      </Box>

      {/* Alert Details Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#333",
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          Alert Details
          <Circle sx={{ fontSize: 8, color: "#4caf50" }} />
          <Typography sx={{ fontSize: "12px", color: "#666" }}>
            Real-time monitoring
          </Typography>
        </Typography>

        {/* Alert Cards */}
        {alertsData.map((alert) => (
          <AlertCard
            key={alert.id}
            id={alert.id}
            title={alert.title}
            description={alert.description}
            severity={alert.severity}
            category={alert.category}
            location={alert.location}
            time={alert.time}
            assignedTo={alert.assignedTo}
            duration={alert.duration}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SystemAlerts;
