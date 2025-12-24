"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { Badge } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const CreateRole: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Role Data:", form);
    alert("Role created successfully ✅");

    // Redirect later if needed
    router.push("/AddFeatures");
  };

  return (
    <Box>
      <Box
        sx={{
        //   maxWidth: 900,
          mx: "auto",
          mt: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
            }}
          >
            <Stack spacing={3}>
              {/* Section Header */}
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
                  <Badge sx={{ fontSize: 20 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#2d3748" }}
                >
                  Role Details
                </Typography>
              </Box>

              {/* Role Name */}
              <TextField
                label="Role Name"
                placeholder="e.g. Admin, Manager"
                fullWidth
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              {/* Role Description */}
              <TextField
                label="Role Description"
                placeholder="Describe the role's purpose"
                fullWidth
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                {/* Back Button */}
                <Button
                  // startIcon={<ArrowBackIcon />}
                  onClick={() => router.back()}
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    background: "#3072b0",
                    borderRadius: 2,
                    "&:hover": {
                      background: "#265d8f",
                    },
                  }}
                >
                  Back
                </Button>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    background: "#3072b0",
                    borderRadius: 2,
                    "&:hover": {
                      background: "#265d8f",
                    },
                  }}
                >
                  Create
                </Button>
              </Box>
            </Stack>
          </Paper>
        </form>
      </Box>
    </Box>
  );
};

export default CreateRole;
