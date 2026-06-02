import StudentTable from "@/components/StudentTable";

export default function Dashboard() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        Teacher Dashboard
      </h1>

      <div className="mt-8 space-y-2">
        <p>🟢 On Track: 31</p>
        <p>🟡 Monitor: 8</p>
        <p>🔴 Needs Support: 3</p>
      </div>

      <StudentTable />
    </main>
  );
}