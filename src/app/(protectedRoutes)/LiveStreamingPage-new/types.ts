/**
 * Type definitions for Live Streaming Page - New Implementation
 */

export interface Camera {
  id: string;
  name: string;
  zone?: string;
  streamUrl?: string;
  status?: "online" | "offline" | "maintenance";
}

export interface UseCase {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  aiModel?: string;
}

export interface LiveStreamingState {
  isLive: boolean;
  selectedCamera: string;
  selectedUseCase: string;
  aiProcessingEnabled: boolean;
}

export interface VideoPlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  volume: number;
  currentTime: number;
  duration: number;
}

export interface LiveMetrics {
  complianceRate?: number;
  activeViolations?: number;
  peopleDetected?: number;
  alertsCount?: number;
  lastUpdated?: Date;
}

export interface DetectionEvent {
  id: string;
  type: string;
  timestamp: Date;
  severity: "info" | "warning" | "critical";
  message: string;
  cameraId: string;
  metadata?: Record<string, unknown>;
}

export interface LiveStreamingPageProps {
  initialCamera?: string;
  initialUseCase?: string;
  initialAiEnabled?: boolean;
  onStreamStart?: (camera: string, useCase: string) => void;
  onStreamStop?: () => void;
}

export interface LiveVideoPlayerProps {
  isLive: boolean;
  selectedCamera: string;
  selectedUseCase: string;
  cameras: Camera[];
  useCases: UseCase[];
  aiProcessingEnabled: boolean;
  streamUrl?: string;
  onPlayPause?: () => void;
  onMuteToggle?: () => void;
  onFullscreenToggle?: () => void;
}
