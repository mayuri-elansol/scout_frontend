import React from "react";
import { ReportTable } from "@/app/components/organisms";
import { Box, Grid, Typography } from "@mui/material";
import {
  Visibility,
  Warning,
  Shield,
  People,
  Place,
  Error,
} from "@mui/icons-material";

import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import PPEComplianceByZone from "@/app/components/molecules/ZoneNotification/ZoneNotification";

const IntrusionDetection: React.FC = () => {
  const intrusionKpiData = [
    {
      title: "Intrusion Attempts",
      value: "7",
      subtitle: "Unauthorized access attempts today",
      trend: "+2",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Warning,
    },
    {
      title: "Zones Breached",
      value: "3",
      subtitle: "High-security areas compromised",
      trend: "+1",
      trendColor: "#d32f2f",
      color: "#d32f2f",
      bgColor: "#ffcdd2",
      icon: Shield,
    },
    {
      title: "Active Intruders",
      value: "2",
      subtitle: "Currently inside premises",
      trend: "Active",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: People,
    },
    {
      title: "Security Threat Level",
      value: "HIGH",
      subtitle: "Current threat assessment",
      trend: "Critical",
      trendColor: "#d32f2f",
      color: "#d32f2f",
      bgColor: "#ffcdd2",
      icon: Error,
    },
    {
      title: "Recent Entries",
      value: "5",
      subtitle: "Last 24 hours",
      trend: "+1",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: People,
    },
    {
      title: "Perimeter Breaches",
      value: "3",
      subtitle: "Last hour detections",
      trend: "+3",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Visibility,
    },
    {
      title: "Secure Zones Status",
      value: "2/5",
      subtitle: "Compromised zones",
      trend: "Alert",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Place,
    },
  ];
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
  interface Zone {
    zone: string;
    compliance: number;
    violations: number;
    cameras: string;
    status: "excellent" | "good" | "warning" | string;
  }
  const securityZones: Zone[] = [
    {
      zone: "Main Entrance",
      compliance: 25,
      violations: 5,
      cameras: "4/4",
      status: "warning",
    },
    {
      zone: "East Boundary",
      compliance: 50,
      violations: 2,
      cameras: "6/8",
      status: "good",
    },
    {
      zone: "Warehouse Perimeter",
      compliance: 100,
      violations: 0,
      cameras: "8/8",
      status: "excellent",
    },
    {
      zone: "North Security Zone",
      compliance: 60,
      violations: 3,
      cameras: "3/4",
      status: "warning",
    },
    {
      zone: "South Boundary",
      compliance: 100,
      violations: 0,
      cameras: "5/5",
      status: "excellent",
    },
  ];

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Visibility sx={{ fontSize: 28, color: "#d32f2f" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Intrusion Detection at Premises Perimeter
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ fontSize: "16px", color: "#5c6b7d", lineHeight: 1.5, mb: 1 }}
        >
          Flags unauthorized access attempts at boundaries, helping protect the
          premises from theft or harm.
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: "14px", color: "#666", fontStyle: "italic" }}
        >
          Model/Technique used: Person detection model fine tuning
        </Typography>
      </Box>

      {/* KPI Cards */}

      <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
        {intrusionKpiData.map((kpi, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
            <KpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Active Intrusion Alerts */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentViolations
            label="Recent PPE Violations"
            violations={recentViolations}
            onViewAll={() => console.log("View all clicked")}
          />
        </Grid>
        {/* Security Zones Status */}
        {/* item xs={12} lg={4} */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <PPEComplianceByZone zones={securityZones} />
        </Grid>
      </Grid>

      {/* Security Intrusion Report */}
      <ReportTable
        title="Security Intrusion Report"
        columns={[
          { id: "incidentId", label: "Incident ID", minWidth: 120 },
          { id: "timestamp", label: "Timestamp", minWidth: 80 },
          { id: "location", label: "Location", minWidth: 150 },
          { id: "intruderId", label: "Intruder ID", minWidth: 120 },
          { id: "breachType", label: "Breach Type", minWidth: 150 },
          { id: "severity", label: "Severity", minWidth: 100 },
          { id: "status", label: "Status", minWidth: 100 },
          { id: "priority", label: "Priority", minWidth: 80 },
          { id: "resolution", label: "Response Action", minWidth: 150 },
        ]}
        data={[
          {
            incidentId: "INT-7892",
            timestamp: "15:42",
            location: "Main Gate Perimeter",
            intruderId: "UNKNOWN-001",
            breachType: "Unauthorized Entry Attempt",
            severity: "Critical",
            status: "BREACH",
            priority: "Critical",
            resolution: "Security team dispatched",
          },
          {
            incidentId: "INT-7891",
            timestamp: "15:28",
            location: "East Boundary Fence",
            intruderId: "UNKNOWN-002",
            breachType: "Fence Climbing",
            severity: "High",
            status: "INVESTIGATING",
            priority: "High",
            resolution: "Perimeter patrol increased",
          },
          {
            incidentId: "INT-7890",
            timestamp: "15:15",
            location: "Warehouse Loading Dock",
            intruderId: "UNKNOWN-003",
            breachType: "Suspicious Vehicle",
            severity: "Medium",
            status: "RESOLVED",
            priority: "High",
            resolution: "Vehicle identified and cleared",
          },
          {
            incidentId: "INT-7889",
            timestamp: "14:58",
            location: "North Security Zone",
            intruderId: "UNKNOWN-004",
            breachType: "Multiple Persons Detected",
            severity: "Critical",
            status: "BREACH",
            priority: "Critical",
            resolution: "Emergency protocol activated",
          },
          {
            incidentId: "INT-7888",
            timestamp: "14:32",
            location: "Parking Area",
            intruderId: "UNKNOWN-005",
            breachType: "After Hours Activity",
            severity: "Medium",
            status: "PENDING",
            priority: "Medium",
            resolution: "Security review ongoing",
          },
          {
            incidentId: "INT-7887",
            timestamp: "14:15",
            location: "West Gate Access",
            intruderId: "UNKNOWN-006",
            breachType: "Invalid Access Card",
            severity: "High",
            status: "RESOLVED",
            priority: "High",
            resolution: "Access denied, logged",
          },
        ]}
        filters={[
          { id: "intruderId", label: "Intruder ID", type: "text" },
          {
            id: "location",
            label: "Location",
            type: "select",
            options: [
              "Main Gate Perimeter",
              "East Boundary Fence",
              "Warehouse Loading Dock",
              "North Security Zone",
              "Parking Area",
              "West Gate Access",
            ],
          },
          {
            id: "breachType",
            label: "Breach Type",
            type: "select",
            options: [
              "Unauthorized Entry Attempt",
              "Fence Climbing",
              "Suspicious Vehicle",
              "Multiple Persons Detected",
              "After Hours Activity",
              "Invalid Access Card",
            ],
          },
          {
            id: "severity",
            label: "Severity",
            type: "select",
            options: ["Critical", "High", "Medium"],
          },
          {
            id: "status",
            label: "Status",
            type: "select",
            options: ["BREACH", "INVESTIGATING", "RESOLVED", "PENDING"],
          },
          {
            id: "priority",
            label: "Priority",
            type: "select",
            options: ["Critical", "High", "Medium"],
          },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
        ]}
        downloadFileName="security-intrusion-report"
      />
    </Box>
  );
};

export default IntrusionDetection;
