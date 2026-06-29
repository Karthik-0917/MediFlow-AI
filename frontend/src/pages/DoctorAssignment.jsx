import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getPatients } from "../services/patientService";

function DoctorAssignment() {

  function getConfidenceScore(symptoms) {

  const text = symptoms.toLowerCase();

  if (text.includes("chest pain")) {
    return "96%";
  }

  if (text.includes("breathing")) {
    return "94%";
  }

  if (text.includes("head injury")) {
    return "92%";
  }

  if (text.includes("fracture")) {
    return "90%";
  }

  if (text.includes("fever")) {
    return "85%";
  }

  return "80%";
}

  function getRecommendedDoctor(symptoms) {

  const text = symptoms.toLowerCase();

  if (text.includes("chest pain")) {
    return "Dr. Rajesh Kumar";
  }

  if (text.includes("breathing")) {
    return "Dr. Priya Sharma";
  }

  if (text.includes("head injury")) {
    return "Dr. Arjun Reddy";
  }

  if (text.includes("fracture")) {
    return "Dr. Vikram Singh";
  }

  if (text.includes("fever")) {
    return "Dr. Ananya Rao";
  }

  return "Dr. General Physician";
}
      const [patients, setPatients] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const fetchPatients = async () => {
  try {
    const data = await getPatients();

    const assignmentPatients = data.patients.filter(
      (patient) =>
        patient.priority === "Critical" ||
        patient.priority === "High"
    );

    setPatients(assignmentPatients);
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
          Loading Doctor Assignments...
        </p>

      </div>
    </MainLayout>
  );
}

  return (
    <MainLayout>

      <div>

        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          AI Doctor Assignment
        </h1>

        <input
  type="text"
  placeholder="Search patients..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full mb-6 p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
/>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-semibold">
              Specialist Recommendations
            </h2>

            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              AI Matching Engine Active
            </span>

          </div>

          <div className="space-y-4">

  {patients.filter((patient) =>
    patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  ).length === 0 ? (

    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center">

      <h3 className="text-xl font-semibold text-slate-700">
        No Doctor Assignments Found
      </h3>

      <p className="text-slate-500 mt-2">
        No critical or high-priority patients require assignment.
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
    className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
  >

    <div>

      <h3 className="font-semibold text-lg">
        {patient.name}
      </h3>

      <p className="text-slate-500 text-sm">
  Symptoms: {patient.symptoms}
</p>

<p className="text-orange-500 text-sm mt-1">
  Severity Score: {patient.severityScore}
</p>

    </div>

    <div className="text-right space-y-2">

  <div>
  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
    {getRecommendedDoctor(patient.symptoms)}
  </span>
</div>

<div>
  <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-semibold">
    AI Match: {getConfidenceScore(patient.symptoms)}
  </span>
</div>

  <div>
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
        patient.priority === "Critical"
          ? "bg-red-100 text-red-600"
          : "bg-orange-100 text-orange-600"
      }`}
    >
      {patient.priority}
    </span>
  </div>

</div>

  </div>

))
)}
            </div>

          </div>

        </div>

    </MainLayout>
  );
}

export default DoctorAssignment;