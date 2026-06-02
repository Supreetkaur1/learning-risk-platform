export default function StudentTable() {
  const students = [
    { name: "Aarav", status: "Monitor" },
    { name: "Simran", status: "On Track" },
    { name: "Kabir", status: "Needs Support" },
  ];

  return (
    <table className="border-collapse border mt-6 w-full">
      <thead>
        <tr>
          <th className="border p-2">Student</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student.name}>
            <td className="border p-2">{student.name}</td>
            <td className="border p-2">{student.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}