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
  Chip,
  TextField,
  MenuItem,
  Menu,
  Skeleton,
  IconButton,
  Card,
  TablePagination,
  Tooltip,
  Divider,
} from "@mui/material";
import { Description, Visibility, Download } from "@mui/icons-material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
interface ReportColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
}

interface ReportData {
  [key: string]: string | number | boolean;
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
  loading?: boolean;
  isSubmitDisabled?: boolean;
  onView?: (row: ReportData) => void;
  onDownload?: (row: ReportData) => void;
  tooltipMessage: string;
}

const ReportTable: React.FC<ReportTableProps> = ({
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
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;

  /** Filter Change Handler */
  const handleFilterChange = (id: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };

  /** Filter Logic */
  const applyFilters = (row: ReportData) =>
    Object.entries(filterValues).every(([key, value]) =>
      !value
        ? true
        : row[key]?.toString().toLowerCase().includes(value.toLowerCase())
    );

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
  const renderCellValue = (
    column: ReportColumn,
    value: string | number | boolean
  ) => {
    if (typeof value === "boolean") {
      return (
        <Typography sx={{ fontSize: "14px", color: "#333" }}>
          {value ? "True" : "False"}
        </Typography>
      );
    }
    if (column.id === "status") {
      const colors = getStatusColor(String(value));
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
  const handleClose = () => setAnchorEl(null);
  const handleExportClick = (format: "csv" | "pdf") => {
    onExport?.(format, filterValues);
    handleClose();
  };

  /** Render Filter Input */
  const renderFilter = (filter: ReportFilter) => {
    const commonProps = {
      label: filter.label,
      //   size: "small" as const,
      fullWidth: true,
      value: filterValues[filter.id] || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleFilterChange(filter.id, e.target.value),
      sx: {
        minWidth: 150,
      },
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
    if (filter.type === "date")
      return (
        <TextField
          {...commonProps}
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      );

    return null;
  };

  /** Table Rows */
  let tableRows: React.ReactElement[] = [];
  if (loading) {
    tableRows = [...Array(5)].map((_, rowIndex) => (
      <TableRow key={rowIndex + 1}>
        {columns.map((col) => (
          <TableCell key={col.id}>
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
            key={column.id}
            align={column.align || "left"}
            sx={{ py: 1.5, borderBottom: "1px solid #f0f0f0" }}
          >
            {renderCellValue(column, row[column.id])}
          </TableCell>
        ))}
        <TableCell align="center" sx={{ py: 1.5 }}>
          <IconButton
            size="medium"
            color="primary"
            onClick={() => onView?.(row)}
            sx={{
              // background: "transparent",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>

          <IconButton
            size="medium"
            color="primary"
            onClick={() => onDownload?.(row)}
            sx={{
              // background: "transparent",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
              },
            }}
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
    <Box sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
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
            {/* <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c2025" }}>
              {title}
            </Typography> */}
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
                slotProps={{
                  paper: {
                    sx: {
                      backgroundColor: "#fff",
                      borderRadius: 1,
                      boxShadow: 3,
                      minWidth: 150,
                    },
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
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#ffffff" }}>
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
          rowsPerPageOptions={[]}
        />
      </Card>
    </Box>
  );
};

export default ReportTable;
