"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Divider,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CheckCircleOutline,
  HighlightOff,
  WarningAmberOutlined,
  DoneAllOutlined,
  ScheduleOutlined,
  Search,
  Clear,
  FiberManualRecord,
} from "@mui/icons-material";

import StatCard from "@/app/components/molecules/DashboardKpiCardMain/StatCard";
import EventCard, { EventSeverity } from "@/app/components/molecules/DashboardRecentEvent/EventCard";

// ------------------------------------------------------------
// Data
// ------------------------------------------------------------

const statsData = [
  { icon: HighlightOff, tone: "red", value: 4, label: "Critical" },
  { icon: WarningAmberOutlined, tone: "amber", value: 8, label: "Non-Critical" },
  { icon: DoneAllOutlined, tone: "blue", value: 2, label: "Acknowledged" },
  { icon: CheckCircleOutline, tone: "green", value: 1, label: "Resolved" },
  { icon: ScheduleOutlined, tone: "gray", value: "2m 48s", label: "Avg Response" },
];

// Live alerts (recent)
const liveAlerts = [
  { camera: "CAM-08", zone: "Warehouse", time: "17:42", title: "Fire Detected", severity: "critical" },
  { camera: "CAM-12", zone: "Assembly Line", time: "17:40", title: "Helmet Missing", severity: "warning" },
  { camera: "CAM-15", zone: "Gate B", time: "17:39", title: "Unauthorized Person", severity: "critical" },
  { camera: "CAM-04", zone: "Loading Dock", time: "17:37", title: "Forklift in Walkway", severity: "warning" },
];

const distributionData = [
  { label: "Critical", value: 12, color: "#d32f2f" },
  { label: "Non-Critical", value: 8, color: "#ed6c02" },
];

const topCameras = [
  { camera: "CAM-08", zone: "Warehouse", count: 2 },
  { camera: "CAM-09", zone: "Assembly Line", count: 4 },
  { camera: "CAM-12", zone: "Assembly Line", count: 1 },
  { camera: "CAM-15", zone: "Gate B", count: 1 },
];

// Full alert list for the table
const initialAlerts = [
  { time: "17:42", severity: "Critical", alert: "Fire Detected", camera: "CAM-08", zone: "1", status: "New" },
  { time: "17:40", severity: "Non-Critical", alert: "Helmet Missing", camera: "CAM-12", zone: "1", status: "New" },
  { time: "17:39", severity: "Critical", alert: "Unauthorized Person", camera: "CAM-15", zone: "1", status: "Acknowledged" },
  { time: "17:37", severity: "Non-Critical", alert: "Forklift in Walkway", camera: "CAM-04", zone: "1", status: "Viewed" },
  { time: "17:35", severity: "Non-Critical", alert: "Camera Tampering", camera: "CAM-02", zone: "1", status: "New" },
  { time: "17:31", severity: "Critical", alert: "Smoke Detected", camera: "CAM-28", zone: "1", status: "Acknowledged" },
  { time: "17:28", severity: "Non-Critical", alert: "Crowd Density High", camera: "CAM-09", zone: "1", status: "Viewed" },
  { time: "17:24", severity: "Non-Critical", alert: "Vehicle Idling", camera: "CAM-06", zone: "1", status: "Viewed" },
  { time: "17:19", severity: "Non-Critical", alert: "Vest Missing", camera: "CAM-14", zone: "1", status: "Viewed" },
  { time: "17:12", severity: "Critical", alert: "Perimeter Breach", camera: "CAM-05", zone: "1", status: "Resolved" },
  { time: "17:05", severity: "Non-Critical", alert: "Heat Anomaly", camera: "CAM-08", zone: "1", status: "Viewed" },
  { time: "16:58", severity: "Non-Critical", alert: "Restricted Gathering", camera: "CAM-09", zone: "1", status: "Viewed" },
];

// ------------------------------------------------------------
// Main Component
// ------------------------------------------------------------

const LiveAlertsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Filter states
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Filtered alerts
  const filteredAlerts = initialAlerts.filter((alert) => {
    const matchesSearch =
      alert.alert.toLowerCase().includes(search.toLowerCase()) ||
      alert.camera.toLowerCase().includes(search.toLowerCase()) ||
      alert.zone.includes(search);
    const matchesSeverity = severityFilter === "All" || alert.severity === severityFilter;
    const matchesStatus = statusFilter === "All" || alert.status === statusFilter;
    const matchesCategory = categoryFilter === "All"; // No category in data; placeholder
    return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
  });

  const handleResetFilters = () => {
    setSearch("");
    setSeverityFilter("All");
    setStatusFilter("All");
    setCategoryFilter("All");
  };

  // Severity color mapping for table chips
  const severityColor = (sev: string) => {
    switch (sev) {
      case "Critical": return "error";
      case "Non-Critical": return "warning";
      default: return "default";
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 3, p: 3 }}>
      {/* Stats Cards */}
      <Grid container spacing={2}>
        {statsData.map((stat, idx) => (
          <Grid item xs={6} sm={4} md={2.4} key={idx}>
            <StatCard
              icon={stat.icon}
              tone={stat.tone as any}
              value={stat.value}
              label={stat.label}
              // For Avg Response we don't show total; we can pass total as undefined
              total={stat.label === "Avg Response" ? undefined : ""}
            />
          </Grid>
        ))}
      </Grid>

      {/* Two-column layout: Live Alerts + Distribution | Top Cameras */}
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Live Alerts */}
            <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="h6" fontWeight="600">
                  LIVE ALERTS
                </Typography>
                <Chip
                  label="Live"
                  size="small"
                  sx={{ bgcolor: "#4caf50", color: "#fff", fontWeight: 600 }}
                  icon={<FiberManualRecord sx={{ fontSize: 12, color: "#fff" }} />}
                />
              </Box>
              <Stack spacing={1}>
                {liveAlerts.map((alert, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 0.5,
                      borderBottom: idx < liveAlerts.length - 1 ? "1px solid" : "none",
                      borderColor: "divider",
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight="500">
                        {alert.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alert.camera} - {alert.zone}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {alert.time}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Alert Distribution */}
            <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                ALERT DISTRIBUTION
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Breakdown of active alerts by severity level
              </Typography>
              <Stack spacing={2}>
                {distributionData.map((item) => (
                  <Box key={item.label}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2" fontWeight="500">
                        {item.label}
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        Total Alerts: {item.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "#e0e0e0",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: `${(item.value / distributionData.reduce((acc, d) => acc + d.value, 0)) * 100}%`,
                          bgcolor: item.color,
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        {/* Right column: Top Cameras */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", height: "100%" }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              TOP CAMERAS
            </Typography>
            <Stack spacing={2}>
              {topCameras.map((cam) => (
                <Box
                  key={cam.camera}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    pb: 1,
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight="500">
                      {cam.camera}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {cam.zone}
                    </Typography>
                  </Box>
                  <Chip label={cam.count} size="small" color="primary" />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Alerts Table with Filters */}
      <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, flexWrap: "wrap", gap: 1 }}>
          <Typography variant="h6" fontWeight="600">
            Active Alerts {filteredAlerts.length} of {initialAlerts.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* placeholder for additional info */}
          </Typography>
        </Box>

        {/* Filter bar */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search camera, zone, alert ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearch("")}>
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Severity</InputLabel>
              <Select
                value={severityFilter}
                label="Severity"
                onChange={(e) => setSeverityFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
                <MenuItem value="Non-Critical">Non-Critical</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="All">All statuses</MenuItem>
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Viewed">Viewed</MenuItem>
                <MenuItem value="Acknowledged">Acknowledged</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="All">All categories</MenuItem>
                <MenuItem value="Safety">Safety</MenuItem>
                <MenuItem value="Security">Security</MenuItem>
                <MenuItem value="Operations">Operations</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Button variant="outlined" fullWidth onClick={handleResetFilters}>
              Reset
            </Button>
          </Grid>
        </Grid>

        {/* Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "action.hover" }}>
                <TableCell>Time</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Alert</TableCell>
                <TableCell>Camera</TableCell>
                <TableCell>Zone</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAlerts.map((row, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.severity}
                      size="small"
                      color={severityColor(row.severity) as any}
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>{row.alert}</TableCell>
                  <TableCell>{row.camera}</TableCell>
                  <TableCell>{row.zone}</TableCell>
                  <TableCell>
                    <Chip label={row.status} size="small" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Optional pagination would go here */}
      </Paper>
    </Box>
  );
};

export default LiveAlertsPage;