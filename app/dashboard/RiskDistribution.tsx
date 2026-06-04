"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  assessments: any[];
}

export default function RiskDistribution({
  assessments,
}: Props) {
  const onTrack = assessments.filter(
    (a) => a.status === "On Track"
  ).length;

  const monitoring = assessments.filter(
    (a) => a.status === "Monitoring Required"
  ).length;

  const needHelp = assessments.filter(
    (a) =>
      a.status === "Need Help" ||
      a.status === "Might Need Help"
  ).length;

  const excellent = assessments.filter(
    (a) => a.score >= 90
  ).length;

  const data = [
    {
      name: "Excellent",
      value: excellent,
    },
    {
      name: "On Track",
      value: onTrack,
    },
    {
      name: "Monitoring",
      value: monitoring,
    },
    {
      name: "Need Help",
      value: needHelp,
    },
  ].filter((item) => item.value > 0);

  const COLORS = [
    "#3B82F6", // blue
    "#22C55E", // green
    "#F59E0B", // orange
    "#EF4444", // red
  ];

  if (assessments.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Risk Distribution
        </h2>

        <p className="text-gray-500">
          No assessment data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Risk Distribution
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              dataKey="value"
              label
            >
              {data.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-4 text-center text-gray-600">
        Total Students:{" "}
        <span className="font-semibold">
          {assessments.length}
        </span>
      </div>

    </div>
  );
}