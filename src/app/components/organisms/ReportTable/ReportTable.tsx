"use client";
import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  MenuItem,
  Menu,
  Skeleton,
  IconButton,
  Card,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { Description, Visibility, Download } from "@mui/icons-material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";

/** Filter Types */
type FilterType = "text" | "select" | "date" | "datetime";

/** Column definition for a given row type T */
export interface ReportColumn<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
}

export type FilterOption = string | number | boolean;

/** Filter definition for a given row type T */
export interface ReportFilter<T> {
  id: keyof T;
  label: string;
  type: FilterType;
  options?: FilterOption[];
}

/** Props for ReportTable with generic row type T */
interface ReportTableProps<T extends object> {
  readonly title?: string;
  readonly columns: ReportColumn<T>[];
  readonly data: T[];
  readonly downloadFileName: string;
  readonly filters?: ReportFilter<T>[];
  readonly onSubmit?: (filters: Record<string, string>) => void;
  readonly onReset?: () => void;
  readonly onExport?: (
    format: "csv" | "pdf",
    filters: Record<string, string>
  ) => void;
  readonly loading?: boolean;
  readonly isSubmitDisabled?: boolean;
  readonly onView?: (row: T) => void;
  readonly onDownload?: (row: T) => void;
  readonly tooltipMessage: string;
}

