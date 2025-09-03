import React from "react";
import ReportTable  from "../../../components/organisms/ReportTable/ReportTable";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  People,
  CheckCircle,
  Warning,
  Shield,
  Place,
  Schedule,
  Error,
  BarChart,
  Visibility,
  CameraAlt,
  Circle,
} from "@mui/icons-material";
import KpiCard from "../../../components/molecules/KpiCard/KpiCard";

const EmployeePresence: React.FC = () => {

  const employeeKpiData = [
    {
      title: "Current Critical Area Occupancy",
      value: "15/18",
      subtitle: "Personnel in critical zones",
      trend: "83%",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: People,
    },
    {
      title: "Real-time Presence Validations",
      value: "127",
      subtitle: "Validations completed today",
      trend: "+24",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      icon: CheckCircle,
    },
    {
      title: "Critical Zone Violations",
      value: "3",
      subtitle: "Unauthorized access detected",
      trend: "+1",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Warning,
    },
    {
      title: "Personal Certification Status",
      value: "92%",
      subtitle: "Valid certifications",
      trend: "+2%",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: Shield,
    },
    {
      title: "Zone Coverage Status",
      value: "16/18",
      subtitle: "Zones adequately staffed",
      trend: "89%",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Place,
    },
    {
      title: "Shift Compliance",
      value: "94%",
      subtitle: "On-time shift presence",
      trend: "+1.5%",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: Schedule,
    },
    {
      title: "Emergency Readiness",
      value: "HIGH",
      subtitle: "8 certified responders active",
      trend: "Ready",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: Error,
    },
    {
      title: "Zone Utilization Analysis",
      value: "78%",
      subtitle: "Average zone utilization",
      trend: "+3%",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      icon: BarChart,
    },
  ];

  const activePersonnel = [
    {
      name: "John Mitchell",
      employeeId: "EMP-4521",
      zone: "Reactor Control Room",
      certification: "Level 3 Operator",
      status: "ACTIVE",
      shift: "Day Shift",
      bgColor: "#e8f5e9",
      statusColor: "#4caf50",
    },
    {
      name: "Sarah Chen",
      employeeId: "EMP-3847",
      zone: "Chemical Processing Unit",
      certification: "Senior Technician",
      status: "ON_BREAK",
      shift: "Day Shift",
      bgColor: "#fff8e1",
      statusColor: "#ff9800",
    },
    {
      name: "Michael Torres",
      employeeId: "EMP-5623",
      zone: "Emergency Response Station",
      certification: "Safety Coordinator",
      status: "ACTIVE",
      shift: "Day Shift",
      bgColor: "#e8f5e9",
      statusColor: "#4caf50",
    },
    {
      name: "Lisa Anderson",
      employeeId: "EMP-7891",
      zone: "Quality Control Lab",
      certification: "Lab Supervisor",
      status: "MISSING",
      shift: "Day Shift",
      bgColor: "#ffebee",
      statusColor: "#f44336",
    },
  ];

  const criticalZones = [
    {
      zone: "Reactor Control Room",
      personnel: "3/3",
      certificationLevel: "Level 3",
      status: "FULLY_STAFFED",
      shift: "Day",
      priority: "Critical",
    },
    {
      zone: "Chemical Processing Unit",
      personnel: "2/3",
      certificationLevel: "Level 2",
      status: "UNDERSTAFFED",
      shift: "Day",
      priority: "Critical",
    },
    {
      zone: "Emergency Response Station",
      personnel: "4/4",
      certificationLevel: "Safety Cert",
      status: "FULLY_STAFFED",
      shift: "Day",
      priority: "High",
    },
    {
      zone: "Quality Control Lab",
      personnel: "2/3",
      certificationLevel: "Lab Cert",
      status: "MISSING_PERSONNEL",
      shift: "Day",
      priority: "High",
    },
    {
      zone: "Maintenance Workshop",
      personnel: "5/6",
      certificationLevel: "Tech Cert",
      status: "ADEQUATE",
      shift: "Day",
      priority: "Medium",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "FULLY_STAFFED":
        return "#4caf50";
      case "ADEQUATE":
        return "#8bc34a";
      case "UNDERSTAFFED":
        return "#ff9800";
      case "MISSING_PERSONNEL":
        return "#f44336";
      default:
        return "#9e9e9e";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "#d32f2f";
      case "High":
        return "#f44336";
      case "Medium":
        return "#ff9800";
      default:
        return "#9e9e9e";
    }
  };

  const getProgressWidth = (status: string) => {
    switch (status) {
      case "FULLY_STAFFED":
        return "100%";
      case "ADEQUATE":
        return "85%";
      case "UNDERSTAFFED":
        return "67%";
      case "MISSING_PERSONNEL":
        return "30%";
      default:
        return "50%";
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <People sx={{ fontSize: 28, color: "#2196f3" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Employee presence detection in critical areas
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ fontSize: "16px", color: "#5c6b7d", lineHeight: 1.5, mb: 1 }}
        >
          Confirms if trained personnel are present in vital zones during
          operations - no room for compromise.
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: "14px", color: "#666", fontStyle: "italic" }}
        >
          Model/Technique used: Person detection model + face detection + face
          recognition fine tuning + custom training
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {employeeKpiData.map((kpi, index) => (
          <Grid size={{xs:12,sm:6,md:4,lg:3}} key={index}>
            <KpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Active Critical Zone Personnel */}
        <Grid size={{xs:12,lg:8}}>
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
                  <People sx={{ fontSize: 20, color: "#2196f3" }} />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1c2025" }}
                  >
                    Active Critical Zone Personnel
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
                {activePersonnel.map((employee, index) => (
                  <Grid size={{xs:12,md:6}} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: employee.bgColor,
                        border: "1px solid #ddd",
                        borderRadius: 1,
                      }}
                    >
                      <CardContent sx={{ p: 2, flexGrow: 1 }}>
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
                              {employee.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#5c6b7d",
                                mb: 0.25,
                              }}
                            >
                              {employee.zone} • {employee.shift}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#5c6b7d",
                              }}
                            >
                              ID: {employee.employeeId} •{" "}
                              {employee.certification}
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
                                backgroundColor: employee.statusColor,
                                color: "white",
                                px: 1,
                                py: 0.5,
                                borderRadius: 0.5,
                                fontSize: "11px",
                                fontWeight: 600,
                              }}
                            >
                              {employee.status}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Live Feed Preview */}
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
                              Live Feed Preview
                            </Typography>
                          </Box>
                        </Box>

                        {/* Action Buttons */}

                        <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                          <Button
                            variant="contained"
                            sx={{
                              flex: 1,
                              backgroundColor: "#2196f3",
                              fontSize: "14px",
                              textTransform: "none",
                            }}
                          >
                            Track
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
                            Profile
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

        {/* Critical Zones Status */}
        <Grid size={{xs:12,lg:4}}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1c2025", mb: 2.5 }}
              >
                Critical Zones Status
              </Typography>

              <Box>
                {criticalZones.map((zone, index) => (
                  <Box
                    key={index}
                    sx={{
                      py: 2,
                      borderBottom:
                        index < criticalZones.length - 1
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
                          {zone.personnel}
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
                        mb: 0.5,
                      }}
                    >
                      <span>{zone.certificationLevel} required</span>
                      <span>{zone.shift} shift</span>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "12px",
                      }}
                    >
                      <span style={{ color: "#5c6b7d" }}>Priority:</span>
                      <span
                        style={{
                          color: getPriorityColor(zone.priority),
                          fontWeight: 500,
                        }}
                      >
                        {zone.priority}
                      </span>
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
                          width: getProgressWidth(zone.status),
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

      {/* Employee Presence Report */}
      <ReportTable
        title="Employee Presence Report"
        columns={[
          { id: "recordId", label: "Record ID", minWidth: 100 },
          { id: "timestamp", label: "Timestamp", minWidth: 80 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "employeeId", label: "Employee ID", minWidth: 120 },
          { id: "certification", label: "Certification", minWidth: 120 },
          { id: "shift", label: "Shift", minWidth: 100 },
          { id: "status", label: "Status", minWidth: 100 },
          { id: "priority", label: "Priority", minWidth: 80 },
          { id: "resolution", label: "Resolution", minWidth: 150 },
        ]}
        data={[
          {
            recordId: "EMP-7892",
            timestamp: "15:42",
            zone: "Reactor Control Room",
            employeeId: "John Mitchell",
            certification: "Level 3 Operator",
            shift: "Day Shift",
            status: "ACTIVE",
            priority: "Critical",
            resolution: "On duty",
          },
          {
            recordId: "EMP-7891",
            timestamp: "15:28",
            zone: "Quality Control Lab",
            employeeId: "Lisa Anderson",
            certification: "Lab Supervisor",
            shift: "Day Shift",
            status: "MISSING",
            priority: "High",
            resolution: "Notified supervisor",
          },
          {
            recordId: "EMP-7890",
            timestamp: "15:15",
            zone: "Chemical Processing Unit",
            employeeId: "Sarah Chen",
            certification: "Senior Technician",
            shift: "Day Shift",
            status: "ON_BREAK",
            priority: "Critical",
            resolution: "Break time logged",
          },
          {
            recordId: "EMP-7889",
            timestamp: "14:58",
            zone: "Emergency Response Station",
            employeeId: "Michael Torres",
            certification: "Safety Coordinator",
            shift: "Day Shift",
            status: "ACTIVE",
            priority: "High",
            resolution: "Station covered",
          },
          {
            recordId: "EMP-7888",
            timestamp: "14:32",
            zone: "Maintenance Workshop",
            employeeId: "David Kim",
            certification: "Tech Cert",
            shift: "Day Shift",
            status: "ACTIVE",
            priority: "Medium",
            resolution: "Equipment maintenance",
          },
          {
            recordId: "EMP-7887",
            timestamp: "14:15",
            zone: "Reactor Control Room",
            employeeId: "Jennifer Walsh",
            certification: "Level 3 Operator",
            shift: "Day Shift",
            status: "ACTIVE",
            priority: "Critical",
            resolution: "Primary operator",
          },
          {
            recordId: "EMP-7886",
            timestamp: "13:58",
            zone: "Chemical Processing Unit",
            employeeId: "Robert Singh",
            certification: "Level 2 Technician",
            shift: "Day Shift",
            status: "LATE_ARRIVAL",
            priority: "Critical",
            resolution: "Arrived 15min late",
          },
          {
            recordId: "EMP-7885",
            timestamp: "13:42",
            zone: "Quality Control Lab",
            employeeId: "Maria Gonzalez",
            certification: "Lab Cert",
            shift: "Day Shift",
            status: "ACTIVE",
            priority: "High",
            resolution: "Quality checks ongoing",
          },
        ]}
        downloadFileName="employee-presence-report.csv"
      />
    </Box>
  );
};

export default EmployeePresence;
