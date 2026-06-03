import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      studentName,
      score,
      status,
      answers,
    } = await req.json();

    const prompt = `
You are an educational support specialist.

IMPORTANT:
- Do NOT diagnose learning disabilities.
- Do NOT provide medical advice.
- Only provide classroom-focused support recommendations.

Student Name: ${studentName}

Risk Score: ${score}

Risk Category: ${status}

Assessment Responses:
${JSON.stringify(answers)}

Generate:

1. Observed Learning Pattern

2. Recommended Classroom Actions
(4 bullet points)

3. Parent Support Suggestions
(3 bullet points)

4. Monitoring Strategy

Keep the response concise, practical, and teacher-friendly.
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    return Response.json({
      recommendation: response.text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        recommendation:
          "Unable to generate action plan at this time.",
      },
      {
        status: 500,
      }
    );
  }
}