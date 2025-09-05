import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Circle } from "@mui/icons-material";

interface Zone {
  zone: string;
  compliance: number;
  violations: number;
  cameras: string;
  status: "excellent" | "good" | "warning" | string;
}

interface PPEComplianceByZoneProps {
  zones: Zone[];
}

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

export const ZoneNotification: React.FC<PPEComplianceByZoneProps> = ({
  zones,
}) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#1c2025", mb: 2.5 }}
        >
          PPE Compliance by Zone
        </Typography>

        <Box>
          {zones.map((zone, index) => (
            <Box
              key={index}
              sx={{
                py: 2,
                borderBottom:
                  index < zones.length - 1 ? "1px solid #f0f0f0" : "none",
              }}
            >
              {/* Zone Title & Compliance */}
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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

              {/* Cameras & Violations */}
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
  );
};

export default ZoneNotification;
