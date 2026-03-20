"use client";

import React, { useState, useMemo } from "react";
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

/* ---------------- TYPES ---------------- */

interface ShiftType {
  shiftId: string;
  name: string;
  startTime: string;
  endTime: string;
  breakStartTime: string;
  breakEndTime: string;
  status: string;
}

interface TimeFilterProps {
  onRangeChange: (range: { start: string; end: string }) => void;
  shifts?: ShiftType[];
}

/* ---------------- COMPONENT ---------------- */

const TimeFilter: React.FC<TimeFilterProps> = ({ onRangeChange, shifts }) => {
  const todayStart = dayjs().startOf("day");
  const now = dayjs();

  /* ---------- STATE ---------- */

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [endDateError, setEndDateError] = useState("");

  const [selectedTimeRange, setSelectedTimeRange] = useState(
    `${todayStart.format("YYYY-MM-DD HH:mm")} - ${now.format(
      "YYYY-MM-DD HH:mm",
    )}`,
  );

  const [customRange, setCustomRange] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({ start: null, end: null });

  /* ---------- FILTER ACTIVE SHIFTS ---------- */

  const activeShifts = useMemo(() => {
    return shifts
      ?.filter((shift) => shift.status === "ACTIVE")
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [shifts]);

  /* ---------- BUILD MENU OPTIONS ---------- */

  const timeFilters = useMemo(() => {
    console.log("shiftss to the timefitler", shifts);
    const today = dayjs().format("YYYY-MM-DD");

    const shiftOptions =
      activeShifts?.map((shift) => {
        const startDateTime = `${today} ${shift.startTime}`;
        let endDateTime = `${today} ${shift.endTime}`;

        // 🔥 Night shift handling
        if (shift.endTime < shift.startTime) {
          endDateTime =
            dayjs(today).add(1, "day").format("YYYY-MM-DD") +
            ` ${shift.endTime}`;
        }

        return `${shift.name} (${startDateTime} - ${endDateTime})`;
      }) || [];

    return [
      "Live",
      `${todayStart.format("YYYY-MM-DD HH:mm")} - ${now.format(
        "YYYY-MM-DD HH:mm",
      )}`,
      ...shiftOptions,
      "Select Your Own Time",
    ];
  }, [activeShifts, todayStart, now]);

  /* ---------- MENU HANDLERS ---------- */

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  /* ---------- SELECTION LOGIC ---------- */

  const handleSelect = (range: string) => {
    setSelectedTimeRange(range);

    // LIVE
    if (range === "Live") {
      onRangeChange({ start: "", end: "" });
      handleClose();
      return;
    }

    // CUSTOM
    if (range === "Select Your Own Time") {
      setCustomRange({ start: null, end: null });
      setCustomDialogOpen(true);
      return;
    }

    // SHIFT SELECTION
    const selectedShift = activeShifts?.find((shift) =>
      range.startsWith(shift.name),
    );

    if (selectedShift) {
      const today = dayjs().format("YYYY-MM-DD");

      const start = `${today} ${selectedShift.startTime}`;
      let end = `${today} ${selectedShift.endTime}`;

      // 🔥 Night shift handling
      if (selectedShift.endTime < selectedShift.startTime) {
        end =
          dayjs(today).add(1, "day").format("YYYY-MM-DD") +
          ` ${selectedShift.endTime}`;
      }

      setSelectedTimeRange(`${selectedShift.name} (${start} - ${end})`);

      onRangeChange({ start, end });
      handleClose();
      return;
    }

    // DEFAULT (TODAY RANGE)
    const [start, end] = range.split(" - ");

    onRangeChange({
      start: dayjs(start).format("YYYY-MM-DD HH:mm:ss"),
      end: dayjs(end).format("YYYY-MM-DD HH:mm:ss"),
    });

    handleClose();
  };

  /* ---------- APPLY CUSTOM RANGE ---------- */

  const applyCustomRange = () => {
    if (customRange.start && customRange.end) {
      const start = customRange.start.format("YYYY-MM-DD HH:mm:ss");
      const end = customRange.end.format("YYYY-MM-DD HH:mm:ss");

      setSelectedTimeRange(`${start} - ${end}`);

      onRangeChange({ start, end });

      setCustomDialogOpen(false);
      setCustomRange({ start: null, end: null });
    }
  };

  /* ---------------- RENDER ---------------- */

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
            "&:hover": { borderColor: "#9ca3af", backgroundColor: "#f9fafb" },
          }}
        >
          {selectedTimeRange}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {timeFilters.map((range, index) => (
            <MenuItem
              key={index + 1}
              selected={selectedTimeRange === range}
              onClick={() => handleSelect(range)}
            >
              {range}
            </MenuItem>
          ))}
        </Menu>

        {/* Custom Date Dialog */}
        <Dialog
          open={customDialogOpen}
          onClose={() => setCustomDialogOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Select Custom Range</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
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
