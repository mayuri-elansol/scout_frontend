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
  Paper,
  Chip,
  TextField,
  MenuItem,
  Menu,
  Grid,
} from "@mui/material";
import { Description } from "@mui/icons-material";

interface ReportColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
}

interface ReportData {
  [key: string]: any;
}

type FilterType = "text" | "select" | "date";

interface ReportFilter {
  id: string;
  label: string;
  type: FilterType;
  options?: string[];
}

interface ReportTableProps {
  title: string;
  columns: ReportColumn[];
  data: ReportData[];
  downloadFileName: string;
  filters?: ReportFilter[];
  onSubmit?: (filters: Record<string, string>) => void;
  onReset?: () => void;
  onExport?: (format: "csv" | "pdf", filters: Record<string, string>) => void;
}

const ReportTable: React.FC<ReportTableProps> = ({
  title,
  columns,
  data,
  downloadFileName,
  filters = [],
  onSubmit,
  onReset,
  onExport,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  /** Filter Change Handler */
  const handleFilterChange = (id: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };

  /** Filter Logic */
  const applyFilters = (row: ReportData) => {
    return Object.entries(filterValues).every(([key, value]) => {
      if (!value) return true;
      return row[key]?.toString().toLowerCase().includes(value.toLowerCase());
    });
  };

  const filteredData = data.filter(applyFilters);

  /** Status Chip Colors */
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

  /** Render Cell Values */
  const renderCellValue = (column: ReportColumn, value: any) => {
    if (column.id === "status") {
      const colors = getStatusColor(value);
      return (
        <Chip
          label={value}
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

    if (column.id.includes("id")) {
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

  /** Download Menu Handlers */
  const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      sx: { minWidth: 150 }, // 👈 min width for all inputs
    };

    if (filter.type === "text") {
      return <TextField {...commonProps} />;
    }

    if (filter.type === "select") {
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
    }

    if (filter.type === "date") {
      return (
        <TextField
          {...commonProps}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      );
    }

    return null;
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {/* Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Description sx={{ color: "#1976d2", fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c2025" }}>
              {title}
            </Typography>
          </Box>

          {/* Filters + Buttons in one row */}
          {/* Filters + Buttons in one row */}
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

            {/* Buttons */}
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
                variant="contained"
                onClick={() => onSubmit?.(filterValues)}
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
                PaperProps={{
                  sx: {
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    boxShadow: 3,
                    minWidth: 150,
                  },
                }}
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
                color="secondary"
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
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
                      sx={{ py: 1.5, borderBottom: "1px solid #f0f0f0" }}
                    >
                      {renderCellValue(column, row[column.id])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ py: 4 }}
                  >
                    <Typography>No matching records found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ReportTable;
