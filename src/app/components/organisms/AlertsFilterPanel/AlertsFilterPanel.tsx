import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Refresh, Check } from "@mui/icons-material";

interface AlertsFilterPanelProps {
  categoryFilter?: string;
  subCategoryFilter?: string;
  onCategoryChange?: (category: string) => void;
  onSubCategoryChange?: (subCategory: string) => void;
  onApply?: () => void;
  onRefresh?: () => void;
}

const AlertsFilterPanel: React.FC<AlertsFilterPanelProps> = ({
  categoryFilter = "",
  subCategoryFilter = "",
  onCategoryChange,
  onSubCategoryChange,
  onApply,
  onRefresh,
}) => {
  const [localCategory, setLocalCategory] = useState(categoryFilter);
  const [localSubCategory, setLocalSubCategory] = useState(subCategoryFilter);

  // Define categories and their corresponding sub-categories
  const categoryOptions = [
    {
      value: "safety-compliance",
      label: "Safety & Compliance",
      subCategories: [
        "Personal Protective Equipment (PPE) Detection",
        "Fire, Smoke, Oil and Gas Leak Detection",
        "Vehicle Speed Monitoring inside premises",
        "Fall Detection (Laydown/Sleeping Detection in Work Areas)",
        "STP/ETP Overflow Detection",
        "Emergency Exit Blockage Detection",
        "Crowd Gathering in Hazardous Zones",
      ],
    },
    {
      value: "security-monitoring",
      label: "Security Monitoring",
      subCategories: [
        "Intrusion Detection at Premises Perimeter",
        "Camera Tampering or Offline Detection",
        "People Presence during Shutdown Hours",
      ],
    },
    {
      value: "workforce-monitoring",
      label: "Workforce Monitoring",
      subCategories: [
        "Employee Presence Detection in Critical Areas",
        "Employee Idle Time Monitoring (Without face Recognition)",
        "Mobile Phone Usage in Restricted Areas",
        "People Count in Factory Premises based on Entry Exit beacon Counting",
        "Sleeping or Absence of Security Personnel",
      ],
    },
    {
      value: "vehicle-operational-insights",
      label: "Vehicle Operational Insights",
      subCategories: [
        "Vehicle Count & ANPR at Entry/Exit Gates",
        "Tracking Vehicle Unloading/Loading Time",
        "Unauthorized Parking or Equipment Blocking Areas",
      ],
    },
    {
      value: "facial-recognition-analytics",
      label: "Facial Recognition Analytics",
      subCategories: [
        "Unauthorized Access in Restricted Areas",
        "Face Recognition for Entry/Exit Logging, (Attendance system Lite)",
        "Monitoring Canteen Usage & Timings",
        "Employee Idle Time Monitoring",
      ],
    },
  ];

  // Get sub-categories for selected category
  const getSubCategoriesForCategory = (categoryValue: string) => {
    const category = categoryOptions.find((cat) => cat.value === categoryValue);
    return category ? category.subCategories : [];
  };

  const handleCategoryChange = (value: string) => {
    setLocalCategory(value);
    setLocalSubCategory(""); // Reset sub-category when category changes
    onCategoryChange?.(value);
    onSubCategoryChange?.("");
  };

  const handleSubCategoryChange = (value: string) => {
    setLocalSubCategory(value);
    onSubCategoryChange?.(value);
  };

  // Reset sub-category when category changes
  // useEffect(() => {
  //   if (
  //     localCategory &&
  //     !getSubCategoriesForCategory(localCategory).includes(localSubCategory)
  //   ) {
  //     setLocalSubCategory("");
  //   }
  // }, [localCategory]);
  useEffect(() => {
    const subCategories =
      categoryOptions.find((cat) => cat.value === localCategory)
        ?.subCategories ?? [];

    if (localCategory && !subCategories.includes(localSubCategory)) {
      setLocalSubCategory("");
    }
  }, [localCategory, localSubCategory]);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={localCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                label="Category"
                sx={{
                  backgroundColor: "#f8f9fa",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "white",
                  },
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categoryOptions.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Sub-Category</InputLabel>
              <Select
                value={localSubCategory}
                onChange={(e) => handleSubCategoryChange(e.target.value)}
                label="Sub-Category"
                disabled={!localCategory}
                sx={{
                  backgroundColor: localCategory ? "#f8f9fa" : "#f5f5f5",
                  "&:hover": {
                    backgroundColor: localCategory ? "#f0f0f0" : "#f5f5f5",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "white",
                  },
                }}
              >
                <MenuItem value="">All Sub-Categories</MenuItem>
                {localCategory &&
                  getSubCategoriesForCategory(localCategory).map(
                    (subCategory) => (
                      <MenuItem key={subCategory} value={subCategory}>
                        {subCategory}
                      </MenuItem>
                    )
                  )}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                startIcon={<Check />}
                size="small"
                onClick={onApply}
                sx={{
                  backgroundColor: "#1976d2",
                  fontSize: "12px",
                  textTransform: "none",
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Apply
              </Button>
              <IconButton
                size="small"
                onClick={onRefresh}
                sx={{
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#f8f9fa",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <Refresh sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AlertsFilterPanel;
export type { AlertsFilterPanelProps };
