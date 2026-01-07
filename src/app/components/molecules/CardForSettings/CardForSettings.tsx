'use client';

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface DynamicCardProps {
  title: string;
  text: string | React.ReactNode;
  icon?: React.ReactNode;
}

const CardForSettings: React.FC<DynamicCardProps> = ({ title, text, icon }) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {icon && <Box sx={{ color: 'primary.main' }}>{icon}</Box>}
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
        </Box>

        {/* Content */}
        {typeof text === 'string' ? (
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        ) : (
          text
        )}
      </CardContent>
    </Card>
  );
};

export default CardForSettings;
