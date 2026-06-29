function NotificationCenter({ patients }) {

  function getTimeAgo(date) {
  const seconds =
    Math.floor(
      (new Date() - new Date(date)) / 1000
    );

  const minutes =
    Math.floor(seconds / 60);

  const hours =
    Math.floor(minutes / 60);

  const days =
    Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  return "Just now";
}

  const notifications = [];

  [...patients]
  .sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  )
  .forEach((patient) => {

    if (patient.priority === "Emergency") {
      notifications.push({
  type: "emergency",
  message: `🚨 ${patient.name} escalated to Emergency`,
  createdAt: patient.updatedAt || patient.createdAt,
});
    }

    if (patient.insuranceStatus === "Pending") {
     notifications.push({
  type: "pending",
  message: `🟡 Insurance approval pending for ${patient.name}`,
  createdAt: patient.updatedAt || patient.createdAt,
});
    }

    if (patient.insuranceStatus === "Verified") {
      notifications.push({
  type: "verified",
  message: `🟢 Insurance approved for ${patient.name}`,
  createdAt: patient.updatedAt || patient.createdAt,
});
    }

  });

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-3">

  <h2 className="text-2xl font-bold text-slate-800">
    Notification Center
  </h2>

  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
    {notifications.length}
  </span>

</div>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          Live Alerts
        </span>

      </div>

      <div
  className="
  space-y-3
  max-h-96
  overflow-y-auto
  pr-2
  "
>

        {notifications.length > 0 ? (

          notifications.slice(0, 10).map((notification, index) => (

            <div
  key={index}
  className={`rounded-xl px-4 py-4 border flex justify-between items-center hover:shadow-md transition ${
    notification.type === "emergency"
      ? "bg-red-50 border-red-200"
      : notification.type === "verified"
      ? "bg-green-50 border-green-200"
      : "bg-yellow-50 border-yellow-200"
  }`}
>

  <p className="font-medium text-slate-700">
    {notification.message}
  </p>

  <span className="text-xs text-slate-500">
    {getTimeAgo(notification.createdAt)}
  </span>

</div>

          ))

        ) : (

          <div className="text-slate-500">
             Hospital operations are running normally.
No active alerts at this time.
          </div>

        )}

      </div>

    </div>
  );
}

export default NotificationCenter;