"use client";

import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { Shield } from "@mui/icons-material";

interface LoginHeaderProps {
  currentDateTime: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ currentDateTime }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#1c2025",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar sx={{ px: 3, py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {/* SCOUT Logo - Same as login card */}
          <Box
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "#1976d2",
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <Shield sx={{ fontSize: 20 }} />
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#1c2025",
                fontSize: "20px",
                lineHeight: 1,
              }}
            >
              SCOUT
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#5c6b7d",
                fontSize: "14px",
                lineHeight: 1,
                mt: 0.25,
              }}
            >
              CCTV Analytics Portal
            </Typography>
          </Box>
        </Box>

        {/* Right side - Date/Time */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#5c6b7d",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {currentDateTime}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LoginHeader;
