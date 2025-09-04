import React from "react";
import { ReportTable } from "@/app/components/organisms";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
} from "@mui/material";
import {
  People,
  TrendingUp,
  Place,
  CheckCircle,
  Warning,
  Visibility,
  CameraAlt,
  TrendingDown,
  Error,
  Circle,
} from "@mui/icons-material";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import ZoneNotification from "@/app/components/molecules/ZoneNotification/ZoneNotification";

const PeopleCount: React.FC = () => {
  const theme = useTheme();
const recentViolations = [
  {
    title: "Hard hat missing",
    location: "Production Zone A",
    time: "14:32",
    Id: "W-4521",
    severity: "HIGH",
    status: "ACTIVE",
    imageUrl: "https://picsum.photos/400/200?random=1",
  },
  {
    title: "Safety vest not worn",
    location: "Warehouse Zone B",
    time: "14:18",
    Id: "W-3847",
    severity: "MEDIUM",
    status: "ACKNOWLEDGED",
    imageUrl: "https://picsum.photos/400/200?random=2",
  },
];

  const peopleCountKpiData = [
    {
      title: "Total Factory Occupancy",
      value: "267",
      subtitle: "People currently inside",
      trend: "+12",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: People,
    },
    {
      title: "Peak Count Today",
      value: "324",
      subtitle: "Maximum occupancy reached",
      trend: "2:15 PM",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      icon: TrendingUp,
    },
    {
      title: "Most Occupied Zone",
      value: "Production Floor",
      subtitle: "89 people (33% of total)",
      trend: "Active",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Place,
    },
    {
      title: "System Performance",
      value: "98.7%",
      subtitle: "Detection accuracy rate",
      trend: "+0.3%",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: CheckCircle,
    },
    {
      title: "Active Alerts",
      value: "2",
      subtitle: "Capacity warnings active",
      trend: "Monitor",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Warning,
    },
  ];
const complianceByZone = [
  {
    zone: "Production Floor",
    compliance: 92,
    violations: 3,
    cameras: "8/10",
    status: "Normal",
  },
  {
    zone: "Warehouse",
    compliance: 75,
    violations: 2,
    cameras: "6/6",
    status: "Normal",
  },
  {
    zone: "Assembly Line",
    compliance: 84,
    violations: 5,
    cameras: "7/8",
    status: "High",
  },
];

  const zoneOccupancy = [
    {
      zone: "Production Floor",
      count: 89,
      capacity: 120,
      percentage: 74,
      status: "Normal",
      bgColor: "#e8f5e9",
      statusColor: "#4caf50",
    },
    {
      zone: "Warehouse",
      count: 45,
      capacity: 60,
      percentage: 75,
      status: "Normal",
      bgColor: "#e8f5e9",
      statusColor: "#4caf50",
    },
    {
      zone: "Assembly Line",
      count: 67,
      capacity: 80,
      percentage: 84,
      status: "High",
      bgColor: "#fff8e1",
      statusColor: "#ff9800",
    },
    {
      zone: "Office Areas",
      count: 34,
      capacity: 50,
      percentage: 68,
      status: "Normal",
      bgColor: "#e8f5e9",
      statusColor: "#4caf50",
    },
    {
      zone: "Cafeteria",
      count: 28,
      capacity: 30,
      percentage: 93,
      status: "Critical",
      bgColor: "#ffebee",
      statusColor: "#f44336",
    },
    {
      zone: "Parking Area",
      count: 4,
      capacity: 20,
      percentage: 20,
      status: "Low",
      bgColor: "#e3f2fd",
      statusColor: "#2196f3",
    },
  ];

  const hourlyTrend = [
    { time: "08:00", count: 45, trend: "up" },
    { time: "09:00", count: 89, trend: "up" },
    { time: "10:00", count: 156, trend: "up" },
    { time: "11:00", count: 203, trend: "up" },
    { time: "12:00", count: 267, trend: "up" },
    { time: "13:00", count: 298, trend: "up" },
    { time: "14:00", count: 324, trend: "peak" },
    { time: "15:00", count: 289, trend: "down" },
    { time: "16:00", count: 267, trend: "current" },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp sx={{ fontSize: 12, color: "#4caf50" }} />;
      case "down":
        return <TrendingDown sx={{ fontSize: 12, color: "#f44336" }} />;
      case "peak":
        return <Error sx={{ fontSize: 12, color: "#ff9800" }} />;
      case "current":
        return <Circle sx={{ fontSize: 8, color: "#2196f3" }} />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "current":
        return "#2196f3";
      case "peak":
        return "#ff9800";
      case "up":
        return "#4caf50";
      case "down":
        return "#8bc34a";
      default:
        return "#1c2025";
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <People sx={{ fontSize: 28, color: "#4caf50" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            People count in factory Premises
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ fontSize: "16px", color: "#5c6b7d", lineHeight: 1.5, mb: 1 }}
        >
          Keeps track of how many people are inside - critical for safety audits
          and emergency evacuations.
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: "14px", color: "#666", fontStyle: "italic" }}
        >
          Model/Technique used: Person detection model fine tuning
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {peopleCountKpiData.map((kpi, index) => (
          // item xs={12} sm={6} md={4} lg={3}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <KpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Recent PPE Violations */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentViolations
            label="Recent PPE Violations"
            violations={recentViolations}
            onViewAll={() => console.log("View all clicked")}
          />
        </Grid>
        {/* PPE Compliance by Zone */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <ZoneNotification zones={complianceByZone} />
        </Grid>
      </Grid>

      {/* People Count Report */}
      <ReportTable
        title="People Count Report"
        columns={[
          { id: "recordId", label: "Record ID", minWidth: 100 },
          { id: "timestamp", label: "Timestamp", minWidth: 80 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "currentCount", label: "Current Count", minWidth: 100 },
          { id: "capacity", label: "Capacity", minWidth: 80 },
          { id: "occupancy", label: "Occupancy %", minWidth: 100 },
          { id: "status", label: "Status", minWidth: 100 },
          { id: "priority", label: "Priority", minWidth: 80 },
          { id: "resolution", label: "Action", minWidth: 150 },
        ]}
        data={[
          {
            recordId: "PC-7892",
            timestamp: "15:42",
            zone: "Main Factory Floor",
            currentCount: "245",
            capacity: "300",
            occupancy: "82%",
            status: "ACTIVE",
            priority: "Medium",
            resolution: "Normal operations",
          },
          {
            recordId: "PC-7891",
            timestamp: "15:28",
            zone: "Cafeteria",
            currentCount: "180",
            capacity: "150",
            occupancy: "120%",
            status: "OVERCROWDED",
            priority: "Critical",
            resolution: "Crowd dispersal initiated",
          },
          {
            recordId: "PC-7890",
            timestamp: "15:15",
            zone: "Assembly Line A",
            currentCount: "45",
            capacity: "50",
            occupancy: "90%",
            status: "ACTIVE",
            priority: "Low",
            resolution: "Within safe limits",
          },
          {
            recordId: "PC-7889",
            timestamp: "14:58",
            zone: "Emergency Exit Area",
            currentCount: "25",
            capacity: "20",
            occupancy: "125%",
            status: "BLOCKED",
            priority: "Critical",
            resolution: "Exit clearance required",
          },
          {
            recordId: "PC-7888",
            timestamp: "14:32",
            zone: "Conference Room B",
            currentCount: "12",
            capacity: "15",
            occupancy: "80%",
            status: "ACTIVE",
            priority: "Low",
            resolution: "Meeting in progress",
          },
          {
            recordId: "PC-7887",
            timestamp: "14:15",
            zone: "Loading Dock",
            currentCount: "8",
            capacity: "10",
            occupancy: "80%",
            status: "ACTIVE",
            priority: "Low",
            resolution: "Normal loading operations",
          },
          {
            recordId: "PC-7886",
            timestamp: "13:58",
            zone: "Parking Lot",
            currentCount: "156",
            capacity: "200",
            occupancy: "78%",
            status: "ACTIVE",
            priority: "Low",
            resolution: "Adequate parking space",
          },
        ]}
        downloadFileName="people-count-report.csv"
      />
    </Box>
  );
};

export default PeopleCount;
