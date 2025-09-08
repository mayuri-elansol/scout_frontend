import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import ActivityCard from "../../molecules/ActivityCard/ActivityCard";

interface ActivityItem {
  id: string;
  alertType:
    | "ppe_violation"
    | "security_breach"
    | "personnel_tracking"
    | "equipment_alert";
  title: string;
  location: string;
  timestamp: string;
  workerId?: string;
  intruderId?: string;
  cameraId?: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "active" | "acknowledged" | "resolved" | "investigating";
  description?: string;
  imagePreview?: boolean;
}

interface ActivityFeedListProps {
  title?: string;
  activities: ActivityItem[];
  maxHeight?: string | number;
  showDividers?: boolean;
  onActivityClick?: (activity: ActivityItem) => void;
  onAcknowledge?: (activityId: string) => void;
  onViewDetails?: (activityId: string) => void;
  onViewProfile?: (activityId: string) => void;
}

const StyledContainer = styled(Box)(({}) => ({
  width: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  overflow: "hidden",
}));

const ScrollableContent = styled(Box)<{ maxheight?: string | number }>(
  ({ maxheight }) => ({
    maxHeight: maxheight || "600px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f5f9",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#cbd5e1",
      borderRadius: "3px",
      "&:hover": {
        backgroundColor: "#94a3b8",
      },
    },
  })
);

const ActivityFeedList: React.FC<ActivityFeedListProps> = ({
  title = "Recent Activity",
  activities,
  maxHeight,
  showDividers = true,
  onActivityClick,
  onAcknowledge,
  onViewDetails,
  onViewProfile,
}) => {
  const handleActivityClick = (activity: ActivityItem) => {
    if (onActivityClick) {
      onActivityClick(activity);
    }
  };

  const handleAcknowledge = (activityId: string) => {
    if (onAcknowledge) {
      onAcknowledge(activityId);
    }
  };

  const handleViewDetails = (activityId: string) => {
    if (onViewDetails) {
      onViewDetails(activityId);
    }
  };

  // const handleViewProfile = (activityId: string) => {
  //   if (onViewProfile) {
  //     onViewProfile(activityId);
  //   }
  // };

  // Convert alertType to cardType for ActivityCard
  const getCardType = (
    alertType: string
  ):
    | "employee"
    | "ppe_violation"
    | "security_breach"
    | "personnel_tracking" => {
    switch (alertType) {
      case "ppe_violation":
        return "ppe_violation";
      case "security_breach":
        return "security_breach";
      case "personnel_tracking":
        return "personnel_tracking";
      case "equipment_alert":
        return "security_breach"; // Map equipment alerts to security breach type
      default:
        return "security_breach";
    }
  };

  if (activities.length === 0) {
    return (
      <StyledContainer>
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1c2025",
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            No recent activity to display
          </Typography>
        </Box>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      {/* Header */}
      {title && (
        <Box sx={{ p: 2, borderBottom: "1px solid #e5e7eb" }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1c2025",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
              fontSize: "12px",
            }}
          >
            {activities.length} {activities.length === 1 ? "item" : "items"}
          </Typography>
        </Box>
      )}

      {/* Scrollable Activity List */}
      <ScrollableContent maxheight={maxHeight}>
        <Box sx={{ p: 1 }}>
          {activities.map((activity, index) => (
            <Box key={activity.id}>
              <Box sx={{ p: 1 }}>
                <ActivityCard
                  id={activity.id}
                  cardType={getCardType(activity.alertType)}
                  title={activity.title}
                  location={activity.location}
                  timestamp={activity.timestamp}
                  workerId={activity.workerId}
                  intruderId={activity.intruderId}
                  priority={activity.priority}
                  alertStatus={activity.status}
                  previewText={activity.description}
                  showLiveFeed={activity.imagePreview}
                  onClick={() => handleActivityClick(activity)}
                  onPrimaryAction={() => handleAcknowledge(activity.id)}
                  onSecondaryAction={() => handleViewDetails(activity.id)}
                />
              </Box>

              {/* Divider between items */}
              {showDividers && index < activities.length - 1 && (
                <Divider sx={{ mx: 2, backgroundColor: "#f1f5f9" }} />
              )}
            </Box>
          ))}
        </Box>
      </ScrollableContent>
    </StyledContainer>
  );
};

export default ActivityFeedList;
