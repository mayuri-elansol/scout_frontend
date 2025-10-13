
'use client';

import * as React from 'react';
import {CardContent } from '@mui/material';
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
