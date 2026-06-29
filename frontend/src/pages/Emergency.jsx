import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getPatients } from "../services/patientService";

function EmergencyQueue() {

  function getRiskScore(symptoms) {

  const text = symptoms.toLowerCase();

  if (text.includes("chest pain")) {
    return "95%";
  }

  if (text.includes("breathing")) {
    return "92%";
  }

  if (text.includes("head injury")) {
    return "90%";
  }

  if (text.includes("fracture")) {
    return "82%";
  }

  if (text.includes("fever")) {
    return "65%";
  }

  return "50%";
}

  function getSuggestedAction(symptoms) {

  const text = symptoms.toLowerCase();

  if (text.includes("chest pain")) {
    return "Assign cardiologist and perform ECG immediately.";
  }

  if (text.includes("breathing")) {
    return "Provide oxygen support and notify pulmonologist.";
  }

  if (text.includes("head injury")) {
    return "Schedule urgent neurological assessment and CT scan.";
  }

  if (text.includes("fracture")) {
    return "Prepare orthopedic team and arrange X-ray imaging.";
  }

  if (text.includes("fever")) {
    return "Monitor vitals and begin diagnostic evaluation.";
  }

  return "Assign physician for further evaluation.";
}

  function getDepartment(symptoms) {

  const text = symptoms.toLowerCase();

  if (text.includes("chest pain")) {
    return "Cardiology";
  }

  if (text.includes("breathing")) {
    return "Pulmonology";
  }

  if (text.includes("head injury")) {
    return "Neurology";
  }

  if (text.includes("fracture")) {
    return "Orthopedics";
  }

  if (text.includes("fever")) {
    return "General Medicine";
  }

  return "General Medicine";
}

  const [patients, setPatients] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPatients = async () => {
  try {
    const data = await getPatients();

    const emergencyPatients = data.patients.filter(
      (patient) =>
        patient.priority === "Critical" ||
        patient.priority === "High"
    );

    setPatients(emergencyPatients);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

    fetchPatients();

  }, []);

if (loading) {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center h-[70vh]">

        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-slate-500 mt-6 text-lg">
          Loading Emergency Queue...
        </p>

      </div>
    </MainLayout>
  );
}

  return (
    <MainLayout>

      <div>

        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Emergency Queue
        </h1>

        <input
  type="text"
  placeholder="Search emergency patients..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full mb-6 p-4 border border-slate-200 rounded-xl outline-none"
/>

        <div className="space-y-5">

  {patients.filter((patient) =>
    patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  ).length === 0 ? (

    <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">

      <h3 className="text-xl font-semibold text-slate-700">
        No Emergency Cases
      </h3>

      <p className="text-slate-500 mt-2">
        No critical or high-priority patients found.
      </p>

    </div>

  ) : (

    patients
      .filter((patient) =>
        patient.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .map((patient) => (

            <div
              key={patient._id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {patient.name}
                  </h2>

                  <p className="text-slate-600 mt-2">
                    Symptoms: {patient.symptoms}
                  </p>

                  <p className="text-blue-400 mt-2">
                    Status: {patient.condition}
                  </p>

                  <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">

  <h3 className="font-semibold text-blue-700 mb-2">
    🧠 AI Case Summary
  </h3>

  <p className="text-sm text-slate-700">
    Risk Level: <span className="font-semibold">{patient.priority}</span>
  </p>
  <p className="text-sm text-slate-700 mt-1">
  Risk Score: <span className="font-semibold text-red-600">
    {getRiskScore(patient.symptoms)}
  </span>
</p>

  <p className="text-sm text-slate-700 mt-1">
  Recommended Department: {getDepartment(patient.symptoms)}
</p>

  <p className="text-sm text-slate-700 mt-1">
  Suggested Action: {getSuggestedAction(patient.symptoms)}
</p>

</div>

                </div>

                <span
  className={`px-3 py-1 rounded-full text-xs font-semibold
  ${
    patient.priority === "Critical"
      ? "bg-red-100 text-red-600"
      : "bg-orange-100 text-orange-600"
  }`}
>
  {patient.priority}
</span>

              </div>

            </div>

          ))
        )}

        </div>

      </div>

    </MainLayout>
  );
}

export default EmergencyQueue;