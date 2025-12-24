import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { VideoCall, PlayArrow } from '@mui/icons-material';
import AiToggleSwitch from '../../components/atoms/AiToggleSwitch/AiToggleSwitch';
import LiveVideoPlayer from './LiveVideoPlayer';

// Mock data for cameras
const cameras = [
  { id: 'cam-1', name: 'Production Zone A - Camera 1' },
  { id: 'cam-2', name: 'Warehouse Zone B - Camera 2' },
  { id: 'cam-3', name: 'Assembly Zone C - Camera 3' },
  { id: 'cam-4', name: 'Loading Dock Zone D - Camera 4' },
];

// Mock data for use cases
const useCases = [
  { id: 'ppe-detection', name: 'PPE Detection (Helmet, Vest, Gloves, Mask)' },
  { id: 'fire-smoke-detection', name: 'Fire, Smoke, Oil & Gas Leak Detection' },
  { id: 'fall-detection', name: 'Fall / Laydown Detection' },
  { id: 'forklift-detection', name: 'Forklift / Vehicle in Walkways Detection' },
  { id: 'exit-blockage', name: 'Emergency Exit Blockage Detection' },
  { id: 'crowd-detection', name: 'Crowd Detection in Hazardous Zones' },
  { id: 'intrusion-detection', name: 'Intrusion Detection at Perimeter' },
  { id: 'unauthorized-access', name: 'Unauthorized Access in Restricted Areas' },
  { id: 'camera-tampering', name: 'Camera Tampering Detection' },
  { id: 'shutdown-movement', name: 'Movement During Shutdown Hours' },
  { id: 'employee-presence', name: 'Employee Presence Monitoring' },
  { id: 'employee-idle', name: 'Employee Idle Time Monitoring' },
  { id: 'mobile-usage', name: 'Mobile Phone Usage in Restricted Zones' },
  { id: 'security-sleeping', name: 'Sleeping / Absence of Security Guards' },
  { id: 'people-counting', name: 'People Counting' },
  { id: 'vehicle-anpr', name: 'Vehicle Count & ANPR at Gates' },
  { id: 'canteen-monitoring', name: 'Canteen Usage Monitoring' },
  { id: 'vehicle-loading', name: 'Vehicle Loading / Unloading Monitoring' },
];

const LiveStreamingPage: React.FC = () => {
  const [aiProcessingEnabled, setAiProcessingEnabled] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [selectedUseCase, setSelectedUseCase] = useState<string>('');
  const [isLive, setIsLive] = useState(false);

  const handleCameraChange = (event: SelectChangeEvent) => {
    setSelectedCamera(event.target.value);
    // Don't reset live state - allow camera switching during live stream
  };

  const handleUseCaseChange = (event: SelectChangeEvent) => {
    setSelectedUseCase(event.target.value);
    // Don't reset live state - allow use case switching during live stream
  };

  const handleGoLive = () => {
    if (selectedCamera && selectedUseCase) {
      setIsLive(true);
    }
  };

  const canGoLive = selectedCamera && selectedUseCase;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Page Header */}
      <Box sx={{ mb: 2, flexShrink: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* <VideoCall sx={{ fontSize: 28, color: '#1976d2' }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1c2025' }}>
              Live Streaming
            </Typography> */}
            <VideoCall sx={{ fontSize: 28, color: '#1976d2' }} />
            <Typography variant="body1" sx={{ fontSize: '19px', color: '#5c6b7d', lineHeight: 1.5 }}>
              Real-time monitoring with AI-powered analytics
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
       
      </Box>

      {/* Main Content Container */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          p: 3,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* Control Panel */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 2,
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            flexShrink: 0,
          }}
        >
          {/* Select Camera */}
          <FormControl sx={{ minWidth: 250, flex: { xs: '1 1 100%', sm: '1 1 auto' } }}>
            <InputLabel id="camera-select-label">Select Camera</InputLabel>
            <Select
              labelId="camera-select-label"
              id="camera-select"
              value={selectedCamera}
              label="Select Camera"
              onChange={handleCameraChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cameras.map((camera) => (
                <MenuItem key={camera.id} value={camera.id}>
                  {camera.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Select Use Case */}
          <FormControl sx={{ minWidth: 250, flex: { xs: '1 1 100%', sm: '1 1 auto' } }}>
            <InputLabel id="usecase-select-label">Select Use Case</InputLabel>
            <Select
              labelId="usecase-select-label"
              id="usecase-select"
              value={selectedUseCase}
              label="Select Use Case"
              onChange={handleUseCaseChange}
              disabled={!selectedCamera} // Disable until camera is selected
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {useCases.map((useCase) => (
                <MenuItem key={useCase.id} value={useCase.id}>
                  {useCase.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Live Button */}
          <Button
            variant="contained"
            color={isLive ? 'error' : 'primary'}
            startIcon={<PlayArrow />}
            onClick={handleGoLive}
            disabled={!canGoLive || isLive}
            sx={{
              height: 48,
              minWidth: 120,
              flex: { xs: '1 1 100%', sm: '0 0 auto' },
              fontWeight: 600,
              ...(isLive && {
                backgroundColor: '#f44336',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#f44336',
                  color: '#ffffff',
                  opacity: 0.9,
                },
              }),
            }}
          >
            {isLive ? 'LIVE' : 'Go Live'}
          </Button>
        </Box>

        {/* Video Player Area - Takes remaining space */}
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <LiveVideoPlayer
          isLive={isLive}
          selectedCamera={selectedCamera}
          selectedUseCase={selectedUseCase}
          cameras={cameras}
          useCases={useCases}
          aiProcessingEnabled={aiProcessingEnabled}
        />
        </Box>
      </Box>
    </Box>
  );
};

export default LiveStreamingPage;
