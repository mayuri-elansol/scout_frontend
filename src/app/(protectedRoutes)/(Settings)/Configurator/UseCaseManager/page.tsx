"use client";

import React from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { Category as CategoryIcon } from "@mui/icons-material";

export default function UseCaseManagerPage() {
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
              backgroundColor: "primary.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <CategoryIcon sx={{ fontSize: 40, color: "primary.main" }} />
          </Box>
          
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Use-Case Manager
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            This module will allow you to manage AI use cases, configure detection parameters,
            and customize analytics settings for different scenarios.
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
