import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { Warning } from "@mui/icons-material";
import { ViolationCard, Violation } from "../ViolationCard/ViolationCard";
import ViewAlertPopup from "../ViewAlertPopup/ViewAlertPopup";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

interface RecentViolationsProps {
  readonly tooltipMessage: string;
  readonly label: string;
  readonly violations: readonly Violation[];

  readonly loading?: boolean;
  readonly imageKey?: string;
}

export default function RecentViolations({
  tooltipMessage,
  label,
  violations,
  loading = false,
  imageKey = "imageUrl",
}: RecentViolationsProps) {
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const handleOpen = (violation: Violation) => {
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
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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

          {tooltipMessage && (
            <Tooltip title={tooltipMessage} arrow placement="left">
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

        {/* Violation Cards */}

        <Box sx={{ minHeight: 200 }}>
          {loading ? (
            <Grid container spacing={2}>
              {Array.from(new Array(4)).map((_, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
                  key={uuidv4() + index}
                >
                  <Card sx={{ p: 2 }}>
                    <Skeleton width="70%" />
                    <Skeleton width="50%" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={150} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : violations.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: 4,
                textAlign: "center",
                color: "#808080",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                🚫 No Recent Violations Found
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {violations.map((violation, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
                  key={uuidv4() + index}
                  sx={{ display: "flex" }}
                >
                  <ViolationCard
                    violations={violation}
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
          details={selectedViolation}
          imageKey={imageKey}
          onDownload={(url) => console.log("Downloading image from:", url)}
        />
      )}
    </Card>
  );
}
