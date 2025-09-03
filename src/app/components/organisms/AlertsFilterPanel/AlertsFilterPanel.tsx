import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  InputAdornment,
  Box,
} from '@mui/material';
import { Search, Download, Refresh } from '@mui/icons-material';

interface AlertsFilterPanelProps {
  searchQuery?: string;
  severityFilter?: string;
  categoryFilter?: string;
  onSearchChange?: (query: string) => void;
  onSeverityChange?: (severity: string) => void;
  onCategoryChange?: (category: string) => void;
  onExport?: () => void;
  onRefresh?: () => void;
}

const AlertsFilterPanel: React.FC<AlertsFilterPanelProps> = ({
  searchQuery = '',
  severityFilter = '',
  categoryFilter = '',
  onSearchChange,
  onSeverityChange,
  onCategoryChange,
  onExport,
  onRefresh,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localSeverity, setLocalSeverity] = useState(severityFilter);
  const [localCategory, setLocalCategory] = useState(categoryFilter);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  const handleSeverityChange = (value: string) => {
    setLocalSeverity(value);
    onSeverityChange?.(value);
  };

  const handleCategoryChange = (value: string) => {
    setLocalCategory(value);
    onCategoryChange?.(value);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid  size={{xs:12,md:4}} >
            <TextField
              fullWidth
              placeholder="Search by title, description, or location"
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 20, color: '#666' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8f9fa',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  },
                },
              }}
            />
          </Grid>
          
          <Grid  size={{xs:12,md:3}}>
            <FormControl fullWidth size="small">
              <InputLabel>Severity Level</InputLabel>
              <Select
                value={localSeverity}
                onChange={(e) => handleSeverityChange(e.target.value)}
                label="Severity Level"
                sx={{
                  backgroundColor: '#f8f9fa',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <MenuItem value="">All Severities</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid  size={{xs:12,md:3}}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={localCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                label="Category"
                sx={{
                  backgroundColor: '#f8f9fa',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="safety">Safety</MenuItem>
                <MenuItem value="security">Security</MenuItem>
                <MenuItem value="workforce">Workforce</MenuItem>
                <MenuItem value="operational">Operational</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid  size={{xs:12,md:2}}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<Download />}
                size="small"
                onClick={onExport}
                sx={{
                  backgroundColor: '#1976d2',
                  fontSize: '12px',
                  textTransform: 'none',
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                Export
              </Button>
              <IconButton
                size="small"
                onClick={onRefresh}
                sx={{
                  border: '1px solid #e0e0e0',
                  backgroundColor: '#f8f9fa',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                <Refresh sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AlertsFilterPanel;
export type { AlertsFilterPanelProps };
