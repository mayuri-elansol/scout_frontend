"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Schedule, ExpandMore } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const TimeFilter: React.FC = () => {
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const todayStart = dayjs().startOf("day");
  const now = dayjs();

  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(
    `${todayStart.format("YYYY-MM-DD HH:mm")} - ${now.format("YYYY-MM-DD HH:mm")}`
  );

  const [customRange, setCustomRange] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({ start: null, end: null });

  const timeFilters = [
    `${todayStart.format("YYYY-MM-DD HH:mm")} - ${now.format("YYYY-MM-DD HH:mm")}`,
    `Shift 1 (${dayjs().format("YYYY-MM-DD")} 06:00 - 14:00)`,
    `Shift 2 (${dayjs().format("YYYY-MM-DD")} 14:00 - 22:00)`,
    "Select Your Own Time",
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setTimePickerOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setTimePickerOpen(false);
  };

  const handleSelect = (range: string) => {
    if (range === "Select Your Own Time") {
      handleClose();
      setCustomDialogOpen(true); // open popup
    } else {
      setSelectedTimeRange(range);
      handleClose();
    }
  };

  const applyCustomRange = () => {
    if (customRange.start && customRange.end) {
      setSelectedTimeRange(
        `${customRange.start.format("YYYY-MM-DD HH:mm")} - ${customRange.end.format("YYYY-MM-DD HH:mm")}`
      );
      setCustomDialogOpen(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Button
          variant="outlined"
          startIcon={<Schedule />}
          endIcon={<ExpandMore />}
          onClick={handleClick}
          sx={{
            color: "#374151",
            borderColor: "#d1d5db",
            backgroundColor: "white",
            fontSize: { xs: "12px", sm: "14px" },
            px: { xs: 1, sm: 2 },
            "&:hover": { borderColor: "#9ca3af", backgroundColor: "#f9fafb" },
          }}
        >
          {selectedTimeRange}
        </Button>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={timePickerOpen}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: { width: 300, maxHeight: 400, mt: 0.5 } } }}
        >
          {timeFilters.map((range) => (
            <MenuItem
              key={range}
              selected={selectedTimeRange === range}
              onClick={() => handleSelect(range)}
              sx={{
                fontSize: "14px",
                "&.Mui-selected": {
                  backgroundColor: "#f3f4f6",
                  color: "primary.main",
                },
              }}
            >
              {range}
            </MenuItem>
          ))}
        </Menu>

        {/* Popup Dialog for Custom Range */}
        <Dialog open={customDialogOpen} onClose={() => setCustomDialogOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Select Custom Range</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1, overflow: "visible" }}>

            <DateTimePicker
              label="Start"
              value={customRange.start}
              onChange={(value) => setCustomRange((prev) => ({ ...prev, start: value as Dayjs | null }))}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
              minDateTime={dayjs().subtract(3, "month").startOf("day")} 
              maxDateTime={dayjs().endOf("day")}                      
            />

            <DateTimePicker
              label="End"
              value={customRange.end}
              onChange={(value) => setCustomRange((prev) => ({ ...prev, end: value as Dayjs | null }))}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
              minDateTime={dayjs().subtract(3, "month").startOf("day")}
              maxDateTime={dayjs().endOf("day")}
            />

            <Button variant="contained" onClick={applyCustomRange}>
              Apply
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default TimeFilter;
