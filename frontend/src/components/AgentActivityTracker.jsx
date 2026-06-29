function AgentActivityTracker({
  criticalPatients,
  pendingApprovals,
  assignedDoctors,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mt-8">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Agent Activity Tracker
        </h2>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          Multi-Agent System Active
        </span>

      </div>

      <div className="space-y-4">

        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 flex items-center justify-between hover:shadow-sm transition">

          <div className="flex items-center gap-4">

            <span className="w-3 h-3 rounded-full bg-green-500"></span>

            <div>
              <p className="font-semibold text-slate-800">
                🚑 Emergency Agent analyzed{" "}
                <span className="text-red-600">
                  {criticalPatients}
                </span>{" "}
                critical patients
              </p>

              <p className="text-sm text-slate-500">
                Priority triage completed successfully
              </p>
            </div>

          </div>

          <span className="text-xs text-slate-400">
            Just now
          </span>

        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 flex items-center justify-between hover:shadow-sm transition">

          <div className="flex items-center gap-4">

            <span className="w-3 h-3 rounded-full bg-green-500"></span>

            <div>
              <p className="font-semibold text-slate-800">
                👨‍⚕️ Doctor Assignment Agent matched{" "}
                <span className="text-blue-600">
                  {assignedDoctors}
                </span>{" "}
                patients with specialists
              </p>

              <p className="text-sm text-slate-500">
                Intelligent doctor allocation completed
              </p>
            </div>

          </div>

          <span className="text-xs text-slate-400">
            1 min ago
          </span>

        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 flex items-center justify-between hover:shadow-sm transition">

          <div className="flex items-center gap-4">

            <span className="w-3 h-3 rounded-full bg-green-500"></span>

            <div>
              <p className="font-semibold text-slate-800">
                📄 Insurance Agent queued{" "}
                <span className="text-yellow-600">
                  {pendingApprovals}
                </span>{" "}
                case(s) for manual review
              </p>

              <p className="text-sm text-slate-500">
                Insurance validation completed
              </p>
            </div>

          </div>

          <span className="text-xs text-slate-400">
            2 mins ago
          </span>

        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 flex items-center justify-between hover:shadow-sm transition">

          <div className="flex items-center gap-4">

            <span className="w-3 h-3 rounded-full bg-green-500"></span>

            <div>
              <p className="font-semibold text-slate-800">
                🧠 Supervisor Agent published hospital workflow recommendation
              </p>

              <p className="text-sm text-slate-500">
                AI coordination cycle completed
              </p>
            </div>

          </div>

          <span className="text-xs text-slate-400">
            3 mins ago
          </span>

        </div>

      </div>

    </div>
  );
}

export default AgentActivityTracker;