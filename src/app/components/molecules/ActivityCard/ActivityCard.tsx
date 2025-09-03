import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CameraAlt, Videocam, VideocamOff, PhotoCamera } from '@mui/icons-material';
import ScoutBadge from '../../atoms/Badge/Badge';

interface ActivityCardProps {
  // Common props
  id: string;
  title: string;
  location: string;
  timestamp?: string;
  
  // Card type and variants
  cardType: 'employee' | 'ppe_violation' | 'security_breach' | 'personnel_tracking';
  
  // Employee-specific props
  employeeName?: string;
  employeeId?: string;
  position?: string;
  shift?: string;
  status?: 'active' | 'inactive' | 'break' | 'offline' | 'missing';
  level?: string;
  
  // Alert-specific props
  workerId?: string;
  intruderId?: string;
  violationType?: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  alertStatus?: 'active' | 'acknowledged' | 'resolved' | 'investigating' | 'escalated';
  
  // Enhanced live feed props (merged from PersonnelCard)
  liveFeedStatus?: 'live' | 'offline' | 'loading';
  lastSeen?: string; // ISO timestamp for missing/offline employees
  
  // Common options
  avatar?: string;
  showLiveFeed?: boolean;
  previewText?: string;
  
  // Event handlers
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onViewFeed?: () => void;
  onClick?: () => void;
}

const StyledCard = styled(Card)<{ cardtype?: string; status?: string; alertstatus?: string; priority?: string }>(({ theme, cardtype, status, alertstatus, priority }) => {
  const getCardBackground = () => {
    // For employee cards, use status-based coloring
    if (cardtype === 'employee') {
      switch (status) {
        case 'active':
          return '#f0fdf4'; // Light green (matching screenshots)
        case 'break':
          return '#fffbeb'; // Light yellow/amber (matching screenshots)
        case 'missing':
        case 'offline':
          return '#fef2f2'; // Light pink/red (matching screenshots)
        case 'inactive':
          return '#f8fafc'; // Light gray
        default:
          return '#f0fdf4'; // Default to light green
      }
    }
    
    // For alert cards, use priority/status-based coloring
    if (cardtype === 'ppe_violation') {
      return '#fffbeb'; // Light yellow/amber (matching screenshots)
    }
    
    if (cardtype === 'security_breach') {
      switch (alertstatus) {
        case 'active':
          return priority === 'critical' ? '#fef2f2' : '#fffbeb'; // Red for critical, yellow for others
        case 'resolved':
          return '#f0fdf4'; // Light green (matching screenshots)
        case 'escalated':
          return '#faf5ff'; // Light purple (matching screenshots)
        case 'investigating':
          return '#fffbeb'; // Light yellow/amber (matching screenshots)
        default:
          return '#fef2f2'; // Default to light red
      }
    }
    
    return '#ffffff'; // Default white
  };

  const getBorderColor = () => {
    // For employee cards
    if (cardtype === 'employee') {
      switch (status) {
        case 'active':
          return '#22c55e20'; // Green border
        case 'break':
          return '#f59e0b20'; // Yellow border
        case 'missing':
        case 'offline':
          return '#ef444420'; // Red border
        case 'inactive':
          return '#64748b20'; // Gray border
        default:
          return '#22c55e20';
      }
    }
    
    // For alert cards
    if (cardtype === 'ppe_violation') {
      return '#f59e0b20'; // Yellow border
    }
    
    if (cardtype === 'security_breach') {
      switch (alertstatus) {
        case 'active':
          return priority === 'critical' ? '#ef444420' : '#f59e0b20';
        case 'resolved':
          return '#22c55e20'; // Green border
        case 'escalated':
          return '#a855f720'; // Purple border
        case 'investigating':
          return '#f59e0b20'; // Yellow border
        default:
          return '#ef444420';
      }
    }
    
    return '#e5e7eb';
  };

  return {
    borderRadius: '8px',
    border: `1px solid ${getBorderColor()}`,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    backgroundColor: getCardBackground(),
    minHeight: '200px',
    // Fixed width to exactly match project sizing - no flexibility
    width: '320px',
    maxWidth: '320px',
    minWidth: '320px',
    flexShrink: 0, // Prevent shrinking in flex containers
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transform: 'translateY(-2px)',
    },
  };
});

