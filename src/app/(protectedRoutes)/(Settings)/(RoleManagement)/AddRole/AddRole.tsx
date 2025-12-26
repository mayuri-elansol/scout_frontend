"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useRouter } from "next/navigation";

const AddRole: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
  elevation={0}
  sx={{
    boxShadow: "none !important",
    backgroundColor: "transparent", 
    maxWidth: 520,
    width: "100%",
    p: { xs: 4, md: 6 },
    textAlign: "center",
  }}
>

        <Stack spacing={3} alignItems="center">
          {/* Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WorkOutlineIcon sx={{ fontSize: 40, color: "#3072b0" }} />
          </Box>

          {/* Title */}
          <Typography variant="h5" fontWeight={600}>
            No roles added yet
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body2"
            sx={{ color: "#64748b", maxWidth: 360 }}
          >
            Roles help you manage permissions and access levels.
            Get started by creating your first role.
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            sx={{
              mt: 2,
              px: 4,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#3072b0",
              "&:hover": {
                backgroundColor: "#265d8f",
              },
            }}
            onClick={() => router.push("/CreateRole")}
          >
            Add Role
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddRole;
