

import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";

type Series = {
  label: string;
  data: number[];
  color: string;
  showMark: boolean;
};

type Props = Readonly<{
  series: Series[];
  xAxisDates: string[];
  xAxisTimes: string[];
  granularity: "hour" | "weekday" | "week";
}>;
const xAxisLabelMap = {
  hour: "Time (Hourly)",
  weekday: "Time (Day)",
  week: "Time (Weekly)",
};


export default function TimeScaleLineChart({ series, xAxisDates, xAxisTimes, granularity }: Props) {
const xAxisKeys = ["", ...xAxisTimes.map((time, i) => `${xAxisDates[i]}|${time}`)];
const paddedSeries = series.map((s) => ({
  ...s,
  data: [null, ...s.data],
}));
const allValues = series.flatMap((s) => s.data);
const allZero = allValues.length > 0 && allValues.every((v) => v === 0);
const hasNoData = allValues.length === 0 || allZero;

  return (
  <Box sx={{ width: "100%",  display: "flex", alignItems: "center", justifyContent: "center" }}>
    {hasNoData ? (
      <Box sx={{ fontSize: 16, color: "#888" }}>
        No data available
      </Box>
    ) : (
      <LineChart
        height={450}
        skipAnimation
        series={paddedSeries}
        xAxis={[
          {
            scaleType: "point",
            data: xAxisKeys,
            label: xAxisLabelMap[granularity],
            tickLabelStyle: {
              fontSize: 8,
              textAnchor: "middle",
            },
             labelStyle: {
      transform: "translateY(20px)", // fine-tune spacing
    },
          },
        ]}
        yAxis={[
          {
            width: 70,
            label: "Count",
            min: 0,
          },
        ]}
        margin={{ right: 40  }}
        slots={{
          axisTickLabel: ({ text, x, y }: any) => {
            const isXAxis = (text ?? "").includes("|");
            if (!isXAxis) {
              return (
                <g transform={`translate(${x}, ${y})`}>
                  <text textAnchor="end" dominantBaseline="central" fontSize={12}>
                    {text}
                  </text>
                </g>
              );
            }
            const [date, time] = (text ?? "").split("|");
            return (
              <g transform={`translate(${x}, ${y})`}>
                <text textAnchor="middle" dominantBaseline="hanging">
                  <tspan x="0" dy="0" fontSize={10}>
                    {time}
                  </tspan>
                  <tspan x="0" dy="11" fontSize={10}>
                    {date}
                  </tspan>
                </text>
              </g>
            );
          },
        }}
        sx={{
          "& .MuiLineElement-root": {
            strokeWidth: 4,
          },
          "& .MuiChartsAxis-label": {
            fontWeight: 500,
          },
        }}
      />
    )}
  </Box>
);

}