const LiveFeedPreview = styled(Box)<{ feedstatus?: string; clickable?: boolean }>(({ theme, feedstatus, clickable }) => {
  const getBackgroundColor = () => {
    switch (feedstatus) {
      case 'live':
        return '#e8f4f8';
      case 'offline':
        return '#f5f5f5';
      case 'loading':
        return '#e3f2fd';
      default:
        return '#e8f4f8';
    }
  };

  const getBorderColor = () => {
    switch (feedstatus) {
      case 'live':
        return '#b0c4cc';
      case 'offline':
        return '#d1d5db';
      case 'loading':
        return '#90caf9';
      default:
        return '#b0c4cc';
    }
  };

  return {
    width: '100%',
    height: '80px',
    backgroundColor: getBackgroundColor(),
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '4px',
    border: `1px dashed ${getBorderColor()}`,
    margin: '12px 0',
    cursor: clickable ? 'pointer' : 'default',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    '&:hover': clickable ? {
      backgroundColor: feedstatus === 'live' ? '#d6ecf0' : getBackgroundColor(),
      borderColor: feedstatus === 'live' ? '#90b8c4' : getBorderColor(),
    } : {},
  };
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return '#4caf50';
    case 'break':
    case 'acknowledged':
      return '#ff9800';
    case 'offline':
    case 'missing':
      return '#f44336';
    case 'resolved':
      return '#4caf50';
    case 'investigating':
      return '#9c27b0';
    case 'escalated':
      return '#f44336';
    case 'inactive':
    default:
      return '#2196f3';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return '#f44336';
    case 'high':
      return '#ff9800';
    case 'medium':
      return '#ff9800';
    case 'low':
      return '#4caf50';
    default:
      return '#2196f3';
  }
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  title,
  location,
  timestamp,
  cardType,
  employeeName,
  employeeId,
  position,
  shift,
  status,
  level,
  workerId,
  intruderId,
  violationType,
  priority,
  alertStatus,
  liveFeedStatus = 'live',
  lastSeen,
  avatar,
  showLiveFeed = true,
  previewText,
  onPrimaryAction,
  onSecondaryAction,
  onViewFeed,
  onClick,
}) => {

  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPrimaryAction) onPrimaryAction();
  };

  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSecondaryAction) onSecondaryAction();
  };

  const handleFeedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewFeed) onViewFeed();
  };

  // Format last seen timestamp (merged from PersonnelCard)
  const formatLastSeen = (timestamp?: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  // Determine display values based on card type
  const getDisplayTitle = () => {
    if (cardType === 'employee') {
      return employeeName || title;
    }
    return title;
  };

  const getSubtitle = () => {
    if (cardType === 'employee') {
      return `${location} • ${shift || 'Day Shift'}`;
    }
    return `${location} • ${timestamp || '14:32'}`;
  };

  const getDetailsLine = () => {
    if (cardType === 'employee') {
      return `ID: ${employeeId}${level ? ` • ${level}` : ''}${position ? ` • ${position}` : ''}`;
    }
    return `${workerId ? `Worker ID: ${workerId}` : ''}${intruderId ? `Intruder ID: ${intruderId}` : ''}`;
  };

  const getStatusBadge = () => {
    if (cardType === 'employee') {
      return (
        <Chip
          label={status?.toUpperCase() || 'ACTIVE'}
          size="small"
          sx={{
            backgroundColor: getStatusColor(status || 'active'),
            color: 'white',
            fontWeight: 600,
            fontSize: '11px',
            height: '24px',
          }}
        />
      );
    }
    
    // For alert cards, show both priority and status
    return (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {priority && (
          <Chip
            label={priority.toUpperCase()}
            size="small"
            sx={{
              backgroundColor: getPriorityColor(priority),
              color: 'white',
              fontWeight: 600,
              fontSize: '10px',
              height: '20px',
            }}
          />
        )}
        {alertStatus && (
          <Chip
            label={alertStatus.toUpperCase()}
            size="small"
            sx={{
              backgroundColor: getStatusColor(alertStatus),
              color: 'white',
              fontWeight: 600,
              fontSize: '10px',
              height: '20px',
            }}
          />
        )}
      </Box>
    );
  };

  const getPreviewText = () => {
    if (previewText) return previewText;
    
    // Enhanced text based on live feed status (merged from PersonnelCard)
    if (cardType === 'employee') {
      switch (liveFeedStatus) {
        case 'live':
          return 'Live Feed Preview';
        case 'offline':
          return 'Feed Unavailable';
        case 'loading':
          return 'Loading Feed...';
        default:
          return 'Live Feed Preview';
      }
    }
    
    switch (cardType) {
      case 'ppe_violation':
        return 'Violation Image Preview';
      case 'security_breach':
        return 'Intrusion Evidence';
      case 'personnel_tracking':
        return 'Live Feed Preview';
      default:
        return 'Camera Preview';
    }
  };

  const getFeedIcon = () => {
    if (cardType === 'employee') {
      switch (liveFeedStatus) {
        case 'live':
          return <Videocam sx={{ color: '#6b7280', fontSize: '24px' }} />;
        case 'offline':
          return <VideocamOff sx={{ color: '#9e9e9e', fontSize: '24px' }} />;
        case 'loading':
          return <PhotoCamera sx={{ color: '#2196f3', fontSize: '24px' }} />;
        default:
          return <CameraAlt sx={{ color: '#6b7280', fontSize: '24px' }} />;
      }
    }
    return <CameraAlt sx={{ color: '#6b7280', fontSize: '24px' }} />;
  };

  const getTextColor = () => {
    if (cardType === 'employee') {
      switch (liveFeedStatus) {
        case 'live':
          return '#6b7280';
        case 'offline':
          return '#9e9e9e';
        case 'loading':
          return '#2196f3';
        default:
          return '#6b7280';
      }
    }
    return '#6b7280';
  };

  const getButtonLabels = () => {
    switch (cardType) {
      case 'employee':
        return { primary: 'Track', secondary: 'Profile' };
      case 'ppe_violation':
        return { primary: 'Acknowledge', secondary: 'View Details' };
      case 'security_breach':
        return { primary: 'Alert Security', secondary: 'View Details' };
      case 'personnel_tracking':
        return { primary: 'Track', secondary: 'Profile' };
      default:
        return { primary: 'Track', secondary: 'Profile' };
    }
  };

  const buttonLabels = getButtonLabels();

  return (
    <StyledCard 
      cardtype={cardType} 
      status={status} 
      alertstatus={alertStatus}
      priority={priority}
      onClick={onClick}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        {/* Header with Name/Title and Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '16px',
              color: '#1c2025',
              lineHeight: 1.2,
              flex: 1,
              mr: 1,
            }}
          >
            {getDisplayTitle()}
          </Typography>
          {getStatusBadge()}
        </Box>

        {/* Location and Time/Shift */}
        <Typography
          variant="body2"
          sx={{
            color: '#5c6b7d',
            fontSize: '13px',
            lineHeight: 1.3,
            mb: 0.5,
          }}
        >
          {getSubtitle()}
        </Typography>

        {/* Details Line */}
        <Typography
          variant="body2"
          sx={{
            color: '#5c6b7d',
            fontSize: '13px',
            lineHeight: 1.3,
            mb: (status === 'missing' || status === 'offline') && lastSeen ? 0.5 : 1.5,
          }}
        >
          {getDetailsLine()}
        </Typography>

        {/* Last Seen Info (merged from PersonnelCard) */}
        {(status === 'missing' || status === 'offline') && lastSeen && (
          <Typography
            variant="caption"
            sx={{
              color: status === 'missing' ? '#ef4444' : '#9ca3af',
              fontSize: '11px',
              display: 'block',
              mb: 1.5,
            }}
          >
            Last seen: {formatLastSeen(lastSeen)}
          </Typography>
        )}

        {/* Enhanced Live Feed/Image Preview */}
        {showLiveFeed && (
          <LiveFeedPreview 
            feedstatus={cardType === 'employee' ? liveFeedStatus : 'live'}
            clickable={!!onViewFeed}
            onClick={handleFeedClick}
          >
            {getFeedIcon()}
            <Typography
              variant="caption"
              sx={{
                color: getTextColor(),
                fontSize: '11px',
                textAlign: 'center',
              }}
            >
              {getPreviewText()}
            </Typography>

            {/* Live indicator dot (merged from PersonnelCard) */}
            {cardType === 'employee' && liveFeedStatus === 'live' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#f44336',
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
            )}

            {/* Loading animation (merged from PersonnelCard) */}
            {cardType === 'employee' && liveFeedStatus === 'loading' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.1), transparent)',
                  animation: 'shimmer 1.5s infinite',
                  '@keyframes shimmer': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                  },
                }}
              />
            )}
          </LiveFeedPreview>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            onClick={handlePrimaryClick}
            sx={{
              flex: 1,
              backgroundColor: cardType === 'security_breach' ? '#f44336' : '#2196f3',
              color: 'white',
              fontWeight: 500,
              fontSize: '14px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: cardType === 'security_breach' ? '#d32f2f' : '#1976d2',
              },
            }}
          >
            {buttonLabels.primary}
          </Button>
          <Button
            variant="outlined"
            onClick={handleSecondaryClick}
            sx={{
              flex: 1,
              borderColor: '#d0d7de',
              color: '#5c6b7d',
              fontWeight: 500,
              fontSize: '14px',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#2196f3',
                backgroundColor: 'rgba(33, 150, 243, 0.04)',
              },
            }}
          >
            {buttonLabels.secondary}
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ActivityCard;
export type { ActivityCardProps };
