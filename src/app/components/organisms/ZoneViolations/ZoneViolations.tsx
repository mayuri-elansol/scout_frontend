import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Skeleton,
  Tooltip,
  Divider,
} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { SvgIconComponent } from "@mui/icons-material";

// Define typing for zone data
export interface ZoneViolationsdata {
  zone: string;
  violations?: number;
  alarms?: number;
  icons?: {
    [key: string]: SvgIconComponent;
  };
  [key: string]: any;
}

interface ZoneViolationsProps {
  violationsZone: ZoneViolationsdata[];
  loading?: boolean;
  maxHeight?: number;
  tooltipMessage?: string;
}

const ZoneViolations: React.FC<ZoneViolationsProps> = ({
  violationsZone,
  loading = true,
  maxHeight,
  tooltipMessage,
}) => {
  const rows = loading ? Array.from(new Array(4)) : violationsZone;
  const lastIndex = rows.length - 1;

  return (
    <Card
      sx={{
        height: "100%",
        maxHeight: maxHeight ?? 420,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
      }}
    >
      <CardContent
        sx={{
          p: 2,
          flex: 1,
          overflowY: "auto",
        }}
      >
        {/* Header */}
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
            {loading ? <Skeleton width={180} /> : "Zone Violations"}
          </Typography>

          {!loading && tooltipMessage && (
            <Tooltip title={tooltipMessage} arrow>
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

        {/* Zone Data */}
        <Box>
          {rows.map((zone, index) => {
            const hasBorder = index < lastIndex;

            return (
              <Box
                key={index + 1}
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  p: 1.5,
                  borderBottom: hasBorder ? "1px solid #f0f0f0" : "none",

                  boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
                  border: "1px solid #f0f0f0",
                  borderRadius: 2,
                  mt: 1,
                }}
              >
                {loading ? (
                  <>
                    <Skeleton width="40%" height={18} sx={{ mb: 0.5 }} />
                    <Skeleton width="60%" height={14} />
                  </>
                ) : (
                  <>
                    {/* Zone Name */}
                    {zone.zone && (
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "15px",
                          mb: 1,
                        }}
                      >
                        {zone.zone}
                      </Typography>
                    )}

                    {/* Inline key: value pairs with icons */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      {Object.keys(zone)
                        .filter((key) => key !== "zone" && key !== "icons")
                        .map((key, i, arr) => {
                          const IconComponent = zone.icons?.[key];

                          return (
                            <React.Fragment key={key}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                {/* Icon */}
                                {IconComponent && (
                                  <IconComponent
                                    sx={{ fontSize: "20px", color: "#f44336" }}
                                  />
                                )}

                                {/* Label */}
                                <Typography
                                  sx={{ fontSize: "14px", color: "#5c6b7d" }}
                                >
                                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </Typography>

                                {/* Value */}
                                <Typography
                                  sx={{
                                    fontSize: "19px",
                                    fontWeight: 700,
                                    color: "#f44336",
                                  }}
                                >
                                  {zone[key]}
                                </Typography>
                              </Box>

                              {/* Divider */}
                              {i < arr.length - 1 && (
                                <Divider orientation="vertical" flexItem />
                              )}
                            </React.Fragment>
                          );
                        })}
                    </Box>
                  </>
                )}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ZoneViolations;
