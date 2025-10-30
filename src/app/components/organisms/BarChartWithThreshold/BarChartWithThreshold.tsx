// "use client";

// import React, { useRef } from "react";
// import { CardContent, useTheme, useMediaQuery, Box } from "@mui/material";
// import { BarChart } from "@mui/x-charts/BarChart";

// // Generic Series configuration for any data type T
// export interface SeriesConfig<T> {
//   dataKey: keyof T;
//   label: string;
//   color: string;
// }

// // Generic props for DynamicBarChartWithThreshold
// export interface DynamicBarChartWithThresholdProps<
//   T extends Record<string, number | string>
// > {
//   data: T[];
//   xAxisKey: keyof T;
//   series: SeriesConfig<T>[];
//   thresholdValue: number;
//   thresholdLabel?: string;
//   thresholdColor?: string;
//   yAxisLabel?: string;
//   stackId?: string;
//   height?: {
//     mobile?: number;
//     tablet?: number;
//     desktop?: number;
//     mac?: number;
//   };
// }

// const DynamicBarChartWithThreshold = <
//   T extends Record<string, number | string>
// >({
//   data,
//   xAxisKey,
//   series,
//   thresholdValue,
//   thresholdLabel = "Threshold",
//   thresholdColor = "red",
//   yAxisLabel = "User Count",
//   stackId = "stack",
//   height = { mobile: 300, tablet: 400, desktop: 400, mac: 350 },
// }: DynamicBarChartWithThresholdProps<T>) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"));
//   const isMediumWidth = useMediaQuery(
//     "(min-width: 1400px) and (max-width: 1600px)"
//   );

//   const chartContainerRef = useRef<HTMLDivElement>(null);

//   // Prepare X labels
//   const xLabels = data.map((d) => d[xAxisKey] as string);

//   // Flatten all series values to calculate max/min
//   const allValues = series.flatMap((s) =>
//     data.map((d) => d[s.dataKey] as number)
//   );
//   const maxValue = Math.max(...allValues);
//   const minValue = Math.min(0, ...allValues);

//   // Map series to BarChart format
//   const chartSeries = series.map((s) => ({
//     data: data.map((d) => d[s.dataKey] as number),
//     label: s.label,
//     color: s.color,
//     stack: stackId,
//   }));

//   // Responsive height
//   let chartHeight = height.desktop!;
//   if (isMobile) chartHeight = height.mobile!;
//   else if (isTablet) chartHeight = height.tablet!;
//   else if (isMediumWidth) chartHeight = height.mac!;

//   // Calculate threshold line position
//   const yMin = minValue;
//   const yMax = maxValue;
//   const usableHeight = chartHeight ? chartHeight - 60 : 0;
//   const thresholdY =
//     usableHeight > 0
//       ? usableHeight * (1 - (thresholdValue - yMin) / (yMax - yMin)) + 56
//       : 0;

//   return (
//     <CardContent ref={chartContainerRef} sx={{ width: "100%" }}>
//       <BarChart
//         height={chartHeight}
//         series={chartSeries}
//         xAxis={[
//           {
//             scaleType: "band",
//             data: xLabels,
//             tickLabelStyle: {
//               angle: isMobile ? -45 : 0,
//               textAnchor: isMobile ? "end" : "middle",
//               fontSize: isMobile ? 9 : 11,
//             },
//           },
//         ]}
//         yAxis={[{ label: yAxisLabel, min: yMin }]}
//         margin={{}}
//       />

//       {/* Threshold Line */}
//       {/* <Box
//         sx={{
//           position: "absolute",
//           top: `${thresholdY}px`,
//           left: 0,
//           right: 0,
//           borderTop: `2px dashed ${thresholdColor}`,
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             right: 5,
//             // top: -12,
//             backgroundColor: "white",
//             px: 1,
//             fontSize: 12,
//             color: thresholdColor,
//           }}
//         >
//           {thresholdLabel} ({thresholdValue})
//         </Box>
//       </Box> */}
//     </CardContent>
//   );
// };

// export default DynamicBarChartWithThreshold;

//=============================================
// "use client";

// import React, { useRef, useEffect, useState } from "react";
// import { CardContent, useTheme, useMediaQuery } from "@mui/material";
// import { BarChart } from "@mui/x-charts/BarChart";

// export interface SeriesConfig<T> {
//   dataKey: keyof T;
//   label: string;
//   color: string;
// }

// export interface DynamicBarChartWithThresholdProps<
//   T extends Record<string, number | string>
// > {
//   data: T[];
//   xAxisKey: keyof T;
//   series: SeriesConfig<T>[];
//   thresholdValue: number;
//   thresholdLabel?: string;
//   thresholdColor?: string;
//   yAxisLabel?: string;
//   stackId?: string;
// }

// const DynamicBarChartWithThreshold = <
//   T extends Record<string, number | string>
// >({
//   data,
//   xAxisKey,
//   series,
//   thresholdValue,
//   thresholdLabel = "Threshold",
//   thresholdColor = "red",
//   yAxisLabel = "User Count",
//   stackId = "stack",
// }: DynamicBarChartWithThresholdProps<T>) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const containerRef = useRef<HTMLDivElement>(null);
//   const [size, setSize] = useState({ width: 0, height: 0 });

