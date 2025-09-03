import React from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  Description,
  Download,
} from '@mui/icons-material';

interface ReportColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
}

interface ReportData {
  [key: string]: any;
}

interface ReportTableProps {
  title: string;
  columns: ReportColumn[];
  data: ReportData[];
  downloadFileName: string;
}

const ReportTable: React.FC<ReportTableProps> = ({ 
  title, 
  columns, 
  data, 
  downloadFileName 
}) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'present':
      case 'resolved':
        return { color: '#4caf50', bgColor: '#e8f5e9' };
      case 'missing':
      case 'violation':
      case 'breach':
        return { color: '#f44336', bgColor: '#ffebee' };
      case 'on_break':
      case 'late_arrival':
      case 'warning':
        return { color: '#ff9800', bgColor: '#fff8e1' };
      case 'investigating':
      case 'pending':
        return { color: '#2196f3', bgColor: '#e3f2fd' };
      default:
        return { color: '#666', bgColor: '#f5f5f5' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return { color: '#d32f2f', bgColor: '#ffcdd2' };
      case 'high':
        return { color: '#ff9800', bgColor: '#fff8e1' };
      case 'medium':
        return { color: '#4caf50', bgColor: '#e8f5e9' };
      case 'low':
        return { color: '#666', bgColor: '#f5f5f5' };
      default:
        return { color: '#666', bgColor: '#f5f5f5' };
    }
  };

  const renderCellValue = (column: ReportColumn, value: any, row: ReportData) => {
    // Handle status chips
    if (column.id === 'status') {
      const statusColors = getStatusColor(value);
      return (
        <Chip
          label={value}
          size="small"
          sx={{
            fontSize: '12px',
            fontWeight: 500,
            color: statusColors.color,
            backgroundColor: statusColors.bgColor,
            height: 24,
            textTransform: 'uppercase',
          }}
        />
      );
    }

    // Handle priority chips
    if (column.id === 'priority') {
      const priorityColors = getPriorityColor(value);
      return (
        <Chip
          label={value}
          size="small"
          sx={{
            fontSize: '12px',
            fontWeight: 500,
            color: priorityColors.color,
            backgroundColor: priorityColors.bgColor,
            height: 24,
          }}
        />
      );
    }

    // Handle record/employee IDs (make them clickable-looking)
    if (column.id.includes('id') || column.id.includes('Id')) {
      return (
        <Typography
          sx={{
            color: '#1976d2',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {value}
        </Typography>
      );
    }

    // Default text rendering
    return (
      <Typography sx={{ fontSize: '14px', color: '#333' }}>
        {value}
      </Typography>
    );
  };

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Description sx={{ color: '#1976d2', fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1c2025' }}>
              {title}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Download />}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Download Report
          </Button>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    sx={{
                      minWidth: column.minWidth,
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#333',
                      py: 2,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || 'left'}
                      sx={{ py: 1.5, borderBottom: '1px solid #f0f0f0' }}
                    >
                      {renderCellValue(column, row[column.id], row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ReportTable;
