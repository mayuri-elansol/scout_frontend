"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Alert,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
} from "@mui/icons-material";
import { UseCase } from "@/app/types/useCaseManager";
import { UseCaseListItem } from "../UseCaseListItem/UseCaseListItem";

interface UseCaseListProps {
  useCases: UseCase[];
  onConfigureCameras: (useCase: UseCase) => void;
   isLoading?: boolean;
  
}

export const UseCaseList: React.FC<UseCaseListProps> = ({
  useCases,
  onConfigureCameras,
  isLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  

  // Filter use cases based on search
  const filteredUseCases = useCases.filter((useCase) => {
    const matchesSearch =
      useCase.name?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      useCase.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const totalCameras = useCases.reduce(
    (sum, uc) => sum + (uc.assignedCameraIds?.length ?? 0),
    0
  );
  const configuredUseCases = useCases.filter(
    (uc) => uc.assignedCameraIds && uc.assignedCameraIds.length > 0
  ).length;

  
  return (
    <Box>
      {/* Stats Summary */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        {/* Total Use Cases */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "rgba(25, 118, 210, 0.08)", // Light blue tint
            border: "2px solid",
            borderColor: "primary.main",
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.12)",
              transform: "translateY(-2px)",
              boxShadow: 2,
            },
          }}
        >
          <Typography variant="h3" fontWeight={700} color="primary.main">
            {useCases.length}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Total Use Cases
          </Typography>
        </Box>

        {/* Configured */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "rgba(46, 125, 50, 0.08)", // Light green tint
            border: "2px solid",
            borderColor: "success.main",
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(46, 125, 50, 0.12)",
              transform: "translateY(-2px)",
              boxShadow: 2,
            },
          }}
        >
          <Typography variant="h3" fontWeight={700} color="success.main">
            {configuredUseCases}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Configured
          </Typography>
        </Box>

        {/* Camera Assignments */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "rgba(2, 136, 209, 0.08)", // Light cyan tint
            border: "2px solid",
            borderColor: "info.main",
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(2, 136, 209, 0.12)",
              transform: "translateY(-2px)",
              boxShadow: 2,
            },
          }}
        >
          <Typography variant="h3" fontWeight={700} color="info.main">
            {totalCameras}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Camera Assignments
          </Typography>
        </Box>

        {/* Pending Setup */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "rgba(237, 108, 2, 0.08)", // Light orange tint
            border: "2px solid",
            borderColor: "warning.main",
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(237, 108, 2, 0.12)",
              transform: "translateY(-2px)",
              boxShadow: 2,
            },
          }}
        >
          <Typography variant="h3" fontWeight={700} color="warning.main">
            {useCases.length - configuredUseCases}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Pending Setup
          </Typography>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        {/* disabled={isLoading} */}
        <TextField
        disabled={isLoading}
          fullWidth
          placeholder="Search use cases by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
            },
          }}
        />
      </Box>

      {/* Results Count */}
      {searchQuery && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing <strong>{filteredUseCases.length}</strong> of{" "}
            <strong>{useCases.length}</strong> use cases
          </Typography>
        </Box>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* Results */}
      {filteredUseCases.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {searchQuery
            ? "No use cases match your search criteria."
            : "No use cases available for your license."}
        </Alert>
      ) : (
        <>
          {/* Use Case List */}
          {filteredUseCases.map((useCase) => (
            <UseCaseListItem
              key={useCase.id}
              useCase={useCase}
            assignedCameraCount={useCase.assignedCameraIds?.length ?? 0}
              onConfigureCameras={onConfigureCameras}
            />
          ))}
        </>
      )}
    </Box>
  );
};
  
