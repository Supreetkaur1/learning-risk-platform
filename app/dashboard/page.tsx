"use client";

import { useEffect, useState } from "react";

import DashboardStats from "./DashboardStats";
import AssessmentTable from "./AssessmentTable";
import InterventionQueue from "./InterventionQueue";
import AIInsights from "./AIInsights";
import RiskDistribution from "./RiskDistribution";

export default function DashboardPage() {
  const [assessments, setAssessments] =
    useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(
        "assessments"
      ) || "[]"
    );

    setAssessments(data);
  }, []);

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-50
        via-white
        to-green-50
        p-8
      "
    >
      <div className="max-w-7xl mx-auto">

        <h1
          className="
            text-5xl
            font-bold
            text-blue-700
            mb-8
          "
        >
          Learning Analytics Dashboard
        </h1>

        <DashboardStats
          assessments={assessments}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          <RiskDistribution
            assessments={assessments}
          />

          <AssessmentTable
            assessments={assessments}
          />

        </div>

        <div className="mt-8">

          <InterventionQueue
            assessments={assessments}
          />

        </div>

        <div className="mt-8">
          <AIInsights />
        </div>

      </div>
    </main>
  );
}