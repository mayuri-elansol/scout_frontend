// 'use client';

// import * as React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
// import { DefaultizedPieValueType } from '@mui/x-charts/models';

// const generateTotals = () => ({
//   helmet: Math.floor(Math.random() * 200) + 50,
//   vest: Math.floor(Math.random() * 150) + 30,
//   glass: Math.floor(Math.random() * 100) + 20,
// });

// export default function PPEPieChartForEachViolationCount() {
//   const totals = generateTotals();

//   const data = [
//     { label: 'Helmet', value: totals.helmet, color: '#f44336' },
//     { label: 'Vest', value: totals.vest, color: '#ff9800' },
//     { label: 'Glass', value: totals.glass, color: '#2196f3' },
//   ];

//   const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

//   const getArcLabel = (params: DefaultizedPieValueType) => {
//     const percent = (params.value / TOTAL) * 100;
//     return `${percent.toFixed(0)}%`;
//   };

//   return (
//     <Card
//       elevation={3}
//       sx={{
//         width: '100%',
//         maxWidth: 350,
//         mx: 'auto',
//         textAlign: 'center',
//         border: '1px solid #ddd',
//         borderRadius: 3,
//       }}
//     >
//       <CardContent>
 

//         <PieChart
//           series={[
//             {
//               outerRadius: 80,
//               data,
//               arcLabel: getArcLabel,
//               // paddingAngle: 3,
//             },
//           ]}
//           colors={data.map((item) => item.color)}
//           width={250}
//           height={250}
//           sx={{
//             [`& .${pieArcLabelClasses.root}`]: {
//               fill: 'white',
//               fontSize: 13,
//               fontWeight: 500,
//             },
//             '& path': {
//               stroke: '#fff', // adds visible white borders between slices
//               strokeWidth: 2,
//             },
//           }}
//         />
//       </CardContent>
//     </Card>
//   );
// }
'use client';

import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { DefaultizedPieValueType } from '@mui/x-charts/models';

const generateTotals = () => ({
  helmet: Math.floor(Math.random() * 200) + 50,
  vest: Math.floor(Math.random() * 150) + 30,
  glass: Math.floor(Math.random() * 100) + 20,
});

export default function PPEPieChartForEachViolationCount() {
  const totals = generateTotals();

  const data = [
    { label: 'Helmet', value: totals.helmet, color: '#f44336' },
    { label: 'Vest', value: totals.vest, color: '#ff9800' },
    { label: 'Glass', value: totals.glass, color: '#2196f3' },
  ];

  const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = (params.value / TOTAL) * 100;
    return `${percent.toFixed(0)}%`;
  };

  return (

      <CardContent sx={{ p: 2 }}>
        <PieChart
          series={[
            {
              outerRadius: 80, 
              data,
              arcLabel: getArcLabel,
            },
          ]}
          colors={data.map((item) => item.color)}
       width={250}
height={200}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontSize: 14,
              fontWeight: 600,
            },
            '& path': {
              stroke: '#fff',
              strokeWidth: 2,
            },
          }}
        />
      </CardContent>
  );
}
