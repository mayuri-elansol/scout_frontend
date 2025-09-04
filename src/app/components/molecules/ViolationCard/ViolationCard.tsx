import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Warning, Visibility, CameraAlt } from "@mui/icons-material";

interface Violation {
  title: string;
  location: string;
  time: string;
  Id: string;
  severity?: "HIGH" | "MEDIUM" | "LOW" | string;
  status?: "ACTIVE" | "RESOLVED" | string;
  imageUrl?: string;
}

interface RecentViolationsProps {
  label: string;
  violations: Violation[];
  onViewAll?: () => void;
}

//  Reusable component (defined in same file)
export const ViolationCard: React.FC<{ violation: Violation }> = ({ violation }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#fff8e1",
        border: "1px solid #ddd",
        borderRadius: 1,
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          p: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#1c2025",
                mb: 0.5,
              }}
            >
              {violation.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#5c6b7d",
                mb: 0.25,
              }}
            >
              {violation.location} • {violation.time}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#5c6b7d" }}>
              ID: {violation.Id}
            </Typography>
          </Box>
        </Box>

        {/* Image Preview */}
        <Box
          sx={{
            width: "100%",
            height: 150,
            backgroundColor: "#e9ecef",
            borderRadius: 0.75,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 0.5,
            border: "1px solid #dee2e6",
          }}
        >
          {violation.imageUrl ? (
            <img
              src={violation.imageUrl}
              alt="Violation"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
          ) : (
            <Box sx={{ textAlign: "center", color: "#6c757d" }}>
              <CameraAlt sx={{ fontSize: 24, mb: 0.5 }} />
              <Typography sx={{ fontSize: "12px" }}>
                Violation Image Preview
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
