import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
  Skeleton,
} from "@mui/material";
import { BarChart } from "@mui/icons-material";

interface ActivityItem {
  time: string;
  event: string;
  zone: string;
  severity: "high" | "medium" | "low";
  icon: React.ElementType;
}

interface ActivityFeedProps {
  loading: boolean;
  activities: ActivityItem[];
  maxHeight?: number | string;
}

const getSeverityStyle = (severity: string) => {
  switch (severity) {
    case "high":
      return { bg: "#ffebee", color: "#f44336" };
    case "medium":
      return { bg: "#fff8e1", color: "#ff9800" };
    case "low":
      return { bg: "#e8f5e9", color: "#4caf50" };
    default:
      return { bg: "#f5f5f5", color: "#666" };
  }
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  loading = false,
  activities = [],
  maxHeight,
}) => {
  return (
    <Card sx={{ maxHeight: maxHeight ?? 600 }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c2025" }}>
            Real-time Activity
          </Typography>
          <BarChart sx={{ fontSize: 20, color: "#5c6b7d" }} />
        </Box>

        {/* Content */}
        <Box
          sx={{
            maxHeight,
            overflowY: "auto",
          }}
        >
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <Box
                  key={index + 1}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    py: 2,
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    animation="wave"
                  />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton
                      variant="text"
                      width="50%"
                      height={18}
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width="50%"
                      height={16}
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width="30%"
                      height={14}
                      animation="wave"
                    />
                  </Box>
                </Box>
              ))
            : activities.map((activity, index) => {
                const IconComponent = activity.icon;
                const severityStyle = getSeverityStyle(activity.severity);

                return (
                  <Box
                    key={index + 1}
                    sx={{
                      display: "flex",

                      alignItems: "flex-start",
                      gap: 2,
                      py: 2,
                      borderBottom:
                        index < activities.length - 1
                          ? "1px solid #f0f0f0"
                          : "none",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: severityStyle.bg,
                        color: severityStyle.color,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 16 }} />
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
                          {activity.event}
                        </Typography>
                        <Chip
                          label={activity.severity.toUpperCase()}
                          size="small"
                          sx={{
                            backgroundColor: severityStyle.color,
                            color: "white",
                            fontSize: "10px",
                            fontWeight: 600,
                            height: 20,
                            textTransform: "uppercase",
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "#5c6b7d",
                          mb: 0.5,
                        }}
                      >
                        {activity.zone}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#9aa0a6",
                        }}
                      >
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
