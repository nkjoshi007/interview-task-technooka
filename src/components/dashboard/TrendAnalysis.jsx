import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TrendAnalysis = ({ data }) => {
  const [metric, setMetric] = useState("applications");

  const metrics = [
    { id: "applications", label: "Applications", color: "#0A84FF" },
    { id: "admissions", label: "Admissions", color: "#2AC4B3" },
    { id: "enrollments", label: "Enrollments", color: "#FF9F0A" },
  ];

  const activeMetric = metrics.find((m) => m.id === metric);

  return (
    <div className="rounded-lg shadow-card p-6 bg-gray-800 text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Year-over-Year Trends</h3>
        <div className="mt-3 sm:mt-0 flex space-x-2">
          {metrics.map((m) => (
            <button
              key={m.id}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                metric === m.id
                  ? "bg-primary-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setMetric(m.id)}
              style={{ borderColor: metric === m.id ? m.color : "transparent" }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#D1D5DB" }}
              tickLine={{ stroke: "#4B5563" }}
            />
            <YAxis
              tick={{ fill: "#D1D5DB" }}
              tickLine={{ stroke: "#4B5563" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                borderColor: "#374151",
                color: "#F9FAFB",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={metric}
              stroke={activeMetric.color}
              strokeWidth={3}
              dot={{ r: 4, fill: activeMetric.color, strokeWidth: 0 }}
              activeDot={{
                r: 6,
                fill: activeMetric.color,
                strokeWidth: 2,
                stroke: "#1F2937",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-400">
              Average {activeMetric.label}:
            </span>
            <span className="ml-2 text-primary-500 font-semibold">
              {data &&
                data.length > 0 &&
                Math.round(
                  data.reduce((sum, item) => sum + item[metric], 0) /
                    data.length
                ).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-400">Growth Rate:</span>
            {data && data.length > 0 && (
              <span
                className={`ml-2 font-semibold ${
                  (data[data.length - 1][metric] - data[0][metric]) /
                    data[0][metric] >
                  0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {(
                  ((data[data.length - 1][metric] - data[0][metric]) /
                    data[0][metric]) *
                  100
                ).toFixed(1)}
                %
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;
