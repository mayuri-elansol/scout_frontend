import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography } from '@mui/material';
import { Shield, Visibility, People, Warning } from '@mui/icons-material';

// Import components
import ScoutButton from '../components/atoms/Button/Button';
import ScoutBadge from '../components/atoms/Badge/Badge';
import KpiCard from '../components/molecules/KpiCard/KpiCard';
import ActivityCard from '../components/molecules/ActivityCard/ActivityCard';
import Header from '../components/organisms/Header/Header';

const meta: Meta = {
  title: 'SCOUT/Component Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive showcase of all SCOUT components working together as they appear in the actual application.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ComponentOverview: Story = {
  render: () => (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Component */}
      <Header />
      
      <Box sx={{ p: 3, mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, color: '#1c2025', fontWeight: 600 }}>
          SCOUT Component Showcase
        </Typography>
        
        {/* Atoms Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#1c2025' }}>Atoms</Typography>
          
          <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <ScoutBadge variant="status" status="active" label="ACTIVE" />
              <ScoutBadge variant="priority" priority="high" label="HIGH" />
              <ScoutBadge variant="category" category="ppe" label="PPE" />
              <ScoutBadge variant="count" label="12" />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <ScoutButton variant="primary">Primary</ScoutButton>
              <ScoutButton variant="secondary">Secondary</ScoutButton>
              <ScoutButton variant="download">Download</ScoutButton>
            </Box>
          </Box>
        </Box>
        
        {/* Molecules Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#1c2025' }}>Molecules</Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3, mb: 3 }}>
            <KpiCard
              title="PPE Compliance"
              value="87.5%"
              subtitle="3 violations in last hour"
              trend="-2.3%"
              trendColor="#f44336"
              color="#ff9800"
              bgColor="#fff8e1"
              icon={Shield}
              variant="default"
            />
            <KpiCard
              title="Security Alerts"
              value="5"
              subtitle="Immediate attention required"
              trend="+150%"
              trendColor="#f44336"
              color="#c62828"
              bgColor="#ffebee"
              icon={Warning}
              variant="critical"
            />
            <KpiCard
              title="System Health"
              value="98.5%"
              subtitle="All systems operational"
              trend="+2.3%"
              trendColor="#4caf50"
              color="#2e7d32"
              bgColor="#e8f5e9"
              icon={Visibility}
              variant="success"
            />
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, mb: 3 }}>
            <ActivityCard
              id="emp-001"
              employeeName="John Mitchell"
              employeeId="EMP-4521"
              position="Level 3 Operator"
              location="Reactor Control Room"
              shift="Day Shift"
              status="active"
              showLiveFeed={true} title={''} cardType={'employee'}            />
            <ActivityCard
              id="emp-002"
              employeeName="Sarah Chen"
              employeeId="EMP-3847"
              position="Safety Inspector"
              location="Production Floor A"
              shift="Day Shift"
              status="break"
              level="Level 2"
              showLiveFeed={true} title={''} cardType={'employee'}            />
          </Box>
        </Box>
        
        {/* Usage Guidelines */}
        <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, border: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#1c2025' }}>
            Component Usage Guidelines
          </Typography>
          <Typography variant="body2" sx={{ color: '#5c6b7d', lineHeight: 1.6 }}>
            This showcase demonstrates how SCOUT components work together in the actual application:
          </Typography>
          <Box component="ul" sx={{ mt: 2, pl: 2, color: '#5c6b7d' }}>
            <li><strong>Atoms</strong>: Basic UI elements (buttons, badges) used throughout</li>
            <li><strong>Molecules</strong>: Composed components (KPI cards, activity cards) for specific features</li>
            <li><strong>Organisms</strong>: Complex components (header, sidebar, activity feed) for page structure</li>
            <li><strong>Templates</strong>: Full page layouts combining all component levels</li>
          </Box>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview showing how all SCOUT components work together in the application.',
      },
    },
  },
};

export const DashboardPreview: Story = {
  render: () => (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      
      <Box sx={{ p: 3, mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, color: '#1c2025', fontWeight: 600 }}>
          Dashboard Component Preview
        </Typography>
        
        {/* KPI Grid as it appears in dashboard */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2.5, mb: 4 }}>
          {[
            { title: 'PPE Compliance', value: '87.5%', trend: '-2.3%', color: '#ff9800', icon: Shield },
            { title: 'Security Alerts', value: '5', trend: '+150%', color: '#f44336', icon: Warning },
            { title: 'System Health', value: '98.5%', trend: '+2.3%', color: '#4caf50', icon: Visibility },
            { title: 'Employees Present', value: '234', trend: '+5.2%', color: '#4caf50', icon: People },
          ].map((kpi, index) => (
            <KpiCard
              key={index}
              title={kpi.title}
              value={kpi.value}
              subtitle="Updated just now"
              trend={kpi.trend}
              trendColor={kpi.trend.startsWith('+') ? '#4caf50' : '#f44336'}
              color={kpi.color}
              bgColor={kpi.color === '#4caf50' ? '#e8f5e9' : kpi.color === '#f44336' ? '#ffebee' : '#fff8e1'}
              icon={kpi.icon}
              variant={kpi.color === '#f44336' ? 'critical' : kpi.color === '#4caf50' ? 'success' : 'default'}
            />
          ))}
        </Box>
        
        {/* Employee Cards Grid */}
        <Typography variant="h6" sx={{ mb: 2, color: '#1c2025' }}>
          Personnel Monitoring
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {[
            { name: 'John Mitchell', id: 'EMP-4521', status: 'active', location: 'Control Room' },
            { name: 'Sarah Chen', id: 'EMP-3847', status: 'break', location: 'Production Floor' },
            { name: 'Michael Torres', id: 'EMP-2156', status: 'offline', location: 'Warehouse' },
            { name: 'Lisa Anderson', id: 'EMP-1892', status: 'active', location: 'Assembly Line' },
          ].map((employee, index) => (
            <ActivityCard
              key={index}
              id={`emp-${index}`}
              employeeName={employee.name}
              employeeId={employee.id}
              position="Operator"
              location={employee.location}
              shift="Day Shift"
              status={employee.status as any}
              showLiveFeed={true} title={''} cardType={'employee'}            />
          ))}
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Preview of how components appear together in the actual SCOUT dashboard layout.',
      },
    },
  },
};
