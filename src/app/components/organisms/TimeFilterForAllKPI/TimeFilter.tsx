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
import { v4 as uuidv4 } from "uuid";
// In TimeFilter component props:
interface TimeFilterProps {
  onRangeChange: (range: { start: string; end: string }) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ onRangeChange }) => {
  const [endDateError, setEndDateError] = useState<string>("");
  const validateStartEnd = (start: Dayjs | null, end: Dayjs | null) => {
    if (!start || !end) {
      setEndDateError("");
      return true;
    }

    if (end.isBefore(start)) {
      setEndDateError("End date must be after start date");
      return false;
    }

    setEndDateError("");
    return true;
  };

  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const todayStart = dayjs().startOf("day");
  const now = dayjs();

  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(
    `${todayStart.format("YYYY-MM-DD HH:mm")} - ${now.format(
      "YYYY-MM-DD HH:mm"
    )}`
  );

  const [customRange, setCustomRange] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({ start: null, end: null });

  const timeFilters = [
    "Live",
    `${todayStart.format("YYYY-MM-DD HH:mm")} - ${now.format(
      "YYYY-MM-DD HH:mm"
    )}`,
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
    setSelectedTimeRange(range);

    if (range === "Live") {
      onRangeChange({ start: "", end: "" });
      handleClose();
      return;
    }
    if (range === "Select Your Own Time") {
      setCustomRange({ start: null, end: null });
      setCustomDialogOpen(true);
      return;
    }

    /** ---- SHIFT LOGIC ---- **/
    if (range.includes("Shift 1")) {
      const date = dayjs().format("YYYY-MM-DD");

      const start = `${date} 06:00:00`;
      const end = `${date} 14:00:00`;

      setSelectedTimeRange(`Shift 1 (${start} - ${end})`);

      onRangeChange({ start, end });
      handleClose();
      return;
    }

    if (range.includes("Shift 2")) {
      const date = dayjs().format("YYYY-MM-DD");

      const start = `${date} 14:00:00`;
      const end = `${date} 22:00:00`;

      setSelectedTimeRange(`Shift 2 (${start} - ${end})`);

      onRangeChange({ start, end });
      handleClose();
      return;
    }

    /** ---- DEFAULT (Today Range) ---- **/
    setSelectedTimeRange(range);

    const [start, end] = range.split(" - ");

    onRangeChange({
      start: dayjs(start).format("YYYY-MM-DD HH:mm:ss"),
      end: dayjs(end).format("YYYY-MM-DD HH:mm:ss"),
    });

    handleClose();
  };

  const applyCustomRange = () => {
    if (customRange.start && customRange.end) {
      const start = customRange.start.format("YYYY-MM-DD HH:mm");
      const end = customRange.end.format("YYYY-MM-DD HH:mm");

      setSelectedTimeRange(`${start} - ${end}`);

      // 🔥 Trigger parent APIs
      onRangeChange({ start, end });

      setCustomDialogOpen(false);
      setCustomRange({ start: null, end: null });
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
          {timeFilters.map((range, index) => (
            <MenuItem
              key={uuidv4() + index}
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
        <Dialog
          open={customDialogOpen}
          onClose={() => setCustomDialogOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Select Custom Range</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
              overflow: "visible",
            }}
          >
            <DateTimePicker
              label="Start"
              value={customRange.start}
              onChange={(value) => {
                const startValue = value as Dayjs | null;

                setCustomRange((prev) => ({
                  ...prev,
                  start: startValue,
                }));

                validateStartEnd(startValue, customRange.end);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
              minDateTime={dayjs().subtract(1, "month").startOf("day")}
              maxDateTime={dayjs().endOf("day")}
              format="DD-MM-YYYY HH:mm"
            />

            <DateTimePicker
              label="End"
              value={customRange.end}
              onChange={(value) => {
                const endValue = value as Dayjs | null;

                setCustomRange((prev) => ({
                  ...prev,
                  end: endValue,
                }));

                validateStartEnd(customRange.start, endValue);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  error: Boolean(endDateError),
                  helperText: endDateError,
                },
              }}
              minDateTime={dayjs().subtract(3, "month").startOf("day")}
              maxDateTime={dayjs().endOf("day")}
              format="DD-MM-YYYY HH:mm"
            />

            <Button
              variant="contained"
              onClick={applyCustomRange}
              disabled={Boolean(endDateError)}
            >
              Apply
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default TimeFilter;
