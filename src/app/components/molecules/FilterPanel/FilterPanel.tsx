'use client';

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Collapse,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import {
  FilterList,
  ExpandMore,
  ExpandLess,
  Clear as ClearIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import ScoutInput from "../../atoms/Input/Input";
import ScoutSelect from "../../atoms/Select/Select";
import ScoutButton from "../../atoms/Button/Button";

interface FilterConfig {
  id: string;
  label: string;
  type: "select" | "search" | "dateRange";
  options?: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
}

interface FilterPanelProps {
  title?: string;
  filters: FilterConfig[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  onFilterChange?: (filterId: string, value: string) => void;
  onClearAll?: () => void;
  onApply?: (filters: Record<string, string>) => void;
  showApplyButton?: boolean;
  showClearButton?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  title = "Filters",
  filters,
  collapsible = true,
  defaultExpanded = true,
  onFilterChange,
  onClearAll,
  onApply,
  showApplyButton = false,
  showClearButton = true,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      filters.forEach((filter) => {
        initial[filter.id] = filter.value || "";
      });
      return initial;
    }
  );

  const handleFilterChange = (filterId: string, value: string) => {
    const newValues = { ...filterValues, [filterId]: value };
    setFilterValues(newValues);

    if (onFilterChange) {
      onFilterChange(filterId, value);
    }

    if (onApply && !showApplyButton) {
      // Auto-apply if no apply button
      onApply(newValues);
    }
  };

  const handleClearAll = () => {
    const clearedValues: Record<string, string> = {};
    filters.forEach((filter) => {
      clearedValues[filter.id] = "";
    });
    setFilterValues(clearedValues);

    if (onClearAll) {
      onClearAll();
    }

    if (onApply) {
      onApply(clearedValues);
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply(filterValues);
    }
  };

  const hasActiveFilters = Object.values(filterValues).some(
    (value) => value && value !== ""
  );

  const renderFilter = (filter: FilterConfig) => {
    const value = filterValues[filter.id] || "";

    switch (filter.type) {
      case "select":
        return (
          <ScoutSelect
            key={filter.id}
            id={filter.id}
            label={filter.label}
            options={filter.options || []}
            value={value}
            onChange={(newValue) =>
              handleFilterChange(filter.id, newValue as string)
            }
            width="100%"
          />
        );

      case "search":
        return (
          <ScoutInput
            key={filter.id}
            variant="search"
            placeholder={
              filter.placeholder || `Search ${filter.label.toLowerCase()}...`
            }
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            width="100%"
          />
        );

      case "dateRange":
        return (
          <ScoutInput
            key={filter.id}
            label={filter.label}
            type="date"
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            width="100%"
          />
        );

      default:
        return (
          <ScoutInput
            key={filter.id}
            label={filter.label}
            placeholder={filter.placeholder}
            value={value}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            width="100%"
          />
        );
    }
  };

  return (
    <Paper
      sx={{
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          backgroundColor: "#f8f9fa",
          borderBottom: expanded ? "1px solid #e0e0e0" : "none",
          cursor: collapsible ? "pointer" : "default",
        }}
        onClick={collapsible ? () => setExpanded(!expanded) : undefined}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterList sx={{ color: "#1976d2", fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "16px" }}>
            {title}
          </Typography>
          {hasActiveFilters && (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#1976d2",
                ml: 0.5,
              }}
            />
          )}
        </Box>

        {collapsible && (
          <IconButton size="small">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </Box>

      {/* Content */}
      <Collapse in={expanded}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {filters.map((filter) => (
              <Grid
              size={{xs:12, sm:filters.length > 2 ? 6:12,md:filters.length>3?4:filters.length>2?6:12 }}
                // item
                // xs={12}
                // sm={filters.length > 2 ? 6 : 12}
                // md={filters.length > 3 ? 4 : filters.length > 2 ? 6 : 12}
                key={filter.id}
              >
                {renderFilter(filter)}
              </Grid>
            ))}
          </Grid>

          {/* Action Buttons */}
          {(showApplyButton || showClearButton) && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                {showClearButton && (
                  <ScoutButton
                    variant="clear"
                    onClick={handleClearAll}
                    disabled={!hasActiveFilters}
                    startIcon={<ClearIcon />}
                  >
                    Clear All
                  </ScoutButton>
                )}
                {showApplyButton && (
                  <ScoutButton
                    variant="primary"
                    onClick={handleApply}
                    startIcon={<SearchIcon />}
                  >
                    Apply Filters
                  </ScoutButton>
                )}
              </Box>
            </>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default FilterPanel;
