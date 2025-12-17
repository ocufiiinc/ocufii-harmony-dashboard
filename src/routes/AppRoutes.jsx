import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../page/Login";
import Dashboard from "../page/Dashboard";
import Alerts from "../page/Alerts";
import Devices from "../page/Devices";
import DeviceDetails from "../page/device/DeviceDetails";
import History from "../page/History";
import AddRecipient from "../page/recipients/AddRecipient";
import ProtectedRoute, { PublicRoute } from "../components/ProtectedRoute";
import { useUser } from "../context/UserContext";
import { ROUTE } from "../common/Routes";

const AppRoutes = () => {
  const { isAuthenticated } = useUser();

  return (
    <Routes>
      {/* Root route - redirect based on authentication */}
      <Route
        path={ROUTE.LOGIN}
        element={
          isAuthenticated() ? (
            <Navigate to={ROUTE.DASHBOARD} replace />
          ) : (
            <Navigate to={ROUTE.LOGIN} replace />
          )
        }
      />

      {/* Public routes - redirect to dashboard if already authenticated */}
      <Route
        path={ROUTE.LOGIN}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected routes - require authentication */}
      <Route
        path={ROUTE.DASHBOARD}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTE.ALERT}
        element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTE.DEVICES}
        element={
          <ProtectedRoute>
            <Devices />
          </ProtectedRoute>
        }
      />

      <Route
        path="/devices/details"
        element={
          <ProtectedRoute>
            <DeviceDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTE.HISTORY}
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTE.ADD_RECIPIENT}
        element={
          <ProtectedRoute>
            <AddRecipient />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route - redirect to home */}
      <Route path="*" element={<Navigate to={ROUTE.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRoutes;
