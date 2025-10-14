// "use client";
// import React from "react";
// import { ScatterChart } from "@mui/x-charts/ScatterChart";
// import { Box } from "@mui/material";

// export interface ViolationData {
//   time: string;
//   zone: string;
//   count: number;
// }

// export interface DynamicViolationScatterChartProps {
//   data: ViolationData[];
//   height?: number;
//   colors?: string[];
//   showLegend?: boolean;
// }

// const DynamicViolationScatterChart: React.FC<DynamicViolationScatterChartProps> = ({
//   data,
//   height = 500,
//   colors = ["#ef5350", "#42a5f5", "#66bb6a", "#ffa726"],
//   showLegend = true,
// }) => {
//   // Extract unique zones and times dynamically from the data
//   const zoneLabels = React.useMemo(
//     () => Array.from(new Set(data.map((d) => d.zone))).sort(),
//     [data]
//   );

//   const timeLabels = React.useMemo(
//     () => Array.from(new Set(data.map((d) => d.time))).sort(),
//     [data]
//   );

//   // Group data by zone for multiple series
//   const seriesData = React.useMemo(() => {
//     const grouped = new Map<string, ViolationData[]>();
    
//     data.forEach((item) => {
//       if (!grouped.has(item.zone)) {
//         grouped.set(item.zone, []);
//       }
//       grouped.get(item.zone)!.push(item);
//     });

//     return Array.from(grouped.entries()).map(([zone, items], index) => ({
//       type: "scatter" as const,
//       id: zone,
//       label: zone,
//       data: items.map((item, idx) => ({
//         x: timeLabels.indexOf(item.time),
//         y: item.count,
//         id: `${zone}-${idx}`,
//       })),
//     }));
//   }, [data, timeLabels]);

//   return (
//     <Box sx={{ width: '100%', p:4 }}>
//       <ScatterChart
//         width={1200}
//         height={height}
//         series={seriesData}
//         xAxis={[
//           {
//             label: "Time",
//             data: timeLabels,
//             scaleType: "point",
//             tickLabelStyle: { 
//               fontSize: 12, 
//               fontWeight: 500, 
//               fill: "#333",
//               angle: -45,
//               textAnchor: "end",
//             },
//           },
//         ]}
//         yAxis={[
//           {
//             label: "Violation Count",
//             scaleType: "linear",
//             tickLabelStyle: { 
//               fontSize: 12, 
//               fontWeight: 500, 
//               fill: "#333" 
//             },
//           },
//         ]}
//         margin={{  bottom: 80 }}
//         // slotProps={{
//         //   legend: showLegend ? {
//         //     position: { vertical: "middle", horizontal: "right" },
//         //   } : undefined,
//         // }}
//       />
//     </Box>
//   );
// };

// export default DynamicViolationScatterChart;


"use client";
import React from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { Box } from "@mui/material";

export interface ViolationData {
  time: string;
  zone: string;
  count: number;
}

export interface DynamicViolationScatterChartProps {
  data: ViolationData[];
  height?: number;
  colors?: string[];
  showLegend?: boolean;
}

const DynamicViolationScatterChart: React.FC<DynamicViolationScatterChartProps> = ({
  data,
  height = 500,
  colors = ["#ef5350", "#42a5f5", "#66bb6a", "#ffa726"],
  showLegend = true,
}) => {
  // Extract unique labels
  const zoneLabels = React.useMemo(
    () => Array.from(new Set(data.map((d) => d.zone))),
    [data]
  );

  const timeLabels = React.useMemo(
    () => Array.from(new Set(data.map((d) => d.time))),
    [data]
  );

  // Group by zone
  const seriesData = React.useMemo(() => {
    const grouped = new Map<string, ViolationData[]>();

    data.forEach((item) => {
      if (!grouped.has(item.zone)) grouped.set(item.zone, []);
      grouped.get(item.zone)!.push(item);
    });

    return Array.from(grouped.entries()).map(([zone, items], index) => ({
      id: zone,
      label: zone,
      color: colors[index % colors.length],
      data: items.map((item, idx) => ({
  x: zoneLabels.indexOf(item.zone),  // numeric index of zone
  y: timeLabels.indexOf(item.time),  // numeric index of time
  count: item.count,
  id: `${zone}-${idx}`,
}))

    }));
  }, [data, timeLabels, zoneLabels, colors]);

  return (
    <Box sx={{ width: "100%", p: 4 }}>
    <ScatterChart
  width={1200}           // smaller width
  height={500}          // smaller height
  // margin={{ 
  //   top: 20, 
  //   bottom: 40,   // reduces space below x-axis
  //   left: 60,     // reduces space beside y-axis
  //   right: 20 
  // }}
  series={seriesData}

  xAxis={[
  {
    label: "Zone",
    scaleType: "point",               // categorical axis
    data: zoneLabels.map((_, i) => i), // numeric indices
    valueFormatter: (index: number) => zoneLabels[index], // shows actual names
    tickLabelStyle: { 
      fontSize: 13, 
      fontWeight: 600, 
      fill: "#333" 
    },
  },
]}

  yAxis={[
    {
      label:"Time",
      scaleType: "point",    
      data: timeLabels.map((_, i) => i),
      valueFormatter: (index) => timeLabels[index],
      tickLabelStyle: {
        fontSize: 13,
        fontWeight: 600,
        fill: "#333",
      },
    },
  ]}
/>

    </Box>
  );
};

export default DynamicViolationScatterChart;
