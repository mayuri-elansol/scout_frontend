
// 'use client';

// import * as React from 'react';
// import {CardContent } from '@mui/material';
// import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
// import { DefaultizedPieValueType } from '@mui/x-charts/models';

// const generateTotals = () => ({
//   helmet: Math.floor(Math.random() * 200) + 50,
//   vest: Math.floor(Math.random() * 150) + 30,
//   glass: Math.floor(Math.random() * 100) + 20,
// });

// export default function HazardDetectionCountPieChartForZone() {
//   const totals = generateTotals();

//   const data = [
//     { label: 'ZONE A', value: totals.helmet, color: '#ffa94d' },
//     { label: 'ZONE B', value: totals.vest, color: '#ff6b6b' },
//     { label: 'ZONE C', value: totals.glass, color: '#74c0fc' },
//   ];
 
//   const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

//   const getArcLabel = (params: DefaultizedPieValueType) => {
//     const percent = (params.value / TOTAL) * 100;
//     return `${percent.toFixed(0)}`;
//   };

//   return (

//       <CardContent sx={{ p: 2 }}>
//         <PieChart
//           series={[
//             {
//               outerRadius: 80, 
//               data,
//               arcLabel: getArcLabel,
//             },
//           ]}
//           colors={data.map((item) => item.color)}
//        width={250}
// height={200}
//           sx={{
//             [`& .${pieArcLabelClasses.root}`]: {
//               fill: 'white',
//               fontSize: 14,
//               fontWeight: 600,
//             },
//             '& path': {
//               stroke: '#fff',
//               strokeWidth: 2,
//             },
//           }}
//         />
//       </CardContent>
//   );
// }

"use client";

import React from "react";
import { CardContent, useTheme, useMediaQuery } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType } from "@mui/x-charts/models";

const HazardPieChartByZone = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const data = [
    { label: "ZONE A", value: 31, color: "#ffa94d" },
    { label: "ZONE B", value: 43, color: "#ff6b6b" },
    { label: "ZONE C", value: 26, color: "#74c0fc" },
  ];

  const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = (params.value / TOTAL) * 100;
    return `${percent.toFixed(0)}`;
  };

  const chartSize = isMobile ? 180 : 200;
  const outerRadius = isMobile ? 60 : 90;

  return (
    <CardContent sx={{ 
      width: "100%", 
      p: 2, 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <PieChart
        series={[
          {
            outerRadius: outerRadius,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        colors={data.map((item) => item.color)}
        width={chartSize}
        height={chartSize}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: isMobile ? 12 : 14,
            fontWeight: 600,
          },
          "& path": {
            stroke: "#fff",
            strokeWidth: 2,
          },
        }}
      />
    </CardContent>
  );
};

export default HazardPieChartByZone;