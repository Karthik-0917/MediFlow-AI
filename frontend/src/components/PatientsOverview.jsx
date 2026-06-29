import { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function PatientsOverview({ patients }) {

  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const now = new Date();

const filteredPatients = patients.filter((patient) => {

  const createdDate = new Date(patient.createdAt);

  if (selectedPeriod === "today") {

    return (
      createdDate.toDateString() ===
      now.toDateString()
    );

  }

  if (selectedPeriod === "week") {

    const oneWeekAgo = new Date();

    oneWeekAgo.setDate(now.getDate() - 7);

    return createdDate >= oneWeekAgo;

  }

  if (selectedPeriod === "month") {

    return (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    );

  }

  return true;

});

  const chartData = [
  {
    time: "Patients",
    patients: filteredPatients.length,
  },
  {
    time: "Critical",
    patients: filteredPatients.filter(
      (patient) =>
        patient.priority === "Critical" ||
        patient.priority === "Emergency"
    ).length,
  },
  {
    time: "Pending",
    patients: filteredPatients.filter(
      (patient) =>
        patient.insuranceStatus === "Pending"
    ).length,
  },
  {
    time: "Assigned",
    patients: filteredPatients.filter(
      (patient) => patient.assignedDoctor
    ).length,
  },
];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Patients Overview
      </h2>

      <div className="flex gap-2 mb-4">

        <button
  onClick={() => setSelectedPeriod("today")}
  className={`px-3 py-1 rounded-xl text-sm ${
    selectedPeriod === "today"
      ? "bg-cyan-100 text-cyan-700"
      : "bg-slate-100 text-slate-500"
  }`}
>
  Today
</button>

<button
  onClick={() => setSelectedPeriod("week")}
  className={`px-3 py-1 rounded-xl text-sm ${
    selectedPeriod === "week"
      ? "bg-cyan-100 text-cyan-700"
      : "bg-slate-100 text-slate-500"
  }`}
>
  This Week
</button>

<button
  onClick={() => setSelectedPeriod("month")}
  className={`px-3 py-1 rounded-xl text-sm ${
    selectedPeriod === "month"
      ? "bg-cyan-100 text-cyan-700"
      : "bg-slate-100 text-slate-500"
  }`}
>
  This Month
</button>

      </div>

      <div className="h-[360px] w-full">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData}>

            <CartesianGrid
  stroke="#e2e8f0"
  strokeDasharray="3 3"
  vertical={false}
/>

            <XAxis
  dataKey="time"
  tickLine={false}
  axisLine={false}
/>
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
  formatter={(value) => [`${value} Patients`, "Count"]}
  contentStyle={{
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  }}
/>

            <Bar
              dataKey="patients"
              fill="#3B82F6"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default PatientsOverview;