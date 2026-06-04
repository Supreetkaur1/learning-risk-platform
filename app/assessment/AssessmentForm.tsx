"use client";

import { useState } from "react";

import {
  calculateRisk,
  getStatus,
  getRecommendation,
} from "@/lib/risk-engine";

import {
  QUESTIONS,
  OPTIONS,
} from "./questions";

export default function AssessmentForm() {
  const [studentName, setStudentName] =
    useState("");

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState(Array(QUESTIONS.length).fill(3));

  const [result, setResult] =
    useState<any>();

  const [loadingPlan, setLoadingPlan] =
    useState(false);

  const [aiPlan, setAiPlan] =
    useState("");

  const progress =
    ((currentQuestion + 1) /
      QUESTIONS.length) *
    100;

  function updateAnswer(
    value: number
  ) {
    const copy = [...answers];
    copy[currentQuestion] = value;
    setAnswers(copy);
  }

  function nextQuestion() {
    if (
      currentQuestion <
      QUESTIONS.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        currentQuestion - 1
      );
    }
  }

  function calculate() {
    if (!studentName.trim()) {
      alert("Please enter student name");
      return;
    }

    const score =
      calculateRisk(answers);

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

      {/* PROGRESS */}

      <div className="mb-8">

        <div className="flex justify-between mb-2">

          <span className="font-medium">
            Question {currentQuestion + 1}
          </span>

          <span className="text-gray-500">
            {QUESTIONS.length}
          </span>

        </div>

        <div className="h-3 bg-gray-200 rounded-full">

          <div
            className="
              h-3
              bg-gradient-to-r
              from-blue-600
              to-green-500
              rounded-full
              transition-all
              duration-300
            "
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* QUESTION CARD */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-xl
        p-10
        min-h-[420px]
      "
      >
        <div className="mb-6">

          <span
            className="
            bg-blue-100
            text-blue-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
          "
          >
            {
              QUESTIONS[
                currentQuestion
              ].category
            }
          </span>

        </div>

        <h2
          className="
          text-3xl
          font-bold
          text-gray-800
          leading-relaxed
          mb-12
        "
        >
          {
            QUESTIONS[
              currentQuestion
            ].question
          }
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {OPTIONS.map(
            (option) => (
              <button
                key={option.value}
                onClick={() =>
                  updateAnswer(
                    option.value
                  )
                }
                className={`
                  p-5
                  rounded-2xl
                  border-2
                  text-left
                  transition-all
                  ${
                    answers[
                      currentQuestion
                    ] ===
                    option.value
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-blue-300"
                  }
                `}
              >
                <div className="font-semibold text-lg">
                  {option.label}
                </div>
              </button>
            )
          )}

        </div>

        <div className="flex justify-between mt-12">

          <button
            onClick={
              previousQuestion
            }
            disabled={
              currentQuestion === 0
            }
            className="
              px-6
              py-3
              rounded-xl
              border
              disabled:opacity-40
            "
          >
            Previous
          </button>

          {currentQuestion ===
          QUESTIONS.length - 1 ? (
            <button
              onClick={
                calculate
              }
              className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-8
                py-3
                rounded-xl
                font-semibold
              "
            >
              Generate Assessment
            </button>
          ) : (
            <button
              onClick={
                nextQuestion
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-8
                py-3
                rounded-xl
                font-semibold
              "
            >
              Next
            </button>
          )}

        </div>

      </div>

      {/* RESULTS */}

      {result && (
        <div
          className="
          mt-12
          bg-white
          rounded-3xl
          shadow-xl
          p-10
        "
        >
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
                text-white
                px-6
                py-3
                rounded-xl
              "
            >
              {loadingPlan
                ? "Generating..."
                : "View Recommended Action Plan"}
            </button>
          )}

          {aiPlan && (
            <div
              className="
              mt-8
              bg-gradient-to-r
              from-blue-50
              to-green-50
              border
              border-blue-100
              rounded-2xl
              p-6
            "
            >
              <h3 className="text-2xl font-bold mb-4">
                ✨ AI Recommended Action Plan
              </h3>

              <div className="whitespace-pre-wrap leading-8">
                {aiPlan}
              </div>
            </div>
          )}

          <button
            onClick={
              saveAssessment
            }
            className="
              mt-8
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-3
              rounded-xl
            "
          >
            Save Assessment
          </button>

        </div>
      )}

    </div>
  );
}