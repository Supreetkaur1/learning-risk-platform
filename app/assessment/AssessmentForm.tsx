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
      "Can the student read age-appropriate text aloud?",
  },
  {
    category: "Reading Skills",
    question:
      "Can the student understand what they read?",
  },
  {
    category: "Attention",
    question:
      "Can the student stay focused for at least 10 minutes?",
  },
  {
    category: "Attention",
    question:
      "Does the student complete classroom activities?",
  },
  {
    category: "Instructions",
    question:
      "Can the student follow 2-3 step instructions?",
  },
  {
    category: "Instructions",
    question:
      "Can the student follow classroom routines independently?",
  },
  {
    category: "Writing",
    question:
      "Can the student write age-appropriate sentences?",
  },
  {
    category: "Writing",
    question:
      "Is the student's writing generally legible?",
  },
  {
    category: "Numeracy",
    question:
      "Can the student solve age-appropriate math problems?",
  },
  {
    category: "Numeracy",
    question:
      "Can the student recognize and work with numbers confidently?",
  },
];

const OPTIONS = [
  { label: "Always", value: 5 },
  { label: "Often", value: 4 },
  { label: "Sometimes", value: 3 },
  { label: "Rarely", value: 2 },
  { label: "Never", value: 1 },
];

export default function AssessmentForm() {
  const [studentName, setStudentName] =
    useState("");

  const [answers, setAnswers] =
    useState(Array(QUESTIONS.length).fill(3));

  const [result, setResult] =
    useState<any>();

  const [loadingPlan, setLoadingPlan] =
    useState(false);

  const [aiPlan, setAiPlan] =
    useState("");

  function updateAnswer(
    index: number,
    value: number
  ) {
    const copy = [...answers];
    copy[index] = value;
    setAnswers(copy);
  }

  function calculate() {
    if (!studentName.trim()) {
      alert("Please enter student name");
      return;
    }

    const score = calculateRisk(answers);

    setAiPlan("");

    setResult({
      score,
      status: getStatus(score),
      recommendations:
        getRecommendation(score),
    });
  }

  async function generateActionPlan() {
    if (loadingPlan) return;

    setLoadingPlan(true);

    try {
      const response = await fetch(
        "/api/action-plan",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            studentName,
            score: result.score,
            status: result.status,
            answers,
          }),
        }
      );

      const data =
        await response.json();

      setAiPlan(
        data.recommendation
      );
    } catch {
      setAiPlan(
        "Unable to generate action plan."
      );
    }

    setLoadingPlan(false);
  }

  function saveAssessment() {
    const existing = JSON.parse(
      localStorage.getItem(
        "assessments"
      ) || "[]"
    );

    const existingIndex =
      existing.findIndex(
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
      existing[existingIndex] =
        newRecord;
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
    <div className="max-w-5xl mx-auto px-8 py-12">

      {/* STUDENT INFO */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Student Information
        </h2>

        <input
          className="
            w-full
            border
            border-gray-200
            rounded-xl
            px-5
            py-4
            text-lg
            focus:ring-2
            focus:ring-blue-500
            outline-none
          "
          placeholder="Enter Student Name"
          value={studentName}
          onChange={(e) =>
            setStudentName(
              e.target.value
            )
          }
        />

      </div>

      {/* QUESTIONS */}

      {QUESTIONS.map(
        (q, index) => (
          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              shadow-md
              hover:shadow-xl
              transition
              p-6
              mb-6
            "
          >
            <div className="mb-3">
              <span className="
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
              ">
                {q.category}
              </span>
            </div>

            <h3 className="font-semibold text-lg mb-4">
              {index + 1}. {q.question}
            </h3>

            <div className="flex flex-wrap gap-3">

              {OPTIONS.map(
                (option) => (
                  <label
                    key={option.value}
                    className={`
                      px-4 py-2 rounded-full border
                      cursor-pointer transition
                      ${
                        answers[index] === option.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white hover:bg-gray-50"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      className="hidden"
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
                )
              )}

            </div>

          </div>
        )
      )}

      {/* GENERATE */}

      <button
        onClick={calculate}
        className="
          w-full
          bg-orange-500
          hover:bg-orange-600
          text-white
          font-semibold
          py-4
          rounded-2xl
          shadow-lg
          transition
        "
      >
        Generate Assessment
      </button>

      {/* RESULTS */}

      {result && (
        <div className="
          mt-12
          bg-white
          rounded-3xl
          shadow-xl
          p-10
        ">

          <h2 className="text-3xl font-bold mb-8">
            Assessment Result
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-blue-50 rounded-2xl p-6">
              <p className="text-gray-500">
                Student
              </p>

              <h3 className="text-2xl font-bold">
                {studentName}
              </h3>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6">
              <p className="text-gray-500">
                Risk Score
              </p>

              <h3 className="text-2xl font-bold">
                {result.score.toFixed(0)}
              </h3>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <p className="text-gray-500">
                Status
              </p>

              <h3 className="text-xl font-bold">
                {result.status}
              </h3>
            </div>

          </div>

          <h3 className="font-bold text-xl mb-3">
            Recommended Actions
          </h3>

          <ul className="list-disc pl-6 space-y-2">
            {result.recommendations.map(
              (item: string) => (
                <li key={item}>
                  {item}
                </li>
              )
            )}
          </ul>

          {[
            "Monitoring Required",
            "Might Need Help",
            "Need Help",
          ].includes(
            result.status
          ) && (
            <button
              onClick={
                generateActionPlan
              }
              disabled={
                loadingPlan
              }
              className="
                mt-8
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
              "
            >
              {loadingPlan
                ? "Generating..."
                : "View Recommended Action Plan"}
            </button>
          )}

          {aiPlan && (
            <div className="
              mt-8
              bg-gradient-to-r
              from-blue-50
              to-green-50
              border
              border-blue-100
              rounded-2xl
              p-6
            ">
              <h3 className="text-2xl font-bold mb-4">
                ✨ AI Recommended Action Plan
              </h3>

              <div className="whitespace-pre-wrap leading-8">
                {aiPlan}
              </div>
            </div>
          )}

          <button
            onClick={saveAssessment}
            className="
              mt-8
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              shadow-md
            "
          >
            Save Assessment
          </button>

        </div>
      )}

    </div>
  );
}