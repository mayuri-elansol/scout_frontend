import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

export interface CameraZone {
  zone: string;
  active: number;
  offline: number;
  tempred: number;
  total: number;
}

interface CameraStatusProps {
  cameraZones: CameraZone[];
}
const CameraStatus: React.FC<CameraStatusProps> = ({ cameraZones }) => {
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
              key={index + 1}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
                borderBottom:
                  index < cameraZones.length - 1 ? "1px solid #f0f0f0" : "none",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "14px",
                    mb: 0.5,
                  }}
                >
                  {zone.zone}
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#5c6b7d" }}>
                  <Box
                    component="span"
                    sx={{ color: "#4caf50", fontWeight: 600 }}
                  >
                    {zone.active}/{zone.total}
                  </Box>
                  {"  "}
                  active •{"  "}
                  <Box
                    component="span"
                    sx={{ color: "#f44336", fontWeight: 600 }}
                  >
                    {zone.offline}/{zone.total}
                  </Box>
                  {"  "}
                  offline •{"  "}
                  <Box
                    component="span"
                    sx={{ color: "#ff9800", fontWeight: 600 }}
                  >
                    {zone.tempred}/{zone.total}
                  </Box>
                  {"  "}
                  tampered
                </Typography>
              </Box>

              {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
              </Box> */}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CameraStatus;
