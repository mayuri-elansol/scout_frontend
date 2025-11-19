"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Videocam as VideocamIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { UseCase } from "@/app/types/useCaseManager";

interface UseCaseCardProps {
  useCase: UseCase;
  assignedCameraCount: number;
  onConfigureCameras: (useCase: UseCase) => void;
}

// Icon mapping for use case categories
const getCategoryIcon = (category?: string) => {
  switch (category?.toLowerCase()) {
    case "safety & compliance":
    case "safety":
      return "🛡️";
    case "surveillance":
      return "👁️";
    case "operational insights":
    case "operational":
      return "📊";
    case "workforce monitoring":
      return "👥";
    default:
      return "🎯";
  }
};

export const UseCaseCard: React.FC<UseCaseCardProps> = ({
  useCase,
  assignedCameraCount,
  onConfigureCameras,
}) => {
  const hasCamera = assignedCameraCount > 0;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        border: "1px solid",
        borderColor: hasCamera ? "success.light" : "divider",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Category Badge */}
        {useCase.category && (
          <Box sx={{ mb: 2 }}>
            <Chip
              label={useCase.category}
              size="small"
              icon={<span>{getCategoryIcon(useCase.category)}</span>}
              sx={{
                backgroundColor: "primary.light",
                color: "primary.dark",
                fontWeight: 500,
                fontSize: "0.75rem",
              }}
            />
          </Box>
        )}

        {/* Use Case Name */}
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 1.5,
            minHeight: "2.6em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {useCase.name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            minHeight: "3.6em",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: "0.875rem",
            lineHeight: 1.6,
          }}
        >
          {useCase.description}
        </Typography>

        {/* Camera Status */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: "auto",
            pt: 1,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <VideocamIcon
            sx={{
              fontSize: 20,
              color: hasCamera ? "success.main" : "text.disabled",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: hasCamera ? "success.main" : "text.secondary",
            }}
          >
            {hasCamera
              ? `${assignedCameraCount} camera${assignedCameraCount > 1 ? "s" : ""} assigned`
              : "No cameras assigned"}
          </Typography>
          {hasCamera && (
            <CheckCircleIcon
              sx={{
                fontSize: 18,
                color: "success.main",
                ml: "auto",
              }}
            />
          )}
          {!hasCamera && (
            <WarningIcon
              sx={{
                fontSize: 18,
                color: "warning.main",
                ml: "auto",
              }}
            />
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          fullWidth
          variant={hasCamera ? "outlined" : "contained"}
          color="primary"
          startIcon={<SettingsIcon />}
          onClick={() => onConfigureCameras(useCase)}
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {hasCamera ? "Manage Cameras" : "Assign Cameras"}
        </Button>
      </CardActions>
    </Card>
  );
};
