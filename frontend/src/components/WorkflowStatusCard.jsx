function WorkflowStatusCard({ patients }) {

  const criticalPatients = patients.filter(
  (patient) =>
    patient.priority === "Critical" ||
    patient.priority === "Emergency"
).length;

const assignedDoctors = patients.filter(
  (patient) => patient.assignedDoctor
).length;

const pendingInsurance = patients.filter(
  (patient) => patient.insuranceStatus === "Pending"
).length;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mt-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Live Workflow Status
      </h2>

      <div className="space-y-4 relative">

        <div className="relative flex items-center justify-between bg-slate-50 border border-slate-200 p-5 rounded-2xl">

  <div className="flex items-center gap-4">

    <div className="relative">

  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold animate-pulse">
    ●
  </div>

  <div className="absolute left-1/2 top-10 -translate-x-1/2 w-0.5 h-16 bg-slate-300"></div>

</div>

    <div>
      <p className="font-semibold text-slate-800">
        Patient Intake Processing
      </p>

      <p className="text-sm text-slate-500">
        Patient registration and demographic validation
      </p>
    </div>

  </div>

  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
    {patients.length > 0 ? "Active" : "Idle"}
  </span>

</div>

        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-5 rounded-2xl">

  <div className="flex items-center gap-4">

    <div className="relative">

  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold animate-pulse">
    ●
  </div>

  <div className="absolute left-1/2 top-10 -translate-x-1/2 w-0.5 h-16 bg-slate-300"></div>

</div>

    <div>
      <p className="font-semibold text-slate-800">
        AI Emergency Prioritization
      </p>

      <p className="text-sm text-slate-500">
        AI triage and severity classification
      </p>
    </div>

  </div>

  <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold">
    {criticalPatients > 0
      ? `${criticalPatients} Critical Cases`
      : "Normal"}
  </span>

</div>

       <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-5 rounded-2xl">

  <div className="flex items-center gap-4">

    <div className="relative">

  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold animate-pulse">
    ●
  </div>

  <div className="absolute left-1/2 top-10 -translate-x-1/2 w-0.5 h-16 bg-slate-300"></div>

</div>

    <div>
      <p className="font-semibold text-slate-800">
        Doctor Assignment
      </p>

      <p className="text-sm text-slate-500">
        Specialist allocation based on clinical priority
      </p>
    </div>

  </div>

  <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
    {assignedDoctors} Assigned
  </span>

</div>

        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-5 rounded-2xl">

  <div className="flex items-center gap-4">

   <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold animate-pulse">
      ●
    </div>

    <div>
      <p className="font-semibold text-slate-800">
        Insurance Verification
      </p>

      <p className="text-sm text-slate-500">
        Coverage validation and policy verification
      </p>
    </div>

  </div>

  <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-semibold">
    {pendingInsurance > 0
      ? `${pendingInsurance} Pending`
      : "Verified"}
  </span>

</div>
<div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">

  <p className="text-sm text-slate-500">
    Overall Workflow Status
  </p>

  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
    Operational
  </span>

</div>
      </div>

    </div>
  );
}



export default WorkflowStatusCard;