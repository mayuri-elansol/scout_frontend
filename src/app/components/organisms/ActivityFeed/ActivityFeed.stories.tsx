import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import ActivityFeed from './ActivityFeed';

const meta: Meta<typeof ActivityFeed> = {
  title: 'Components/Organisms/ActivityFeed',
  component: ActivityFeed,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**SCOUT Real-time Activity Feed**

This is the actual activity feed component used in the SCOUT dashboard. It displays real-time events with:
- Time-based activity list
- Severity indicators (High, Medium, Low)
- Event categorization (PPE, Vehicle, Security, Personnel)
- Zone and camera information
- Color-coded avatars and status chips

**Exactly matches the project UI** - This component appears in the main dashboard layout taking 60% width alongside the Camera Status component.
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ 
        width: '100%', 
        maxWidth: '600px',
        backgroundColor: '#f5f7fa', 
        p: 2, 
        borderRadius: 1,
      }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default activity feed as it appears in the SCOUT dashboard with real-time events and severity indicators.',
      },
    },
  },
};

export const DashboardLayout: Story = {
  render: () => (
    <Box sx={{ 
      backgroundColor: '#f5f7fa', 
      p: 3, 
      borderRadius: 1,
      width: '100%',
    }}>
      <Box sx={{ 
        display: 'flex',
        gap: 3,
        flexWrap: 'wrap',
      }}>
        {/* Activity Feed - 60% width as in dashboard */}
        <Box sx={{ flex: '1 1 60%', minWidth: '400px' }}>
          <ActivityFeed />
        </Box>
        
        {/* Placeholder for Camera Status - 35% width */}
        <Box sx={{ 
          flex: '1 1 35%', 
          minWidth: '300px',
          backgroundColor: 'white',
          borderRadius: 1,
          p: 3,
          border: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Box sx={{ textAlign: 'center', color: '#5c6b7d' }}>
            <strong>Camera Status Component</strong><br/>
            (35% width in dashboard)
          </Box>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Activity Feed in dashboard layout showing the actual proportions used in the SCOUT application (60% width).',
      },
    },
  },
};

export const HighActivity: Story = {
  render: () => {
    // Override the component to show more high-severity events
    const ActivityFeedHighActivity = () => {
      return (
        <Box sx={{ 
          backgroundColor: 'white',
          borderRadius: 1,
          border: '1px solid #e0e0e0',
          p: 3,
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 2.5,
          }}>
            <Box sx={{ color: '#1c2025', fontWeight: 600, fontSize: '16px' }}>
              Real-time Activity - High Alert Period
            </Box>
          </Box>

          <Box>
            {[
              { time: '11:45 AM', event: 'Critical PPE Violation', zone: 'Chemical Plant - Camera 15', severity: 'high' },
              { time: '11:42 AM', event: 'Unauthorized Access Detected', zone: 'Restricted Zone - Camera 8', severity: 'high' },
              { time: '11:40 AM', event: 'Equipment Malfunction Alert', zone: 'Assembly Line - Camera 6', severity: 'high' },
              { time: '11:38 AM', event: 'Emergency Exit Blocked', zone: 'Production Floor - Camera 3', severity: 'high' },
              { time: '11:35 AM', event: 'Speed Violation Detected', zone: 'Loading Dock - Camera 12', severity: 'medium' },
            ].map((activity, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  py: 2,
                  borderBottom: index < 4 ? '1px solid #f0f0f0' : 'none',
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: activity.severity === 'high' ? '#ffebee' : '#fff8e1',
                    color: activity.severity === 'high' ? '#f44336' : '#ff9800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                  }}
                >
                  ⚠️
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 0.5,
                  }}>
                    <Box sx={{ fontWeight: 500, fontSize: '14px' }}>
                      {activity.event}
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: activity.severity === 'high' ? '#f44336' : '#ff9800',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 600,
                        height: '20px',
                        px: 1,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        textTransform: 'uppercase',
                      }}
                    >
                      {activity.severity}
                    </Box>
                  </Box>

                  <Box sx={{ 
                    fontSize: '14px', 
                    color: '#5c6b7d', 
                    mb: 0.5,
                  }}>
                    {activity.zone}
                  </Box>

                  <Box sx={{ 
                    fontSize: '12px', 
                    color: '#9aa0a6',
                  }}>
                    {activity.time}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      );
    };

    return <ActivityFeedHighActivity />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Activity feed during high-alert period with multiple critical and high-severity events.',
      },
    },
  },
};
