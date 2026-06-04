import AssessmentForm from "./AssessmentForm";

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">

      {/* HEADER */}

      <section className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-10">

          <div>
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold text-sm mb-4">
              Teacher-Led Early Screening
            </div>

            <h1 className="text-5xl font-bold text-blue-700">
              Early Learning Risk Assessment
            </h1>

            <p className="mt-3 text-xl text-gray-600 max-w-3xl">
              Identify learning risks early and generate classroom-focused
              intervention plans powered by AI.
            </p>
          </div>

        </div>
      </section>

      <AssessmentForm />

    </main>
  );
}