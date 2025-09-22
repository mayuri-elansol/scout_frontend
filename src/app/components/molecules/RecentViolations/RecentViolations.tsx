"use client";

import React, { useState } from "react";
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
import ViewAlertPopup from "../ViewAlertPopup/ViewAlertPopup"; // import popup

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
  readonly loading?: boolean;
}

export default function RecentViolations({
  label,
  violations,
  loading = false,
}: RecentViolationsProps) {
  // state for popup
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const handleOpen = (violation: Violation) => {
    console.log("image click", violation);
    setSelectedViolation(violation);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedViolation(null);
  };

  return (
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
          {loading ? (
            <Grid container spacing={2}>
              {Array.from(new Array(4)).map((_, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
                  key={index + 1}
                >
                  <Card sx={{ p: 2 }}>
                    <Skeleton width="70%" />
                    <Skeleton width="50%" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={150} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {violations.map((violation, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
                  key={index + 1}
                  sx={{ display: "flex" }}
                >
                  {/* Pass click handler */}
                  <ViolationCard
                    violation={violation}
                    onClick={() => handleOpen(violation)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </CardContent>

      {/* Popup */}
      {selectedViolation && (
        <ViewAlertPopup
          open={open}
          handleClose={handleClose}
          title={selectedViolation.title}
          location={selectedViolation.location}
          time={selectedViolation.time}
          imageUrl={selectedViolation.imageUrl ?? ""}
          onDownload={(url) => {
            console.log("Downloading image from:", url);
          }}
        />
      )}
    </Card>
  );
}
