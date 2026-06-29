import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function InsuranceStatusChart({ patients }) {

  const verified = patients.filter(
    (patient) => patient.insuranceStatus === "Verified"
  ).length;

  const pending = patients.filter(
    (patient) => patient.insuranceStatus === "Pending"
  ).length;

  const rejected = patients.filter(
    (patient) => patient.insuranceStatus === "Rejected"
  ).length;

  const data = [
    { name: "Verified", value: verified },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
  ];

  const COLORS = [
    "#22c55e",
    "#eab308",
    "#ef4444",
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-6">
        Insurance Verification Status
      </h2>

      <div className="h-84">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default InsuranceStatusChart;