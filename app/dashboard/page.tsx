"use client";

import { useEffect, useState } from "react";

type Assessment = {
  studentName: string;
  score: number;
  status: string;
  date: string;
};

export default function Dashboard() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("assessments") || "[]"
    );

    setAssessments(saved);
  }, []);

  const excellent = assessments.filter(
    (s) => s.status === "Excellent"
  );

  const onTrack = assessments.filter(
    (s) => s.status === "On Track"
  );

  const monitoring = assessments.filter(
    (s) => s.status === "Monitoring Required"
  );

  const mightNeedHelp = assessments.filter(
    (s) => s.status === "Might Need Help"
  );

  const needHelp = assessments.filter(
    (s) => s.status === "Need Help"
  );

  const categories = [
    {
      title: "Excellent",
      students: excellent,
    },
    {
      title: "On Track",
      students: onTrack,
    },
    {
      title: "Monitoring Required",
      students: monitoring,
    },
    {
      title: "Might Need Help",
      students: mightNeedHelp,
    },
    {
      title: "Need Help",
      students: needHelp,
    },
  ];

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Teacher Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        <SummaryCard
          title="Excellent"
          count={excellent.length}
        />

        <SummaryCard
          title="On Track"
          count={onTrack.length}
        />

        <SummaryCard
          title="Monitoring"
          count={monitoring.length}
        />

        <SummaryCard
          title="Might Need Help"
          count={mightNeedHelp.length}
        />

        <SummaryCard
          title="Need Help"
          count={needHelp.length}
        />
      </div>

      {categories.map((category) => (
        <div
          key={category.title}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold mb-3">
            {category.title}
          </h2>

          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">
                  Student
                </th>

                <th className="border p-2">
                  Score
                </th>

                <th className="border p-2">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {category.students.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="border p-4 text-center"
                  >
                    No students
                  </td>
                </tr>
              ) : (
                category.students.map(
                  (student, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {student.studentName}
                      </td>

                      <td className="border p-2">
                        {student.score.toFixed(
                          0
                        )}
                      </td>

                      <td className="border p-2">
                        {student.date}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      ))}
    </main>
  );
}

function SummaryCard({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div className="text-3xl font-bold">
        {count}
      </div>
    </div>
  );
}