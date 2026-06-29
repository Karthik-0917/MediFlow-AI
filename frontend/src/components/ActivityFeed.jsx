import { Link } from "react-router-dom";

function ActivityFeed({ patients }) {

  const getTimeAgo = (createdAt) => {

  const now = new Date();
  const created = new Date(createdAt);

  const diff = Math.floor(
    (now - created) / 1000
  );

  if (diff < 60) {
    return "Just now";
  }

  if (diff < 3600) {
    return `${Math.floor(diff / 60)} min ago`;
  }

  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(diff / 86400);
  return `${days} ${days === 1 ? "day" : "days"} ago`;

};

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mt-8">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Live Activity Feed
        </h2>

        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
          Real-Time Events
        </span>

      </div>

      <div className="space-y-2">

  {[...patients]
  .sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  )
  .slice(0, 6)
  .map((patient) => (

    <div
  key={patient._id}
  className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl"
>
    

      <div className="flex justify-between items-start">

  <div>

    <p className="font-semibold text-sm text-slate-800">

      {patient.priority === "Emergency"
  ? "🟣 Emergency Patient Escalated"
  : patient.priority === "Critical"
  ? "🔴 Critical Case Detected"
  : patient.priority === "High"
  ? "🟠 High Priority Case Registered"
  : "🔵 Patient Intake Completed"}

    </p>

    <p className="text-xs text-slate-500 mt-1">

      {patient.name} - {patient.symptoms}

    </p>

  </div>

  <span className="text-xs text-slate-400">

    {getTimeAgo(patient.createdAt)}

  </span>

</div>

    </div>

  ))}

</div>
<div className="text-right mt-6">

  <Link
    to="/patients"
    className="text-blue-600 text-sm font-medium hover:text-blue-700"
  >
    View All Activity
  </Link>

</div>

    </div>

    
  );
}

export default ActivityFeed;