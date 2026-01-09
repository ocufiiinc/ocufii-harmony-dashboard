import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { UserProvider, useUser } from "./context/UserContext";
import { ThemeProvider } from "./theme/ThemeContext";
import { GlobalStyles } from "./theme/GlobalStyles";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./page/auth/Login";
import Dashboard from "./page/Dashboard";
import { AppContainer, LoadingContainer } from "./styles/App.styled";
import { ROUTE } from "./common/Routes";
import Alerts from "./page/Alerts";
import Devices from "./page/Devices";
import History from "./page/History";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Recipients from "./page/Recipients";
import Shop from "./page/Shop";
import Help from "./page/Help";
import DeviceDetails from "./page/device/DeviceDetails";
import Account from "./page/Account";
import Settings from "./page/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDetails from "./page/AlertDetails";
import SafetyNetwork from "./page/SafetyNetwork";
import PersonalSafetyService from "./page/PersonalSafetyService";
import AddRecipient from "./page/recipients/AddRecipient";
import ResendEmail from "./page/email/ResendEmail";
import EmailVerified from "./page/email/EmailVerified";
import InviteContact from "./page/safetyNetwork/InviteContact";
import AcceptInvite from "./page/safetyNetwork/AcceptInvite";
import Map from "./page/Map";

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <Routes>
      {/* <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? ROUTE.DASHBOARD : ROUTE.LOGIN}
            replace
          />
        }
      /> */}
      <Route path={ROUTE.LOGIN} element={<Login />} />
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
        path={ROUTE.ALERT_DETAILS}
        element={
          <ProtectedRoute>
            <AlertDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.SAFETY_NETWORK}
        element={
          <ProtectedRoute>
            <SafetyNetwork />
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
        path={ROUTE.HISTORY}
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.RECIPIENTS}
        element={
          <ProtectedRoute>
            <Recipients />
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
      <Route
        path={ROUTE.RESEND_EMAIL}
        element={
          <ProtectedRoute>
            <ResendEmail />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.EMAIL_VERIFIED}
        element={
          <ProtectedRoute>
            <EmailVerified />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.INVITE_CONTACT}
        element={
          <ProtectedRoute>
            <InviteContact />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.PERSONAL_SAFETY}
        element={
          <ProtectedRoute>
            <PersonalSafetyService />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.ACCEPT_INVITE}
        element={
          <ProtectedRoute>
            <AcceptInvite />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.SHOP}
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.HELP}
        element={
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.DEVICEDETAILS}
        element={
          <ProtectedRoute>
            <DeviceDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.ACCOUNT}
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.SETTINGS}
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTE.MAP}
        element={
          <ProtectedRoute>
            <Map />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? ROUTE.DASHBOARD : ROUTE.LOGIN}
            replace
          />
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <GlobalStyles />
        <QueryClientProvider client={new QueryClient()}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer autoClose={5000} />
          <Router>
            <AppContainer>
              <AppRoutes />
            </AppContainer>
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
