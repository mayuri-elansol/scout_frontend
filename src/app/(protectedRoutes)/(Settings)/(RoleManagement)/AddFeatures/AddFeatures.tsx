"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  
  Checkbox,
  Button,
  Grid,
  Divider,
  Paper,
  Chip,
} from "@mui/material";
import { Security } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

// Mock data
const mockUseCases = [
  "User Management",
  "Role Management",
  "Dashboard Access",
  "Analytics View",
  "Report Generation",
  "Data Export",
  "Settings Management",
  "Audit Logs",
  "API Access",
  "Billing Management",
  "Support Tickets",
  "Content Management",
];

const AddFeatures: React.FC = () => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const useCases = mockUseCases;

  const handlePermissionChange = (useCase: string) => {
    setPermissions((prev) =>
      prev.includes(useCase)
        ? prev.filter((p) => p !== useCase)
        : [...prev, useCase]
    );
  };

  const handleSelectAll = () => {
    setPermissions(permissions.length === useCases.length ? [] : [...useCases]);
  };

  const handleSubmit = () => {
    console.log("Selected Permissions:", permissions);
    alert("Permissions Saved ✅");
  };

  return (
    <Box sx={{ py: 2, px: { xs: 2, sm: 3, md: 4 } }}>
      <Paper
        elevation={3}
        sx={{ p: 4, mt: 3, borderRadius: 3, background: "white" }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                background: "#3072b0",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                mr: 2,
              }}
            >
              <Security sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Permissions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select permissions to assign
              </Typography>
            </Box>
          </Box>

          <Chip
            label={`${permissions.length} / ${useCases.length} Selected`}
            sx={{
              background: "#3072b0",
              color: "white",
              fontWeight: 600,
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Select All */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleSelectAll}
            sx={{
              textTransform: "none",
              borderColor: "#3072b0",
              color: "#3072b0",
            }}
          >
            {permissions.length === useCases.length
              ? "Deselect All"
              : "Select All"}
          </Button>
        </Box>

        {/* Permissions Grid */}
        <FormGroup>
          <Grid container spacing={2}>
            {useCases.map((useCase) => {
              const isChecked = permissions.includes(useCase);
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={useCase}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      border: "2px solid",
                      borderColor: isChecked ? "#3072b0" : "#e2e8f0",
                      borderRadius: 2,
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": {
                        borderColor: "#3072b0",
                        boxShadow: "0 4px 12px rgba(48,114,176,0.2)",
                      },
                    }}
                    onClick={() => handlePermissionChange(useCase)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      {/* Left: Checkbox + Text */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Checkbox
                          checked={isChecked}
                          onChange={() => handlePermissionChange(useCase)}
                          sx={{
                            "&.Mui-checked": { color: "#3072b0" },
                          }}
                        />
                        <Typography fontWeight={isChecked ? 600 : 500}>
                          {useCase}
                        </Typography>
                      </Box>

                      {/* Right: Check Icon */}
                      {isChecked && (
                        <TaskAltIcon
                          sx={{
                            color: "#3072b0",
                            fontSize: 22,
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </FormGroup>

        {/* Save Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{
              px: 8,
              py: 1.5,
              background: "#3072b0",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Save Permissions
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddFeatures;
