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
  TableSortLabel,
  TablePagination,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Description,
  Download as DownloadIcon,
  Search as SearchIcon,
  Refresh,
  MoreVert,
} from "@mui/icons-material";
import ScoutSelect from "../../atoms/Select/Select";
import ScoutBadge from "../../atoms/Badge/Badge";

interface DataColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  type?: "text" | "status" | "priority" | "date" | "number" | "action";
}

interface DataRow {
  [key: string]: any;
}

interface FilterOption {
  value: string;
  label: string;
}

interface DataTableProps {
  title: string;
  columns: DataColumn[];
  data: DataRow[];
  downloadFileName?: string;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  filterOptions?: {
    [key: string]: FilterOption[];
  };
  onRowClick?: (row: DataRow) => void;
  onDownload?: () => void;
  onRefresh?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  // downloadFileName = 'scout_data.csv',
  searchable = true,
  filterable = true,
  sortable = true,
  paginated = true,
  pageSize = 10,
  filterOptions = {},
  onRowClick,
  onDownload,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  // Filter and search data
  const filteredData = data.filter((row) => {
    // Apply search filter
    if (searchTerm) {
      const searchMatch = Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (!searchMatch) return false;
    }

    // Apply column filters
    for (const [key, value] of Object.entries(filters)) {
      if (value && value !== "all" && row[key] !== value) {
        return false;
      }
    }

    return true;
  });

  // Sort data
  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
    : filteredData;

  // Paginate data
  const paginatedData = paginated
    ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : sortedData;

  const handleSort = (columnId: string) => {
    if (!sortable) return;

    if (sortBy === columnId) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnId);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({ ...prev, [columnId]: value }));
    setPage(0);
  };

  const renderCellContent = (column: DataColumn, value: any, row: DataRow) => {
    switch (column.type) {
      case "status":
        return (
          <ScoutBadge
            variant="status"
            status={value?.toLowerCase()}
            label={value}
            size="small"
          />
        );
      case "priority":
        return (
          <ScoutBadge
            variant="priority"
            priority={value?.toLowerCase()}
            label={value}
            size="small"
          />
        );
      case "action":
        return (
          <IconButton size="small" onClick={(e) => e.stopPropagation()}>
            <MoreVert fontSize="small" />
          </IconButton>
        );
      case "date":
        return (
          <Typography variant="body2">
            {new Date(value).toLocaleDateString()}
          </Typography>
        );
      case "number":
        return (
          <Typography variant="body2" align={column.align || "right"}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </Typography>
        );
      default:
        if (column.id.includes("id") || column.id.includes("Id")) {
          return (
            <Typography
              variant="body2"
              sx={{
                color: "#1976d2",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {value}
            </Typography>
          );
        }
        return <Typography variant="body2">{value}</Typography>;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 3,
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Description sx={{ color: "#1976d2", fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1c2025" }}>
              {title}
            </Typography>
            <Chip
              label={`${filteredData.length} records`}
              size="small"
              sx={{ ml: 1 }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            {onRefresh && (
              <Tooltip title="Refresh data">
                <IconButton onClick={onRefresh}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            )}
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={onDownload}
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Download
            </Button>
          </Box>
        </Box>

        {/* Filters and Search */}
        {(searchable || filterable) && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              p: 2,
              backgroundColor: "#fafafa",
              borderBottom: "1px solid #e0e0e0",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {searchable && (
              <TextField
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 250 }}
              />
            )}

            {filterable &&
              Object.entries(filterOptions).map(([columnId, options]) => (
                <ScoutSelect
                  key={columnId}
                  id={`filter-${columnId}`}
                  label={`Filter by ${
                    columns.find((c) => c.id === columnId)?.label
                  }`}
                  options={[{ value: "all", label: "All" }, ...options]}
                  value={filters[columnId] || "all"}
                  onChange={(value) =>
                    handleFilterChange(columnId, value as string)
                  }
                  width="180px"
                />
              ))}
          </Box>
        )}

        {/* Table */}
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    sx={{
                      minWidth: column.minWidth,
                      fontWeight: 600,
                      fontSize: "14px",
                      backgroundColor: "#f5f5f5",
                      color: "#333",
                      py: 2,
                    }}
                  >
                    {sortable && column.sortable !== false ? (
                      <TableSortLabel
                        active={sortBy === column.id}
                        direction={sortBy === column.id ? sortDirection : "asc"}
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => onRowClick?.(row)}
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                    "&:hover": {
                      backgroundColor: onRowClick ? "#f9f9f9" : "transparent",
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
                      sx={{
                        py: 1.5,
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {renderCellContent(column, row[column.id], row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {paginated && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default DataTable;
