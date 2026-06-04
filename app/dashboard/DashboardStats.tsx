interface Props {
  assessments: any[];
}

export default function DashboardStats({
  assessments,
}: Props) {
  const total = assessments.length;

  const onTrack =
    assessments.filter(
      (a) => a.status === "On Track"
    ).length;

  const monitoring =
    assessments.filter(
      (a) => a.status === "Monitoring Required"
    ).length;

  const needHelp =
    assessments.filter(
      (a) =>
        a.status === "Need Help" ||
        a.status === "Might Need Help"
    ).length;

  const cards = [
    {
      title: "Total Students",
      value: total,
      bg: "bg-blue-50",
    },
    {
      title: "On Track",
      value: onTrack,
      bg: "bg-green-50",
    },
    {
      title: "Monitoring",
      value: monitoring,
      bg: "bg-orange-50",
    },
    {
      title: "Need Help",
      value: needHelp,
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.bg} rounded-3xl p-6 shadow-md`}
        >
          <p className="text-gray-500">
            {card.title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}