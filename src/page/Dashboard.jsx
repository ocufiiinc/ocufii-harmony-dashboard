import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../context/UserContext";
import {
  getDashboard,
  pingRecipients,
  getSafetyNetworkLocations,
  getAssistRequestStatus,
  getAlertSummary,
  getDeviceHealth,
  getAlertNotes,
  addAlertNote,
} from "../api/DashboardApi";
import moment from "moment";
import Toast from "../utility/Toast";
import {
  DashboardContent,
  ActiveAlertsSection,
  AlertCardsGrid,
} from "../styles/Dashboard.styled";
import {
  SystemOverviewSection,
  SystemOverviewHeader,
  SystemOverviewGrid,
} from "../styles/SystemOverview.styled";
import DashboardLayout from "../Layout/DashboardLayout";
import AlertCard from "../components/AlertCard";
import SafetyAlertItem from "../components/AlertCard/SafetyAlertItem";
import SecurityAlertItem from "../components/AlertCard/SecurityAlertItem";
import SystemAlertItem from "../components/AlertCard/SystemAlertItem";
import AlertsChart from "../components/AlertsChart";
import AlertDetailMap from "../components/AlertDetailMap";
import AlertActionModal from "../components/AlertActionModal";
import {
  DeviceHealthCard,
  AlertSummaryCard,
} from "../components/SystemOverview";
import {
  alertsChartData,
  deviceHealthData,
  alertSummaryData,
} from "../common/ExampleData";
import { Loader } from "../styles/Loader";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../common/Routes";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showRecipients, setShowRecipients] = useState(false);
  const [showEmergencyServices, setShowEmergencyServices] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isLoadingRecipients, setIsLoadingRecipients] = useState(false);
  const [shouldFetchLocations, setShouldFetchLocations] = useState(false);
  const [currentNotificationId, setCurrentNotificationId] = useState(null);
  const [shouldPollStatus, setShouldPollStatus] = useState(false);
  const [timeRange, setTimeRange] = useState("24 Hours");
  const [alertActionAlert, setAlertActionAlert] = useState(null);
  const timerRef = useRef(null);
  const fetchIntervalRef = useRef(null);

  // TanStack Query for fetching safety network locations
  const {
    data: safetyNetworkData,
    refetch: refetchSafetyNetwork,
    isRefetching,
  } = useQuery({
    queryKey: ["safetyNetwork", user?.email, currentNotificationId],
    queryFn: () =>
      getSafetyNetworkLocations(user?.email, currentNotificationId),
    enabled: false, // Don't fetch automatically
    staleTime: 0, // Always fetch fresh data
    cacheTime: 0, // Don't cache
  });

  // TanStack Query for polling assist request status
  const { data: assistStatusData } = useQuery({
    queryKey: ["assistRequestStatus", currentNotificationId],
    queryFn: () => {
      console.log("Polling assist request status for:", currentNotificationId);
      return getAssistRequestStatus(currentNotificationId);
    },
    enabled: shouldPollStatus && !!currentNotificationId,
    refetchInterval: shouldPollStatus ? 30000 : false,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

  // TanStack Query for alert summary with dynamic time range
  const { data: alertSummaryApiData } = useQuery({
    queryKey: ["alertSummary", user?.email, timeRange],
    queryFn: () => {
      const endDateTime = moment().toISOString();
      let startDateTime;

      if (timeRange === "7 Days") {
        startDateTime = moment().subtract(7, "days").toISOString();
      } else if (timeRange === "30 Days") {
        startDateTime = moment().subtract(30, "days").toISOString();
      } else {
        // Default to 24 Hours
        startDateTime = moment().subtract(24, "hours").toISOString();
      }

      return getAlertSummary(user?.email, startDateTime, endDateTime);
    },
    enabled: !!user?.email,
    refetchInterval: 120000, // Refetch every 2 minutes
    staleTime: 60000, // Cache for 1 minute
  });

  // TanStack Query for device health
  const { data: deviceHealthApiData } = useQuery({
    queryKey: ["deviceHealth", user?.email],
    queryFn: () => getDeviceHealth(user?.email),
    enabled: !!user?.email,
    refetchInterval: 120000, // Refetch every 2 minutes
    staleTime: 60000, // Cache for 1 minute
  });

  // Fetch dashboard data using TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: () => getDashboard(user?.email || ""),
    enabled: !!user?.email, // Only run query if user email exists
    refetchInterval: 120000, // Refetch every 2 minutes
  });

  // Use API data if available, otherwise fall back to example data
  const activeAlerts = data?.data || {
    safety: {
      category: "Safety",
      color: "rgba(0, 181, 226, 1)",
      count: 0,
      alerts: [],
    },
    security: { category: "Security", color: "#E91E63", count: 0, alerts: [] },
    system: { category: "System", color: "#FFC107", count: 0, alerts: [] },
  };

  const handleViewAlert = (alert) => {
    console.log("View Emergency Services for alert:", alert);
    setSelectedAlert(alert);
    setShowRecipients(false);
    setShowEmergencyServices(true);
    setSelectedCategory("safety"); // Open the map for this specific alert
  };

  const handleSeeRecipients = async (alert) => {
    console.log("Show recipients for alert:", alert);
    setSelectedAlert(alert);
    setShowRecipients(true);
    setShowEmergencyServices(false);
    setSelectedCategory("safety");
    setRecipients([]);
    setIsLoadingRecipients(true);
    setCurrentNotificationId(alert.id);

    try {
      // Call ping recipients API
      await pingRecipients(user?.email, alert.id);
      Toast.success("Safety network pinged successfully");

      // Start 20 second timer
      setTimer(20);

      // Clear any existing timers
      if (timerRef.current) clearInterval(timerRef.current);
      if (fetchIntervalRef.current) clearTimeout(fetchIntervalRef.current);

      // Start countdown timer
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
        if (result.data && result.data.members) {
          console.log("Recipients fetched at 20s:", result.data.members);
          setRecipients(result.data.members);
          if (result.data.members.length > 0) {
            Toast.success("Safety network locations retrieved");
          } else {
            Toast.info("No safety network members available");
          }
        } else {
          Toast.info("No safety network members available");
          setRecipients([]);
        }
        setIsLoadingRecipients(false);
      }, 20000);
    } catch (error) {
      console.error("Error in handleSeeRecipients:", error);
      setIsLoadingRecipients(false);
      Toast.error("Failed to fetch safety network locations");
    }
  };

  const handleAlertClick = (alert, alertType) => {
    console.log("Alert clicked:", alert);
    setSelectedAlert(alert);
    setShowRecipients(false);
    setShowEmergencyServices(false);
    // Only open the map for safety alerts
    if (alertType === "safety") {
      setSelectedCategory("safety");
    } else {
      setSelectedCategory(null);
    }
  };

  const handleViewAll = (category) => {
    console.log("View all alerts for:", category);
    // Add your navigation logic here
    navigate(ROUTE.ALERT);
  };

  const handleCardClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleUpdateRecipientStatus = useCallback((email, status) => {
    setRecipients((prevRecipients) => {
      // Check if status actually changed to prevent unnecessary re-renders
      const recipient = prevRecipients.find((r) => r.email === email);
      if (recipient && recipient.assistStatus === status) {
        return prevRecipients; // No change, return same reference
      }

      return prevRecipients.map((recipient) =>
        recipient.email === email
          ? { ...recipient, assistStatus: status }
          : recipient
      );
    });
  }, []);

  const handleCloseMap = () => {
    setSelectedCategory(null);
    setSelectedAlert(null);
    setShowRecipients(false);
    setShowEmergencyServices(false);
    setRecipients([]);
    setTimer(0);
    setIsLoadingRecipients(false);
    setCurrentNotificationId(null);
    setShouldPollStatus(false);

    // Clear timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (fetchIntervalRef.current) clearInterval(fetchIntervalRef.current);
  };

  const handleAlertAction = (alert) => {
    setAlertActionAlert(alert);
  };

  const handleRemoveAlert = () => {
    // Close the modal and the data will refresh on next interval
    setAlertActionAlert(null);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (fetchIntervalRef.current) clearInterval(fetchIntervalRef.current);
    };
  }, []);

  // Show toast on error
  useEffect(() => {
    if (isError) {
      Toast.error(
        `Error loading dashboard: ${error?.message || "Unknown error"}`
      );
    }
  }, [isError, error]);

  return (
    <DashboardLayout>
      <DashboardContent>
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

        {isLoading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <Loader />
          </div>
        ) : (
          <>
            <ActiveAlertsSection>
              <h1>Active Alerts</h1>
              <AlertCardsGrid $hasSelectedCard={selectedCategory !== null}>
                {/* Safety Card */}
                <div
                  className={`alert-card-wrapper ${
                    selectedCategory === "safety" ? "selected" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <AlertCard
                    category={activeAlerts.safety.category}
                    color={"rgba(0, 181, 226, 1)"}
                    count={activeAlerts.safety.count}
                    alerts={activeAlerts.safety.alerts}
                    onViewAll={() => handleViewAll("safety")}
                  >
                    {activeAlerts.safety.alerts.slice(0, 3).map((alert) => (
                      <div
                        key={alert.id}
                        onClick={() => handleAlertClick(alert, "safety")}
                      >
                        <SafetyAlertItem
                          alert={alert}
                          onView={handleViewAlert}
                          onSeeRecipients={handleSeeRecipients}
                          onAlertAction={handleAlertAction}
                          isSelected={selectedAlert?.id === alert.id}
                          showRecipients={
                            showRecipients && selectedAlert?.id === alert.id
                          }
                          showEmergencyServices={
                            showEmergencyServices &&
                            selectedAlert?.id === alert.id
                          }
                        />
                      </div>
                    ))}
                  </AlertCard>
                </div>

                {/* Map for selected card - Pass only the selected alert */}
                {selectedCategory === "safety" && selectedAlert && (
                  <div className="map-wrapper">
                    <AlertDetailMap
                      alerts={[{ ...selectedAlert, recipients }]}
                      onClose={handleCloseMap}
                      category={activeAlerts.safety.category}
                      selectedAlert={{ ...selectedAlert, recipients }}
                      showRecipients={showRecipients}
                      showEmergencyServices={showEmergencyServices}
                      isLoadingRecipients={isLoadingRecipients}
                      assistStatusData={assistStatusData}
                      onTriggerPolling={() => setShouldPollStatus(true)}
                      onStopPolling={() => setShouldPollStatus(false)}
                      onUpdateRecipientStatus={handleUpdateRecipientStatus}
                    />
                  </div>
                )}

                {/* Security Card */}
                <div
                  className={`alert-card-wrapper ${
                    selectedCategory === "security" ? "selected" : ""
                  }`}
                  // onClick={() => handleCardClick("security")}
                  style={{ cursor: "pointer" }}
                >
                  <AlertCard
                    category={activeAlerts.security.category}
                    color={"rgba(225, 6, 0, 1)"}
                    count={activeAlerts.security.count}
                    alerts={activeAlerts.security.alerts}
                  >
                    {activeAlerts.security.alerts.slice(0, 3).map((alert) => (
                      <div
                        key={alert.id}
                        onClick={() => handleAlertClick(alert, "security")}
                      >
                        <SecurityAlertItem
                          alert={alert}
                          onView={handleViewAlert}
                          onAlertAction={handleAlertAction}
                          isSelected={selectedAlert?.id === alert.id}
                        />
                      </div>
                    ))}
                  </AlertCard>
                </div>

                {/* System Card */}
                <div
                  className={`alert-card-wrapper ${
                    selectedCategory === "system" ? "selected" : ""
                  }`}
                  // onClick={() => handleCardClick("system")}
                  style={{ cursor: "pointer" }}
                >
                  <AlertCard
                    category={activeAlerts.system.category}
                    color={"rgba(252, 196, 0, 1)"}
                    count={activeAlerts.system.count}
                    alerts={activeAlerts.system.alerts}
                  >
                    {activeAlerts.system.alerts.slice(0, 3).map((alert) => (
                      <div
                        key={alert.id}
                        onClick={() => handleAlertClick(alert, "system")}
                      >
                        <SystemAlertItem
                          alert={alert}
                          onView={handleViewAlert}
                          onAlertAction={handleAlertAction}
                          isSelected={selectedAlert?.id === alert.id}
                        />
                      </div>
                    ))}
                  </AlertCard>
                </div>
              </AlertCardsGrid>
            </ActiveAlertsSection>

            {/* Alerts Summary Chart */}
            {/* <AlertsChart data={alertsChartData} /> */}

            {/* System Overview Section */}
            <SystemOverviewSection>
              <SystemOverviewHeader>System Overview</SystemOverviewHeader>
              <SystemOverviewGrid>
                <DeviceHealthCard
                  devices={deviceHealthData}
                  deviceHealthData={deviceHealthApiData?.data}
                />
                <AlertSummaryCard
                  alertSummaryData={alertSummaryApiData?.data}
                  timeRange={timeRange}
                  onTimeRangeChange={setTimeRange}
                />
              </SystemOverviewGrid>
            </SystemOverviewSection>
          </>
        )}
      </DashboardContent>
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

export default Dashboard;
