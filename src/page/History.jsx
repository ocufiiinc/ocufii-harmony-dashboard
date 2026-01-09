import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useUser } from "../context/UserContext";
import {
  getAlertSummary,
  getDashboard,
  getDeviceHealth,
} from "../api/DashboardApi";
import { getSafetyAlertIcon, getDeviceIcon } from "../utility/DeviceMapping";
import { formatDateTime } from "../utility/TimeFormat";
import { DashboardContent } from "../styles/Dashboard.styled";
import DashboardLayout from "../Layout/DashboardLayout";
import downloadImg from "../assets/images/download.png";
import {
  HistoryContainer,
  HistoryHeader,
  HistoryTitle,
  FilterContainer,
  StatsGrid,
  CardsContainer,
  SummaryCard,
  CardTitle,
  CardContent,
  AlertList,
  AlertItem,
  AlertFilter,
  DownloadSection,
  ButtonGroup,
  DownloadButton,
} from "../styles/History.styled";
import {
  DeviceHealthList,
  DeviceHealthItem,
  DeviceIcon,
  DeviceInfo,
  DeviceCount,
  DeviceName,
  DeviceStats,
  StatColumn,
  StatLabel,
  StatValue,
  StatTime,
} from "../styles/SystemOverview.styled";
import StatCard from "../components/StatCard/StatCard";
import SafetyImage from "../assets/images/person-shield.svg";
import SecurityImage from "../assets/images/warningShield2.png";
import SystemImage from "../assets/images/warning2.svg";
import OpenImage from "../assets/images/openFolder2.png";
import AcknowledgeImage from "../assets/images/Like.png";
import ResolvedImage from "../assets/images/done2.png";

