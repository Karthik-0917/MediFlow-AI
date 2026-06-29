import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import Emergency from "../pages/Emergency";
import DoctorAssignment from "../pages/DoctorAssignment";
import Insurance from "../pages/Insurance";
import Billing from "../pages/Billing";
import Approvals from "../pages/Approvals";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes(){
  return (
    <BrowserRouter>

     <Routes>

  <Route path="/login" element={<Login />} />

  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    }
  />

  <Route
    path="/patients"
    element={
      <ProtectedRoute>
        <Patients/>
      </ProtectedRoute>
    }
  />

  <Route
    path="/emergency"
    element={
      <ProtectedRoute>
        <Emergency
/>
      </ProtectedRoute>
    }
  />

  <Route
    path="/doctor-assignment"
    element={
      <ProtectedRoute>
        <DoctorAssignment
/>
      </ProtectedRoute>
    }
  />

  <Route
    path="/insurance"
    element={
      <ProtectedRoute>
        <Insurance
/>
      </ProtectedRoute>
    }
  />

  <Route
    path="/billing"
    element={
      <ProtectedRoute>
        <Billing
/>
      </ProtectedRoute>
    }
  />

  <Route
    path="/approvals"
    element={
      <ProtectedRoute>
        <Approvals
/>
      </ProtectedRoute>
    }
  />

</Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;