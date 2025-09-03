import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Shield,
  DirectionsCar,
  Visibility,
  People,
  BarChart,
} from '@mui/icons-material';

interface ActivityItem {
  time: string;
  event: string;
  zone: string;
  severity: 'high' | 'medium' | 'low';
  icon: React.ElementType;
}

const ActivityFeed: React.FC = () => {
  const theme = useTheme();

  const recentActivity: ActivityItem[] = [
    {
      time: '11:12 AM',
      event: 'PPE Violation Detected',
      zone: 'Production Floor - Camera 3',
      severity: 'high',
      icon: Shield,
    },
    {
      time: '11:08 AM',
      event: 'Vehicle Speed Limit Exceeded',
      zone: 'Parking Lot - Camera 7',
      severity: 'medium',
      icon: DirectionsCar,
    },
    {
      time: '11:05 AM',
      event: 'Unauthorized Access Attempt',
      zone: 'Gate 2 - Camera 12',
      severity: 'high',
      icon: Visibility,
    },
    {
      time: '11:02 AM',
      event: 'Employee Check-in',
      zone: 'Main Entrance - Camera 1',
      severity: 'low',
      icon: People,
    },
    {
      time: '10:58 AM',
      event: 'Fire Safety Equipment Check',
      zone: 'Assembly Line - Camera 5',
      severity: 'low',
      icon: Shield,
    },
  ];

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'high':
        return { bg: '#ffebee', color: '#f44336' };
      case 'medium':
        return { bg: '#fff8e1', color: '#ff9800' };
      case 'low':
        return { bg: '#e8f5e9', color: '#4caf50' };
      default:
        return { bg: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 2.5,
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1c2025' }}>
            Real-time Activity
          </Typography>
          <BarChart sx={{ fontSize: 20, color: '#5c6b7d' }} />
        </Box>

        <Box>
          {recentActivity.map((activity, index) => {
            const IconComponent = activity.icon;
            const severityStyle = getSeverityStyle(activity.severity);
            
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  py: 2,
                  borderBottom: index < recentActivity.length - 1 ? '1px solid #f0f0f0' : 'none',
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: severityStyle.bg,
                    color: severityStyle.color,
                  }}
                >
                  <IconComponent sx={{ fontSize: 16 }} />
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 0.5,
                  }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
                      {activity.event}
                    </Typography>
                    <Chip
                      label={activity.severity.toUpperCase()}
                      size="small"
                      sx={{
                        backgroundColor: severityStyle.color,
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 600,
                        height: 20,
                        textTransform: 'uppercase',
                      }}
                    />
                  </Box>

                  <Typography sx={{ 
                    fontSize: '14px', 
                    color: '#5c6b7d', 
                    mb: 0.5,
                  }}>
                    {activity.zone}
                  </Typography>

                  <Typography sx={{ 
                    fontSize: '12px', 
                    color: '#9aa0a6',
                  }}>
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;