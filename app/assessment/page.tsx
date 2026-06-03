"use client";

import { useState } from "react";
import {
  calculateRisk,
  getStatus,
  getRecommendation,
} from "@/lib/risk-engine";

const QUESTIONS = [
  {
    category: "Reading Skills",
    question:
      "Can the student read age-appropriate text aloud?"
  },
  {
    category: "Reading Skills",
    question:
      "Can the student understand what they read?"
  },
  {
    category: "Attention",
    question:
      "Can the student stay focused for at least 10 minutes?"
  },
  {
    category: "Attention",
    question:
      "Does the student complete classroom activities?"
  },
  {
    category: "Instructions",
    question:
      "Can the student follow 2-3 step instructions?"
  },
  {
    category: "Instructions",
    question:
      "Can the student follow classroom routines independently?"
  },
  {
    category: "Writing",
    question:
      "Can the student write age-appropriate sentences?"
  },
  {
    category: "Writing",
    question:
      "Is the student's writing generally legible?"
  },
  {
    category: "Numeracy",
    question:
      "Can the student solve age-appropriate math problems?"
  },
  {
    category: "Numeracy",
    question:
      "Can the student recognize and work with numbers confidently?"
  },
];

const OPTIONS = [
  { label: "Always", value: 5 },
  { label: "Often", value: 4 },
  { label: "Sometimes", value: 3 },
  { label: "Rarely", value: 2 },
  { label: "Never", value: 1 },
];

export default function AssessmentPage() {
  const [studentName, setStudentName] =
    useState("");

  const [answers, setAnswers] = useState(
    Array(QUESTIONS.length).fill(3)
  );

  const [result, setResult] = useState<any>();

  function updateAnswer(
    index: number,
    value: number
  ) {
    const copy = [...answers];
    copy[index] = value;
    setAnswers(copy);
  }

  function calculate() {
    const score = calculateRisk(answers);

    setResult({
      score,
      status: getStatus(score),
      recommendations:
        getRecommendation(score),
    });
  }

  function saveAssessment() {
    const existing = JSON.parse(
      localStorage.getItem(
        "assessments"
      ) || "[]"
    );

    const existingIndex = existing.findIndex(
  (item: any) =>
    item.studentName.toLowerCase() ===
    studentName.toLowerCase()
);

const newRecord = {
  studentName,
  score: result.score,
  status: result.status,
  date: new Date().toLocaleDateString(),
};

if (existingIndex >= 0) {
  existing[existingIndex] = newRecord;
} else {
  existing.push(newRecord);
}

    localStorage.setItem(
      "assessments",
      JSON.stringify(existing)
    );

    alert("Assessment Saved");
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        Early Learning Risk Assessment
      </h1>

      <input
        className="border p-3 w-full mb-8"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) =>
          setStudentName(e.target.value)
        }
      />

      {QUESTIONS.map((q, index) => (
        <div
          key={index}
          className="border rounded p-4 mb-4"
        >
          <p className="font-semibold">
            {index + 1}. {q.question}
          </p>

          <p className="text-sm text-gray-500 mb-2">
            {q.category}
          </p>

          <div className="flex flex-wrap gap-3">
            {OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-1"
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={
                    answers[index] ===
                    option.value
                  }
                  onChange={() =>
                    updateAnswer(
                      index,
                      option.value
                    )
                  }
                />

                {option.label}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={calculate}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Generate Assessment
      </button>

      {result && (
        <div className="mt-8 border rounded p-6">
          <h2 className="text-2xl font-bold">
            Assessment Result
          </h2>

          <p className="mt-3">
            Student: {studentName}
          </p>

          <p>
            Risk Score:{" "}
            {result.score.toFixed(0)}
          </p>

          <p>
            Status: {result.status}
          </p>

          <h3 className="mt-4 font-semibold">
            Recommended Actions
          </h3>

          <ul className="list-disc pl-6">
            {result.recommendations.map(
              (item: string) => (
                <li key={item}>{item}</li>
              )
            )}
          </ul>

          <button
            onClick={saveAssessment}
            className="mt-6 bg-green-600 text-white px-5 py-2 rounded"
          >
            Save Assessment
          </button>
        </div>
      )}
    </main>
  );
}