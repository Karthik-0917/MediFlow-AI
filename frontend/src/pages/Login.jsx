import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@mediflow.ai" &&
      password === "admin123"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg border border-slate-200 rounded-3xl shadow-xl p-10">

        <div className="text-center mb-8">

          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-5xl shadow-sm">
  🏥
</div>
          </div>

          <h1 className="text-5xl font-extrabold text-slate-800">
            MediFlow AI
          </h1>

          <p className="text-slate-500 mt-2">
  AI-Powered Hospital Workflow Automation Platform
</p>

          <div className="flex flex-wrap justify-center gap-2 mt-4">

  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
    Patient Intake
  </span>

  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
    AI Triage
  </span>

  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
    Doctor Assignment
  </span>

  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
    Insurance
  </span>

  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
    Billing
  </span>

  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
    Approvals
  </span>

</div>

        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold transition"
          >
            Sign In
          </button>

        </form>

        <div className="text-center mt-6">

          <button className="text-blue-600 hover:text-blue-700 text-sm">
            Forgot Password?
          </button>

        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-3">

  <p className="text-sm font-bold text-blue-700 mb-2">
    Demo Credentials
  </p>

  <p className="text-sm text-slate-700">
    Email: admin@mediflow.ai
  </p>

  <p className="text-sm text-slate-700">
    Password: admin123
  </p>

</div>

        <div className="border-t border-slate-200 mt-8 pt-4">

          <p className="text-center text-sm text-slate-500">
            Powered by <span className="font-semibold text-orange-500">UiPath</span> Maestro Case
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;