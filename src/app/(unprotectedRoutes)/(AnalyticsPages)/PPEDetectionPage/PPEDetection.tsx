import React from "react";
import { ReportTable } from "@/app/components/organisms";
import { KpiCard } from "@/app/components/molecules";
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
  Shield,
  Warning,
  CheckCircle,
  Schedule,
  Visibility,
  CameraAlt,
  Circle,
} from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
//import RecentViolations from "@/components/molecules/RecentViolations/RecentViolations";

const PPEDetection: React.FC = () => {
  const theme = useTheme();

  const ppeKpiData = [
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

  // const recentViolations = [
  //   {
  //     title: "Hard hat missing",
  //     location: "Production Zone A",
  //     time: "14:32",
  //     workerId: "W-4521",
  //     severity: "HIGH",
  //     status: "ACTIVE",
  //     imageUrl:
  //       "https://www.google.com/search?sca_esv=8c966bae1d54a914&rlz=1C1CHBD_enIN1164IN1164&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnMEIxC4WQfoNDH7FwchyAayyomVtyMIlwCjX48LT0TrXSNU5mLhW4DIlZIt3-gwG8mMeXC-Y0JFzx5GBuU59za0o5XLXRovSVas40d3y4gTUxobLZ8-C-h3aNfCXmcENPvCZqzMdA&q=image&sa=X&ved=2ahUKEwjkq5eA77uPAxVR3TgGHYInHUAQtKgLegQIFhAB&biw=1920&bih=945&dpr=1#vhid=2brKLR3s5kTpPM&vssid=mosaic",
  //   },
  //   {
  //     title: "Safety vest not worn",
  //     location: "Warehouse Zone B",
  //     time: "14:18",
  //     workerId: "W-3847",
  //     severity: "MEDIUM",
  //     status: "ACKNOWLEDGED",
  //     imageUrl:
  //       "https://www.vecteezy.com/photo/57068323-single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image",
  //   },
  // ];
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "#4caf50";
      case "good":
        return "#8bc34a";
      case "warning":
        return "#ff9800";
      default:
        return "#9e9e9e";
    }
  };
  const handleSubmitFilter = async (filters: Record<string, any>) => {
    console.log("Selected Filters:", filters);
    // Example: { status: "Active", employeeName: "John", startDate: "2025-09-01", endDate: "2025-09-05" }
  };

  const handleReset = () => {
    console.log("reset button clickedd");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested clikcedd:", format);
    // call API with filters if needed
  };
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
            Personal Protective Equipment (PPE) Detection
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ fontSize: "16px", color: "#5c6b7d", lineHeight: 1.5 }}
        >
          Ensures workers wear helmets, vests, gloves, and masks—because every
          life matters and safety isn't optional.
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
        {ppeKpiData.map((kpi, index) => (
          // item xs={12} sm={6} md={6} lg={3}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={index}>
            <KpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Recent PPE Violations */}
        {/* item xs={12} lg={8} */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentViolations
            label="Recent PPE Violations"
            violations={recentViolations}
            onViewAll={() => console.log("View all clicked")}
          />
        </Grid>

        {/* PPE Compliance by Zone */}
        {/* item xs={12} lg={4} */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1c2025", mb: 2.5 }}
              >
                PPE Compliance by Zone
              </Typography>

              <Box>
                {complianceByZone.map((zone, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 2,
                      borderBottom:
                        index < complianceByZone.length - 1
                          ? "1px solid #f0f0f0"
                          : "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
                        {zone.zone}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Circle
                          sx={{
                            fontSize: 8,
                            color: getStatusColor(zone.status),
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: 500,
                            color: getStatusColor(zone.status),
                          }}
                        >
                          {zone.compliance}%
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        color: "#5c6b7d",
                      }}
                    >
                      <span>{zone.cameras} cameras active</span>
                      <span>{zone.violations} violations today</span>
                    </Box>

                    {/* Progress Bar */}
                    <Box
                      sx={{
                        width: "100%",
                        height: 4,
                        backgroundColor: "#f0f0f0",
                        borderRadius: 0.25,
                        mt: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${zone.compliance}%`,
                          height: "100%",
                          backgroundColor: getStatusColor(zone.status),
                          borderRadius: 0.25,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* PPE Violations Report */}
      <ReportTable
        title="PPE Violations Report"
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
        // isSubmitDisabled={loading}
        downloadFileName="ppe-violations-report"
      />
    </Box>
  );
};

export default PPEDetection;
