// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { ScatterChart } from "@mui/x-charts/ScatterChart";
// import { Box, useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// export interface ViolationData {
//   time: string;
//   zone: string;
//   count: number;
// }

// export interface DynamicViolationScatterChartProps {
//   data: ViolationData[];
//   colors?: string[];
// }

// const DynamicViolationScatterChart: React.FC<
//   DynamicViolationScatterChartProps
// > = ({ data = [], colors = ["#ffcdd2", "#B0E0E6", "#A8E6CF", "#FFEAA7"] }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const containerRef = useRef<HTMLDivElement>(null);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   // 🔹 Observe size changes dynamically
//   useEffect(() => {
//     const updateSize = () => {
//       if (containerRef.current) {
//         const { offsetWidth, offsetHeight } = containerRef.current;
//         setDimensions({ width: offsetWidth, height: offsetHeight });
//       }
//     };
//     updateSize();

//     const observer = new ResizeObserver(updateSize);
//     if (containerRef.current) observer.observe(containerRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // 🔹 Prepare unique labels
//   const timeLabels = React.useMemo(() => {
//     const uniqueTimes = Array.from(new Set(data.map((d) => d.time)));
//     return uniqueTimes.sort((a, b) => {
//       const [aH, aM] = a.split(":").map(Number);
//       const [bH, bM] = b.split(":").map(Number);
//       return aH * 60 + aM - (bH * 60 + bM);
//     });
//   }, [data]);

//   const zoneLabels = React.useMemo(
//     () => Array.from(new Set(data.map((d) => d.zone))),
//     [data],
//   );

//   // 🔹 Group by zone
//   const seriesData = React.useMemo(() => {
//     const grouped = new Map<string, ViolationData[]>();
//     for (const item of data) {
//       if (!grouped.has(item.zone)) grouped.set(item.zone, []);
//       grouped.get(item.zone)!.push(item);
//     }

//     return Array.from(grouped.entries()).map(([zone, items], index) => ({
//       id: zone,
//       label: zone,
//       color: colors[index % colors.length],
//       data: items.map((item, idx) => ({
//         x: zoneLabels.indexOf(item.zone) + 1,
//         y: timeLabels.indexOf(item.time),
//         count: item.count,
//         id: `${zone}-${idx}`,
//       })),
//       markerSize: isMobile ? 6 : 8,
//     }));
//   }, [data, timeLabels, zoneLabels, colors, isMobile]);

//   // 🔹 Handle empty state
//   if (!data || data.length === 0) {
//     return (
//       <Box
//         sx={{
//           height: 300,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "text.secondary",
//         }}
//       >
//         No data available
//       </Box>
//     );
//   }

//   return (
//     <Box
//       ref={containerRef}
//       sx={{
//         width: "100%",
//         // height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         overflow: "hidden",
//       }}
//     >
//       {dimensions.width > 0 && dimensions.height > 0 && (
//         <ScatterChart
//           width={dimensions.width}
//           height={dimensions.height}
//           series={seriesData}
//           margin={{
//             top: 30,
//             right: 40,
//             bottom: 50,
//             left: 60, // ensures y-axis labels & legends aren’t cut
//           }}
//           xAxis={[
//             {
//               label: "Zone",
//               scaleType: "linear",
//               data: zoneLabels,
//               valueFormatter: (i: number) =>
//                 zoneLabels[Math.round(i - 0.3)] ?? "",
//               tickLabelStyle: {
//                 fontSize: isMobile ? 10 : 12,
//                 fontWeight: 600,
//                 fill: "#444",
//               },
//             },
//           ]}
//           yAxis={[
//             {
//               label: "Time (24-hour)",
//               scaleType: "point",
//               data: timeLabels.map((_, i) => i),
//               valueFormatter: (i: number) => timeLabels[i] ?? "",
//               tickLabelStyle: {
//                 fontSize: isMobile ? 9 : 11,
//                 fontWeight: 600,
//                 fill: "#444",
//               },
//             },
//           ]}
//           grid={{ horizontal: true, vertical: false }}
//           sx={{
//             "& .MuiChartsLegend-root": {
//               transform: "translate(0, 15px)",
//             },
//             "& text": { userSelect: "none" },
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default DynamicViolationScatterChart;

// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { ScatterChart } from "@mui/x-charts/ScatterChart";
// import { Box, useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// export interface ViolationData {
//   time: string;
//   zone: string;
//   count: number;
// }

// interface Props {
//   data: ViolationData[];
//   colors?: string[];
// }

// const DynamicViolationScatterChart: React.FC<Props> = ({
//   data,
//   colors = ["#ffcdd2", "#B0E0E6", "#A8E6CF", "#FFEAA7"],
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const containerRef = useRef<HTMLDivElement>(null);
//   const [size, setSize] = useState({ width: 0, height: 350 }); // 👈 FIXED HEIGHT

//   /* ---------- Resize ---------- */
//   useEffect(() => {
//     const resize = () => {
//       if (containerRef.current) {
//         setSize({
//           width: containerRef.current.offsetWidth,
//           height: 350, // 👈 NEVER 0
//         });
//       }
//     };
//     resize();
//     const observer = new ResizeObserver(resize);
//     if (containerRef.current) observer.observe(containerRef.current);
//     return () => observer.disconnect();
//   }, []);

