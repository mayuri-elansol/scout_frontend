'use client';

import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Divider,
} from '@mui/material';

export interface UseCaseConfigurationData {
  fpsRate: number;
  fpsUnit: 'second' | 'minute' | 'hour';
  inferenceMode: '24_hours' | 'custom';
  startTime: string;
  endTime: string;
}

interface UseCaseConfigurationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: UseCaseConfigurationData) => void;

  useCaseName: string;

  initialData?: UseCaseConfigurationData;
}

const defaultConfig: UseCaseConfigurationData = {
  fpsRate: 5,
  fpsUnit: 'second',
  inferenceMode: '24_hours',
  startTime: '09:00',
  endTime: '18:00',
};

const UseCaseConfigurationDialog: React.FC<
  UseCaseConfigurationDialogProps
> = ({
  open,
  onClose,
  onSave,
  useCaseName,
  initialData,
}) => {

  const [config, setConfig] =
    React.useState<UseCaseConfigurationData>(
      initialData ?? defaultConfig
    );

  React.useEffect(() => {
    setConfig(initialData ?? defaultConfig);
  }, [initialData]);

  const handleSave = () => {
    onSave(config);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Configure Use Case
      </DialogTitle>

      <DialogContent>

        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ mt: 1 }}
        >
          {useCaseName}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Configure inference frequency and execution timing.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* FPS SECTION */}

        <Typography
          variant="subtitle2"
          fontWeight={600}
          sx={{ mb: 1 }}
        >
          Frame Processing Rate
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            label="Frame Rate"
            type="number"
            fullWidth
            value={config.fpsRate ?? ''}
            onChange={(e) =>
              setConfig(prev => ({
                ...prev,
                fpsRate: Number(e.target.value),
              }))
            }
          />

          <TextField
            select
            label="Measurement"
            fullWidth
            value={config.fpsUnit ?? ''}
            onChange={(e) =>
              setConfig(prev => ({
                ...prev,
                fpsUnit: e.target.value as
                  | 'second'
                  | 'minute'
                  | 'hour',
              }))
            }
          >
            <MenuItem value="second">
              Frames / Second
            </MenuItem>

            <MenuItem value="minute">
              Frames / Minute
            </MenuItem>

            <MenuItem value="hour">
              Frames / Hour
            </MenuItem>
          </TextField>
        </Box>

        {/* INFERENCE SECTION */}

        <Typography
          variant="subtitle2"
          fontWeight={600}
          sx={{ mb: 1 }}
        >
          Inference Schedule
        </Typography>

        <TextField
          select
          fullWidth
          label="Inference Mode"
          value={config.inferenceMode ?? ''}
          onChange={(e) =>
            setConfig(prev => ({
              ...prev,
              inferenceMode: e.target.value as
                | '24_hours'
                | 'custom',
            }))
          }
          sx={{ mb: 2 }}
        >
          <MenuItem value="24_hours">
            24 Hours
          </MenuItem>

          <MenuItem value="custom">
            Custom Time Range
          </MenuItem>
        </TextField>

        {config.inferenceMode === 'custom' && (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              value={config.startTime ?? ''}
              onChange={(e) =>
                setConfig(prev => ({
                  ...prev,
                  startTime: e.target.value,
                }))
              }
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="End Time"
              type="time"
              fullWidth
              value={config.endTime ?? ''}
              onChange={(e) =>
                setConfig(prev => ({
                  ...prev,
                  endTime: e.target.value,
                }))
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save Configuration
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UseCaseConfigurationDialog;