interface Props {
  assessments: any[];
}

export default function AssessmentTable({
  assessments,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Recent Assessments
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {assessments.map((item) => (
            <tr
              key={item.studentName}
              className="border-b"
            >
              <td>{item.studentName}</td>
              <td>{item.score}</td>
              <td>{item.status}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}