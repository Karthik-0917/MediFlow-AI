import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getPatients,
  submitPatient,
  escalatePatient,
} from "../services/patientService";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Patients() {

  const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({
    name: "",
    age: "",
    symptoms: "",
    insuranceId: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [assessment, setAssessment] = useState({});
  const [doctorRecommendation, setDoctorRecommendation] = useState({});
  const [loading, setLoading] = useState(true);

    const fetchPatients = async () => {
  try {
    const data = await getPatients();
    setPatients(data.patients);
  } catch (error) {
    toast.error("Something went wrong.");
console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchPatients();
  }, []);

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await submitPatient(formData);

console.log(response);

await fetchPatients();

toast.success("Patient registered successfully!");

setFormData({
  name: "",
  age: "",
  symptoms: "",
  insuranceId: "",
});
  };

  const generateAssessment = async (patient) => {

  try {

    const response = await fetch(
      "http://localhost:5000/api/ai/patient-assessment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: patient.name,
          age: patient.age,
          symptoms: patient.symptoms,
        }),
      }
    );
    const data = await response.json();

    if (data.success) {
      toast.success(
  "AI Assessment Generated"
);
      setAssessment((prev) => ({
        ...prev,
        [patient._id]: data.assessment,
      }));
    }

  } catch (error) {

    toast.error("Something went wrong.");
console.log(error);

    setAssessment((prev) => ({
      ...prev,
      [patient._id]:
        "Unable to generate assessment.",
    }));

  }

};

const generateDoctorRecommendation = async (patient) => {

  try {

    const response = await fetch(
      "http://localhost:5000/api/ai/doctor-recommendation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  patientId: patient._id,
  name: patient.name,
  age: patient.age,
  symptoms: patient.symptoms,
}),
      }
    );

    const data = await response.json();

    if (data.success) {
      toast.success(
  "Doctor Recommendation Ready"
);
      setDoctorRecommendation((prev) => ({
        ...prev,
        [patient._id]: data.recommendation,
      }));
    }

  } catch (error) {

    console.log(error);

    setDoctorRecommendation((prev) => ({
      ...prev,
      [patient._id]:
        "Unable to generate recommendation.",
    }));

  }

};

const handleEscalation = async (patientId) => {
  try {

    const response = await escalatePatient(patientId);

    console.log(response);

    await fetchPatients();
    toast.success("Patient escalated to Emergency!");

  } catch (error) {

    toast.error(
  "Something went wrong"
);

    console.log(error);

  }

};

if (loading) {
  return (
  <MainLayout>
      <div className="space-y-6">

        <Skeleton height={50} width={300} />

        <div className="bg-white rounded-3xl p-8">
          <Skeleton height={40} width={250} />

          <div className="grid grid-cols-2 gap-6 mt-6">
            <Skeleton height={55} />
            <Skeleton height={55} />
            <Skeleton height={55} />
            <Skeleton height={55} />
          </div>

          <Skeleton
            height={50}
            width={220}
            className="mt-6"
          />
        </div>

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-6"
          >
            <Skeleton height={30} width={200} />

            <Skeleton
              height={20}
              width={500}
              className="mt-3"
            />

            <Skeleton
              height={20}
              width={350}
              className="mt-2"
            />

            <div className="flex gap-3 mt-5">
              <Skeleton
                height={40}
                width={170}
              />

              <Skeleton
                height={40}
                width={170}
              />
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

  return (
    <MainLayout>

      <div>

        <h1 className="text-4xl font-bold text-blue-500 mb-8">
          Patient Management
        </h1>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">

          <h2 className="text-2xl font-semibold mb-6">
            New Patient Intake
          </h2>

          <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 md:grid-cols-2 gap-6"
>

            <input
  type="text"
  name="name"
  placeholder="Patient Name"
  value={formData.name}
  onChange={handleChange}
  className="bg-white border border-slate-300 rounded-xl p-4 outline-none focus:border-blue-500"
/>

            <input
  type="number"
  name="age"
  placeholder="Age"
  value={formData.age}
  onChange={handleChange}
  className="bg-white border border-slate-300 rounded-xl p-4 outline-none focus:border-blue-500"
/>

            <input
  type="text"
  name="symptoms"
  placeholder="Symptoms"
  value={formData.symptoms}
  onChange={handleChange}
  className="bg-white border border-slate-300 rounded-xl p-4 outline-none focus:border-blue-500"
/>

            <input
  type="text"
  name="insuranceId"
  placeholder="Insurance ID"
  value={formData.insuranceId}
  onChange={handleChange}
  className="bg-white border border-slate-300 rounded-xl p-4 outline-none focus:border-blue-500"
/>



           <button
  type="submit"
  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium w-fit"
            >
              Submit Patient Intake
            </button>

          </form>
                    <div className="mt-10">

            <h2 className="text-2xl font-semibold mb-6">
              Active Patients
            </h2>

            <input
  type="text"
  placeholder="Search patients..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full mb-6 p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
/>

            <div className="space-y-4">

  {patients.filter((patient) =>
    patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  ).length === 0 ? (

    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center">

      <h3 className="text-xl font-semibold text-slate-700">
        No Patients Found
      </h3>

      <p className="text-slate-500 mt-2">
        New patient registrations or search results will appear here.
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
      className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition"
    >

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-semibold text-lg">
            {patient.name}
          </h3>

          <div className="flex gap-8 mt-2 text-sm">

            <p className="text-slate-500">
              Symptoms: {patient.symptoms}
            </p>

            <p className="text-slate-600">
              Status: {patient.condition}
            </p>

            <p className="text-emerald-600">
              Doctor: {patient.assignedDoctor}
            </p>

          </div>
        </div>

        <div className="text-right space-y-3">

          <p className="text-blue-400 font-bold">
            ID: {patient._id.slice(-6)}
          </p>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
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

          <div>
            {assessment[patient._id] ? (

  <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
    Assessment Generated ✓
  </span>

) : (

  <div className="space-y-2">

  <button
    onClick={() => {
      if (!assessment[patient._id]) {
        generateAssessment(patient);

      }
    }}
    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm w-full"
  >
    Generate AI Assessment
  </button>

  <button
  onClick={() => {
    if (!doctorRecommendation[patient._id]) {
      generateDoctorRecommendation(patient);
      toast.error("Unable to generate recommendation.");
console.log(error);
    }
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm w-full"
>
  Recommend Doctor
</button>

  {patient.priority === "Critical" && (
    <button
      onClick={() =>
        handleEscalation(patient._id)
      }
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm w-full"
    >
      Escalate Patient
    </button>
  )}

</div>

)}
          </div>

        </div>

      </div>

      {doctorRecommendation[patient._id] && (
  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">

    <p className="text-xs font-semibold text-blue-700 mb-2">
      AI Doctor Recommendation
    </p>

    <p className="text-sm text-slate-700 whitespace-pre-line">
      {doctorRecommendation[patient._id]}
    </p>

  </div>
)}

      {assessment[patient._id] && (
        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-4">

          <p className="text-xs font-semibold text-purple-700 mb-2">
            AI Patient Assessment
          </p>

          <p className="text-sm text-slate-700 whitespace-pre-line">
            {assessment[patient._id]}
          </p>

        </div>
      )}

    </div>
))
)}
</div>
</div>   
</div>   
</div>  
    </MainLayout>
  );
}
export default Patients;