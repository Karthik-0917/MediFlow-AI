import { useEffect, useState } from "react";

function SystemPerformance({ patients }) {
  const totalPatients = patients.length;

  const criticalPatients = patients.filter(
    (patient) =>
      patient.priority === "Critical" ||
      patient.priority === "Emergency"
  ).length;

  const pendingApprovals = patients.filter(
    (patient) =>
      patient.insuranceStatus === "Pending"
  ).length;

  const aiAssessments = patients.filter(
    (patient) =>
      patient.recommendedSpecialty &&
      patient.recommendedSpecialty !==
        "Not Assigned"
  ).length;

  const [lastSync, setLastSync] =
    useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setLastSync(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();

    const interval = setInterval(
      updateTime,
      60000
    );

    return () =>
      clearInterval(interval);
  }, []);

  const metrics = [
    {
      title: "AI Model Status",
      value: 98,
      color: "bg-emerald-500",
    },
    {
      title: "Database",
      value: 100,
      color: "bg-green-500",
    },
    {
      title: "API Services",
      value: 95,
      color: "bg-blue-500",
    },
    {
      title: "Storage",
      value: 82,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-bold text-slate-800 mb-6">
        System Performance
      </h2>

      <div className="space-y-5">

        {metrics.map((metric) => (
          <div key={metric.title}>
            <div className="flex justify-between mb-2">

              <span className="text-slate-700 font-medium">
                {metric.title}
              </span>

              <span className="text-slate-500">
                {metric.value}%
              </span>

            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full">

              <div
                className={`h-2 rounded-full ${metric.color}`}
                style={{
                  width: `${metric.value}%`,
                }}
              ></div>

            </div>
          </div>
        ))}

      </div>

      <div className="border-t border-slate-200 mt-8 pt-6">

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div className="bg-slate-50 rounded-2xl p-4">
            <p className="text-slate-500">
              Patients Processed
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-1">
              {totalPatients}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4">
            <p className="text-slate-500">
              Critical Cases
            </p>

            <p className="text-2xl font-bold text-red-600 mt-1">
              {criticalPatients}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4">
            <p className="text-slate-500">
              Pending Approvals
            </p>

            <p className="text-2xl font-bold text-orange-600 mt-1">
              {pendingApprovals}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4">
            <p className="text-slate-500">
              AI Recommendations
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-1">
              {aiAssessments}
            </p>
          </div>

        </div>

        <div className="flex justify-between items-center mt-6 text-sm">

          <span className="text-slate-500">
            Last Sync
          </span>

          <span className="font-medium text-slate-700">
            {lastSync}
          </span>

        </div>

      </div>

    </div>
  );
}

export default SystemPerformance;