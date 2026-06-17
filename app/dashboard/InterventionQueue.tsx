interface Props {
  assessments: any[];
}

export default function InterventionQueue({
  assessments,
}: Props) {
  const priority = assessments
    .filter(
      (a) =>
        a.status === "Need Help" ||
        a.status === "Might Need Help"
    )
    .sort((a, b) => {
      // Need Help comes before Might Need Help
      if (
        a.status === "Need Help" &&
        b.status === "Might Need Help"
      ) {
        return -1;
      }

      if (
        a.status === "Might Need Help" &&
        b.status === "Need Help"
      ) {
        return 1;
      }

      // Within the same category, sort by increasing score
      return a.score - b.score;
    });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
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