const History = () => {
  const { user } = useUser();
  const [selectedFilter, setSelectedFilter] = useState("lastWeek");
  const [alertCategoryFilter, setAlertCategoryFilter] = useState("all");

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleAlertCategoryChange = (e) => {
    setAlertCategoryFilter(e.target.value);
  };

  // Fetch dashboard data with date range
  const { data: dashboardData } = useQuery({
    queryKey: ["dashboardHistory", user?.email, selectedFilter],
    queryFn: () => getDashboard(user?.email || "", 1000, selectedFilter),
    enabled: !!user?.email,
    refetchInterval: 60000, // Refetch every 1 minute
    staleTime: 60000, // Cache for 1 minute
    retry: 1,
  });

  // TanStack Query for alert summary with dynamic time range
  const { data: alertSummaryApiData } = useQuery({
    queryKey: ["alertSummary", user?.email, selectedFilter],
    queryFn: () => {
      const endDateTime = moment().toISOString();
      let startDateTime;

      if (selectedFilter === "lastMonth") {
        startDateTime = moment().subtract(1, "month").toISOString();
      } else if (selectedFilter === "last3Months") {
        startDateTime = moment().subtract(3, "months").toISOString();
      } else {
        // Default to lastWeek
        startDateTime = moment().subtract(7, "days").toISOString();
      }

      return getAlertSummary(user?.email, startDateTime, endDateTime);
    },
    enabled: !!user?.email,
    refetchInterval: 60000, // Refetch every 1 minute
    staleTime: 60000, // Cache for 1 minute
    retry: 1,
  });

  // TanStack Query for device health
  const { data: deviceHealthApiData } = useQuery({
    queryKey: ["deviceHealth", user?.email],
    queryFn: () => getDeviceHealth(user?.email),
    enabled: !!user?.email,
    refetchInterval: 60000, // Refetch every 1 minute
    staleTime: 60000, // Cache for 1 minute
    retry: 1,
  });

  // Transform device health API data
  const deviceData = useMemo(() => {
    return (deviceHealthApiData?.data || []).map((device) => ({
      icon: getDeviceIcon(device.deviceType.toString()),
      count: device.totalCount,
      name: device.deviceTypeName,
      online: device.onlineCount,
      offline: device.offlineCount,
      snooze: device.snoozeCount,
      offlineTime: device.lastOnlineTime
        ? formatDateTime(device.lastOnlineTime)
        : "N/A",
    }));
  }, [deviceHealthApiData]);

  // Stats data based on selected filter
  const statsData = useMemo(
    () => [
      {
        id: 1,
        title: "Safety",
        value: alertSummaryApiData?.data?.safetyCount || 0,
        image: SafetyImage,
      },
      {
        id: 2,
        title: "Security",
        value: alertSummaryApiData?.data?.securityCount || 0,
        image: SecurityImage,
      },
      {
        id: 3,
        title: "System",
        value: alertSummaryApiData?.data?.systemCount || 0,
        image: SystemImage,
      },
      {
        id: 4,
        title: "Open",
        value: alertSummaryApiData?.data?.openCount || 0,
        image: OpenImage,
      },
      {
        id: 5,
        title: "Acknowledged",
        value: alertSummaryApiData?.data?.acknowledgedCount || 0,
        image: AcknowledgeImage,
      },
      {
        id: 6,
        title: "Resolved",
        value: alertSummaryApiData?.data?.resolvedCount || 0,
        image: ResolvedImage,
      },
    ],
    [alertSummaryApiData]
  );

  // Combine all alerts from safety, security, and system
  const allAlerts = useMemo(() => {
    const safetyAlerts = dashboardData?.data?.safety?.alerts || [];
    const securityAlerts = dashboardData?.data?.security?.alerts || [];
    const systemAlerts = dashboardData?.data?.system?.alerts || [];

    return [...safetyAlerts, ...securityAlerts, ...systemAlerts].sort(
      (a, b) => new Date(b.duration) - new Date(a.duration)
    );
  }, [dashboardData]);

  // Filter alerts based on category
  const filteredAlerts = useMemo(() => {
    if (alertCategoryFilter === "all") {
      return allAlerts;
    }
    return allAlerts.filter((alert) => alert.type === alertCategoryFilter);
  }, [allAlerts, alertCategoryFilter]);

  return (
    <DashboardLayout>
      <DashboardContent>
        <HistoryContainer>
          <HistoryHeader>
            <HistoryTitle>History</HistoryTitle>
            <FilterContainer>
              <label htmlFor="history-filter">Filter:</label>
              <select
                id="history-filter"
                className="filter-dropdown"
                value={selectedFilter}
                onChange={handleFilterChange}
              >
                <option value="lastWeek">Last Week</option>
                <option value="lastMonth">Last Month</option>
                <option value="last3Months">Last 3 Months</option>
              </select>
            </FilterContainer>
          </HistoryHeader>

          <StatsGrid>
            {statsData.map((stat) => (
              <StatCard
                key={stat.id}
                image={stat.image}
                title={stat.title}
                value={stat.value}
              />
            ))}
          </StatsGrid>

          <CardsContainer>
            {/* System Summary Card */}
            <SummaryCard>
              <CardTitle>SYSTEM SUMMARY</CardTitle>
              <CardContent>
                <DeviceHealthList>
                  {deviceData.map((device, index) => (
                    <DeviceHealthItem key={index}>
                      <DeviceIcon>
                        <img src={device.icon} alt={device.name} />
                      </DeviceIcon>
                      <DeviceInfo>
                        <DeviceCount>{device.count}</DeviceCount>
                        <DeviceName>{device.name}</DeviceName>
                      </DeviceInfo>
                      <DeviceStats>
                        <StatColumn>
                          <StatLabel>Online</StatLabel>
                          <StatValue $status="online">
                            {device.online}
                          </StatValue>
                        </StatColumn>
                        <StatColumn>
                          <StatLabel>Offline</StatLabel>
                          <StatValue $status="offline">
                            {device.offline}
                          </StatValue>
                          <StatTime>{device.offlineTime}</StatTime>
                        </StatColumn>
                        <StatColumn>
                          <StatLabel>Snooze</StatLabel>
                          <StatValue $status="snooze">
                            {device.snooze}
                          </StatValue>
                        </StatColumn>
                      </DeviceStats>
                    </DeviceHealthItem>
                  ))}
                </DeviceHealthList>

                <DownloadSection>
                  <p>Download System Summary</p>
                  <ButtonGroup>
                    <DownloadButton
                      onClick={() => console.log("Download PDF")}
                      disabled
                    >
                      <img
                        src={downloadImg}
                        alt="download"
                        style={{ width: 18, height: 18, marginRight: 8 }}
                      />
                      PDF
                    </DownloadButton>
                    <DownloadButton
                      onClick={() => console.log("Download CSV")}
                      disabled
                    >
                      <img
                        src={downloadImg}
                        alt="download"
                        style={{ width: 18, height: 18, marginRight: 8 }}
                      />
                      CSV
                    </DownloadButton>
                    <DownloadButton
                      onClick={() => console.log("Download Excel")}
                      disabled
                    >
                      <img
                        src={downloadImg}
                        alt="download"
                        style={{ width: 18, height: 18, marginRight: 8 }}
                      />
                      EXCEL
                    </DownloadButton>
                  </ButtonGroup>
                </DownloadSection>
              </CardContent>
            </SummaryCard>

            {/* Alert Summary Card */}
            <SummaryCard>
              <CardTitle>ALERT SUMMARY</CardTitle>
              <CardContent>
                <AlertFilter>
                  <label>Filter:</label>
                  <select
                    value={alertCategoryFilter}
                    onChange={handleAlertCategoryChange}
                  >
                    <option value="all">All Alerts</option>
                    <option value="safety">Safety Alerts</option>
                    <option value="security">Security Alerts</option>
                    <option value="system">System Alerts</option>
                  </select>
                </AlertFilter>

                <AlertList style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {filteredAlerts.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px 20px",
                        color: "#666",
                      }}
                    >
                      No alerts found
                    </div>
                  ) : (
                    filteredAlerts.map((alert) => {
                      // Get appropriate icon based on alert type
                      let iconElement;
                      if (alert.type === "safety") {
                        const iconData = getSafetyAlertIcon(
                          alert.notificationReason
                        );
                        if (iconData.type === "image") {
                          iconElement = (
                            <img
                              src={iconData.src}
                              alt={iconData.alt}
                              style={{ width: "40px", height: "40px" }}
                            />
                          );
                        } else {
                          const IconComponent = iconData.Component;
                          iconElement = (
                            <IconComponent
                              style={{ fontSize: "40px", color: "#00B5E2" }}
                            />
                          );
                        }
                      } else {
                        // Security or System alert - use device icon
                        iconElement = (
                          <img
                            src={getDeviceIcon(alert.deviceType)}
                            alt="Device"
                            style={{ width: "40px", height: "40px" }}
                          />
                        );
                      }

                      return (
                        <AlertItem key={alert.id}>
                          {iconElement}
                          <div className="alert-info">
                            <div className="alert-title">
                              {alert.notificationReason}
                            </div>
                            <div className="alert-device">{alert.title}</div>
                          </div>
                          <div className="alert-time">
                            {moment(alert.duration).format(
                              "MMM D YYYY hh:mm:ss A"
                            )}
                          </div>
                        </AlertItem>
                      );
                    })
                  )}
                </AlertList>

                <DownloadSection>
                  <p>Download Alert Histories</p>
                  <ButtonGroup>
                    <DownloadButton
                      onClick={() => console.log("Download PDF")}
                      disabled
                    >
                      <img
                        src={downloadImg}
                        alt="download"
                        style={{ width: 18, height: 18, marginRight: 8 }}
                      />
                      PDF
                    </DownloadButton>
                    <DownloadButton
                      onClick={() => console.log("Download CSV")}
                      disabled
                    >
                      <img
                        src={downloadImg}
                        alt="download"
                        style={{ width: 18, height: 18, marginRight: 8 }}
                      />
                      CSV
                    </DownloadButton>
                    <DownloadButton
                      onClick={() => console.log("Download Excel")}
                      disabled
                    >
                      <img
                        src={downloadImg}
                        alt="download"
                        style={{ width: 18, height: 18, marginRight: 8 }}
                      />
                      EXCEL
                    </DownloadButton>
                  </ButtonGroup>
                </DownloadSection>
              </CardContent>
            </SummaryCard>
          </CardsContainer>
        </HistoryContainer>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default History;
