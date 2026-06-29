function AIInsightsPanel({
  patients,
  criticalPatients,
  pendingApprovals,
  totalRevenue,
}) {
  // Calculate department-wise patient count
  const specialtyCounts = {};

  patients.forEach((patient) => {
    const specialty = patient.recommendedSpecialty;

    if (
      specialty &&
      specialty !== "Not Assigned"
    ) {
      specialtyCounts[specialty] =
        (specialtyCounts[specialty] || 0) + 1;
    }
  });

  // Find department with highest load
  const topSpecialty =
    Object.entries(specialtyCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];

  const topDepartment =
    topSpecialty?.[0] || "No Department";

  const topDepartmentCount =
    topSpecialty?.[1] || 0;

  // Insurance verification rate
  const verifiedInsurance = patients.filter(
    (patient) =>
      patient.insuranceStatus === "Verified"
  ).length;

  const verificationRate =
    patients.length > 0
      ? Math.round(
          (verifiedInsurance / patients.length) * 100
        )
      : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          ✨ AI Insights
        </h2>

        <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full font-semibold">
          AI Powered
        </span>
      </div>

      <div className="space-y-4">

        <div className="bg-red-50 rounded-2xl p-4">
          <p className="font-semibold text-slate-800">
            🚨 {criticalPatients} critical patients require immediate attention.
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Patients are waiting in the emergency queue.
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="font-semibold text-slate-800">
            🩺 {topDepartment} has the highest patient load.
          </p>

          <p className="text-sm text-slate-500 mt-1">
            {topDepartmentCount} patients require specialist care.
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-4">
          <p className="font-semibold text-slate-800">
            🛡 Insurance verification rate is {verificationRate}%.
          </p>

          <p className="text-sm text-slate-500 mt-1">
            {pendingApprovals} approvals are still pending.
          </p>
        </div>

        <div className="bg-yellow-50 rounded-2xl p-4">
          <p className="font-semibold text-slate-800">
            💰 Today's revenue is ₹{totalRevenue.toLocaleString()}.
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Revenue generated from patient billing.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AIInsightsPanel;