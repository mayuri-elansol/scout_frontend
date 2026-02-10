// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { CardContent, useTheme, useMediaQuery } from "@mui/material";
// import { BarChart } from "@mui/x-charts/BarChart";
// import { Box } from "@mui/system";

// export interface SeriesConfig<T> {
//   dataKey: keyof T;
//   label: string;
//   color: string;
// }

// export interface DynamicBarChartProps<T> {
//   data: T[];
//   xAxisKey: keyof T;
//   series: SeriesConfig<T>[];
//   yAxisLabel?: string;
//   stackId?: string;
// }

// const DynamicBarChart = <T extends Record<string, string | number>>({
//   data,
//   xAxisKey,
//   series,
//   yAxisLabel = "Count",
//   stackId = "stack",
// }: DynamicBarChartProps<T>) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [ready, setReady] = useState(false);

//   // Wait for container to have valid size
//   useEffect(() => {
//     const checkSize = () => {
//       const width = containerRef.current?.offsetWidth ?? 0;
//       const height = containerRef.current?.offsetHeight ?? 0;
//       if (width > 50 && height > 50) {
//         setReady(true);
//       } else {
//         setReady(false);
//       }
//     };

//     checkSize();
//     const resizeObserver = new ResizeObserver(checkSize);
//     if (containerRef.current) resizeObserver.observe(containerRef.current);

//     return () => resizeObserver.disconnect();
//   }, []);

//   if (!data || data.length === 0) return null;

//   const xLabels = data.map((d) => String(d[xAxisKey]));
//   const chartSeries = series.map((s) => ({
//     data: data.map((d) => Number(d[s.dataKey]) || 0),
//     label: s.label,
//     color: s.color,
//     stack: stackId,
//   }));

//   return (
//     <CardContent
//       sx={{
//         width: "100%",
//         height: "100%",
//         p: 0,
//         display: "flex",
//         flexDirection: "column",
//         "&:last-child": { paddingBottom: "0px !important" },
//       }}
//     >
//       <Box
//         ref={containerRef}
//         sx={{
//           flex: 1,
//           width: "100%",
//           height: 300,
//           minHeight: 250,
//         }}
//       >
//         {ready && (
//           <BarChart
//             series={chartSeries}
//             xAxis={[
//               {
//                 scaleType: "band",
//                 data: xLabels,
//                 tickLabelStyle: {
//                   textAnchor: isMobile ? "end" : "middle",
//                   fontSize: isMobile ? 9 : 11,
//                 },
//               },
//             ]}
//             yAxis={[{ label: yAxisLabel }]}
//           />
//         )}
//       </Box>
//     </CardContent>
//   );
// };

// export default DynamicBarChart;

"use client";

import React from "react";
import { CardContent, useTheme, useMediaQuery } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/system";

export interface SeriesConfig<T> {
  dataKey: keyof T;
  label: string;
  color: string;
}

export interface DynamicBarChartProps<T> {
  data: T[];
  xAxisKey: keyof T;
  series: SeriesConfig<T>[];
  yAxisLabel?: string;
  stackId?: string;
}

const DynamicBarChart = <T extends Record<string, string | number>>({
  data,
  xAxisKey,
  series,
  yAxisLabel = "Count",
  stackId = "stack",
}: DynamicBarChartProps<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
        }}
      >
        No data available
      </Box>
    );
  }

  const xLabels = data.map((d) => String(d[xAxisKey]));

  const chartSeries = series.map((s) => ({
    data: data.map((d) => Number(d[s.dataKey]) || 0),
    label: s.label,
    color: s.color,
    stack: stackId,
  }));

  return (
    <CardContent
      sx={{
        width: "100%",
        height: "100%",
        p: 0,
        "&:last-child": { paddingBottom: 0 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 360, // ✅ HARD HEIGHT
        }}
      >
        <BarChart
          height={360} // ✅ REQUIRED
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
      </Box>
    </CardContent>
  );
};

export default DynamicBarChart;
