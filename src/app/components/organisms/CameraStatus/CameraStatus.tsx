import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { Circle } from "@mui/icons-material";

interface CameraZone {
  zone: string;
  active: number;
  total: number;
  status: "excellent" | "good" | "warning";
}

const CameraStatus: React.FC = () => {
  const cameraZones: CameraZone[] = [
    { zone: "Production Floor", active: 8, total: 10, status: "good" },
    { zone: "Warehouse", active: 6, total: 6, status: "excellent" },
    { zone: "Parking Area", active: 4, total: 5, status: "warning" },
    { zone: "Main Entrance", active: 3, total: 3, status: "excellent" },
    { zone: "Assembly Line", active: 3, total: 4, status: "warning" },
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
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#1c2025",
            mb: 2.5,
          }}
        >
          Camera Status by Zone
        </Typography>

        <Box>
          {cameraZones.map((zone, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
                borderBottom:
                  index < cameraZones.length - 1 ? "1px solid #f0f0f0" : "none",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "14px",
                    mb: 0.5,
                  }}
                >
                  {zone.zone}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#5c6b7d",
                  }}
                >
                  {zone.active}/{zone.total} cameras active
                </Typography>
              </Box>

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
                    textTransform: "capitalize",
                  }}
                >
                  {zone.status}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CameraStatus;
