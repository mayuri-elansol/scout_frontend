"use client";

import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import TimeFilter from "./TimeFilter";

interface ShiftType {
  shiftId: string;
  name: string;
  startTime: string;
  endTime: string;
  breakStartTime: string;
  breakEndTime: string;
  status: string;
}

interface CollapsibleTimeFilterProps {
  onRangeChange?: (range: { start: string; end: string }) => void;
  shifts?: ShiftType[];
}

/**
 * Compact trigger for TimeFilter: renders a small chevron button; clicking it
 * opens the full TimeFilter as an overlay on top of the cards (absolutely
 * positioned — the layout around it never shifts). TimeFilter stays mounted
 * so its selected range is preserved.
 */
const CollapsibleTimeFilter: React.FC<CollapsibleTimeFilterProps> = ({
  onRangeChange,
  shifts,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ position: "relative", width: 28, height: 36, flexShrink: 0 }}>
      {/* Collapsed trigger — just a small chevron */}
      <Tooltip title="Time filter" arrow placement="left">
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            width: 28,
            height: 36,
            borderRadius: "8px",
            border: "1px solid #E5E7EB",
            backgroundColor: "#FFFFFF",
            color: "#6B7280",
            p: 0,
            visibility: open ? "hidden" : "visible",
            "&:hover": {
              backgroundColor: "#F3F4F6",
              borderColor: "#2563EB",
              color: "#2563EB",
            },
          }}
        >
          <ChevronLeft sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>

      {/* Expanded: floats over the cards, anchored to the right */}
      <Box
        sx={{
          display: open ? "flex" : "none",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 30,
          alignItems: "center",
          gap: "6px",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: "0 4px 14px rgba(0,0,0,.14)",
          p: "3px",
        }}
      >
        <Tooltip title="Hide time filter" arrow placement="left">
          <IconButton
            size="small"
            onClick={() => setOpen(false)}
            sx={{
              width: 26,
              height: 26,
              borderRadius: "7px",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
              color: "#9CA3AF",
              flexShrink: 0,
              "&:hover": { backgroundColor: "#F3F4F6", color: "#6B7280" },
            }}
          >
            <ChevronRight sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Box sx={{ whiteSpace: "nowrap" }}>
          <TimeFilter
            onRangeChange={onRangeChange ?? (() => {})}
            shifts={shifts}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CollapsibleTimeFilter;
