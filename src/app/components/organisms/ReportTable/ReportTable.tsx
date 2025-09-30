"use client";
import React, { useState } from "react";
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

import dayjs from "dayjs";
import { SxProps, Theme } from "@mui/material/styles";

import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { DateTimePicker } from "@mui/x-date-pickers";
/** Column definition */
export interface ReportColumn<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
}

/** Filter definition */
type FilterType = "text" | "select" | "date";

export interface ReportFilter {
  id: string;
  label: string;
  type: FilterType;
  options?: string[];
}

/** Generic ReportTable props */
export interface ReportTableProps<T extends Record<string, any>> {
  readonly title: string;
  readonly columns: readonly ReportColumn<T>[];
  readonly data: readonly T[];
  readonly downloadFileName: string;
  readonly filters?: readonly ReportFilter[];
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
  readonly sx?: SxProps<Theme>;
  readonly tooltipMessage?: string;
}

/** ReportTable component */
function ReportTable<T extends Record<string, any>>({
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
  sx,
  tooltipMessage,
}: ReportTableProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /** Filter Change */
  const handleFilterChange = (id: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };

  /** Apply Filters */
  const applyFilters = (row: T) =>
    Object.entries(filterValues).every(([key, value]) =>
      !value
        ? true
        : String(row[key as keyof T] ?? "")
            .toLowerCase()
            .includes(value.toLowerCase())
    );

  const filteredData = data.filter(applyFilters);

  /** Render Cell Values */
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

    if (String(column.id).includes("id")) {
      return (
        <Typography
          sx={{
            color: "#1976d2",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {value}
        </Typography>
      );
    }

    return (
      <Typography sx={{ fontSize: "14px", color: "#333" }}>{value}</Typography>
    );
  };

  /** Download Menu */
  const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleExportClick = (format: "csv" | "pdf") => {
    onExport?.(format, filterValues);
    handleClose();
  };

  /** Render Filter Input */
  const renderFilter = (filter: ReportFilter) => {
    const commonProps = {
      label: filter.label,
      size: "small" as const,
      fullWidth: true,
      value: filterValues[filter.id] || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleFilterChange(filter.id, e.target.value),
      sx: { minWidth: 150 },
    };

    if (filter.type === "text") return <TextField {...commonProps} />;
    if (filter.type === "select")
      return (
        <TextField {...commonProps} select>
          <MenuItem value="">All</MenuItem>
          {filter.options?.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>
      );
    if (filter.type === "date") {
      return (
        <DateTimePicker
          label={filter.label}
          value={
            filterValues[filter.id] ? dayjs(filterValues[filter.id]) : null
          }
          onChange={(newValue) => {
            // newValue could be Date | null
            const formatted = newValue
              ? dayjs(newValue).format("YYYY-MM-DD")
              : "";
            handleFilterChange(filter.id, formatted);
          }}
          slotProps={{ textField: { size: "small", fullWidth: true } }}
        />
      );
    }
    return null;
  };

  /** Table Rows */
  let tableRows: React.ReactElement[] = [];
  if (loading) {
    tableRows = [...Array(5)].map((_, rowIndex) => (
      <TableRow key={rowIndex + 1}>
        {columns.map((col) => (
          <TableCell key={String(col.id)}>
            <Skeleton variant="text" width="80%" />
          </TableCell>
        ))}
        <TableCell
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </TableCell>
      </TableRow>
    ));
  } else if (filteredData.length > 0) {
    tableRows = filteredData.map((row, index) => (
      <TableRow
        key={index + 1}
        sx={{ "&:hover": { backgroundColor: "#ffffff" } }}
      >
        {columns.map((column) => (
          <TableCell
            key={String(column.id)}
            align={column.align || "left"}
            sx={{ py: 1.5, borderBottom: "1px solid #f0f0f0" }}
          >
            {renderCellValue(column, row[column.id])}
          </TableCell>
        ))}
        <TableCell align="center" sx={{ py: 1.5 }}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => onView?.(row)}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
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
        <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 4 }}>
          <Typography>No matching records found</Typography>
        </TableCell>
      </TableRow>,
    ];
  }

  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <Card sx={{ borderRadius: 2, overflow: "hidden", ...sx }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Description sx={{ color: "#1976d2", fontSize: 24 }} />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1c2025", fontSize: 18 }}
              >
                {title}
              </Typography>

              {tooltipMessage && (
                <Tooltip title={tooltipMessage} arrow>
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
          </Box>

          {/* Filters + Buttons */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              alignItems: "center",
            }}
          >
            {filters.map((filter) => (
              <Box key={filter.id} sx={{ flex: "1 1 150px" }}>
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
                onClick={() => onSubmit?.(filterValues)}
                disabled={isSubmitDisabled}
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
                onClick={() => {
                  setFilterValues({});
                  onReset?.();
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#ffffff" }}>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.id)}
                    align={column.align || "left"}
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
          count={tableRows.length}
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
