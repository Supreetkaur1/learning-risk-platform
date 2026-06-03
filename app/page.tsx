export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-5xl font-bold">
        Learning Risk Identification Platform
      </h1>

      <p className="mt-6 text-lg max-w-3xl">
        Identify learning risks early through structured
        classroom observations and actionable teacher insights.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="/assessment"
          className="rounded bg-black px-6 py-3 text-white"
        >
          Try Live Demo
        </a>

        <a
          href="/dashboard"
          className="rounded border px-6 py-3"
        >
          Dashboard
        </a>
      </div>
    </main>
  );
}