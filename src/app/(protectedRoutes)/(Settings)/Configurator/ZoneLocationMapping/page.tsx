"use client";

import React from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { LocationOn as LocationIcon } from "@mui/icons-material";

export default function ZoneLocationMappingPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 180px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "background.default",
            borderRadius: 2,
            border: "2px dashed",
            borderColor: "divider",
            maxWidth: 600,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "success.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <LocationIcon sx={{ fontSize: 40, color: "success.main" }} />
          </Box>
          
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Zone-Location Mapping
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            This module will enable you to map physical zones to geographic locations,
            define boundaries, and organize camera coverage areas across your premises.
          </Typography>
          
          <Typography
            variant="caption"
            sx={{
              mt: 4,
              display: "block",
              color: "text.disabled",
              fontStyle: "italic",
            }}
          >
            Coming Soon
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
