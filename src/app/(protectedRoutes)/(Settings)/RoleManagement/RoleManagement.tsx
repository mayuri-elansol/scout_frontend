"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Divider,
  Paper,
  Chip,
} from "@mui/material";
import { Badge, Security } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Appbar from "@/app/components/organisms/AppBar/AppBar";

// Mock data for demonstration
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

const RoleManagement: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const useCases = mockUseCases;

  const handlePermissionChange = (useCase: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(useCase)
        ? prev.permissions.filter((p) => p !== useCase)
        : [...prev.permissions, useCase],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);
    alert("Permissions Saved ✅");
  };

  const handleSelectAll = () => {
    setForm((prev) => ({
      ...prev,
      permissions:
        prev.permissions.length === useCases.length ? [] : [...useCases],
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 2,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          {/* <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            // color: "white",
                            mb: 1,
                            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                    >
                        Create Role
                    </Typography> */}
          <Appbar title="Create Role" />
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Role Details Card */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 3,
              borderRadius: 3,
              background: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
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
                  // boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                }}
              >
                <Badge sx={{ fontSize: 20 }} />
              </Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "#2d3748" }}
              >
                Role Details
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Role Name"
                  fullWidth
                  variant="outlined"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Role Description"
                  fullWidth
                  variant="outlined"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Permissions Card */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "white",
            }}
          >
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
                    // boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                  }}
                >
                  <Security sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "#2d3748" }}
                  >
                    Permissions
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#718096", mt: 0.5 }}
                  >
                    Select the permissions for this role
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={`${form.permissions.length} / ${useCases.length} Selected`}
                color="primary"
                sx={{
                  background: "#3072b0",
                  fontWeight: 600,
                }}
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleSelectAll}
                sx={{
                  textTransform: "none",
                  borderColor: "#667eea",
                  color: "#667eea",
                  "&:hover": {
                    borderColor: "#764ba2",
                    background: "rgba(102, 126, 234, 0.05)",
                  },
                }}
              >
                {form.permissions.length === useCases.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </Box>

            <FormGroup>
              <Grid container spacing={2}>
                {useCases.map((useCase, index) => {
                  const isChecked = form.permissions.includes(useCase);
                  return (
                    <Grid
                      size={{ xs: 12, sm: 6, md: 4 }}
                      key={uuidv4() + index}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          border: "2px solid",
                          borderColor: isChecked ? "#667eea" : "#e2e8f0",
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          // background: isChecked
                          //     ? "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)"
                          //     : "white",
                          cursor: "pointer",
                          "&:hover": {
                            borderColor: "#3072b0",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
                          },
                        }}
                        onClick={() => handlePermissionChange(useCase)}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={() => handlePermissionChange(useCase)}
                              sx={{
                                color: "#cbd5e0",
                                "&.Mui-checked": {
                                  color: "#3072b0",
                                },
                              }}
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: isChecked ? 600 : 500,
                                  color: isChecked ? "#2d3748" : "#4a5568",
                                }}
                              >
                                {useCase}
                              </Typography>
                              {isChecked && (
                                <TaskAltIcon
                                  sx={{
                                    fontSize: 22,
                                    color: "#3072b0",
                                  }}
                                />
                              )}
                            </Box>
                          }
                          sx={{
                            m: 0,
                            width: "100%",
                            "& .MuiFormControlLabel-label": {
                              width: "100%",
                            },
                          }}
                        />
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </FormGroup>
          </Paper>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                px: 8,
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: 600,
                background: "#3072b0",
                borderRadius: 2,
                // boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  background: "#3072b0",
                  boxShadow: "0 12px 28px rgba(102, 126, 234, 0.5)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Save Permission
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RoleManagement;
