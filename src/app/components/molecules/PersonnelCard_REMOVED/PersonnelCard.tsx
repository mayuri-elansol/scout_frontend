import React from "react";
import { Card, CardContent, Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import ScoutButton from "../../atoms/Button/Button";
import ScoutBadge from "../../atoms/Badge/Badge";
import LiveFeedPreview from "../../organisms/LiveFeedPreview/LiveFeedPreview";

interface PersonnelCardProps {
  employeeId: string;
  employeeName: string;
  zone: string;
  shift: string;
  role: string;
  status: "active" | "on_break" | "missing" | "offline";
  liveFeedStatus?: "live" | "offline" | "loading";
  lastSeen?: string;
  onTrack?: () => void;
  onProfile?: () => void;
  onViewFeed?: () => void;
  onClick?: () => void;
}

const StyledCard = styled(Card)<{ personnelstatus?: string }>(
  ({ personnelstatus }) => {
    const getCardBackground = () => {
      switch (personnelstatus) {
        case "active":
          return "#f0fdf4"; // Light green
        case "on_break":
          return "#fffbeb"; // Light orange
        case "missing":
          return "#fef2f2"; // Light red
        case "offline":
          return "#f8fafc"; // Light gray
        default:
          return "#ffffff";
      }
    };

    const getBorderColor = () => {
      switch (personnelstatus) {
        case "active":
          return "#22c55e20";
        case "on_break":
          return "#f59e0b20";
        case "missing":
          return "#ef444420";
        case "offline":
          return "#94a3b820";
        default:
          return "#e5e7eb";
      }
    };

    return {
      backgroundColor: getCardBackground(),
      border: `1px solid ${getBorderColor()}`,
      borderRadius: "8px",
      transition: "all 0.2s ease",
      cursor: "pointer",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transform: "translateY(-2px)",
      },
    };
  }
);

const PersonnelCard: React.FC<PersonnelCardProps> = ({
  employeeId,
  employeeName,
  zone,
  shift,
  role,
  status,
  liveFeedStatus = "live",
  lastSeen,
  onTrack,
  onProfile,
  onViewFeed,
  onClick,
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return (
          <ScoutBadge
            variant="status"
            status="active"
            label="ACTIVE"
            size="small"
          />
        );
      case "on_break":
        return (
          <ScoutBadge
            variant="status"
            status="warning"
            label="ON_BREAK"
            size="small"
          />
        );
      case "missing":
        return (
          <ScoutBadge
            variant="status"
            status="critical"
            label="MISSING"
            size="small"
          />
        );
      case "offline":
        return (
          <ScoutBadge
            variant="status"
            status="inactive"
            label="OFFLINE"
            size="small"
          />
        );
      default:
        return null;
    }
  };

  const formatLastSeen = (timestamp?: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <StyledCard personnelstatus={status} onClick={onClick}>
      <CardContent sx={{ p: 2 }}>
        {/* Header with Name and Status */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                color: "#1c2025",
                lineHeight: 1.2,
                mb: 0.5,
              }}
            >
              {employeeName}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                fontSize: "13px",
                lineHeight: 1.3,
              }}
            >
              {zone} • {shift}
            </Typography>
          </Box>
          {getStatusBadge()}
        </Box>

        {/* Employee Details */}
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
              fontSize: "12px",
              mb: 0.5,
            }}
          >
            ID: {employeeId} • {role}
          </Typography>
          {(status === "missing" || status === "offline") && lastSeen && (
            <Typography
              variant="caption"
              sx={{
                color: status === "missing" ? "#ef4444" : "#9ca3af",
                fontSize: "11px",
              }}
            >
              Last seen: {formatLastSeen(lastSeen)}
            </Typography>
          )}
        </Box>

        {/* Live Feed Preview */}
        <Box sx={{ mb: 2 }}>
          <LiveFeedPreview
            status={status === "active" ? liveFeedStatus : "offline"}
            height="100px"
            onClick={onViewFeed}
            showStatus={status === "active"}
          />
        </Box>

        {/* Action Buttons */}
        <Grid container spacing={1}>
          <Grid size={{ xs: 6 }}>
            <ScoutButton
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                if (onTrack) onTrack();
              }}
              fullWidth
              size="small"
              sx={{
                height: "32px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Track
            </ScoutButton>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <ScoutButton
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                if (onProfile) onProfile();
              }}
              fullWidth
              size="small"
              sx={{
                height: "32px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Profile
            </ScoutButton>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default PersonnelCard;
