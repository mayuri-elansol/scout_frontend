import React from 'react';
import { Paper, Typography } from '@mui/material';

export interface LiveMetricCardProps {
  /** Metric value to display */
  value: string;
  /** Label describing the metric */
  label: string;
  /** Color for the value text and border */
  color: string;
  /** Border color (can be different from text color) */
  borderColor?: string;
  /** Custom styling */
  sx?: object;
}

const LiveMetricCard: React.FC<LiveMetricCardProps> = ({
  value,
  label,
  color,
  borderColor,
  sx = {},
}) => {
  return (
    <Paper
      sx={{
        p: 3,
        textAlign: 'center',
        border: `2px solid ${borderColor || color}`,
        borderRadius: 2,
        backgroundColor: 'white',
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: color,
          mb: 1,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontSize: '14px', color: '#666' }}>
        {label}
      </Typography>
    </Paper>
  );
};

export default LiveMetricCard;