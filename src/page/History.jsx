import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useUser } from "../context/UserContext";
import { getAlertSummary } from "../api/DashboardApi";
import { DashboardContent } from "../styles/Dashboard.styled";
import DashboardLayout from "../Layout/DashboardLayout";
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
import baseStationImg from "../assets/images/baseStation.png";
import lockImg from "../assets/images/lockbeacon.png";
import safetyCardImg from "../assets/images/safety_card2.png";
import beaconImg from "../assets/images/beacon.png";
import SecurityImage from "../assets/images/warningShield2.png";
import SystemImage from "../assets/images/warning2.svg";
import OpenImage from "../assets/images/openFolder2.png";
import AcknowledgeImage from "../assets/images/Like.png";
import ResolvedImage from "../assets/images/done2.png";

const History = () => {
  const { user } = useUser();
  const [selectedFilter, setSelectedFilter] = useState("lastWeek");

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

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
  });

  // Dummy device data for System Summary
  const deviceData = [
    {
      icon: baseStationImg,
      count: 9,
      name: "HUBS",
      online: 9,
      offline: 2,
      snooze: 1,
      offlineTime: "2 hrs ago",
    },
    {
      icon: beaconImg,
      count: 3,
      name: "BEACONS",
      online: 3,
      offline: 0,
      snooze: 2,
      offlineTime: "N/A",
    },
    {
      icon: lockImg,
      count: 5,
      name: "LOCKS",
      online: 5,
      offline: 3,
      snooze: 4,
      offlineTime: "5 hrs ago",
    },
    {
      icon: safetyCardImg,
      count: 2,
      name: "SAFETY BUTTONS",
      online: 2,
      offline: 0,
      snooze: 0,
      offlineTime: "N/A",
    },
  ];

  console.log("Alert Summary Data:", alertSummaryApiData);
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
                    <DownloadButton onClick={() => console.log("Download PDF")}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                      </svg>
                      PDF
                    </DownloadButton>
                    <DownloadButton onClick={() => console.log("Download CSV")}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                      </svg>
                      CSV
                    </DownloadButton>
                    <DownloadButton
                      onClick={() => console.log("Download Excel")}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                      </svg>
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
                  <select defaultValue="all">
                    <option value="all">All Alerts</option>
                    <option value="safety">Safety Alerts</option>
                    <option value="security">Security Alerts</option>
                    <option value="system">System Alerts</option>
                  </select>
                </AlertFilter>

                <AlertList>
                  <AlertItem>
                    <img src={beaconImg} alt="FlexiTag Beacon" />
                    <div className="alert-info">
                      <div className="alert-title">Movement Detected</div>
                      <div className="alert-device">FlexiTag Beacon</div>
                    </div>
                    <div className="alert-time">Sep 5 2025 02:21:12 AM</div>
                  </AlertItem>

                  <AlertItem>
                    <img src={beaconImg} alt="FlexiBand Beacon" />
                    <div className="alert-info">
                      <div className="alert-title">Movement Detected</div>
                      <div className="alert-device">FlexiBand Beacon</div>
                    </div>
                    <div className="alert-time">Sep 5 2025 02:21:12 AM</div>
                  </AlertItem>

                  <AlertItem>
                    <img src={beaconImg} alt="FlexiTag Beacon" />
                    <div className="alert-info">
                      <div className="alert-title">Movement Detected</div>
                      <div className="alert-device">FlexiTag Beacon</div>
                    </div>
                    <div className="alert-time">Sep 5 2025 02:21:12 AM</div>
                  </AlertItem>

                  <AlertItem>
                    <img src={baseStationImg} alt="Office Hub" />
                    <div className="alert-info">
                      <div className="alert-title">WiFi Hub Online</div>
                      <div className="alert-device">Office Hub</div>
                    </div>
                    <div className="alert-time">Sep 5 2025 02:21:12 AM</div>
                  </AlertItem>
                </AlertList>

                <DownloadSection>
                  <p>Download Alert Histories</p>
                  <ButtonGroup>
                    <DownloadButton onClick={() => console.log("Download PDF")}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                      </svg>
                      PDF
                    </DownloadButton>
                    <DownloadButton onClick={() => console.log("Download CSV")}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                      </svg>
                      CSV
                    </DownloadButton>
                    <DownloadButton
                      onClick={() => console.log("Download Excel")}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                      </svg>
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
