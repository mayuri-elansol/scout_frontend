"use client";

import { Container, Typography, Box } from "@mui/material";

export default function UnauthorizedAccess() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        textAlign="center"
      >
        <Typography variant="h3" color="error" gutterBottom>
          403
        </Typography>

        <Typography variant="h5" gutterBottom>
          Unauthorized Access
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          You do not have permission to view this page.
          <br />
          If you require access, please contact{" "}
          <strong>sales@elansoltech.com</strong>.
        </Typography>
      </Box>
    </Container>
  );
}


