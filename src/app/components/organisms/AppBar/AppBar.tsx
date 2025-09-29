'use client';

import { AppBar, Toolbar, Typography, useTheme } from '@mui/material';
import React from 'react';

interface AppbarProps {
  title: string;
  height?: number | string;
}

export default function Appbar({ title }: Readonly<AppbarProps>) {
  const theme = useTheme();

  return (
    <AppBar
      position="relative"
      sx={{
        width: '100%',
        borderRadius: '8px',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          theme.palette.mode === 'light' ? '#e9e9e9ff' : theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar disableGutters sx={{ height: '100%' }}>
        <Typography variant="h4" component="span" fontWeight="bold">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
