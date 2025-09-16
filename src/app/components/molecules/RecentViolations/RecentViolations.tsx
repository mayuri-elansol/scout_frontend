"use client";

import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import { ViolationCard } from "../ViolationCard/ViolationCard";

interface Violation {
  title: string;
  location: string;
  time: string;
  Id: string;
  severity?: string;
  status?: string;
  imageUrl?: string;
}

interface RecentViolationsProps {
  readonly label: string;
  readonly violations: readonly Violation[];
  readonly onViewAll?: () => void;
  readonly loading?: boolean;
}

export default function RecentViolations({
  label,
  violations,
  onViewAll,
  loading = false,
}: RecentViolationsProps) {
  return (
    // sx={{ maxHeight: 420, overflowY: "auto" }}
    <Card
      sx={{
        height: "100%",
        maxHeight: 420,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Warning sx={{ fontSize: 20, color: "#f44336" }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c2025" }}>
              {label}
            </Typography>
          </Box>
        </Box>
        <Box>
          {" "}
          {/* adjust height as needed */}
          {/* Content */}
          {loading ? (
            <Grid container spacing={2}>
              {Array.from(new Array(2)).map((_, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index + 1}>
                  <Card sx={{ p: 2 }}>
                    <Skeleton
                      variant="rectangular"
                      height={200}
                      sx={{ mb: 1 }}
                    />
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {violations.map((violation, index) => (
                <Grid
                  // size={{ xs: 6, md: 3 }}
                  size={{
                    xs: 12, // mobile: 1 per row
                    sm: 6, // small tablets: 2 per row
                    md: 4, // medium screens (~900px+): 3 per row
                    lg: 4, // large (>=1200px / Mac 1440px): 3 per row
                    xl: 3, // extra large (>=1536px): 4 per row
                  }}
                  key={index + 1}
                  sx={{ display: "flex" }}
                >
                  <ViolationCard violation={violation} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
