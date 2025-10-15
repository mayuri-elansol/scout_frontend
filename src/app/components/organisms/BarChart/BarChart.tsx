// "use client";

// import React from "react";
// import { CardContent, useTheme, useMediaQuery } from "@mui/material";
// import { BarChart } from "@mui/x-charts/BarChart";

// // Types for the component props
// export interface SeriesConfig {
//   dataKey: string;
//   label: string;
//   color: string;
// }

// export interface DynamicBarChartProps {
//   data: Record<string, any>[];
//   xAxisKey: string;
//   series: SeriesConfig[];
//   yAxisLabel?: string;
//   stackId?: string;
//   height?: {
//     mobile?: number;
//     tablet?: number;
//     desktop?: number;
//   };
// }

// const DynamicBarChart: React.FC<DynamicBarChartProps> = ({
//   data,
//   xAxisKey,
//   series,
//   yAxisLabel = "Count",
//   stackId = "stack",
//   height = { mobile: 300, tablet: 400, desktop: 400 },
//     // height = { mobile: 300, tablet: 400, desktop: 0 },


// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"));

//   // Extract x-axis labels
//   const xLabels = data.map((d) => d[xAxisKey]);

//   // Prepare series data for the chart
//   const chartSeries = series.map((s) => ({
//     data: data.map((d) => d[s.dataKey]),
//     label: s.label,
//     color: s.color,
//     stack: stackId,
//   }));

//   // Determine chart height based on screen size
// let chartHeight = height.desktop;
// if (isMobile) {
//   chartHeight = height.mobile;
// } else if (isTablet) {
//   chartHeight = height.tablet;
// }
//   return (
//     <CardContent sx={{ width: "100%"}}>
//       <BarChart
//         height={chartHeight}
//         series={chartSeries}
//         xAxis={[
//           {
//             scaleType: "band",
//             data: xLabels,
//             tickLabelStyle: {
//               // angle: isMobile ? -45 : 0,
//               textAnchor: isMobile ? "end" : "middle",
//               fontSize: isMobile ? 9 : 11,
//             },
//           },
//         ]}
//         yAxis={[{ label: yAxisLabel }]}
        
//         margin={{
//           // bottom: isMobile ? 30 : 35,
//         //   left: 20,
//         //   right: 10,
//           // top: 10,
//         }}
//       />
//     </CardContent>
//   );
// };

// export default DynamicBarChart;

"use client";

import React from "react";
import { CardContent, useTheme, useMediaQuery } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export interface SeriesConfig {
  dataKey: string;
  label: string;
  color: string;
}

export interface DynamicBarChartProps {
  data: Record<string, any>[];
  xAxisKey: string;
  series: SeriesConfig[];
  yAxisLabel?: string;
  stackId?: string;
  height?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    mac?: number; // 👈 Added Mac-specific height
  };
}

const DynamicBarChart: React.FC<DynamicBarChartProps> = ({
  data,
  xAxisKey,
  series,
  yAxisLabel = "Count",
  stackId = "stack",
  height = { mobile: 300, tablet: 400, desktop: 400, mac: 350 },
}) => {
  const theme = useTheme();

  // Responsive detection
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // ✅ Detect Mac resolution 1450×900 or close range
  const isMacScreen = useMediaQuery("(min-width: 1400px) and (max-width: 1500px)");

  // Extract x-axis labels
  const xLabels = data.map((d) => d[xAxisKey]);

  // Prepare series
  const chartSeries = series.map((s) => ({
    data: data.map((d) => d[s.dataKey]),
    label: s.label,
    color: s.color,
    stack: stackId,
  }));

  // ✅ Decide chart height dynamically
  let chartHeight = height.desktop;
  if (isMobile) chartHeight = height.mobile;
  else if (isTablet) chartHeight = height.tablet;
  else if (isMacScreen) chartHeight = height.mac; 

  return (
    <CardContent sx={{ width: "100%" }}>
      <BarChart
        height={chartHeight}
        series={chartSeries}
        xAxis={[
          {
            scaleType: "band",
            data: xLabels,
            tickLabelStyle: {
              textAnchor: isMobile ? "end" : "middle",
              fontSize: isMobile ? 9 : 11,
            },
          },
        ]}
        yAxis={[{ label: yAxisLabel }]}
      />
    </CardContent>
  );
};

export default DynamicBarChart;
