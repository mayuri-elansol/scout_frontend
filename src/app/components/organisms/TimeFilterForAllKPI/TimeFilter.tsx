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

const TimeFilter: React.FC<TimeFilterProps> = ({ onRangeChange, shifts }) => {
  const todayStart = dayjs().startOf("day");
  const now = dayjs();

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

  const activeShifts = useMemo(() => {
    return shifts
      ?.filter((shift) => shift.status === "ACTIVE")
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [shifts]);

  const timeFilters = useMemo(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const shiftOptions =
      activeShifts?.map((shift) => {
        const startDateTime = `${today} ${shift.startTime}`;
        let endDateTime = `${today} ${shift.endTime}`;
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
      setEndDateError("End must be after start");
      return false;
    }
    setEndDateError("");
    return true;
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

    const selectedShift = activeShifts?.find((shift) =>
      range.startsWith(shift.name),
    );

    if (selectedShift) {
      const today = dayjs().format("YYYY-MM-DD");
      const start = `${today} ${selectedShift.startTime}`;
      let end = `${today} ${selectedShift.endTime}`;
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

    const [start, end] = range.split(" - ");
    onRangeChange({
      start: dayjs(start).format("YYYY-MM-DD HH:mm:ss"),
      end: dayjs(end).format("YYYY-MM-DD HH:mm:ss"),
    });

    handleClose();
  };

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        {/* Tiny Button */}
        <Button
          variant="outlined"
          size="small"
          startIcon={<Schedule sx={{ fontSize: 14 }} />}
          endIcon={<ExpandMore sx={{ fontSize: 14 }} />}
          onClick={handleClick}
          sx={{
            color: "#374151",
            borderColor: "#d1d5db",
            backgroundColor: "white",
            fontSize: "0.7rem",
            py: 0.3,
            px: 1.2,
            minHeight: 24,
            "&:hover": { borderColor: "#9ca3af", backgroundColor: "#f9fafb" },
          }}
        >
          {selectedTimeRange}
        </Button>

        {/* Compact Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                maxHeight: 260,
                width: 260,
                mt: 0.5,
                "& .MuiMenuItem-root": {
                  fontSize: "0.75rem",
                  py: 0.4,
                  px: 1.2,
                  minHeight: 28,
                },
              },
            },
          }}
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

        {/* Custom Range Dialog - Super Compact */}
        <Dialog
          open={customDialogOpen}
          onClose={() => setCustomDialogOpen(false)}
          maxWidth={false}
          PaperProps={{
            sx: {
              width: 280,
              p: 0,
              borderRadius: 2,
            },
          }}
        >
          <DialogTitle sx={{ fontSize: "0.9rem", py: 1, px: 1.5 }}>
            Select Custom Range
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              p: 1.5,
              pt: 0.5,
            }}
          >
            <DateTimePicker
              label="Start"
              value={customRange.start}
              onChange={(value) => {
                const startValue = value as Dayjs | null;
                setCustomRange((prev) => ({ ...prev, start: startValue }));
                validateStartEnd(startValue, customRange.end);
              }}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  sx: {
                    "& .MuiInputBase-root": { fontSize: "0.75rem", height: 32 },
                    "& .MuiInputLabel-root": { fontSize: "0.7rem" },
                  },
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
                setCustomRange((prev) => ({ ...prev, end: endValue }));
                validateStartEnd(customRange.start, endValue);
              }}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  error: Boolean(endDateError),
                  helperText: endDateError,
                  sx: {
                    "& .MuiInputBase-root": { fontSize: "0.75rem", height: 32 },
                    "& .MuiInputLabel-root": { fontSize: "0.7rem" },
                    "& .MuiFormHelperText-root": { fontSize: "0.65rem", mx: 0 },
                  },
                },
              }}
              minDateTime={dayjs().subtract(3, "month").startOf("day")}
              maxDateTime={dayjs().endOf("day")}
              format="DD-MM-YYYY HH:mm"
            />

            <Button
              variant="contained"
              size="small"
              onClick={applyCustomRange}
              disabled={Boolean(endDateError)}
              sx={{ fontSize: "0.75rem", py: 0.4 }}
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