import React from 'react';
import { Box, Chip } from '@mui/material';

export interface RoiOverlayProps {
  /** Whether the ROI overlay is visible */
  visible: boolean;
  /** Detection status label */
  detectionLabel?: string;
  /** Worker identifier */
  workerLabel?: string;
  /** Position and size of the ROI bounding box */
  boundingBox?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  /** Color of the bounding box */
  boxColor?: string;
  /** Custom styling */
  sx?: object;
}

const RoiOverlay: React.FC<RoiOverlayProps> = ({
  visible,
  detectionLabel = 'ROI DETECTION',
  workerLabel,
  boundingBox = {
    top: 60,
    left: 40,
    width: 120,
    height: 160,
  },
  boxColor = '#1976d2',
  sx = {},
}) => {
  if (!visible) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        ...sx,
      }}
    >
      {/* Detection Label Chip */}
      <Chip
        label={detectionLabel}
        size="small"
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          backgroundColor: boxColor,
          color: 'white',
          fontSize: '11px',
          fontWeight: 600,
          zIndex: 2,
        }}
      />

      {/* Worker Label Chip */}
      {workerLabel && (
        <Chip
          label={workerLabel}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: boxColor,
            color: 'white',
            fontSize: '11px',
            fontWeight: 600,
            zIndex: 2,
          }}
        />
      )}

      {/* ROI Bounding Box */}
      <Box
        sx={{
          position: 'absolute',
          top: boundingBox.top,
          left: boundingBox.left,
          width: boundingBox.width,
          height: boundingBox.height,
          border: `2px solid ${boxColor}`,
          borderRadius: 1,
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default RoiOverlay;