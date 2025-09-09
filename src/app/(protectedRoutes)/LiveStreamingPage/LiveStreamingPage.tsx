import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { VideoCall } from '@mui/icons-material';
import AiToggleSwitch from '../../components/atoms/AiToggleSwitch/AiToggleSwitch';
import LiveMetricsGrid from '../../components/organisms/LiveMetricsGrid/LiveMetricsGrid';
import CameraFeedsGrid from '../../components/organisms/CameraFeedsGrid/CameraFeedsGrid';
import type { LiveMetric } from '../../components/organisms/LiveMetricsGrid/LiveMetricsGrid';
import type { CameraZone } from '../../components/organisms/CameraFeedsGrid/CameraFeedsGrid';

const LiveStreamingPage: React.FC = () => {
  const [aiProcessingEnabled, setAiProcessingEnabled] = useState(true);

  const topMetrics: LiveMetric[] = [
    {
      value: '87.5%',
      label: 'PPE Compliance Rate',
      color: '#ff9800',
      borderColor: '#ff9800',
    },
    {
      value: '3',
      label: 'Active Violations',
      color: '#f44336',
      borderColor: '#f44336',
    },
    {
      value: '234',
      label: 'People Detected',
      color: '#4caf50',
      borderColor: '#4caf50',
    },
    {
      value: '12',
      label: 'No Helmet Detected',
      color: '#f44336',
      borderColor: '#f44336',
    },
  ];

  const cameraZones: CameraZone[] = [
    {
      id: 'zone-a',
      name: 'Production Zone A',
      status: 'LIVE',
      worker: 'Worker #2',
      metrics: [
        { value: '87.5%', label: 'Compliance Rate', color: '#4caf50' },
        { value: 3, label: 'Active Violations', color: '#f44336' },
        { value: 234, label: 'People Detected', color: '#2196f3' },
        { value: 12, label: 'No Helmet Detected', color: '#f44336' },
      ],
    },
    {
      id: 'zone-b',
      name: 'Warehouse Zone B',
      status: 'LIVE',
      worker: 'Worker #4',
      metrics: [
        { value: '92.3%', label: 'Compliance Rate', color: '#4caf50' },
        { value: 1, label: 'Active Violations', color: '#ff9800' },
        { value: 45, label: 'People Detected', color: '#2196f3' },
        { value: 2, label: 'No Helmet Detected', color: '#f44336' },
      ],
    },
    {
      id: 'zone-c',
      name: 'Assembly Zone C',
      status: 'LIVE',
      worker: undefined,
      metrics: [
        { value: '95.1%', label: 'Compliance Rate', color: '#4caf50' },
        { value: 0, label: 'Active Violations', color: '#4caf50' },
        { value: 67, label: 'People Detected', color: '#2196f3' },
        { value: 1, label: 'No Helmet Detected', color: '#ff9800' },
      ],
    },
    {
      id: 'zone-d',
      name: 'Loading Dock Zone D',
      status: 'LIVE',
      worker: undefined,
      metrics: [
        { value: '—', label: 'Compliance Rate', color: '#999' },
        { value: 0, label: 'Active Violations', color: '#4caf50' },
        { value: 0, label: 'People Detected', color: '#999' },
        { value: 0, label: 'No Helmet Detected', color: '#4caf50' },
      ],
    },
  ];

  const handlePlayPause = (zoneId: string) => {
    console.log(`Play/Pause toggled for ${zoneId}`);
  };

  const handleMuteToggle = (zoneId: string) => {
    console.log(`Mute toggled for ${zoneId}`);
  };

  const handleFullscreen = (zoneId: string) => {
    console.log(`Fullscreen requested for ${zoneId}`);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <VideoCall sx={{ fontSize: 28, color: '#1976d2' }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1c2025' }}>
              Live Streaming
            </Typography>
          </Box>

          {/* AI Processing Toggle */}
          <AiToggleSwitch
            enabled={aiProcessingEnabled}
            onChange={setAiProcessingEnabled}
            label="AI Processing"
            showChip={true}
          />
        </Box>
        <Typography variant="body1" sx={{ fontSize: '16px', color: '#5c6b7d', lineHeight: 1.5 }}>
          Real-time monitoring across various factory zones with AI-powered analytics
        </Typography>
      </Box>

      {/* Top Metrics Grid */}
      <LiveMetricsGrid
        metrics={topMetrics}
        spacing={3}
        sx={{ mb: 4 }}
      />

      {/* Camera Feeds Grid */}
      <CameraFeedsGrid
        zones={cameraZones}
        aiProcessingEnabled={aiProcessingEnabled}
        spacing={3}
        onPlayPause={handlePlayPause}
        onMuteToggle={handleMuteToggle}
        onFullscreen={handleFullscreen}
      />
    </Box>
  );
};

export default LiveStreamingPage;