//   // ✅ Track size dynamically
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const observer = new ResizeObserver(([entry]) => {
//       const { width, height } = entry.contentRect;
//       setSize((prev) =>
//         Math.abs(prev.width - width) > 5 || Math.abs(prev.height - height) > 5
//           ? { width, height }
//           : prev
//       );
//     });

//     observer.observe(container);
//     return () => observer.disconnect();
//   }, []);

//   // Prepare chart data
//   const xLabels = data.map((d) => d[xAxisKey] as string);
//   const allValues = series.flatMap((s) =>
//     data.map((d) => d[s.dataKey] as number)
//   );
//   const maxValue = Math.max(...allValues);
//   const minValue = Math.min(0, ...allValues);

//   const chartSeries = series.map((s) => ({
//     data: data.map((d) => d[s.dataKey] as number),
//     label: s.label,
//     color: s.color,
//     stack: stackId,
//   }));

//   return (
//     <CardContent
//       ref={containerRef}
//       sx={{
//         width: "100%",
//         height: "100%",
//         p: "1px !important",
//         position: "relative",
//         "&:last-child": { paddingBottom: 0 },
//       }}
//     >
//       {size.width > 0 && size.height > 0 && (
//         <BarChart
//           width={size.width}
//           height={size.height}
//           series={chartSeries}
//           xAxis={[
//             {
//               scaleType: "band",
//               data: xLabels,
//               tickLabelStyle: {
//                 angle: isMobile ? -45 : 0,
//                 textAnchor: isMobile ? "end" : "middle",
//                 fontSize: isMobile ? 9 : 11,
//               },
//             },
//           ]}
//           yAxis={[{ label: yAxisLabel, min: minValue }]}
//           margin={{ top: 40, right: 30, bottom: 40, left: 50 }}
//         />
//       )}

//       {/* Threshold line */}
//       {size.height > 0 && (
//         <div
//           style={{
//             position: "absolute",
//             top: `${
//               size.height *
//               (1 - (thresholdValue - minValue) / (maxValue - minValue))
//             }px`,
//             left: 0,
//             right: 0,
//             borderTop: `2px dashed ${thresholdColor}`,
//           }}
//         >
//           <span
//             style={{
//               position: "absolute",
//               right: 10,
//               top: -12,
//               background: "white",
//               fontSize: 12,
//               color: thresholdColor,
//               padding: "0 4px",
//             }}
//           >
//             {thresholdLabel} ({thresholdValue})
//           </span>
//         </div>
//       )}
//     </CardContent>
//   );
// };

// export default DynamicBarChartWithThreshold;

"use client";

import React, { useMemo } from "react";
import { CardContent, useTheme, useMediaQuery, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export interface SeriesConfig<T> {
  dataKey: keyof T;
  label: string;
  color: string;
}

export interface DynamicBarChartWithThresholdProps<
  T extends Record<string, number | string>
> {
  data: T[];
  xAxisKey: keyof T;
  series: SeriesConfig<T>[];
  thresholdValue: number;
  thresholdLabel?: string;
  thresholdColor?: string;
  yAxisLabel?: string;
  stackId?: string;
}

const DynamicBarChartWithThreshold = <
  T extends Record<string, number | string>
>({
  data,
  xAxisKey,
  series,
  thresholdValue,
  thresholdLabel = "Threshold",
  thresholdColor = "red",
  yAxisLabel = "User Count",
  stackId = "stack",
}: DynamicBarChartWithThresholdProps<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Prepare data
  const xLabels = useMemo(() => data.map((d) => String(d[xAxisKey])), [data]);
  const allValues = useMemo(
    () => series.flatMap((s) => data.map((d) => Number(d[s.dataKey]))),
    [data, series]
  );
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(0, ...allValues);

  const chartSeries = series.map((s) => ({
    data: data.map((d) => Number(d[s.dataKey])),
    label: s.label,
    color: s.color,
    stack: stackId,
  }));

  return (
    <CardContent
      sx={{
        width: "100%",
        height: "100%", // ✅ fully fills parent container
        p: 0,
        display: "flex",
        flexDirection: "column",
        "&:last-child": {
          paddingBottom: "0px !important",
        },
        position: "relative",
      }}
    >
      <Box
        sx={{ flex: 1, width: "100%", height: "100%", position: "relative" }}
      >
        <BarChart
          width={undefined} // ✅ responsive auto-fit
          height={undefined} // ✅ responsive auto-fit
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
          yAxis={[{ label: yAxisLabel, min: minValue }]}
          margin={{ top: 40, right: 30, bottom: 40, left: 50 }}
        />

        {/* ✅ Responsive threshold line overlay */}
        <Box
          sx={{
            position: "absolute",
            top: `${
              (1 - (thresholdValue - minValue) / (maxValue - minValue)) * 100
            }%`,
            left: 0,
            right: 0,
            borderTop: `2px dashed ${thresholdColor}`,
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: 10,
              top: "-12px",
              background: "white",
              fontSize: 12,
              color: thresholdColor,
              px: "4px",
            }}
          >
            {thresholdLabel} ({thresholdValue})
          </Box>
        </Box>
      </Box>
    </CardContent>
  );
};

export default DynamicBarChartWithThreshold;