//   /* ---------- Labels ---------- */
//   const timeLabels = useMemo(
//     () => Array.from(new Set(data.map((d) => d.time))).sort(),
//     [data],
//   );

//   const zoneLabels = useMemo(
//     () => Array.from(new Set(data.map((d) => d.zone))),
//     [data],
//   );

//   /* ---------- Series ---------- */
//   const series = useMemo(() => {
//     const grouped = new Map<string, ViolationData[]>();

//     data.forEach((d) => {
//       if (!grouped.has(d.zone)) grouped.set(d.zone, []);
//       grouped.get(d.zone)!.push(d);
//     });

//     return Array.from(grouped.entries()).map(([zone, items], index) => ({
//       id: zone,
//       label: zone,
//       color: colors[index % colors.length],
//       markerSize: isMobile ? 7 : 9,
//       data: items.map((item, i) => ({
//         x: zoneLabels.indexOf(item.zone),
//         y: timeLabels.indexOf(item.time),
//         id: `${zone}-${i}`,
//       })),
//     }));
//   }, [data, colors, isMobile, zoneLabels, timeLabels]);
//   console.log("series", series);
//   if (!data.length) {
//     return <Box sx={{ height: 300 }}>No data</Box>;
//   }

//   return (
//     <Box ref={containerRef} sx={{ width: "100%", minHeight: 350 }}>
//       {size.width > 0 && (
//         <ScatterChart
//           width={size.width}
//           height={size.height}
//           series={series}
//           margin={{ top: 30, right: 30, bottom: 60, left: 70 }}
//           xAxis={[
//             {
//               label: "Zone",
//               valueFormatter: (v: number) => zoneLabels[v] ?? "",
//             },
//           ]}
//           yAxis={[
//             {
//               label: "Time (24h)",
//               valueFormatter: (v: number) => timeLabels[v] ?? "",
//             },
//           ]}
//           grid={{ horizontal: true }}
//         />
//       )}
//     </Box>
//   );
// };

// export default DynamicViolationScatterChart;

//====================================================pdf aligned
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

/* ---------------- Types ---------------- */

export interface ViolationData {
  time: string; // e.g. "10:00"
  zone: string; // e.g. "Zone A"
  count: number;
}

interface Props {
  data: ViolationData[];
  title?: string;
  colors?: string[];
  reverseY?: boolean; // matches PDF `y.reverse`
}

/* ---------------- Component ---------------- */

const DynamicViolationScatterChart: React.FC<Props> = ({
  data,
  title = "Violations Scatter",
  reverseY = false,
  colors = ["#f44336", "#2196f3", "#4caf50", "#ff9800"],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 340 });

  /* ---------------- Resize observer ---------------- */
  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: 340, // fixed like PDF
        });
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------------- Axis labels ---------------- */
  const zoneLabels = useMemo(
    () => Array.from(new Set(data.map((d) => d.zone))),
    [data],
  );

  const timeLabels = useMemo(() => {
    const times = Array.from(new Set(data.map((d) => d.time))).sort();
    return reverseY ? [...times].reverse() : times;
  }, [data, reverseY]);

  /* ---------------- Series (PDF-aligned) ---------------- */
  const series = useMemo(() => {
    const grouped = new Map<string, ViolationData[]>();

    data.forEach((d) => {
      if (!grouped.has(d.zone)) grouped.set(d.zone, []);
      grouped.get(d.zone)!.push(d);
    });

    return Array.from(grouped.entries()).map(([zone, items], index) => ({
      id: zone,
      label: zone,
      color: colors[index % colors.length],
      markerSize: isMobile ? 16 : 20, // visually close to PDF dots
      data: items
        .filter((i) => i.count > 0)
        .map((item) => ({
          x: zoneLabels.indexOf(item.zone),
          y: timeLabels.indexOf(item.time),
          z: item.count, // 🔥 SAME AS PDF `count`
        })),
      valueFormatter: (value: { x: number; y: number; z?: number } | null) =>
        value?.z != null ? `Count: ${value.z}` : "",
    }));
  }, [data, colors, isMobile, zoneLabels, timeLabels]);

  console.log("series", series);
  /* ---------------- Empty state ---------------- */
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

  /* ---------------- Render ---------------- */
  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 2,
        background: "#fff",
      }}
    >
      <Typography fontWeight={600} mb={1}>
        {title}
      </Typography>

      {size.width > 0 && (
        <ScatterChart
          width={size.width}
          height={size.height}
          series={series}
          margin={{ top: 20, right: 30, bottom: 60, left: 70 }}
          xAxis={[
            {
              label: "Zone",
              min: -0.5,
              max: zoneLabels.length - 0.5,
              valueFormatter: (v: number) => zoneLabels[v] ?? "",
            },
          ]}
          yAxis={[
            {
              label: "Time",
              min: -0.5,
              max: timeLabels.length - 0.5,
              valueFormatter: (v: number) => timeLabels[v] ?? "",
            },
          ]}
          grid={{ horizontal: true, vertical: true }}
          sx={{
            "& .MuiChartsAxis-label": { fontWeight: 600 },
            "& text": { userSelect: "none" },
          }}
        />
      )}
    </Box>
  );
};

export default DynamicViolationScatterChart;
