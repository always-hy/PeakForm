"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ActivityCard() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("weight");

  useEffect(() => {
    const uuid = localStorage.getItem("user_uuid");
    const fetchUserStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/user-stats/history?userUuid=${uuid}`,
          {
            method: "GET",
            credentials: "include", // Include session cookies
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user stats");
        }

        const data = await response.json();
        // Sort by date ascending
        const sortedData = [...data].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setUserData(sortedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  // Function to format dates for better display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-black text-white">
        Loading user statistics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-black text-white">
        Error: {error}
      </div>
    );
  }

  const chartConfigs = [
    {
      id: "weight",
      title: "Weight (kg)",
      dataKey: "weight",
      stroke: "#05A31D",
      domain: ["dataMin - 1", "dataMax + 1"],
    },
    {
      id: "height",
      title: "Height (cm)",
      dataKey: "height",
      stroke: "#05A31D",
      domain: ["dataMin - 1", "dataMax + 1"],
    },
    {
      id: "water",
      title: "Water Intake (L)",
      dataKey: "waterIntake",
      stroke: "#05A31D",
      domain: ["dataMin - 0.2", "dataMax + 0.2"],
    },
    {
      id: "calories",
      title: "Calories Burned",
      dataKey: "caloriesBurned",
      stroke: "#05A31D",
      domain: ["dataMin - 20", "dataMax + 20"],
    },
    {
      id: "duration",
      title: "Workout Duration (min)",
      dataKey: "workoutDuration",
      stroke: "#05A31D",
      domain: ["dataMin - 5", "dataMax + 5"],
    },
  ];

  // Chart component to avoid repetition
  const MetricChart = ({ config }) => {
    const { id, title, dataKey, stroke, domain } = config;

    return (
      <div className="bg-[#1C1C1C] border border-[#05A31D] rounded-lg p-4 shadow-lg">
        <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={userData}
              margin={{ top: 5, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fill: "#fff" }}
                stroke="#444"
              />
              <YAxis domain={domain} tick={{ fill: "#fff" }} stroke="#444" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1C1C1C",
                  borderColor: "#05A31D",
                  color: "#fff",
                }}
                labelFormatter={(value) => `Date: ${formatDate(value)}`}
                formatter={(value) => [`${value}`, `${title.split(" ")[0]}`]}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={stroke}
                strokeWidth={2}
                dot={{ fill: stroke, strokeWidth: 1 }}
                activeDot={{ r: 6, fill: stroke }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const selectedConfig = chartConfigs.find(
    (config) => config.id === selectedMetric
  );

  return (
    <div className="w-full bg-[#1C1C1C] p-6 rounded-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-white text-2xl font-bold">Activity Statistics</h2>
        <div className="flex items-center gap-2">
          <label
            htmlFor="metric-select"
            className="text-white text-sm font-medium"
          >
            Select Metric:
          </label>
          <select
            id="metric-select"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-[#1C1C1C] border border-[#05A31D] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#05A31D] focus:border-transparent"
          >
            {chartConfigs.map((config) => (
              <option key={config.id} value={config.id}>
                {config.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full">
        <MetricChart config={selectedConfig} />
      </div>
    </div>
  );
}
