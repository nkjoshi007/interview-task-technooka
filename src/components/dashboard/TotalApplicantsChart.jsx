import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TotalApplicantsChart = ({ data }) => {
  const [chartType, setChartType] = useState("monthly");

  // Process data for cumulative view if needed
  const processedData =
    chartType === "cumulative"
      ? data.map((item, index, array) => ({
          ...item,
          applications: array
            .slice(0, index + 1)
            .reduce((sum, i) => sum + i.applications, 0),
          admissions: array
            .slice(0, index + 1)
            .reduce((sum, i) => sum + i.admissions, 0),
          enrollments: array
            .slice(0, index + 1)
            .reduce((sum, i) => sum + i.enrollments, 0),
        }))
      : data;

  return (
    <div className="rounded-lg shadow-card p-6 bg-gray-800 text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Total Applicants</h3>
        <div className="mt-3 sm:mt-0 flex space-x-2">
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              chartType === "monthly"
                ? "bg-primary-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setChartType("cumulative")}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              chartType === "cumulative"
                ? "bg-primary-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setChartType("monthly")}
          >
            Cumulative
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="month"
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
            <Bar
              dataKey="applications"
              name="Applications"
              fill="#0A84FF"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="admissions"
              name="Admissions"
              fill="#2AC4B3"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="enrollments"
              name="Enrollments"
              fill="#FF9F0A"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 bg-opacity-20 p-2 rounded-md">
          <p className="text-sm text-gray-400">Applications</p>
          <p className="text-xl font-semibold text-blue-400">
            {data
              .reduce((sum, item) => sum + item.applications, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-teal-50 bg-opacity-20 p-2 rounded-md">
          <p className="text-sm text-gray-400">Admissions</p>
          <p className="text-xl font-semibold text-teal-400">
            {data
              .reduce((sum, item) => sum + item.admissions, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-orange-50 bg-opacity-20 p-2 rounded-md">
          <p className="text-sm text-gray-400">Enrollments</p>
          <p className="text-xl font-semibold text-orange-400">
            {data
              .reduce((sum, item) => sum + item.enrollments, 0)
              .toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalApplicantsChart;
