import React from "react";
import { Grid } from "@mui/material";
import CameraFeedCard from "../CameraFeedCard/CameraFeedCard";
import { ZoneMetric } from "../../molecules/ZoneMetricsPanel/ZoneMetricsPanel";
import { v4 as uuidv4 } from "uuid";
export interface CameraZone {
  id: string;
  name: string;
  status: "LIVE" | "OFFLINE" | "MAINTENANCE";
  worker?: string;
  metrics: ZoneMetric[];
}

export interface CameraFeedsGridProps {
  /** Array of camera zones to display */
  zones: CameraZone[];
  /** Whether AI processing is enabled globally */
  aiProcessingEnabled?: boolean;
  /** Grid spacing */
  spacing?: number;
  /** Video control handlers */
  onPlayPause?: (zoneId: string) => void;
  onMuteToggle?: (zoneId: string) => void;
  onFullscreen?: (zoneId: string) => void;
  /** Custom styling */
  sx?: object;
}

const CameraFeedsGrid: React.FC<CameraFeedsGridProps> = ({
  zones,
  aiProcessingEnabled = true,
  spacing = 3,
  onPlayPause,
  onMuteToggle,
  onFullscreen,
  sx = {},
}) => {
  return (
    <Grid container spacing={spacing} sx={sx}>
      {zones.map((zone, index) => (
        <Grid size={{ xs: 12, lg: 6, xl: 6 }} key={uuidv4() + index}>
          <CameraFeedCard
            zone={zone}
            metrics={zone.metrics}
            aiProcessingEnabled={aiProcessingEnabled}
            onPlayPause={() => onPlayPause?.(zone.id)}
            onMuteToggle={() => onMuteToggle?.(zone.id)}
            onFullscreen={() => onFullscreen?.(zone.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CameraFeedsGrid;
