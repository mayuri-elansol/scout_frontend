import React from "react";
import { IconButton } from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit,
  Stop,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";

export type VideoControlType =
  | "play"
  | "pause"
  | "stop"
  | "volume-on"
  | "volume-off"
  | "fullscreen"
  | "fullscreen-exit"
  | "skip-next"
  | "skip-previous";

export interface VideoControlButtonProps {
  /** Type of video control */
  type: VideoControlType;
  /** Click handler */
  onClick: () => void;
  /** Button size */
  size?: "small" | "medium" | "large";
  /** Whether button is disabled */
  disabled?: boolean;
  /** Custom styling */
  sx?: object;
  /** Tooltip text */
  title?: string;
}

const iconMap = {
  play: PlayArrow,
  pause: Pause,
  stop: Stop,
  "volume-on": VolumeUp,
  "volume-off": VolumeOff,
  fullscreen: Fullscreen,
  "fullscreen-exit": FullscreenExit,
  "skip-next": SkipNext,
  "skip-previous": SkipPrevious,
};

const getFontSize = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return 18;
    case "medium":
      return 24;
    case "large":
    default:
      return 32;
  }
};

const VideoControlButton: React.FC<VideoControlButtonProps> = ({
  type,
  onClick,
  size = "small",
  disabled = false,
  sx = {},
  title,
}) => {
  const IconComponent = iconMap[type];

  const defaultSx = {
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    "&:disabled": {
      backgroundColor: "rgba(0,0,0,0.3)",
      color: "rgba(255,255,255,0.5)",
    },
  };

  return (
    <IconButton
      size={size}
      onClick={onClick}
      disabled={disabled}
      title={title}
      sx={{ ...defaultSx, ...sx }}
    >
      <IconComponent sx={{ fontSize: getFontSize(size) }} />
    </IconButton>
  );
};

export default VideoControlButton;
