"use client";

import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { Warning, Visibility } from "@mui/icons-material";
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
    <Card>
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Warning sx={{ fontSize: 20, color: "#f44336" }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c2025" }}>
              {label}
            </Typography>
          </Box>
          {!loading && (
            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={onViewAll}
              sx={{
                color: "#1976d2",
                borderColor: "#1976d2",
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              View All
            </Button>
          )}
        </Box>
        <Box sx={{ maxHeight: 450, overflowY: "auto" }}>
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
                  size={{ xs: 12, md: 3 }}
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
