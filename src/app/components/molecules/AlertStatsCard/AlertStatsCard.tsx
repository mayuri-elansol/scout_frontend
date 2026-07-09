// import { Grid } from '@mui/material';
// import {
//   WarningAmberOutlined,
//   InfoOutlined,
//   VisibilityOutlined,
//   CheckCircleOutlined,
//   TimerOutlined,
// } from '@mui/icons-material';
// import StatCard, { StatCardTone } from '../DashboardKpiCardMain/StatCard';
// import { MuiIcon } from '@/app/config/dashboardTheme';

// const stats: {
//   id: string;
//   label: string;
//   value: string | number;
//   icon: MuiIcon;
//   tone: StatCardTone;
// }[] = [
//   { id: 'critical', label: 'Critical', value: 4, icon: WarningAmberOutlined, tone: 'red' },
//   { id: 'nonCritical', label: 'Non-Critical', value: 8, icon: InfoOutlined, tone: 'gray' },
//   { id: 'acknowledged', label: 'Acknowledged', value: 2, icon: VisibilityOutlined, tone: 'amber' },
//   { id: 'resolved', label: 'Resolved', value: 1, icon: CheckCircleOutlined, tone: 'green' },
//   // { id: 'avgResponse', label: 'Avg Response', value: '2m 48s', icon: TimerOutlined, tone: 'green' },
// ];

// export default function AlertStatsCards() {
//   return (
//     <Grid container spacing={2}>
//       {stats.map((stat) => (
//         <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={stat.id}>
//           <StatCard
//             icon={stat.icon}
//             tone={stat.tone}
//             value={stat.value}
//             label={stat.label}
//           />
//         </Grid>
//       ))}
      
//     </Grid>
//   );
// }

import { Box, Grid } from '@mui/material';
import {
  WarningAmberOutlined,
  InfoOutlined,
  VisibilityOutlined,
  CheckCircleOutlined,
} from '@mui/icons-material';
import StatCard, { StatCardTone } from '../DashboardKpiCardMain/StatCard';
import { MuiIcon, DASHBOARD_COLORS } from '@/app/config/dashboardTheme';

const stats: {
  id: string;
  label: string;
  value: string | number;
  icon: MuiIcon;
  tone: StatCardTone;
}[] = [
  { id: 'critical', label: 'Critical', value: 4, icon: WarningAmberOutlined, tone: 'red' },
  { id: 'nonCritical', label: 'Non-Critical', value: 8, icon: InfoOutlined, tone: 'gray' },
  { id: 'acknowledged', label: 'Acknowledged', value: 2, icon: VisibilityOutlined, tone: 'amber' },
  { id: 'resolved', label: 'Resolved', value: 1, icon: CheckCircleOutlined, tone: 'green' },
];

export default function AlertStatsCards() {
  return (
    <Grid container spacing={2}>
      {stats.map((stat) => (
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={stat.id}>
          <StatCard
            icon={stat.icon}
            tone={stat.tone}
            value={stat.value}
            label={stat.label}
          />
        </Grid>
      ))}

      {/* Empty grey card – replaces Avg Response */}
     <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "11px",
      padding: "14px",
      border: `1.5px solid ${DASHBOARD_COLORS.border}`,
     // borderRadius: "10px",
      backgroundColor: "#F0F2F5",
                  borderRadius: "12px",
        boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 1px 3px 1px rgba(0,0,0,.06)",

      cursor: "default",
      height: "100%", // take full height of grid item
    }}
  >
    {/* No content – completely empty */}
  </Box>
</Grid>
    </Grid>
  );
}