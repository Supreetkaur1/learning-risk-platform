interface Props {
  assessments: any[];
}

export default function InterventionQueue({
  assessments,
}: Props) {
  const priority =
    assessments.filter(
      (a) =>
        a.status === "Need Help" ||
        a.status === "Might Need Help"
    );

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Intervention Priority
      </h2>

      <div className="space-y-4">
        {priority.map((student) => (
          <div
            key={student.studentName}
            className="
              border-l-4
              border-red-500
              bg-red-50
              rounded-xl
              p-4
            "
          >
            <div className="font-bold">
              {student.studentName}
            </div>

            <div>
              Risk Score: {student.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}