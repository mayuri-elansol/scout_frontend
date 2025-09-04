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

  const AlertCard = ({ alert }: { alert: any }) => {
    const statusColors = getStatusColor(alert.status);
    const severityColors = getSeverityColor(alert.severity);

    return (
      <Card
        sx={{
          mb: 2,
          borderLeft: `4px solid ${alert.borderColor}`,
          "&:hover": {
            boxShadow: 3,
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
              <alert.icon sx={{ color: alert.borderColor, fontSize: 20 }} />
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#333", fontSize: "16px" }}
                  >
                    {alert.title}
                  </Typography>
                  {/* <Chip
                    label={alert.severity}
                    size="small"
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: severityColors.color,
                      backgroundColor: severityColors.bgColor,
                      height: 20,
                    }}
                  /> */}
                  {/* <Chip
                    label={alert.status}
                    size="small"
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: statusColors.color,
                      backgroundColor: statusColors.bgColor,
                      height: 20,
                    }}
                  /> */}
                </Box>
                <Typography sx={{ color: "#666", fontSize: "14px", mb: 1.5 }}>
                  {alert.description}
                </Typography>
              </Box>
            </Box>

            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "#999", fontSize: "12px" }}>
                {alert.id}
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#1976d2",
                  fontSize: "11px",
                  textTransform: "none",
                  minWidth: "auto",
                  px: 2,
                }}
              >
                View Details
              </Button>
            </Box> */}
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
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOn sx={{ fontSize: 14 }} />
              <span>{alert.location}</span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTime sx={{ fontSize: 14 }} />
              <span>{alert.time}</span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Person sx={{ fontSize: 14 }} />
              <span>Assigned: {alert.assignedTo}</span>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <span>Duration: {alert.duration}</span>
            </Box>
          </Box>

          {/* Quick Actions */}
          {/* <Box>
            <Typography sx={{ fontSize: "12px", color: "#666", mb: 1 }}>
              Quick Actions:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {alert.actions.map((action: string, index: number) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
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
      <Grid container spacing={2} sx={{ mb: 4 }} alignItems="stretch">
        {alertStats.map((stat, index) => (
          // item xs={12} sm={6} md={2}
          <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                border: `1px solid ${stat.borderColor}`,
                borderRadius: 1,
                backgroundColor: "white",
                height: "100%", // make each paper fill grid item height
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: stat.color,
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#666" }}>
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="center">
            {/* Search */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                placeholder="Search by title, description, or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ fontSize: 20, color: "#666" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f8f9fa",
                  },
                }}
              />
            </Grid>

            {/* Severity */}
            <Grid size={{ xs: 12, lg: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Severity Level</InputLabel>
                <Select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  label="Severity Level"
                >
                  <MenuItem value="">All Severities</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Category */}
            {/* item xs={12} lg={3} */}
            <Grid size={{ xs: 12, lg: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  <MenuItem value="safety">Safety</MenuItem>
                  <MenuItem value="security">Security</MenuItem>
                  <MenuItem value="workforce">Workforce</MenuItem>
                  <MenuItem value="operational">Operational</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Buttons */}
            {/* item xs={12} lg={2} */}
            <Grid size={{ xs: 12, lg: 2 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  size="small"
                  sx={{
                    backgroundColor: "#1976d2",
                    fontSize: "12px",
                    textTransform: "none",
                    paddingX: "10px",
                  }}
                >
                  Export
                </Button>
                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <Refresh sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </Box>
    </Box>
  );
};

export default SystemAlerts;
