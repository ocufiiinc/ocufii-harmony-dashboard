import React, { useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa";
import DashboardLayout from "../Layout/DashboardLayout";
import { DashboardContent } from "../styles/Dashboard.styled";
import {
  AlertDetailsContainer,
  AlertDetailsLeft,
  AlertDetailsRight,
  AlertDetailsHeader,
  BackButton,
  AlertCardWrapper,
} from "../styles/AlertDetails.styled";
import SafetyAlertItem from "../components/AlertCard/SafetyAlertItem";
import AlertDetailMap from "../components/AlertDetailMap/AlertDetailMap";
import AlertActionModal from "../components/AlertActionModal/AlertActionModal";
import { useUser } from "../context/UserContext";
import {
  pingRecipients,
  getSafetyNetworkLocations,
  getAssistRequestStatus,
} from "../api/DashboardApi";
import Toast from "../utility/Toast";
import { ROUTE } from "../common/Routes";
import { Loader } from "../styles/Loader";

const AlertDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const alert = location.state?.alert;

  const [showRecipients, setShowRecipients] = useState(false);
  const [showEmergencyServices, setShowEmergencyServices] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isLoadingRecipients, setIsLoadingRecipients] = useState(false);
  const [currentNotificationId, setCurrentNotificationId] = useState(null);
  const [shouldPollStatus, setShouldPollStatus] = useState(false);
  const [alertActionAlert, setAlertActionAlert] = useState(null);
  const timerRef = useRef(null);
  const fetchIntervalRef = useRef(null);

  // TanStack Query for fetching safety network locations
  const { data: safetyNetworkData, refetch: refetchSafetyNetwork } = useQuery({
    queryKey: ["safetyNetwork", user?.email, currentNotificationId],
    queryFn: () =>
      getSafetyNetworkLocations(user?.email, currentNotificationId),
    enabled: false,
    staleTime: 0,
    cacheTime: 0,
  });

  // TanStack Query for polling assist request status
  const { data: assistStatusData } = useQuery({
    queryKey: ["assistRequestStatus", currentNotificationId],
    queryFn: () => getAssistRequestStatus(currentNotificationId),
    enabled: shouldPollStatus && !!currentNotificationId,
    refetchInterval: shouldPollStatus ? 30000 : false,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

  if (!alert) {
    return (
      <DashboardLayout>
        <DashboardContent>
          <AlertDetailsContainer>
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p>No alert data available</p>
              <BackButton onClick={() => navigate(ROUTE.ALERT)}>
                <FaArrowLeft /> Back to Alerts
              </BackButton>
            </div>
          </AlertDetailsContainer>
        </DashboardContent>
      </DashboardLayout>
    );
  }

  const handleViewAlert = (selectedAlert) => {
    setShowRecipients(false);
    setShowEmergencyServices(true);
  };

  const handleSeeRecipients = async (selectedAlert) => {
    setShowRecipients(true);
    setShowEmergencyServices(false);
    setRecipients([]);
    setIsLoadingRecipients(true);
    setCurrentNotificationId(selectedAlert.id);

    try {
      await pingRecipients(user?.email, selectedAlert.id);
      Toast.success("Safety network pinged successfully");

      setTimer(20);

      if (timerRef.current) clearInterval(timerRef.current);
      if (fetchIntervalRef.current) clearTimeout(fetchIntervalRef.current);

      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Single call after 20 seconds delay
      fetchIntervalRef.current = setTimeout(async () => {
        const result = await refetchSafetyNetwork();
        if (result.data?.members) {
          setRecipients(result.data.members);
        }
        setIsLoadingRecipients(false);
      }, 20000);
    } catch (error) {
      console.error("Error in handleSeeRecipients:", error);
      setIsLoadingRecipients(false);
      Toast.error("Failed to fetch safety network locations");
    }
  };

  const handleAlertAction = (selectedAlert) => {
    setShowRecipients(false);
    setShowEmergencyServices(false);
    setAlertActionAlert(selectedAlert);
  };

  const handleUpdateRecipientStatus = useCallback((email, status) => {
    setRecipients((prevRecipients) => {
      const recipient = prevRecipients.find((r) => r.email === email);
      if (recipient?.status === status) {
        return prevRecipients;
      }
      return prevRecipients.map((r) =>
        r.email === email ? { ...r, status } : r
      );
    });
  }, []);

  const handleRemoveAlert = () => {
    setAlertActionAlert(null);
    navigate(ROUTE.ALERT);
  };

  return (
    <DashboardLayout>
      <DashboardContent>
        <AlertDetailsHeader>
          <BackButton onClick={() => navigate(ROUTE.ALERT)}>
            <FaArrowLeft /> Back to Alerts
          </BackButton>
          <h1>Alert Details</h1>
          <div style={{ width: "120px" }} />
        </AlertDetailsHeader>

        <AlertDetailsContainer>
          <AlertDetailsLeft>
            <AlertCardWrapper>
              <SafetyAlertItem
                alert={alert}
                onView={handleViewAlert}
                onSeeRecipients={handleSeeRecipients}
                onAlertAction={handleAlertAction}
                isSelected={true}
                showRecipients={showRecipients}
                showEmergencyServices={showEmergencyServices}
              />
            </AlertCardWrapper>
          </AlertDetailsLeft>

          <AlertDetailsRight>
            <AlertDetailMap
              alerts={[{ ...alert, recipients }]}
              onClose={() => navigate(ROUTE.ALERT)}
              category="Safety"
              selectedAlert={{ ...alert, recipients }}
              showRecipients={showRecipients}
              showEmergencyServices={showEmergencyServices}
              isLoadingRecipients={isLoadingRecipients}
              assistStatusData={assistStatusData}
              onTriggerPolling={() => setShouldPollStatus(true)}
              onStopPolling={() => setShouldPollStatus(false)}
              onUpdateRecipientStatus={handleUpdateRecipientStatus}
            />
          </AlertDetailsRight>
        </AlertDetailsContainer>
      </DashboardContent>

      {/* Loading overlay for recipients fetch */}
      {isLoadingRecipients && timer > 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "40px 60px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                marginBottom: "16px",
              }}
            >
              <Loader size="24px" />
            </div>
            <div
              style={{
                fontSize: "18px",
                color: "#333",
                fontWeight: "500",
              }}
            >
              Fetching safety network locations...
            </div>
          </div>
        </div>
      )}

      {alertActionAlert && (
        <AlertActionModal
          alert={alertActionAlert}
          onClose={() => setAlertActionAlert(null)}
          onRemoveAlert={handleRemoveAlert}
        />
      )}
    </DashboardLayout>
  );
};

export default AlertDetails;
