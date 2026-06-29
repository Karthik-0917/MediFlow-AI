import { useEffect, useState } from "react";
import {
  getPatients,
  approveInsurance,
  rejectInsurance,
} from "../services/patientService";

function AllApprovals() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();
      setPatients(data.patients);
    };

    fetchPatients();
  }, []);

  const handleApprove = async (id) => {

  await approveInsurance(id);

  setPatients(
    patients.map((patient) =>
      patient._id === id
        ? { ...patient, insuranceStatus: "Verified" }
        : patient
    )
  );

};

const handleReject = async (id) => {

  await rejectInsurance(id);

  setPatients(
    patients.map((patient) =>
      patient._id === id
        ? { ...patient, insuranceStatus: "Rejected" }
        : patient
    )
  );

};

function getApprovalDecision(status) {

  if (status === "Verified") {
    return "AI approved request and released workflow execution.";
  }

  if (status === "Rejected") {
    return "AI flagged request for manual compliance review.";
  }

  return "AI is evaluating policy, billing, and treatment requirements.";
}

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
  AI Approval Agent
</h2>

        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
  Approval Agent Active
</span>

      </div>

      <div className="space-y-4">

        {patients.map((patient) => (

          <div
            key={patient._id}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between"
          >

            <div>

              <h3 className="font-semibold text-slate-800">
                {patient.name}
              </h3>

              <p className="text-sm text-slate-500">
                Insurance ID: {patient.insuranceId || "Not Provided"}
              </p>

              <p className="text-sm text-blue-600 mt-1">
  🤖 AI Decision: {getApprovalDecision(patient.insuranceStatus)}
</p>

            </div>

            <div className="flex items-center gap-3">

  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold
    ${
      patient.insuranceStatus === "Verified"
        ? "bg-green-100 text-green-600"
        : patient.insuranceStatus === "Rejected"
        ? "bg-red-100 text-red-600"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {patient.insuranceStatus}
  </span>

  {patient.insuranceStatus === "Pending" && (
    <>
      <button
        onClick={() => handleApprove(patient._id)}
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm"
      >
        Approve
      </button>

      <button
        onClick={() => handleReject(patient._id)}
        className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-lg text-sm"
      >
        Reject
      </button>
    </>
  )}

</div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AllApprovals;