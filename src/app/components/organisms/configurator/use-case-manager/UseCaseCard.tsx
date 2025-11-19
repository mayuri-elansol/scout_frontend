'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Videocam as VideocamIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Shield as ShieldIcon,
  Visibility as VisibilityIcon,
  People as PeopleIcon,
  LocalFireDepartment as FireIcon,
} from '@mui/icons-material';
import { UseCase } from '@/app/types/useCaseManager';

interface UseCaseCardProps {
  useCase: UseCase;
  cameraCount: number;
  onAssignCameras: (useCaseId: string) => void;
}

const categoryColors: Record<string, string> = {
  'Safety & Compliance': 'error',
  'Surveillance': 'warning',
  'Operational Insights': 'info',
  'Workforce Monitoring': 'success',
};

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'Safety & Compliance':
      return <ShieldIcon />;
    case 'Surveillance':
      return <VisibilityIcon />;
    case 'Operational Insights':
      return <PeopleIcon />;
    default:
      return <SettingsIcon />;
  }
};

const UseCaseCard: React.FC<UseCaseCardProps> = ({
  useCase,
  cameraCount,
  onAssignCameras,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          boxShadow: 4,
          borderColor: 'primary.main',
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Header with Icon and Category */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              bgcolor: `${categoryColors[useCase.category || 'info']}.light`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: `${categoryColors[useCase.category || 'info']}.main`,
            }}
          >
            {getCategoryIcon(useCase.category)}
          </Box>
          
          {useCase.category && (
            <Chip
              label={useCase.category}
              size="small"
              color={categoryColors[useCase.category] as any}
              variant="outlined"
              sx={{ fontWeight: 500, fontSize: '0.7rem' }}
            />
          )}
        </Box>

        {/* Use Case Name */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: { xs: '0.95rem', sm: '1rem' },
            lineHeight: 1.3,
            mb: 1,
            minHeight: '2.6em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {useCase.name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '0.85rem',
            lineHeight: 1.5,
            mb: 2,
            minHeight: '3em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {useCase.description}
        </Typography>

        {/* Camera Count Status */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            p: 1.5,
            borderRadius: 1,
            bgcolor: cameraCount > 0 ? 'success.light' : 'grey.100',
            border: '1px solid',
            borderColor: cameraCount > 0 ? 'success.main' : 'grey.300',
          }}
        >
          {cameraCount > 0 ? (
            <>
              <CheckCircleIcon
                sx={{ fontSize: 20, color: 'success.main' }}
              />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: 'success.dark', display: 'block' }}
                >
                  {cameraCount} {cameraCount === 1 ? 'Camera' : 'Cameras'} Assigned
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'success.dark', fontSize: '0.7rem' }}
                >
                  Active monitoring
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <WarningIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: 'text.secondary', display: 'block' }}
                >
                  No Cameras Assigned
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', fontSize: '0.7rem' }}
                >
                  Assign cameras to activate
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          variant={cameraCount > 0 ? 'outlined' : 'contained'}
          color="primary"
          startIcon={<VideocamIcon />}
          fullWidth
          onClick={() => onAssignCameras(useCase.id)}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            py: 1,
          }}
        >
          {cameraCount > 0 ? 'Manage Cameras' : 'Assign Cameras'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default UseCaseCard;
