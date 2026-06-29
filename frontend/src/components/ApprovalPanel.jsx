import {
  approveInsurance,
  rejectInsurance,
} from "../services/patientService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ApprovalPanel({ patients }) {
  const pendingPatients = patients.filter(
    (patient) => patient.insuranceStatus === "Pending"
  );

  const handleApprove = async (id) => {
    try {
      await approveInsurance(id);
toast.success("Insurance approved successfully!");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectInsurance(id);
toast.error("Insurance request rejected!");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mt-8">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Human Approval Queue
        </h2>

        <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm font-medium">
          Manual Review Required
        </span>

      </div>

      <div className="space-y-4">

        {pendingPatients.length === 0 ? (

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">

            <h3 className="font-semibold text-green-700">
              ✅ All insurance requests have been processed.
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              No pending approvals at the moment.
            </p>

          </div>

        ) : (

          pendingPatients.slice(0, 4).map((patient) => (

            <div
              key={patient._id}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between hover:shadow-md transition"
            >

              <div className="flex items-center gap-2">

                <div>

                  <h3 className="font-semibold text-sm text-slate-800">
                    {patient.name}
                  </h3>

                  <p className="text-xs text-slate-500">
                    Insurance Verification Pending - Awaiting Manual Review
                  </p>

                </div>

                <span
                  className={`mr-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    patient.priority === "Emergency"
                      ? "bg-purple-100 text-purple-700"
                      : patient.priority === "Critical"
                      ? "bg-red-100 text-red-600"
                      : patient.priority === "High"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {patient.priority}
                </span>

              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() => handleApprove(patient._id)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(patient._id)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl font-medium transition"
                >
                  Reject
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {pendingPatients.length > 0 && (
        <div className="flex justify-end mt-4">

          <Link
            to="/approvals"
            className="text-blue-500 font-medium hover:text-blue-700"
          >
            View All
          </Link>

        </div>
      )}

    </div>
  );
}

export default ApprovalPanel;