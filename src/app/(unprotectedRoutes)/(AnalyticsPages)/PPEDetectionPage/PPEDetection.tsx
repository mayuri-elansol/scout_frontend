import React from "react";
import  ReportTable  from "../../../components/organisms/ReportTable/ReportTable";
import  KpiCard  from "../../../components/molecules/KpiCard/KpiCard";
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

  const recentViolations = [
    {
      title: "Hard hat missing",
      location: "Production Zone A",
      time: "14:32",
      workerId: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
    },
    {
      title: "Safety vest not worn",
      location: "Warehouse Zone B",
      time: "14:18",
      workerId: "W-3847",
      severity: "MEDIUM",
      status: "ACKNOWLEDGED",
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
          <Grid size={{xs:12,sm:6,md:6,lg:3}} key={index}>
            <KpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Recent PPE Violations */}
        <Grid  size={{xs:12,lg:8}}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Warning sx={{ fontSize: 20, color: "#f44336" }} />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1c2025" }}
                  >
                    Recent PPE Violations
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<Visibility />}
                  sx={{
                    color: "#1976d2",
                    borderColor: "#1976d2",
                    fontSize: "14px",
                    textTransform: "none",
                  }}
                >
                  View All
                </Button>
              </Box>

              <Grid container spacing={2}>
                {recentViolations.map((violation, index) => (
                  <Grid
                    size={{xs:12,md:6}}
                  
                    key={index}
                    sx={{ display: "flex" }}
                  >
                    <Card
                      sx={{
                        backgroundColor: "#fff8e1",
                        border: "1px solid #ddd",
                        borderRadius: 1,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 2,
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Header Info */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 1.5,
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#1c2025",
                                mb: 0.5,
                              }}
                            >
                              {violation.title}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#5c6b7d",
                                mb: 0.25,
                              }}
                            >
                              {violation.location} • {violation.time}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#5c6b7d",
                              }}
                            >
                              Worker ID: {violation.workerId}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.5,
                              alignItems: "flex-end",
                            }}
                          >
                            <Typography
                              sx={{
                                backgroundColor:
                                  violation.severity === "HIGH"
                                    ? "#f44336"
                                    : "#ff9800",
                                color: "white",
                                px: 1,
                                py: 0.5,
                                borderRadius: 0.5,
                                fontSize: "11px",
                                fontWeight: 600,
                              }}
                            >
                              {violation.severity}
                            </Typography>
                            <Typography
                              sx={{
                                backgroundColor:
                                  violation.status === "ACTIVE"
                                    ? "#f44336"
                                    : "#ff9800",
                                color: "white",
                                px: 1,
                                py: 0.5,
                                borderRadius: 0.5,
                                fontSize: "11px",
                                fontWeight: 600,
                              }}
                            >
                              {violation.status}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Violation Image Placeholder */}
                        <Box
                          sx={{
                            width: "100%",
                            height: 120,
                            backgroundColor: "#e9ecef",
                            borderRadius: 0.75,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1.5,
                            border: "1px solid #dee2e6",
                          }}
                        >
                          <Box sx={{ textAlign: "center", color: "#6c757d" }}>
                            <CameraAlt sx={{ fontSize: 24, mb: 0.5 }} />
                            <Typography sx={{ fontSize: "12px" }}>
                              Violation Image Preview
                            </Typography>
                          </Box>
                        </Box>

                        {/* Action Buttons (stick to bottom) */}
                        <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
                          <Button
                            variant="contained"
                            sx={{
                              flex: 1,
                              backgroundColor: "#1976d2",
                              fontSize: "14px",
                              textTransform: "none",
                            }}
                          >
                            Acknowledge
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{
                              flex: 1,
                              color: "#1976d2",
                              borderColor: "#1976d2",
                              fontSize: "14px",
                              textTransform: "none",
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* PPE Compliance by Zone */}
        <Grid size={{xs:12,lg:4}}>
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
        downloadFileName="ppe-violations-report.csv"
      />
    </Box>
  );
};

export default PPEDetection;
