// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import {
//   CardContent,
//   useTheme,
//   useMediaQuery,
//   Typography,
//   Box,
// } from "@mui/material";
// import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
// import { DefaultizedPieValueType } from "@mui/x-charts/models";

// export interface PieDataItem {
//   label: string;
//   value: number;
//   color: string;
// }

// export interface DynamicPieChartProps {
//   zoneName?: string;
//   data: PieDataItem[];
//   count: number;
// }

// const DynamicPieChart: React.FC<DynamicPieChartProps> = ({
//   data,
//   zoneName,
//   count,
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [size, setSize] = useState<number>(0);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // ✅ Efficient resize observer (avoids flicker)
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const observer = new ResizeObserver(([entry]) => {
//       const { width, height } = entry.contentRect;
//       // Only update if change is significant to prevent flicker
//       setSize((prev) => {
//         const newSize = Math.floor(Math.min(width, height));
//         return Math.abs(newSize - prev) > 5 ? newSize : prev;
//       });
//     });

//     observer.observe(container);
//     return () => observer.disconnect();
//   }, []);

//   const TOTAL = data.reduce((sum, item) => sum + item.value, 0);
//   const getArcLabel = (params: DefaultizedPieValueType) =>
//     `${((params.value / TOTAL) * 100).toFixed(0)}%`;

//   return (
//     <CardContent
//       ref={containerRef}
//       sx={{
//         width: "100%",
//         height: "100%",
//         p: "0px !important",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         "&:last-child": { paddingBottom: 0 },
//       }}
//     >
//       {/* {zoneName && (
//         <Typography
//           variant="subtitle1"
//           sx={{
//             fontWeight: 600,
//             mb: 1,
//             textAlign: "center",
//           }}
//         >
//           {zoneName}
//         </Typography>
//       )} */}

//       {/* Chart Wrapper */}
//       <Box
//         sx={{
//           flex: 1,
//           width: "100%",
//           height: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           overflow: "hidden",
//           bgcolor: "beige",
//           flexDirection: "column",
//         }}
//       >
//         {size > 0 && (
//           <>
//             <PieChart
//               series={[
//                 {
//                   data,
//                   outerRadius: size && count ? Math.max(size / count, 40) : 40,
//                   // outerRadius: size / count,
//                   arcLabel: getArcLabel,
//                   paddingAngle: 0,
//                 },
//               ]}
//               colors={data.map((item) => item.color)}
//               height={size}
//               sx={{
//                 "& .MuiChartsLegend-root": {
//                   display: "none !important",
//                 },
//                 [`& .${pieArcLabelClasses.root}`]: {
//                   fill: "white",
//                   fontSize: isMobile ? 10 : 13,
//                   fontWeight: 600,
//                 },
//                 "& path": {
//                   stroke: "#fff",
//                   strokeWidth: 2,
//                 },
//                 padding: 0,
//               }}
//               margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
//             />
//             <Typography
//               variant="subtitle2"
//               sx={{ fontWeight: 600, textAlign: "center" }}
//             >
//               PPE Compliance
//             </Typography>
//           </>
//         )}
//       </Box>
//     </CardContent>
//   );
// };

// export default DynamicPieChart;

"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  CardContent,
  useTheme,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType } from "@mui/x-charts/models";

export interface PieDataItem {
  label: string;
  value: number;
  color: string;
}

export interface DynamicPieChartProps {
  carttitle: string;
  data: PieDataItem[];
  count: number;
}

const DynamicPieChart: React.FC<DynamicPieChartProps> = ({
  data,
  carttitle,
  count,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setContainerSize((prev) => {
        const newWidth = Math.floor(width);
        const newHeight = Math.floor(height);
        if (
          Math.abs(newWidth - prev.width) > 5 ||
          Math.abs(newHeight - prev.height) > 5
        ) {
          return { width: newWidth, height: newHeight };
        }
        return prev;
      });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const TOTAL = data.reduce((sum, item) => sum + item.value, 0);
  const getArcLabel = (params: DefaultizedPieValueType) =>
    `${((params.value / TOTAL) * 100).toFixed(0)}%`;

  // Calculate optimal chart size based on container
  const chartSize = Math.min(containerSize.width, containerSize.height);
  const outerRadius = count ? Math.max(chartSize / count, 40) : 40;

  return (
    <CardContent
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        p: "0px !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        justifyContent: "center",
        "&:last-child": { paddingBottom: 0 },
      }}
    >
      {/* Chart Wrapper - centered with exact size */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          bgcolor: "beige",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {chartSize > 0 && (
          <>
            <PieChart
              series={[
                {
                  data,
                  outerRadius,
                  arcLabel: getArcLabel,
                  paddingAngle: 0,
                },
              ]}
              colors={data.map((item) => item.color)}
              width={outerRadius * 2}
              height={outerRadius * 2}
              sx={{
                "& .MuiChartsLegend-root": {
                  display: "none !important",
                },
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontSize: isMobile ? 10 : 13,
                  fontWeight: 600,
                },
                "& path": {
                  stroke: "#fff",
                  strokeWidth: 2,
                },
              }}
              margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, textAlign: "center" }}
            >
              {carttitle}
            </Typography>
          </>
        )}
      </Box>
    </CardContent>
  );
};

export default DynamicPieChart;
