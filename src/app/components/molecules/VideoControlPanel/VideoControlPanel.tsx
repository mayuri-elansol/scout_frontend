import React from 'react';
import { Box } from '@mui/material';
import VideoControlButton, { VideoControlType } from '../../atoms/VideoControlButton/VideoControlButton';

export interface VideoControlPanelProps {
  /** Whether video is currently playing */
  isPlaying?: boolean;
  /** Whether audio is muted */
  isMuted?: boolean;
  /** Whether video is in fullscreen */
  isFullscreen?: boolean;
  /** Play/pause button click handler */
  onPlayPause?: () => void;
  /** Mute/unmute button click handler */
  onMuteToggle?: () => void;
  /** Fullscreen toggle handler */
  onFullscreenToggle?: () => void;
  /** Control button size */
  size?: 'small' | 'medium' | 'large';
  /** Panel position */
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center';
  /** Custom styling */
  sx?: object;
}

const VideoControlPanel: React.FC<VideoControlPanelProps> = ({
  isPlaying = false,
  isMuted = true,
  isFullscreen = false,
  onPlayPause = () => {},
  onMuteToggle = () => {},
  onFullscreenToggle = () => {},
  size = 'small',
  position = 'bottom-left',
  sx = {},
}) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return { bottom: 12, left: 12 };
      case 'bottom-center':
        return { bottom: 12, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { bottom: 12, right: 12 };
      case 'center':
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      default:
        return { bottom: 12, left: 12 };
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        gap: 1,
        ...getPositionStyles(),
        ...sx,
      }}
    >
      <VideoControlButton
        type={isPlaying ? 'pause' : 'play'}
        onClick={onPlayPause}
        size={size}
        title={isPlaying ? 'Pause video' : 'Play video'}
      />
      
      <VideoControlButton
        type={isMuted ? 'volume-off' : 'volume-on'}
        onClick={onMuteToggle}
        size={size}
        title={isMuted ? 'Unmute audio' : 'Mute audio'}
      />
      
      <VideoControlButton
        type={isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
        onClick={onFullscreenToggle}
        size={size}
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        sx={{ position: 'relative', right: position === 'bottom-right' ? 0 : 'auto' }}
      />
    </Box>
  );
};

export default VideoControlPanel;