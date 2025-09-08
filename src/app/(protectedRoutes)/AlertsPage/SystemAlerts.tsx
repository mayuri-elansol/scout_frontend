import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Warning,
  Search,
  Download,
  Refresh,
  AccessTime,
  LocationOn,
  Person,
  CheckCircle,
  ErrorOutline,
  InfoOutlined,
  Circle,
} from "@mui/icons-material";
<<<<<<< HEAD:src/app/(unprotectedRoutes)/AlertsPage/SystemAlerts.tsx
import { AlertCard, AlertsFilterPanel, AlertStatsCard } from "@/app/components";
=======
import { AlertCard, AlertStatsCard } from "../../components/molecules";
>>>>>>> eab2af6b5cc4984b58280c062bf79703d30a62dc:src/app/(protectedRoutes)/AlertsPage/SystemAlerts.tsx

const SystemAlerts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return { color: "#f44336", bgColor: "#ffebee" };
      case "ESCALATED":
        return { color: "#d32f2f", bgColor: "#ffcdd2" };
      case "ACKNOWLEDGED":
        return { color: "#ff9800", bgColor: "#fff8e1" };
      case "RESOLVED":
        return { color: "#4caf50", bgColor: "#e8f5e9" };
      default:
        return { color: "#666", bgColor: "#f5f5f5" };
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return { color: "#d32f2f", bgColor: "#ffcdd2" };
      case "HIGH":
        return { color: "#ff9800", bgColor: "#fff8e1" };
      case "MEDIUM":
        return { color: "#ffa726", bgColor: "#fff3e0" };
      case "LOW":
        return { color: "#4caf50", bgColor: "#e8f5e9" };
      default:
        return { color: "#666", bgColor: "#f5f5f5" };
    }
  };

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
        <Typography
          variant="body1"
          sx={{ fontSize: "16px", color: "#5c6b7d", lineHeight: 1.5 }}
        >
          Real-time monitoring of all SCOUT system alerts, incidents, and
          notifications across safety, security, workforce, and operational
          categories
        </Typography>
      </Box>

      {/* Alert Statistics */}

      <Grid container spacing={2} sx={{ mb: 4, display: "flex" }}>
        {alertStats.map((stat, index) => (
          <Grid
            key={index}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: 200, md: 150 },
              display: "flex",
            }}
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

      <AlertsFilterPanel
      // onApply={handleApply}
      // onRefresh={handleRefresh}
      />

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
            id={alert.id}
            title={alert.title}
            description={alert.description}
            severity={alert.severity as "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"}
            status={
              alert.status as
                | "ACTIVE"
                | "ESCALATED"
                | "ACKNOWLEDGED"
                | "RESOLVED"
            }
            category={alert.category}
            location={alert.location}
            time={alert.time}
            assignedTo={alert.assignedTo}
            duration={alert.duration}
            actions={alert.actions}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SystemAlerts;
