import { Link } from "react-router-dom";

function EmergencyQueue({ patients }) {

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mt-8">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Emergency Priority Queue
        </h2>

        <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm font-medium">
          AI Prioritization Active
        </span>

      </div>

      <div className="space-y-4">

        {patients
          .filter(
            (patient) =>
              patient.priority === "Emergency" ||
              patient.priority === "Critical" ||
              patient.priority === "High"
          )
          .sort((a, b) => {

            const priorityOrder = {
              Emergency: 1,
              Critical: 2,
              High: 3,
            };

            return (
              priorityOrder[a.priority] -
              priorityOrder[b.priority]
            );

          })
          .slice(0, 5)
          .map((patient) => (

            <div
              key={patient._id}
              className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl flex items-center justify-between"
            >

              <div>

                <h3 className="font-semibold text-slate-800 text-sm">
                  {patient.name}
                </h3>

                <p className="text-xs text-slate-500">
                  {patient.symptoms}
                </p>

              </div>

              <div>

                <p
                  className={`font-semibold px-3 py-1 rounded-full text-sm
                  ${
                    patient.priority === "Emergency"
                      ? "bg-purple-100 text-purple-700"
                      : patient.priority === "Critical"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {patient.priority}
                </p>

              </div>

            </div>

          ))}

        <div className="flex justify-end mt-4">

          <Link
            to="/emergency"
            className="text-blue-500 font-medium hover:text-blue-600"
          >
            View All
          </Link>

        </div>

      </div>

    </div>
  );
}

export default EmergencyQueue;