export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-5xl font-bold">
        Learning Risk Identification Platform
      </h1>

      <p className="mt-6 text-lg">
        Early classroom support through structured teacher observations.
      </p>

      <div className="mt-8">
        <a
          href="/dashboard"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Open Dashboard
        </a>
      </div>
    </main>
  );
}