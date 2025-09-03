import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import ReportTable from './ReportTable';

const meta: Meta<typeof ReportTable> = {
  title: 'Components/Organisms/ReportTable',
  component: ReportTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**SCOUT Report Table**

Data table component used in analytics pages for displaying reports with download functionality. Features:
- Column-based data display
- CSV download capability
- Professional table styling
- Status chips and indicators
- Responsive design

**Project Usage**: Used in analytics pages (PPE Detection, Intrusion Detection, Employee Presence, People Count) to display tabular reports.
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ 
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

// PPE Detection Report Data
const ppeColumns = [
  { id: 'violationId', label: 'Violation ID', minWidth: 120 },
  { id: 'timestamp', label: 'Timestamp', minWidth: 80 },
  { id: 'zone', label: 'Zone', minWidth: 120 },
  { id: 'employeeId', label: 'Employee ID', minWidth: 120 },
  { id: 'violationType', label: 'Violation Type', minWidth: 150 },
  { id: 'severity', label: 'Severity', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'priority', label: 'Priority', minWidth: 80 },
  { id: 'resolution', label: 'Action Taken', minWidth: 150 },
];

const ppeData = [
  {
    violationId: 'PPE-7892',
    timestamp: '15:42',
    zone: 'Production Floor A',
    employeeId: 'John Mitchell',
    violationType: 'Missing Hard Hat',
    severity: 'Critical',
    status: 'VIOLATION',
    priority: 'Critical',
    resolution: 'Employee notified, PPE provided',
  },
  {
    violationId: 'PPE-7891',
    timestamp: '15:28',
    zone: 'Welding Station',
    employeeId: 'Lisa Anderson',
    violationType: 'Improper Safety Glasses',
    severity: 'High',
    status: 'RESOLVED',
    priority: 'High',
    resolution: 'Correct eyewear issued',
  },
  {
    violationId: 'PPE-7890',
    timestamp: '15:15',
    zone: 'Chemical Storage',
    employeeId: 'Sarah Chen',
    violationType: 'Missing Safety Gloves',
    severity: 'Critical',
    status: 'PENDING',
    priority: 'Critical',
    resolution: 'Under investigation',
  },
];

// Security/Intrusion Report Data
const securityColumns = [
  { id: 'incidentId', label: 'Incident ID', minWidth: 120 },
  { id: 'timestamp', label: 'Timestamp', minWidth: 80 },
  { id: 'location', label: 'Location', minWidth: 150 },
  { id: 'intruderId', label: 'Intruder ID', minWidth: 120 },
  { id: 'severity', label: 'Severity', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'priority', label: 'Priority', minWidth: 80 },
  { id: 'response', label: 'Response Action', minWidth: 150 },
];

const securityData = [
  {
    incidentId: 'SEC-8901',
    timestamp: '16:23',
    location: 'Main Gate - Camera 1',
    intruderId: 'UNKNOWN-001',
    severity: 'Critical',
    status: 'ACTIVE',
    priority: 'Critical',
    response: 'Security team dispatched',
  },
  {
    incidentId: 'SEC-8900',
    timestamp: '15:45',
    location: 'Perimeter Fence - Camera 8',
    intruderId: 'UNKNOWN-002',
    severity: 'High',
    status: 'INVESTIGATING',
    priority: 'High',
    response: 'Area secured, investigation ongoing',
  },
];

// Employee Presence Report Data
const employeeColumns = [
  { id: 'recordId', label: 'Record ID', minWidth: 120 },
  { id: 'timestamp', label: 'Timestamp', minWidth: 80 },
  { id: 'zone', label: 'Zone', minWidth: 120 },
  { id: 'employeeId', label: 'Employee ID', minWidth: 120 },
  { id: 'certification', label: 'Certification', minWidth: 150 },
  { id: 'shift', label: 'Shift', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'priority', label: 'Priority', minWidth: 80 },
  { id: 'resolution', label: 'Resolution', minWidth: 150 },
];

const employeeData = [
  {
    recordId: 'EMP-7889',
    timestamp: '14:32',
    zone: 'Maintenance Workshop',
    employeeId: 'David Kim',
    certification: 'Tech Cert',
    shift: 'Day Shift',
    status: 'ACTIVE',
    priority: 'Medium',
    resolution: 'Equipment maintenance',
  },
  {
    recordId: 'EMP-7887',
    timestamp: '14:15',
    zone: 'Reactor Control Room',
    employeeId: 'Jennifer Walsh',
    certification: 'Level 3 Operator',
    shift: 'Day Shift',
    status: 'ACTIVE',
    priority: 'Critical',
    resolution: 'Primary operator',
  },
];

export const PPEViolationsReport: Story = {
  args: {
    title: 'PPE Violations Report',
    columns: ppeColumns,
    data: ppeData,
    downloadFileName: 'ppe-violations-report.csv',
  },
  parameters: {
    docs: {
      description: {
        story: 'PPE violations report as it appears in the PPE Detection analytics page.',
      },
    },
  },
};

export const SecurityIncidentsReport: Story = {
  args: {
    title: 'Security Incidents Report',
    columns: securityColumns,
    data: securityData,
    downloadFileName: 'security-incidents-report.csv',
  },
  parameters: {
    docs: {
      description: {
        story: 'Security incidents report as it appears in the Intrusion Detection analytics page.',
      },
    },
  },
};

export const EmployeePresenceReport: Story = {
  args: {
    title: 'Employee Presence Report',
    columns: employeeColumns,
    data: employeeData,
    downloadFileName: 'employee-presence-report.csv',
  },
  parameters: {
    docs: {
      description: {
        story: 'Employee presence report as it appears in the Employee Presence analytics page.',
      },
    },
  },
};

export const PeopleCountReport: Story = {
  args: {
    title: 'People Count Report',
    columns: [
      { id: 'countId', label: 'Count ID', minWidth: 120 },
      { id: 'timestamp', label: 'Timestamp', minWidth: 80 },
      { id: 'zone', label: 'Zone', minWidth: 120 },
      { id: 'currentCount', label: 'Current Count', minWidth: 120 },
      { id: 'maxCapacity', label: 'Max Capacity', minWidth: 120 },
      { id: 'occupancyRate', label: 'Occupancy Rate', minWidth: 120 },
      { id: 'status', label: 'Status', minWidth: 100 },
      { id: 'priority', label: 'Priority', minWidth: 80 },
    ],
    data: [
      {
        countId: 'CNT-5412',
        timestamp: '15:30',
        zone: 'Main Assembly Hall',
        currentCount: '47',
        maxCapacity: '50',
        occupancyRate: '94%',
        status: 'NORMAL',
        priority: 'Low',
      },
      {
        countId: 'CNT-5411',
        timestamp: '15:15',
        zone: 'Cafeteria',
        currentCount: '67',
        maxCapacity: '60',
        occupancyRate: '112%',
        status: 'OVERCROWDED',
        priority: 'High',
      },
    ],
    downloadFileName: 'people-count-report.csv',
  },
  parameters: {
    docs: {
      description: {
        story: 'People count report as it appears in the People Count analytics page.',
      },
    },
  },
};
