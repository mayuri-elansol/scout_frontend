import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Skeleton,
  Tooltip,
} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
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
  tooltipMessage?: string;
}

const CameraStatus: React.FC<CameraStatusProps> = ({
  cameraZones,
  loading = true,
  maxheight,
  tooltipMessage,
}) => {
  // Decide how many rows to render
  const rows = loading ? Array.from(new Array(4)) : cameraZones;
  const lastIndex = rows.length - 1;

  return (
    <Card
      sx={{
        height: "100%",
        maxHeight: maxheight ?? 420,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, overflowY: "auto" }}>
        {/* <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#1c2025",
            mb: 0.5,
          }}
        >
          {loading ? <Skeleton width={180} /> : "Camera Status by Zone"}
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1c2025",
            }}
          >
            {loading ? <Skeleton width={180} /> : "Camera Status by Zone"}
          </Typography>

          {/* Info Icon with Tooltip */}
          {!loading && tooltipMessage && (
            <Tooltip title={tooltipMessage} arrow>
              {/* <IconButton size="small">
                <InfoOutlineIcon fontSize="small" />
              </IconButton> */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#f44336",
                }}
              >
                <InfoOutlineIcon />
              </Box>
            </Tooltip>
          )}
        </Box>

        <Box>
          {rows.map((zone, index) => {
            const hasBorder = index < lastIndex;
            return (
              <Box
                key={index + 1}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.5,
                  borderBottom: hasBorder ? "1px solid #f0f0f0" : "none",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  {loading ? (
                    <>
                      <Skeleton width="40%" height={18} sx={{ mb: 0.5 }} />
                      <Skeleton width="60%" height={14} />
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
                        {"  "} active •{"  "}
                        <Box
                          component="span"
                          sx={{ color: "#f44336", fontWeight: 600 }}
                        >
                          {zone.offline}/{zone.total}
                        </Box>
                        {"  "} offline •{"  "}
                        <Box
                          component="span"
                          sx={{ color: "#ff9800", fontWeight: 600 }}
                        >
                          {zone.tempred}/{zone.total}
                        </Box>
                        {"  "} tampered
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CameraStatus;
