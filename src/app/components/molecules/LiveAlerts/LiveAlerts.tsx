import { Card, Box, Typography } from '@mui/material';
import {
 
  LocalShippingOutlined,
  SensorsOutlined,
  DoorFrontOutlined,
  BlockOutlined,
} from '@mui/icons-material';

const alerts = [
  { id: 1, severity: 'critical', icon: <BlockOutlined sx={{ fontSize: 16 }} />, title: 'Employee Presence in Restricted Areas', camera: 'CAM-08', zone: 'Warehouse', time: '17:42' },
  { id: 2, severity: 'critical', icon: <SensorsOutlined sx={{ fontSize: 16 }} />, title: 'Intrusion Detection at Perimeter', camera: 'CAM-12', zone: 'Assembly Line', time: '17:40' },
  { id: 3, severity: 'critical', icon: <DoorFrontOutlined sx={{ fontSize: 16 }} />, title: 'Emergency Exit Blockage Detection', camera: 'CAM-15', zone: 'Gate B', time: '17:39' },
  { id: 4, severity: 'non-critical', icon: <LocalShippingOutlined sx={{ fontSize: 16 }} />, title: 'Forklift / Vehicle in Walkways', camera: 'CAM-04', zone: 'Loading Dock', time: '17:37' },
];

export default function LiveAlerts() {
  return (
    <Card
      sx={{
        height: '100%',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        boxShadow: '0 1px 2px rgba(0,0,0,.08), 0 1px 3px 1px rgba(0,0,0,.06)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '20px 24px 4px 24px',
        }}
      >
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '.04em',
            textTransform: 'uppercase',
            color: '#111827',
          }}
        >
          Live Alerts
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '10.5px',
            fontWeight: 700,
            color: '#16A34A',
          }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#16A34A' }} />
          Live
        </Box>
      </Box>

      {/* Feed */}
      <Box
        sx={{
          p: '6px 20px 18px 20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {alerts.map((alert, idx) => (
          <Box
            key={alert.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '11px',
              py: '10px',
              borderBottom: idx < alerts.length - 1 ? '1px solid #E5E7EB' : 'none',
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                bgcolor: alert.severity === 'critical' ? '#FDECEC' : '#F1F2F4',
                color: alert.severity === 'critical' ? '#DC2626' : '#64748B',
              }}
            >
              {alert.icon}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: '12.5px', fontWeight: 700, color: '#111827' }}>
                {alert.title}
              </Typography>
              <Typography sx={{ fontSize: '11px', color: '#6B7280', mt: '2px' }}>
                {alert.camera} · {alert.zone}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, flexShrink: 0 }}>
              {alert.time}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}
