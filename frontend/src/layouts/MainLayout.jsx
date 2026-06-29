import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FiGrid,
  FiUsers,
  FiAlertTriangle,
  FiUserCheck,
  FiShield,
  FiCreditCard,
  FiCheckSquare,
  FiLogOut,
  FiActivity,
} from "react-icons/fi";

function MainLayout({ children }) {

  const [currentTime, setCurrentTime] = useState(new Date());

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/login");
};

  const location = useLocation();
  useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">

      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col min-h-screen">

        <h1 className="text-3xl font-bold text-blue-600">
          MediFlow AI
        </h1>

        <p className="text-sm text-slate-500 mt-1 mb-8">
          AI-Powered Hospital Platform
        </p>

         <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-5">

  <p className="text-xs text-slate-500 mb-2">
    Hospital Time
  </p>

  <p className="text-xl font-bold text-slate-800">
    {currentTime.toLocaleTimeString()}
  </p>

  <p className="text-sm text-slate-500 mt-1">
    {currentTime.toLocaleDateString("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
})}
  </p>

</div>

        <ul className="space-y-2">

  <li>
  <Link
    to="/"
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
      location.pathname === "/"
        ? "bg-blue-600 text-white shadow-sm border-l-4 border-blue-300"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
    }`}
  >
    <FiGrid />
    Dashboard
  </Link>
</li>

  <Link to="/patients">
    <li
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
        location.pathname === "/patients"
          ? "bg-blue-600 text-white shadow-sm border-l-4 border-blue-300"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
      }`}
    >
      <FiUsers />
      Patients
    </li>
  </Link>

  <Link to="/emergency">
    <li
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
        location.pathname === "/emergency"
          ? "bg-blue-600 text-white shadow-sm border-l-4 border-blue-300"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
      }`}
    >
      <FiAlertTriangle />
      Emergency Queue
    </li>
  </Link>

  <Link to="/doctor-assignment">
    <li
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
        location.pathname === "/doctor-assignment"
          ? "bg-blue-600 text-white shadow-sm border-l-4 border-blue-300"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
      }`}
    >
      <FiUserCheck />
      Doctor Assignment
    </li>
  </Link>

  <Link to="/insurance">
    <li
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
        location.pathname === "/insurance"
          ? "bg-blue-600 text-white shadow-sm border-l-4 border-blue-300"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
      }`}
    >
      <FiShield />
      Insurance
    </li>
  </Link>

  <Link to="/billing">
    <li
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
        location.pathname === "/billing"
          ? "bg-blue-600 text-white shadow-sm border-l-4 border-blue-300"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
      }`}
    >
      <FiCreditCard />
      Billing
    </li>
  </Link>

  <Link to="/approvals">
    <li
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
        location.pathname === "/approvals"
          ? "bg-blue-600 text-white shadow-sm border-l-4 border-blue-300"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
      }`}
    >
      <FiCheckSquare />
      Approvals
    </li>
  </Link>

</ul>

        <div className="mt-auto pt-8">

  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 mb-5 border border-blue-100">

    <div className="flex items-center gap-2 mb-3">
      <FiActivity className="text-blue-600" />
      <p className="font-semibold text-slate-700">
        Hospital Status
      </p>
    </div>

    <p className="text-sm text-slate-600">
      AI System Online
    </p>

    <p className="text-xs text-slate-500 mt-1">
      Multi-Agent Platform Active
    </p>

  </div>

  <button
    onClick={handleLogout}
    className="
      w-full
      bg-red-50
      hover:bg-red-100
      text-red-600
      py-3
      rounded-xl
      font-medium
      flex
      items-center
      justify-center
      gap-2
      transition
    "
  >
    <FiLogOut />
    Logout
  </button>

  <p className="text-center text-xs text-slate-400 mt-5">
    MediFlow AI v1.0
  </p>

</div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}

export default MainLayout;