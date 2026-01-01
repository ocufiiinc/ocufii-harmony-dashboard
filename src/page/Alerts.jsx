import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DashboardContent } from "../styles/Dashboard.styled";
import DashboardLayout from "../Layout/DashboardLayout";
import { ROUTE } from "../common/Routes";
import { useUser } from "../context/UserContext";
import { getDashboard } from "../api/DashboardApi";
import moment from "moment";
import SafetyImage from "../assets/images/person-shield.svg";
import SecurityImage from "../assets/images/warningShield2.png";
import OpenImage from "../assets/images/openFolder2.png";
import GeneralImage from "../assets/images/warning2.svg";
import DoneImage from "../assets/images/done2.png";
import AcknowledgeImage from "../assets/images/Like.png";
import {
  AlertsContainer,
  AlertsContent,
  AlertsMainContent,
} from "../styles/Alert.styled";
import AlertStats from "../components/AlertStats/AlertStats";
import AlertTable from "../components/AlertTable/AlertTable";
import AlertsChart from "../components/AlertsChart";
import AlertActionModal from "../components/AlertActionModal/AlertActionModal";
import { alertsChartData } from "../common/ExampleData";
import { formatDate, formatTime } from "../utility/TimeFormat";
import { getDeviceIcon, getSafetyAlertIcon } from "../utility/DeviceMapping";
const Alerts = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("24hours");
  const [selectedAlertType, setSelectedAlertType] = useState("all");
  const [alertActionAlert, setAlertActionAlert] = useState(null);
  const queryClient = useQueryClient();

  // Map dropdown values to API date range format
  const dateRangeMap = {
    "24hours": "24 hours",
    "7days": "7 days",
    "15days": "15 days",
    "30days": "30 days",
    thisMonth: "this month",
  };

  // Fetch dashboard data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard", user?.email, selectedFilter],
    queryFn: () =>
      getDashboard(user?.email || "", 1000, dateRangeMap[selectedFilter]),
    enabled: !!user?.email,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Transform API data to table format (with acknowledge filter)
  const transformAlertData = (alerts, filterUnacknowledged = false) => {
    const filteredAlerts = filterUnacknowledged
      ? alerts.filter((alert) => alert.acknowledge === "0")
      : alerts;

    return filteredAlerts.map((alert) => ({
      sender: alert.title || "Unknown",
      alert: alert.notificationReason || "No reason provided",
      alertIcon:
        alert.type === "safety"
          ? getSafetyAlertIcon(alert.notificationReason)
          : alert.type === "security"
          ? getDeviceIcon(alert.deviceType)
          : getDeviceIcon(alert.deviceType),
      time: formatTime(alert.duration),
      date: formatDate(alert.duration),
      ...alert, // Keep original data for actions
    }));
  };

  // Transform acknowledge alerts (where acknowledge is 1 or 2)
  const transformAcknowledgeAlerts = (alerts) => {
    return alerts
      .filter((alert) => alert.acknowledge === "1" || alert.acknowledge === "2")
      .map((alert) => ({
        sender: alert.title || "Unknown",
        alert: alert.notificationReason || "No reason provided",
        alertIcon:
          alert.type === "safety"
            ? getSafetyAlertIcon(alert.notificationReason)
            : alert.type === "security"
            ? getDeviceIcon(alert.deviceType)
            : getDeviceIcon(alert.deviceType),
        time: formatTime(alert.duration),
        date: formatDate(alert.duration),
        ...alert, // Keep original data for actions
      }));
  };

  // Transform resolved alerts (where acknowledge is 3)
  const transformResolvedAlerts = (alerts) => {
    return alerts
      .filter((alert) => alert.acknowledge === "3")
      .map((alert) => ({
        sender: alert.title || "Unknown",
        alert: alert.notificationReason || "No reason provided",
        alertIcon:
          alert.type === "safety"
            ? getSafetyAlertIcon(alert.notificationReason)
            : alert.type === "security"
            ? getDeviceIcon(alert.deviceType)
            : getDeviceIcon(alert.deviceType),
        time: formatTime(alert.duration),
        date: formatDate(alert.duration),
        ...alert, // Keep original data for actions
      }));
  };

  // Extract alert data from API response
  const safetyAlerts = transformAlertData(data?.data?.safety?.alerts || []);
  const securityAlerts = transformAlertData(data?.data?.security?.alerts || []);
  const systemAlerts = transformAlertData(data?.data?.system?.alerts || []);

  // Combine all alerts for Open Alerts (only unacknowledged)
  const allAlertsRaw = [
    ...(data?.data?.safety?.alerts || []),
    ...(data?.data?.security?.alerts || []),
    ...(data?.data?.system?.alerts || []),
  ];
  const openAlerts = transformAlertData(allAlertsRaw, true);

  // Acknowledge Alerts (where acknowledge is 1 or 2)
  const acknowledgeAlerts = transformAcknowledgeAlerts(allAlertsRaw);

  // Resolved Alerts (where acknowledge is 3)
  const resolvedAlerts = transformResolvedAlerts(allAlertsRaw);

  // Handler for action button clicks
  const handleAlertAction = (row, index) => {
    console.log("Action clicked for:", row);
    setAlertActionAlert(row);
  };

  // Handler for view button clicks
  const handleViewAlert = (row, index) => {
    console.log("View clicked for:", row);
    // Remove non-serializable properties (like React components) before navigating
    const { alertIcon, ...serializableAlert } = row;
    navigate(ROUTE.ALERT_DETAILS, { state: { alert: serializableAlert } });
  };

  // Handler for removing alert after resolution
  const handleRemoveAlert = () => {
    // Invalidate dashboard query to refresh data
    queryClient.invalidateQueries(["dashboard", user?.email, selectedFilter]);
    setAlertActionAlert(null);
  };

  return (
    <>
      <DashboardLayout>
        <DashboardContent>
          <AlertsContainer>
            <div className="alerts-header">
              <h1>Alerts</h1>
              <div className="filters-section">
                <label htmlFor="alert-filter">Filters:</label>
                <select
                  id="alert-filter"
                  className="filter-dropdown"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="24hours">24 hours</option>
                  <option value="7days">Last 7 days</option>
                  <option value="15days">Last 15 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="thisMonth">This month</option>
                </select>
              </div>
            </div>

            <AlertStats timeRange={selectedFilter} />

            <AlertsContent>
              <AlertsMainContent>
                <div
                  className="filters-section"
                  style={{ marginBottom: "24px" }}
                >
                  <label htmlFor="alert-type-filter">Filter:</label>
                  <select
                    id="alert-type-filter"
                    className="filter-dropdown"
                    value={selectedAlertType}
                    onChange={(e) => setSelectedAlertType(e.target.value)}
                  >
                    <option value="all">All Alerts</option>
                    <option value="safety">Safety Alerts</option>
                    <option value="security">Security Alerts</option>
                    <option value="system">System Alerts</option>
                    <option value="open">Open Alerts</option>
                    <option value="acknowledge">Acknowledge Alerts</option>
                    <option value="resolved">Resolved Alerts</option>
                  </select>
                </div>

                {(selectedAlertType === "all" ||
                  selectedAlertType === "safety") && (
                  <AlertTable
                    icon={SafetyImage}
                    title="Safety Alerts"
                    count={safetyAlerts.length}
                    headerColor="rgba(0, 181, 226, 1)"
                    data={safetyAlerts}
                    onView={handleViewAlert}
                    onAction={handleAlertAction}
                    actionButtonText="Action"
                    actionButtonColor="#007bff"
                  />
                )}

                {(selectedAlertType === "all" ||
                  selectedAlertType === "security") && (
                  <AlertTable
                    icon={SecurityImage}
                    title="Security Alerts"
                    count={securityAlerts.length}
                    headerColor="rgba(255, 0, 0, 1)"
                    data={securityAlerts}
                    onAction={handleAlertAction}
                    actionButtonText="Action"
                    actionButtonColor="#007bff"
                  />
                )}

                {(selectedAlertType === "all" ||
                  selectedAlertType === "system") && (
                  <AlertTable
                    icon={GeneralImage}
                    title="System Alerts"
                    count={systemAlerts.length}
                    headerColor="rgba(252, 196, 0, 1)"
                    data={systemAlerts}
                    onAction={handleAlertAction}
                    actionButtonText="Action"
                    actionButtonColor="#007bff"
                  />
                )}

                {(selectedAlertType === "all" ||
                  selectedAlertType === "open") && (
                  <AlertTable
                    icon={OpenImage}
                    title="Open Alerts"
                    count={openAlerts.length}
                    headerColor="rgba(237, 139, 0, 1)"
                    data={openAlerts}
                    onView={handleViewAlert}
                    onAction={handleAlertAction}
                    actionButtonText="Action"
                    actionButtonColor="#007bff"
                  />
                )}

                {(selectedAlertType === "all" ||
                  selectedAlertType === "acknowledge") && (
                  <AlertTable
                    icon={AcknowledgeImage}
                    title="Acknowledge Alerts"
                    count={acknowledgeAlerts.length}
                    headerColor="rgba(0, 181, 226, 1)"
                    data={acknowledgeAlerts}
                    onView={handleViewAlert}
                    onAction={handleAlertAction}
                    actionButtonText="Action"
                    actionButtonColor="#007bff"
                  />
                )}

                {(selectedAlertType === "all" ||
                  selectedAlertType === "resolved") && (
                  <AlertTable
                    icon={DoneImage}
                    title="Resolved Alerts"
                    count={resolvedAlerts.length}
                    headerColor="rgba(54, 190, 167, 1)"
                    data={resolvedAlerts}
                    onView={handleViewAlert}
                    onAction={handleAlertAction}
                    actionButtonText="Action"
                    actionButtonColor="#007bff"
                  />
                )}
              </AlertsMainContent>
            </AlertsContent>

            <AlertsChart />
          </AlertsContainer>
        </DashboardContent>
      </DashboardLayout>
      {alertActionAlert && (
        <AlertActionModal
          alert={alertActionAlert}
          onClose={() => setAlertActionAlert(null)}
          onRemoveAlert={handleRemoveAlert}
        />
      )}
    </>
  );
};

export default Alerts;
