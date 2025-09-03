'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';

const ObjectDetection: React.FC = () => {

  return (
     <Box sx={{ px: 2, pt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "60vh",
                  backgroundColor: "white",
                  borderRadius: 1.5,
                  border: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" sx={{ color: "#5c6b7d", mb: 1 }}>
                    Object Detection Page 
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#9aa0a6" }}>
                    This page is under development
                  </Typography>
                </Box>
              </Box>
            </Box>
  );
};

export default ObjectDetection;
