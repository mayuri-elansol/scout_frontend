

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
  CircularProgress,
} from "@mui/material";
import { Description, Visibility, Download } from "@mui/icons-material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { useTranslation } from "react-i18next";
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
  title?: string;
  columns: ReportColumn<T>[];
  data: T[];
  totalCount: number; // total rows from backend
  page: number;
  rowsPerPage: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
  downloadFileName: string;
  filters?: ReportFilter<T>[];
  onSubmit?: (filters: Record<string, string>) => void;
  onReset?: () => void;
  onExport?: (format: "csv" | "pdf", filters: Record<string, string>) => void;
  exportLoading?: boolean;
  loading?: boolean;
  isSubmitDisabled?: boolean;
  onView?: (row: T) => void;
  onDownload?: (row: T,index: number) => void;
 downloadingRows?: Set<number>;
  tooltipMessage: string;
}

function ReportTable<T extends Record<string, string | number | boolean>>({
  title,
  columns,
  data,
  filters = [],
  onSubmit,
  onReset,
  onExport,
  exportLoading = false,
  loading = false,
  isSubmitDisabled,
  onView,
  onDownload,
  downloadingRows,
  tooltipMessage,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: ReportTableProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterValues, setFilterValues] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>,
  );

  const { t } = useTranslation();
  const [dateTimeValues, setDateTimeValues] = useState<
    Record<string, Dayjs | null>
  >({});

  // Check if any filter has a value
  const hasActiveFilters = useMemo(() => {
    const hasTextFilters = Object.values(filterValues).some(
      (value) => value !== "" && value !== undefined,
    );

    const hasDateFilters = Object.values(dateTimeValues).some(
      (value) => value !== null && value !== undefined,
    );

    return hasTextFilters || hasDateFilters;
  }, [filterValues, dateTimeValues]);
  const isDateRangeValid = useMemo(() => {
    const start = dateTimeValues["startDate"];
    const end = dateTimeValues["endDate"];
    const now = dayjs();
    const threeMonthsAgo = now.subtract(3, "month");

    // If only one date is selected → allow
    if (!start || !end) return true;

    // Start must be before or equal to end
    if (start.isAfter(end)) return false;

    // Range must be within last 3 months
    if (start.isBefore(threeMonthsAgo)) return false;
    if (end.isAfter(now)) return false;

    return true;
  }, [dateTimeValues]);

  const handleFilterChange = (id: keyof T, value: string) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateTimeChange = (label: string, value: Dayjs | null) => {
    setDateTimeValues((prev) => ({ ...prev, [label]: value }));
  };

  const getDateConstraints = (fieldId: string) => {
    const now = dayjs();
    const threeMonthsAgo = now.subtract(3, "month");

    if (fieldId === "startDate") {
      const endDate = dateTimeValues["endDate"];
      return {
        minDate: threeMonthsAgo,
        maxDate: endDate ?? now,
      };
    }

    if (fieldId === "endDate") {
      const startDate = dateTimeValues["startDate"];
      return {
        minDate: startDate ?? threeMonthsAgo,
        maxDate: now,
      };
    }

    return { minDate: threeMonthsAgo, maxDate: now };
  };

  const handleSubmit = async () => {
    const combinedFilters = {
      ...filterValues,
      ...Object.fromEntries(
        Object.entries(dateTimeValues)
          .filter(([value]) => value !== null)
          .map(([key, value]) => [key, value!.toISOString()]),
      ),
    };

    onSubmit?.(combinedFilters);
  };
  const handleReset = () => {
    setFilterValues({} as Record<keyof T, string>);
    setDateTimeValues({});

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
    value: string | number | boolean,
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
          .map(([key, value]) => [key, value!.toISOString()]),
      ),
    };

    onExport?.(format, combinedFilters);
    handleClose();
  };

  const renderFilter = (filter: ReportFilter<T>) => {
    // Handle datetime type filters

    if (filter.type === "date") {
      const fieldId = filter.id as string; // "startDate" | "endDate"
      const constraints = getDateConstraints(fieldId);

      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={filter.label}
            value={dateTimeValues[fieldId] ?? null}
            onChange={(newValue) =>
              handleDateTimeChange(fieldId, newValue ? dayjs(newValue) : null)
            }
            minDateTime={constraints.minDate}
            maxDateTime={constraints.maxDate}
            format="DD-MM-YYYY HH:mm"
            slotProps={{
              textField: {
                fullWidth: true,
                error: !isDateRangeValid,
                helperText: !isDateRangeValid
                  ? "Invalid date range (max 1 months, start ≤ end. or end can't be greater than end date)"
                  : "",
                sx: {
                  minWidth: 150,
                  "& .MuiPickersOutlinedInput-root": {
                    height: "48px",
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
          {filter.options?.map((opt, index) => {
            const value = opt ?? "";
            return (
              <MenuItem key={index + 1} value={value.toString()}>
                {value.toString()}
              </MenuItem>
            );
          })}
        </TextField>
      );

    return null;
  };

  let tableRows: React.ReactElement[] = [];
  if (loading) {
    tableRows = [...Array(5)].map((_, rowIndex) => (
      <TableRow key={rowIndex + 1}>
        {columns.map((_, colIndex) => (
          <TableCell key={colIndex + 1}>
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
      <TableRow key={index + 1}>
        {columns.map((column, index) => (
          <TableCell key={index + 1} align={column.align ?? "left"}>
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
          {/* <IconButton
            size="medium"
            color="primary"
            onClick={() => onDownload?.(row)}
          >
            <Download fontSize="small" />

          </IconButton> */}
          <IconButton
  size="medium"
  color="primary"
  onClick={() => onDownload?.(row, index)}
  disabled={downloadingRows?.has(index)}
>
  {downloadingRows?.has(index) ? (
    <CircularProgress size={20} />
  ) : (
    <Download fontSize="small" />
  )}
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
              <Box key={index + 1} sx={{ flex: "1 1 150px" }}>
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
                disabled={
                  !hasActiveFilters || !isDateRangeValid || isSubmitDisabled
                }
              >
                Submit
              </Button>
              {/* <Button
                size="small"
                variant="outlined"
                onClick={handleDownloadClick}
              >
                Download
              </Button> */}


              <Button
                size="small"
                variant="outlined"
                onClick={handleDownloadClick}
                disabled={exportLoading}

              >
                {exportLoading ? <CircularProgress size={16} /> : "Download"}
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
                    key={indx + 1}
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
                  {t("Actions")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableRows}</TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(_, newPage) => onPageChange?.(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange?.(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[10, 15, 20]}
        />
      </Card>
    </Box>
  );
}

export default React.memo(ReportTable);
