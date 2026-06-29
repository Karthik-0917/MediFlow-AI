import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getPatients } from "../services/patientService";

function Billing() {
    const [patients, setPatients] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const fetchPatients = async () => {
  try {
    const data = await getPatients();
    setPatients(data.patients);
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
          Loading Billing Records...
        </p>

      </div>
    </MainLayout>
  );
}

  return (
    <MainLayout>

      <div>

        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Billing Automation
        </h1>

        <input
  type="text"
  placeholder="Search patients..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full mb-6 p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
/>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-semibold">
              Automated Billing Workflows
            </h2>

            <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
              AI Billing Engine Active
            </span>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  <div className="bg-green-50 rounded-2xl p-4">
    <p className="text-sm text-slate-500">
      Total Revenue
    </p>

    <h3 className="text-2xl font-bold text-green-600">
      ₹
      {patients.reduce(
        (sum, patient) =>
          sum + (patient.billAmount || 0),
        0
      )}
    </h3>
  </div>

  <div className="bg-blue-50 rounded-2xl p-4">
    <p className="text-sm text-slate-500">
      Patients Billed
    </p>

    <h3 className="text-2xl font-bold text-blue-600">
      {patients.length}
    </h3>
  </div>

  <div className="bg-purple-50 rounded-2xl p-4">
    <p className="text-sm text-slate-500">
      Average Bill
    </p>

    <h3 className="text-2xl font-bold text-purple-600">
      ₹
      {patients.length > 0
        ? Math.round(
            patients.reduce(
              (sum, patient) =>
                sum + (patient.billAmount || 0),
              0
            ) / patients.length
          )
        : 0}
    </h3>
  </div>

</div>

          <div className="space-y-4">
            {patients.filter((patient) =>
  patient.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
).length === 0 ? (

  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center">

    <h3 className="text-xl font-semibold text-slate-700">
      No Billing Records Found
    </h3>

    <p className="text-slate-500 mt-2">
      Billing information will appear here.
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
        Priority: {patient.priority}
      </p>

    </div>

    <div className="text-right">

  <p className="text-green-600 font-bold text-lg">
    ₹{patient.billAmount.toLocaleString()}
  </p>

  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
    Auto Generated
  </span>

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

export default Billing;