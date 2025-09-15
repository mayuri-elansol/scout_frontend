"use client";

import React from "react";
import { ReportTable } from "@/app/components/organisms";
import { Box, Grid, Typography } from "@mui/material";
import {
  People,
  CheckCircle,
  Warning,
  Shield,
  Place,
  Schedule,
} from "@mui/icons-material";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import ZoneNotification from "@/app/components/molecules/ZoneNotification/ZoneNotification";
import { complianceByZone } from "../PeopleCountPage/PeopleCount";

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
  ];

  const activePersonnel = [
    {
      title: "John Mitchell - Level 3 Operator",
      location: "Reactor Control Room",
      time: "Day Shift",
      Id: "EMP-4521",
      severity: "N/A",
      status: "ACTIVE",
      bgColor: "#e8f5e9",
      imageUrl: "https://picsum.photos/1200/600?random=11",
    },
    {
      title: "Sarah Chen - Senior Technician",
      location: "Chemical Processing Unit",
      time: "Day Shift",
      Id: "EMP-3847",
      severity: "N/A",
      status: "ON_BREAK",
      bgColor: "#fff8e1",
      imageUrl: "https://picsum.photos/1200/600?random=12",
    },
    {
      title: "Michael Torres - Safety Coordinator",
      location: "Emergency Response Station",
      time: "Day Shift",
      Id: "EMP-5623",
      severity: "N/A",
      status: "ACTIVE",
      bgColor: "#e8f5e9",
      imageUrl: "https://picsum.photos/1200/600?random=13",
    },
    {
      title: "Lisa Anderson - Lab Supervisor",
      location: "Quality Control Lab",
      time: "Day Shift",
      Id: "EMP-7891",
      severity: "N/A",
      status: "MISSING",
      bgColor: "#ffebee",
      imageUrl: "https://picsum.photos/1200/600?random=14",
    },
  ];

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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={index + 1}>
            <KpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Active Critical Zone Personnel */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentViolations
            label="Recent Violations"
            violations={activePersonnel}
            onViewAll={() => console.log("View all clicked")}
          />
        </Grid>
        {/* Critical Zones Status */}
        {/* item xs={12} lg={4} */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <ZoneNotification zones={complianceByZone} />
        </Grid>
      </Grid>

      {/* Employee Presence Report */}
      <ReportTable
        title="Report Table"
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
        filters={[
          { id: "employeeId", label: "Employee", type: "text" },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Reactor Control Room",
              "Quality Control Lab",
              "Chemical Processing Unit",
              "Emergency Response Station",
              "Maintenance Workshop",
            ],
          },
          {
            id: "certification",
            label: "Certification",
            type: "select",
            options: [
              "Level 3 Operator",
              "Lab Supervisor",
              "Senior Technician",
              "Safety Coordinator",
              "Tech Cert",
              "Level 2 Technician",
              "Lab Cert",
            ],
          },
          {
            id: "status",
            label: "Status",
            type: "select",
            options: ["ACTIVE", "MISSING", "ON_BREAK", "LATE_ARRIVAL"],
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
        downloadFileName="employee-presence-report"
      />
    </Box>
  );
};

export default EmployeePresence;