function ReportTable<T extends Record<string, string | number | boolean>>({
  title,
  columns,
  data,
  filters = [],
  onSubmit,
  onReset,
  onExport,
  loading = false,
  isSubmitDisabled,
  onView,
  onDownload,
  tooltipMessage,
}: ReportTableProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterValues, setFilterValues] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
  );
  const [dateTimeValues, setDateTimeValues] = useState<
    Record<string, Dayjs | null>
  >({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Check if any filter has a value
  const hasActiveFilters = useMemo(() => {
    const hasTextFilters = Object.values(filterValues).some(
      (value) => value !== "" && value !== undefined
    );
    const hasDateFilters = Object.values(dateTimeValues).some(
      (value) => value !== null && value !== undefined
    );
    return hasTextFilters ?? hasDateFilters;
  }, [filterValues, dateTimeValues]);

  const handleFilterChange = (id: keyof T, value: string) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateTimeChange = (label: string, value: Dayjs | null) => {
    setDateTimeValues((prev) => ({ ...prev, [label]: value }));
  };

  // Calculate min/max dates for start and end date with 3-month range
  const getDateConstraints = (label: string) => {
    const now = dayjs();
    const threeMonthsAgo = now.subtract(3, "month");

    if (label === "Start Date") {
      const endDate = dateTimeValues["End Date"];
      return {
        minDate: threeMonthsAgo,
        maxDate: endDate ?? now,
      };
    } else if (label === "End Date") {
      const startDate = dateTimeValues["Start Date"];
      return {
        minDate: startDate ?? threeMonthsAgo,
        maxDate: now,
      };
    }
    return { minDate: threeMonthsAgo, maxDate: now };
  };

  const handleSubmit = () => {
    setPage(0);
    // Combine regular filters with datetime filters
    const combinedFilters = {
      ...filterValues,
      ...Object.fromEntries(
        Object.entries(dateTimeValues)
          .filter(([value]) => value !== null)
          .map(([key, value]) => [key, value?.toISOString() ?? ""])
      ),
    };
    onSubmit?.(combinedFilters);
  };

  const handleReset = () => {
    setFilterValues({} as Record<keyof T, string>);
    setDateTimeValues({});
    setPage(0);
    onReset?.();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "present":
      case "resolved":
        return { color: "#4caf50", bgColor: "#e8f5e9" };
      case "missing":
      case "violation":
      case "breach":
        return { color: "#f44336", bgColor: "#ffebee" };
      case "on_break":
      case "late_arrival":
      case "warning":
        return { color: "#ff9800", bgColor: "#fff8e1" };
      case "investigating":
      case "pending":
        return { color: "#2196f3", bgColor: "#e3f2fd" };
      default:
        return { color: "#666", bgColor: "#f5f5f5" };
    }
  };

  const renderCellValue = (
    column: ReportColumn<T>,
    value: string | number | boolean
  ) => {
    if (typeof value === "boolean") {
      return (
        <Typography sx={{ fontSize: "14px", color: "#333" }}>
          {value ? "True" : "False"}
        </Typography>
      );
    }

    if (String(column.id).toLowerCase() === "status") {
      const colors = getStatusColor(String(value));
      return (
        <Chip
          label={String(value)}
          size="small"
          sx={{
            fontSize: "12px",
            fontWeight: 500,
            color: colors.color,
            backgroundColor: colors.bgColor,
            height: 24,
            textTransform: "uppercase",
          }}
        />
      );
    }

    if (String(column.id).toLowerCase().includes("id")) {
      return (
        <Typography
          sx={{
            //  color: "#1976d2",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {String(value)}
        </Typography>
      );
    }

    return (
      <Typography sx={{ fontSize: "14px", color: "#333" }}>
        {String(value)}
      </Typography>
    );
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleExportClick = (format: "csv" | "pdf") => {
    const combinedFilters = {
      ...filterValues,
      ...Object.fromEntries(
        Object.entries(dateTimeValues)
          .filter(([value]) => value !== null)
          .map(([key, value]) => [key, value?.toISOString() ?? ""])
      ),
    };
    onExport?.(format, combinedFilters);
    handleClose();
  };

  const renderFilter = (filter: ReportFilter<T>) => {
    // Handle datetime type filters
    if (filter.type === "date") {
      const constraints = getDateConstraints(filter.label);
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={filter.label}
            value={dateTimeValues[filter.label] ?? null}
            onChange={(newValue) =>
              handleDateTimeChange(
                filter.label,
                newValue ? dayjs(newValue) : null
              )
            }
            minDateTime={constraints.minDate}
            maxDateTime={constraints.maxDate}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  minWidth: 150,
                  "& .MuiPickersOutlinedInput-root": {
                    height: "48px",
                  },
                  "& .MuiInputLabel-root": {
                    transformOrigin: "top left",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      );
    }

    const commonProps = {
      label: filter.label,
      fullWidth: true,
      value: filterValues[filter.id] ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleFilterChange(filter.id, e.target.value),
      sx: { minWidth: 150 },
    };

    if (filter.type === "text") return <TextField {...commonProps} />;
    if (filter.type === "select")
      return (
        <TextField {...commonProps} select>
          {filter.options?.map((opt, index) => (
            <MenuItem key={uuidv4() + index} value={opt.toString()}>
              {opt.toString()}
            </MenuItem>
          ))}
        </TextField>
      );

    return null;
  };

  let tableRows: React.ReactElement[] = [];
  if (loading) {
    tableRows = [...Array(5)].map((_, rowIndex) => (
      <TableRow key={rowIndex + 1}>
        {columns.map((col, index) => (
          <TableCell key={uuidv4() + index}>
            <Skeleton variant="text" width="80%" />
          </TableCell>
        ))}
        <TableCell>
          <Skeleton variant="circular" width={24} height={24} />
        </TableCell>
      </TableRow>
    ));
  } else if (data.length > 0) {
    tableRows = data.map((row, index) => (
      <TableRow key={uuidv4() + index}>
        {columns.map((column, index) => (
          <TableCell key={uuidv4() + index} align={column.align ?? "left"}>
            {renderCellValue(column, row[column.id])}
          </TableCell>
        ))}
        <TableCell align="center">
          <IconButton
            size="medium"
            color="primary"
            onClick={() => onView?.(row)}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="medium"
            color="primary"
            onClick={() => onDownload?.(row)}
          >
            <Download fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  } else {
    tableRows = [
      <TableRow key="no-data">
        <TableCell colSpan={columns.length + 1} align="center">
          <Typography>No matching records found</Typography>
        </TableCell>
      </TableRow>,
    ];
  }

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {title && (
                <>
                  <Description sx={{ color: "#1976d2", fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {title}
                  </Typography>
                </>
              )}
            </Box>
            {tooltipMessage && (
              <Tooltip title={tooltipMessage} arrow placement="left">
                <Box sx={{ cursor: "pointer", color: "#f44336" }}>
                  <InfoOutlineIcon />
                </Box>
              </Tooltip>
            )}
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
            {filters.map((filter, index) => (
              <Box key={uuidv4() + index} sx={{ flex: "1 1 150px" }}>
                {renderFilter(filter)}
              </Box>
            ))}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Button
                size="small"
                variant="outlined"
                onClick={handleSubmit}
                disabled={!hasActiveFilters || isSubmitDisabled}
              >
                Submit
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={handleDownloadClick}
              >
                Download
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleExportClick("csv")}>
                  📊 CSV
                </MenuItem>
                <MenuItem onClick={() => handleExportClick("pdf")}>
                  📄 PDF
                </MenuItem>
              </Menu>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleReset}
                disabled={!hasActiveFilters}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#ffffff" }}>
                {columns.map((column, indx) => (
                  <TableCell
                    key={uuidv4() + indx}
                    align={column.align ?? "left"}
                    sx={{
                      minWidth: column.minWidth,
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#333",
                      py: 2,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#333",
                    py: 2,
                    minWidth: 100,
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 15, 20]}
        />
      </Card>
    </Box>
  );
}

export default ReportTable;
