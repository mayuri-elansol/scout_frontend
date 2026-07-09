import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";

export interface BreakdownItem {
  label: string;
  count: number;
}

export interface ViolationBreakdownProps {
  totalViolations: number;
  breakdown: BreakdownItem[];
  lastDetection: string; // e.g., "14:28:46"
}

const ViolationBreakdown: React.FC<ViolationBreakdownProps> = ({
  totalViolations,
  breakdown,
  lastDetection,
}) => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} color="text.secondary" gutterBottom>
        Violation Breakdown
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 1 }}>
        {/* Total */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Total Violations
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {totalViolations}
          </Typography>
        </Box>

        <Divider />

        {/* Breakdown items */}
        {breakdown.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pl: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {item.count}
            </Typography>
          </Box>
        ))}

        <Divider />

        {/* Last Detection */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Last Detection
          </Typography>
          <Typography variant="body2" fontWeight={600} color="primary">
            {lastDetection}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ViolationBreakdown;