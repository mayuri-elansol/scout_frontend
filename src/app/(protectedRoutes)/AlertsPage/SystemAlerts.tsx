"use client";
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Warning, Circle } from "@mui/icons-material";

import AlertStatsCard from "../../components/molecules/AlertStatsCard/AlertStatsCard";
import { ReportTable } from "@/app/components/organisms";

// 🔹 Types
interface FilterParams {
  status?: string;
  employeeName?: string;
  startDate?: string;
  endDate?: string;
}

// 🔹 Common column + filter configs (avoid repetition)
const reportColumns = [
  { id: "violationId", label: "Violation ID", minWidth: 120 },
  { id: "timestamp", label: "Timestamp", minWidth: 80 },
  { id: "zone", label: "Zone", minWidth: 120 },
  { id: "employeeId", label: "Employee ID", minWidth: 120 },
  { id: "violationType", label: "Violation Type", minWidth: 150 },
  { id: "severity", label: "Severity", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "priority", label: "Priority", minWidth: 80 },
  { id: "resolution", label: "Action Taken", minWidth: 150 },
];

const reportFilters = [
  { id: "name", label: "Search Name", type: "text" },
  {
    id: "employeeId",
    label: "Employee",
    type: "select",
    options: ["David Kim", "Missing", "Resolved"],
  },
  { id: "createdAt", label: "Start Date", type: "date" },
  { id: "resolvedAt", label: "End Date", type: "date" },
];

// 🔹 Dummy data
const sampleData = [
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
];

const SystemAlerts: React.FC = () => {
  // 🔹 Alert stats
  const alertStats = [
    { value: "10", label: "Total Alerts", color: "#666", borderColor: "#e0e0e0" },
    { value: "2", label: "Safety and Compliances", color: "#f44336", borderColor: "#f44336" },
    { value: "3", label: "Security Monitoring", color: "#ff9800", borderColor: "#ff9800" },
    { value: "2", label: "Workforce Monitoring", color: "#4caf50", borderColor: "#4caf50" },
    { value: "3", label: "Operational Insight", color: "#ffa726", borderColor: "#ffa726" },
    { value: "3", label: "Facial Recognition", color: "#ffa726", borderColor: "#ffa726" },
  ];

  // 🔹 Handlers
  const handleSubmitFilter = async (filters: FilterParams) => {
    console.log("Selected Filters:", filters);
  };

  const handleReset = () => {
    console.log("Reset clicked");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested:", format);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Warning sx={{ fontSize: 28, color: "#f44336" }} />
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1c2025" }}>
            System Alerts & Notifications
          </Typography>
        </Box>
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

      {/* Alert Statistics */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {alertStats.map((stat) => (
          <Grid key={stat.label} size={{xs:12, sm:6,md:2}}  sx={{ display: "flex" }}>
            <AlertStatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Alert Details Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mb: 2 }}>
          Safety and Compliances Alerts
        </Typography>
        <ReportTable
          title="Report Table"
          columns={reportColumns}
          data={sampleData}
          filters={reportFilters}
          onSubmit={handleSubmitFilter}
          onReset={handleReset}
          onExport={handleExport}
          downloadFileName="safety-alerts"
          loading={true}
        />

        <Typography variant="h6" sx={{ fontWeight: 600, color: "#333", mt: 4, mb: 2 }}>
          Security Monitoring Alerts
        </Typography>
        <ReportTable
          title="Report Table"
          columns={reportColumns}
          data={sampleData}
          filters={reportFilters}
          onSubmit={handleSubmitFilter}
          onReset={handleReset}
          onExport={handleExport}
          downloadFileName="security-alerts"
          loading={true}
        />
      </Box>
    </Box>
  );
};

export default SystemAlerts;
