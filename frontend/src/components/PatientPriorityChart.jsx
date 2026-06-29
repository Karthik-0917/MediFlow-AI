import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function PatientPriorityChart({ patients }) {

  const emergency = patients.filter(
    (patient) => patient.priority === "Emergency"
  ).length;

  const critical = patients.filter(
    (patient) => patient.priority === "Critical"
  ).length;

  const high = patients.filter(
    (patient) => patient.priority === "High"
  ).length;

  const moderate = patients.filter(
    (patient) => patient.priority === "Moderate"
  ).length;

  const data = [
  { name: "Emergency", value: emergency },
  { name: "Critical", value: critical },
  { name: "High", value: high },
  { name: "Moderate", value: moderate },
];

  const COLORS = [
    "#9333ea", // Emergency (Purple)
    "#ef4444", // Critical (Red)
    "#f97316", // High (Orange)
    "#eab308", // Moderate (Yellow)
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-6">
        Patient Priority Distribution
      </h2>

      <div className="h-84">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label={({ value }) => value}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
  formatter={(value, name) => [
    `${value} Patients`,
    name,
  ]}
/>
            <Legend
  wrapperStyle={{
    fontSize: 14,
    paddingTop: 15,
  }}
/>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default PatientPriorityChart;