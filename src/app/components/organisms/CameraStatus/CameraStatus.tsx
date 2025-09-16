import React from "react";
import { Card, CardContent, Box, Typography, Skeleton } from "@mui/material";

export interface CameraZone {
  zone: string;
  active: number;
  offline: number;
  tempred: number;
  total: number;
}

interface CameraStatusProps {
  cameraZones: CameraZone[];
  loading?: boolean;
  maxheight?: number;
}

const CameraStatus: React.FC<CameraStatusProps> = ({
  cameraZones,
  loading = true,
  maxheight,
}) => {
  return (
    // sx={{ maxHeight: 420, overflowY: "auto" }}
    <Card
      sx={{
        height: "100%",
        maxHeight: maxheight ?? 420,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, overflowY: "auto" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#1c2025",
            mb: 2.5,
          }}
        >
          {loading ? <Skeleton width={180} /> : "Camera Status by Zone"}
        </Typography>

        <Box>
          {(loading ? Array.from(new Array(4)) : cameraZones).map(
            (zone, index) => (
              <Box
                key={index + 1}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                  borderBottom:
                    index < (loading ? 4 : cameraZones.length) - 1
                      ? "1px solid #f0f0f0"
                      : "none",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  {loading ? (
                    <>
                      <Skeleton width="40%" height={18} sx={{ mb: 0.5 }} />
                      <Skeleton width="70%" height={14} />
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </Box>
              </Box>
            )
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CameraStatus;
