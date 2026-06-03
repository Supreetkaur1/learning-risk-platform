export function calculateRisk(scores: number[]) {
  const total = scores.reduce((a, b) => a + b, 0);

  return (total / (scores.length * 5)) * 100;
}

export function getStatus(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "On Track";
  if (score >= 60) return "Monitoring Required";
  if (score >= 40) return "Might Need Help";
  return "Need Help";
}

export function getRecommendation(score: number) {
  if (score >= 75) {
    return [
      "Continue current learning support.",
      "Monitor progress during regular assessments."
    ];
  }

  if (score >= 50) {
    return [
      "Provide additional classroom support.",
      "Monitor progress weekly."
    ];
  }

  return [
    "Schedule targeted intervention sessions.",
    "Consider parent engagement and closer monitoring."
  ];
}