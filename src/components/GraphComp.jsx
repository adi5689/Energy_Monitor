import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";



const GraphComp = ({ data }) => {
  const numericValues = data.map((item) => {
    const parsedValue = parseFloat(item.value);
    return !isNaN(parsedValue) ? parsedValue + Math.sign(parsedValue) * 0.0 : undefined;
  }).filter(value => value !== undefined);

  const yAxisDomain = [
    Math.floor(Math.min(0, ...numericValues)),
    Math.ceil(Math.max(0, ...numericValues)),
  ];

  const yAxisInterval = 2; // Set the desired interval between ticks
  const yAxisTickCount = Math.ceil((yAxisDomain[1] - yAxisDomain[0]) / yAxisInterval);

  data = data.map((item) => {
    return {
      name: item.name,
      value: item.value,
      fill:
        item.name === "BATT"
          ? item.value < 0
            ? "#FF0000"
            : "#00BEFF"
          : item.name === "SOLAR"
          ? "#C70039"
          : item.name === "HOME"
          ? "#FFD500"
          : item.name === "GRID"
          ? item.value > 0
            ? "#808080"
            : "#000000"
          : item.name === "SURPLUS"
          ? item.value ? "orange"
          : "red": null
    };
  });

  console.log(data);

  return (
    <ResponsiveContainer height={300} className="mb-15 w-[350px] lg:w-[100%] ">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fill: "white", fontSize: 14, fontWeight: "500" }}
        />
        <YAxis
          tick={{ fill: "white", fontSize: 14, fontWeight: "500" }}
          domain={yAxisDomain}
          interval={yAxisInterval}
          tickFormatter={value => value}
          tickCount={yAxisTickCount}
          hide={true}
        />
        <Tooltip
          itemStyle={{ color: "white" }}
          labelStyle={{ background: "none" }}
          contentStyle={{
            backgroundColor: "#191970",
            color: "white",
            fontWeight: "bold",
          }}
        />
        <Bar dataKey="value" />
        <ReferenceLine y={0} stroke="white" strokeDasharray="3 3" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraphComp;

