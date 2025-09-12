import React from "react";
import { ReportTable } from "@/app/components/organisms";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Typography } from "@mui/material";
import { Shield, Warning, CheckCircle, Schedule } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import ZoneNotification from "@/app/components/molecules/ZoneNotification/ZoneNotification";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";

const FallDetection: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  const fallKpiData = [
    {
      title: "PPE Compliance Rate",
      value: "87.5%",
      subtitle: "Current compliance level",
      trend: "-2.3%",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Shield,
    },
    {
      title: "PPE Violations Per Day",
      value: "12",
      subtitle: "Today's violations",
      trend: "+3",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Warning,
    },
    {
      title: "PPE Detection Accuracy",
      value: "94.2%",
      subtitle: "System accuracy rate",
      trend: "+1.1%",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: CheckCircle,
    },
    {
      title: "Time Since Last Violation",
      value: "2h 34m",
      subtitle: "Last incident recorded",
      trend: "Recent",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      icon: Schedule,
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
  ];
  const complianceByZone = [
    {
      zone: "Production Floor",
      compliance: 92,
      violations: 3,
      cameras: "8/10",
      status: "good",
    },
    {
      zone: "Assembly Line",
      compliance: 88,
      violations: 5,
      cameras: "6/6",
      status: "warning",
    },
    {
      zone: "Welding Area",
      compliance: 95,
      violations: 1,
      cameras: "4/4",
      status: "excellent",
    },
  ];
  interface FilterParams {
    status?: string;
    employeeName?: string;
    startDate?: string;
    endDate?: string;
  }
  const handleSubmitFilter = async (filters: FilterParams) => {
    console.log("Selected Filters:", filters);
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
            Fall Detection /Laydown/Sleeping Detection in Work Areas
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}

      <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
        {KpiCardLoading
          ? // Show skeletons while loading
            skeletonKeys.map((key) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={key}>
                <KpiCardSkeleton />
              </Grid>
            ))
          : // Show actual KPI cards
            fallKpiData.map((kpi) => (
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
            onViewAll={() => console.log("View all clicked")}
            loading={false}
          />
        </Grid>
        {/* PPE Compliance by Zone */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <ZoneNotification zones={complianceByZone} loading={false} />
        </Grid>
      </Grid>

      {/* PPE Violations Report */}
      <ReportTable
        title="Report Table"
        columns={[
          { id: "violationId", label: "Violation ID", minWidth: 120 },
          { id: "timestamp", label: "Timestamp", minWidth: 80 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "employeeId", label: "Employee ID", minWidth: 120 },
          { id: "violationType", label: "Violation Type", minWidth: 150 },
          { id: "severity", label: "Severity", minWidth: 100 },
          { id: "status", label: "Status", minWidth: 100 },
          { id: "priority", label: "Priority", minWidth: 80 },
          { id: "resolution", label: "Action Taken", minWidth: 150 },
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
      />
    </Box>
  );
};

export default FallDetection;
