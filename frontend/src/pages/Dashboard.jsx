import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import WorkflowStatusCard from "../components/WorkflowStatusCard";
import EmergencyQueue from "../components/EmergencyQueue";
import ApprovalPanel from "../components/ApprovalPanel";
import ActivityFeed from "../components/ActivityFeed";
import { getPatients } from "../services/patientService";
import PatientsOverview from "../components/PatientsOverview";
import TopSpecialties from "../components/TopSpecialties";
import SystemPerformance from "../components/SystemPerformance";
import AICommandcenter from "../components/AICommandcenter";
import AgentActivityTracker from "../components/AgentActivityTracker";
import PatientPriorityChart from "../components/PatientPriorityChart";
import InsuranceStatusChart from "../components/InsuranceStatusChart";
import NotificationCenter from "../components/NotificationCenter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactCountUp from "react-countup";
import exportDashboardReport from "../utils/exportDashboardReport";
import AIInsightsPanel from "../components/AIInsightsPanel";

const CountUp = ReactCountUp.default;

function Dashboard() {
    const [patients, setPatients] = useState([]);
const [loading, setLoading] = useState(true);

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

  const interval = setInterval(() => {

    fetchPatients();

  }, 10000);

  return () => clearInterval(interval);

}, []);

  const totalPatients = patients.length;

const criticalPatients = patients.filter(
  (patient) =>
    patient.priority === "Critical" ||
    patient.priority === "Emergency"
).length;

const pendingApprovals = patients.filter(
  (patient) => patient.insuranceStatus === "Pending"
).length;

const totalRevenue = patients.reduce(
  (sum, patient) => sum + (patient.billAmount || 0),
  0
);


if (loading) {
  return (
    <MainLayout>
      <div className="space-y-8">

        <Skeleton height={50} width={450} />

        <Skeleton height={25} width={400} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="bg-white rounded-3xl p-8"
            >
              <Skeleton height={20} width={140} />

              <Skeleton
                height={50}
                width={100}
                className="mt-5"
              />

              <Skeleton
                height={20}
                width={180}
                className="mt-5"
              />
            </div>
          ))}
        </div>

        <Skeleton height={350} />

        <div className="grid grid-cols-2 gap-8">
          <Skeleton height={300} />
          <Skeleton height={300} />
        </div>

        <Skeleton height={400} />
      </div>
    </MainLayout>
  );
}

  return (
    <MainLayout>
      <div>
        <div className="flex items-center justify-between mb-8">

  <div>
    <h1 className="text-4xl font-bold text-slate-800">
      Hospital Workflow Overview
    </h1>

    <p className="text-slate-500 mt-2">
      AI-powered hospital operations and patient workflow management
    </p>
  </div>

  <button
    onClick={() =>
      exportDashboardReport({
        totalPatients,
        criticalPatients,
        pendingApprovals,
        totalRevenue,
      })
    }
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-sm"
  >
    📄 Download Report
  </button>

</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 mb-8">

  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

  <div className="flex items-start justify-between">

    <div>

      <p className="text-slate-500 text-sm font-medium">
        Patients Today
      </p>

      <h2 className="text-5xl font-bold text-slate-800 mt-3">
  <CountUp end={totalPatients} duration={2} />
</h2>

      <p className="text-green-500 text-sm font-medium mt-3">
  +{totalPatients} registered today
</p>

    </div>

    <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center text-2xl">
      👥
    </div>

  </div>

</div>

  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

  <div className="flex items-start justify-between">

    <div>

      <p className="text-slate-500 text-sm font-medium">
        Emergency Cases
      </p>

      <h2 className="text-5xl font-bold text-slate-800 mt-3">
        <CountUp end={criticalPatients} duration={2} />
      </h2>

      <p className="text-red-500 text-sm font-medium mt-3">
        {criticalPatients} cases require immediate attention
      </p>

    </div>

    <div className="w-16 h-16 rounded-3xl bg-red-100 flex items-center justify-center text-2xl">
      🚑
    </div>

  </div>

</div>

  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

  <div className="flex items-start justify-between">

    <div>

      <p className="text-slate-500 text-sm font-medium">
        Doctors Available
      </p>

      <h2 className="text-5xl font-bold text-slate-800 mt-3">
        <CountUp
  end={
    patients.filter(
      patient => patient.assignedDoctor
    ).length
  }
  duration={2}
/>
      </h2>

      <p className="text-blue-500 text-sm font-medium mt-3">
        All patients assigned
      </p>

    </div>

    <div className="w-16 h-16 rounded-3xl bg-blue-100 flex items-center justify-center text-2xl">
      🩺
    </div>

  </div>

</div>

  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

  <div className="flex items-start justify-between">

    <div>

      <p className="text-slate-500 text-sm font-medium">
        Pending Approvals
      </p>

      <h2 className="text-5xl font-bold text-slate-800 mt-3">
        <CountUp end={pendingApprovals} duration={2} />
      </h2>

      <p className="text-yellow-500 text-sm font-medium mt-3">
        Needs manual review
      </p>

    </div>

    <div className="w-16 h-16 rounded-3xl bg-yellow-100 flex items-center justify-center text-2xl">
      📋
    </div>

  </div>

</div>
<div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

  <div className="flex items-start justify-between">

    <div>

      <p className="text-slate-500 text-sm font-medium">
        Total Revenue
      </p>

      <h2 className="text-5xl font-bold text-slate-800 mt-3">
        ₹
<CountUp
  end={totalRevenue}
  duration={2}
  separator=","
/>
      </h2>

      <p className="text-green-500 text-sm font-medium mt-3">
        Revenue generated today
      </p>

    </div>

    <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center text-2xl">
      💰
    </div>

  </div>

</div>
      </div>
      </div>
      <AICommandcenter
  criticalPatients={criticalPatients}
  pendingApprovals={pendingApprovals}
  totalRevenue={totalRevenue}
/>
<AgentActivityTracker
  criticalPatients={criticalPatients}
  pendingApprovals={pendingApprovals}
  assignedDoctors={patients.length}
/>

<div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">

  <PatientPriorityChart patients={patients} />

  <InsuranceStatusChart patients={patients} />

  <AIInsightsPanel
    patients={patients}
    criticalPatients={criticalPatients}
    pendingApprovals={pendingApprovals}
    totalRevenue={totalRevenue}
  />

</div>
<div className="xl:col-span-2">
    <NotificationCenter patients={patients} />
  </div>

<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

  <div className="xl:col-span-2">
    <WorkflowStatusCard patients={patients} />
  </div>

  <div>
    <EmergencyQueue patients={patients} />
  </div>

</div>

<ApprovalPanel patients={patients} />

<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

  <div className="xl:col-span-2">
    <ActivityFeed patients={patients} />
  </div>

  <div className="mt-25">
  <PatientsOverview patients={patients} />
</div>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

  <TopSpecialties patients={patients} />

  <SystemPerformance patients={patients} />

</div>

    </MainLayout>
  );
}

export default Dashboard;