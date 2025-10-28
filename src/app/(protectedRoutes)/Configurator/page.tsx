"use client";

import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function ConfiguratorPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)", // adjusts based on header height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* IFRAME CONTAINER */}
      <iframe
        src="https://your-system-configurator-url.com"
        title="System Configurator"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "8px",
        }}
        loading="lazy"
      />

      {/* Optional loading fallback */}
      <CircularProgress
        sx={{
          position: "absolute",
          color: "#1976d2",
        }}
      />
    </Box>
  );
}
