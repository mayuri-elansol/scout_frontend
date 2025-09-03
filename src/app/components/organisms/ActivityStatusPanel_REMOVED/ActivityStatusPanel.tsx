import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { People, Visibility } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ActivityCard from '../../molecules/ActivityCard/ActivityCard';
import ZoneStatusCard from '../../molecules/ZoneStatusCard/ZoneStatusCard';
import ScoutButton from '../../atoms/Button/Button';

interface PersonnelData {
  employeeId: string;
  employeeName: string;
  zone: string;
  shift: string;
  role: string;
  status: 'active' | 'break' | 'missing' | 'offline';
  liveFeedStatus?: 'live' | 'offline' | 'loading';
  lastSeen?: string;
}

interface ZoneData {
  zoneName: string;
  currentPersonnel: number;
  requiredPersonnel: number;
  shift: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  certificationRequired: string;
  status?: 'optimal' | 'understaffed' | 'overstaffed' | 'critical';
}

interface ActivityStatusPanelProps {
  personnelData: PersonnelData[];
  zoneData: ZoneData[];
  showViewAllButton?: boolean;
  personnelGridColumns?: number;
  onViewAllPersonnel?: () => void;
  onPersonnelTrack?: (employeeId: string) => void;
  onPersonnelProfile?: (employeeId: string) => void;
  onZoneClick?: (zoneName: string) => void;
}

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '24px',
  width: '100%',
  minHeight: '600px',
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    gap: '16px',
  },
}));

const PersonnelSection = styled(Box)(({ theme }) => ({
  flex: '1 1 70%',
  minWidth: 0,
  [theme.breakpoints.down('lg')]: {
    flex: 'none',
  },
}));

const ZoneSection = styled(Box)(({ theme }) => ({
  flex: '0 0 320px',
  [theme.breakpoints.down('lg')]: {
    flex: 'none',
  },
}));

const SectionHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',
  padding: '0 4px',
}));

const ZoneContainer = styled(Box)(() => ({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
  padding: '16px',
  height: 'fit-content',
}));

const ActivityStatusPanel: React.FC<ActivityStatusPanelProps> = ({
  personnelData,
  zoneData,
  showViewAllButton = true,
  personnelGridColumns = 2,
  onViewAllPersonnel,
  onPersonnelTrack,
  onPersonnelProfile,
  onZoneClick,
}) => {
  const getGridColumns = () => {
    switch (personnelGridColumns) {
      case 1:
        return 'repeat(1, 1fr)';
      case 3:
        return 'repeat(auto-fit, minmax(280px, 1fr))';
      case 4:
        return 'repeat(auto-fit, minmax(250px, 1fr))';
      default:
        return 'repeat(auto-fit, minmax(320px, 1fr))';
    }
  };

  return (
    <StyledContainer>
      {/* Personnel Section */}
      <PersonnelSection>
        <SectionHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <People sx={{ color: '#1976d2', fontSize: 24 }} />
            <Typography
              variant="h6"
              sx={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#1c2025',
              }}
            >
              Active Critical Zone Personnel
            </Typography>
          </Box>
          {showViewAllButton && (
            <ScoutButton
              variant="secondary"
              startIcon={<Visibility />}
              onClick={onViewAllPersonnel}
              size="small"
            >
              View All
            </ScoutButton>
          )}
        </SectionHeader>

        {/* Personnel Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: getGridColumns(),
            gap: '16px',
            width: '100%',
          }}
        >
          {personnelData.map((person) => (
            <ActivityCard
              key={person.employeeId}
              id={person.employeeId}
              cardType="employee"
              title={person.employeeName}
              employeeName={person.employeeName}
              employeeId={person.employeeId}
              position={person.role}
              location={person.zone}
              shift={person.shift}
              status={person.status as 'active' | 'inactive' | 'break' | 'offline' | 'missing'}
              liveFeedStatus={person.liveFeedStatus}
              lastSeen={person.lastSeen}
              showLiveFeed={true}
              onPrimaryAction={() => onPersonnelTrack?.(person.employeeId)}
              onSecondaryAction={() => onPersonnelProfile?.(person.employeeId)}
            />
          ))}
        </Box>
      </PersonnelSection>

      {/* Critical Zones Section */}
      <ZoneSection>
        <ZoneContainer>
          <Typography
            variant="h6"
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1c2025',
              mb: 2,
            }}
          >
            Critical Zones Status
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {zoneData.map((zone) => (
              <ZoneStatusCard
                key={zone.zoneName}
                zoneName={zone.zoneName}
                currentPersonnel={zone.currentPersonnel}
                requiredPersonnel={zone.requiredPersonnel}
                shift={zone.shift}
                priority={zone.priority}
                certificationRequired={zone.certificationRequired}
                status={zone.status}
                onClick={() => onZoneClick?.(zone.zoneName)}
              />
            ))}
          </Box>
        </ZoneContainer>
      </ZoneSection>
    </StyledContainer>
  );
};

export default ActivityStatusPanel;