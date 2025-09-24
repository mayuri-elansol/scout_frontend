import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import  ReportTable  from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Typography } from "@mui/material";
import { Shield, Warning, CheckCircle, Schedule } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { CameraZone } from "@/app/types";

const CameraTampering: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
 const CameraTamperingKpiData = [
  {
    title: "Total Cameras Monitored",
    value: "42",
    subtitle: "All active surveillance cameras",
    color: "#1976d2",
    bgColor: "#e3f2fd",
    icon: Shield,
  },
  {
    title: "Active Tampering Alerts",
    value: "5",
    subtitle: "Cameras currently in alert state",
    color: "#f44336",
    bgColor: "#ffebee",
    icon: Warning,
  },
  {
    title: "Most Common Tampering",
    value: "Lens Covered",
    subtitle: "62% of incidents",
    color: "#ff9800",
    bgColor: "#fff3e0",
    icon: Schedule,
  },
  {
    title: "Offline Cameras",
    value: "3",
    subtitle: "Not transmitting data",
    color: "#9c27b0",
    bgColor: "#f3e5f5",
    icon: CheckCircle,
  },
  {
    title: "Tampering Incidents Today",
    value: "12",
    subtitle: "New events logged",
    color: "#4caf50",
    bgColor: "#e8f5e9",
    icon: Shield,
  },
  {
    title: "Avg. Detection Time",
    value: "1m 45s",
    subtitle: "Mean Time to Detect",
    color: "#2196f3",
    bgColor: "#e3f2fd",
    icon: Schedule,
  },
];


  const recentViolations = [
    {
      title: "Hard hat missing",
      zone: "Production Zone A",
      time: "14:32",
    
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Safety vest not worn",
      zone: "Warehouse Zone B",
      time: "14:18",
  
      imageUrl: "https://picsum.photos/400/200?random=2",
    },
  ];
  const cameraZones: CameraZone[] = [
    {
      zone: "Production Floor",
      active: 8,
      total: 10,
      offline: 3,
      tempred: 4,
    },
    { zone: "Warehouse", active: 3, total: 6, offline: 3, tempred: 4 },
    { zone: "Parking Area", active: 4, total: 5, offline: 1, tempred: 2 },
    { zone: "Main Entrance", active: 2, total: 3, offline: 1, tempred: 2 },
    { zone: "Assembly Line", active: 2, total: 4, offline: 1, tempred: 2 },
  ];
  interface FilterParams {
    status?: string;
    employeeName?: string;
    startDate?: string;
    endDate?: string;
  }
  const handleSubmitFilter = async (filters: FilterParams) => {
    console.log("Selected Filters:", filters);
    // Example: { status: "Active", employeeName: "John", startDate: "2025-09-01", endDate: "2025-09-05" }
  };

  const handleReset = () => {
    console.log("reset button clickedd");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested clikcedd:", format);
  };
  const KpiCardLoading = false;
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Shield sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Camera Tampering or Offline Detection
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}

      <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
        {KpiCardLoading
          ? // Show skeletons while loading
            skeletonKeys.map((key, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={index + 1}
              >
                <KpiCardSkeleton />
              </Grid>
            ))
          : // Show actual KPI cards
            CameraTamperingKpiData.map((kpi) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={kpi.title}
              >
                <KpiCard {...kpi} />
              </Grid>
            ))}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Recent PPE Violations */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentViolations
            label="Recent Violations"
            violations={recentViolations}
            loading={false}
          />
        </Grid>
        {/* PPE Compliance by Zone */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <CameraStatus cameraZones={cameraZones} loading={false} />
        </Grid>
      </Grid>

      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "violationId", label: "Violation ID", minWidth: 120 },
          { id: "timestamp", label: "Timestamp", minWidth: 80 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "employeeId", label: "Employee ID", minWidth: 120 },
          { id: "violationType", label: "Violation Type", minWidth: 150 },
          { id: "severity", label: "Severity", minWidth: 100 },
        ]}
        data={[
          {
            violationId: "PPE-7892",
            timestamp: "15:42",
            zone: "Production Floor A",
            employeeId: "John Mitchell",
            violationType: "Missing Hard Hat",
            severity: "Critical",
            status: "VIOLATION",
            priority: "Critical",
            resolution: "Employee notified, PPE provided",
          },
          {
            violationId: "PPE-7891",
            timestamp: "15:28",
            zone: "Welding Station",
            employeeId: "Lisa Anderson",
            violationType: "Improper Safety Glasses",
            severity: "High",
            status: "RESOLVED",
            priority: "High",
            resolution: "Correct eyewear issued",
          },
          {
            violationId: "PPE-7890",
            timestamp: "15:15",
            zone: "Chemical Storage",
            employeeId: "Sarah Chen",
            violationType: "Missing Safety Gloves",
            severity: "Critical",
            status: "PENDING",
            priority: "Critical",
            resolution: "Under investigation",
          },
          {
            violationId: "PPE-7889",
            timestamp: "14:58",
            zone: "Assembly Line B",
            employeeId: "Michael Torres",
            violationType: "Incorrect Footwear",
            severity: "Medium",
            status: "RESOLVED",
            priority: "Medium",
            resolution: "Safety boots provided",
          },
          {
            violationId: "PPE-7888",
            timestamp: "14:32",
            zone: "Maintenance Area",
            employeeId: "David Kim",
            violationType: "Missing Safety Vest",
            severity: "High",
            status: "VIOLATION",
            priority: "High",
            resolution: "Supervisor notified",
          },
        ]}
        filters={[
          { id: "name", label: "Search Name", type: "text" },
          {
            id: "employeeId",
            label: "Employee",
            type: "select",
            options: ["David Kim", "Missing", "Resolved"],
          },
          { id: "createdAt", label: "Start Date", type: "date" },
          { id: "resolvedAt", label: "End Date", type: "date" },
        ]}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        downloadFileName="ppe-violations-report"
        loading={false}
        isDownload={true}
      />
    </Box>
  );
};

export default CameraTampering;
