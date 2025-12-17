import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext";
import { getAlertSummary } from "../../api/DashboardApi";
import moment from "moment";
import {
  AlertStatsContainer,
  StatsCardContainer,
  StatsHeader,
  StatsHeaderIcon,
  StatsHeaderContent,
  StatsCount,
  StatsLabel,
  StatsDescription,
  CategoryGrid,
  CategoryCard,
  CategoryIcon,
  CategoryTextContainer,
  CategoryLabel,
  CategoryCount,
  StatusGrid,
  StatusCard,
  StatusCardTop,
  StatusIcon,
  StatusTextContainer,
  StatusLabel,
  StatusCount,
  StatusDescription,
  ProgressText,
} from "../../styles/AlertStats.styled";
import AlertImg from "../../assets/images/alarm-bell-ring-1.svg";
import safetyImg from "../../assets/images/person-shield.svg";
import securityImg from "../../assets/images/warningShield2.png";
import systemImg from "../../assets/images/warning2.svg";
import OpenIssueImg from "../../assets/images/openFolder2.png";
import AcknowledgedImg from "../../assets/images/Like.png";
import ResolvedImg from "../../assets/images/done2.png";

const AlertStats = ({ timeRange }) => {
  const { user } = useUser();

  // Map timeRange values to readable format
  const getTimeRangeLabel = (range) => {
    const rangeMap = {
      "24hours": "24 hours",
      "7days": "last 7 days",
      "15days": "last 15 days",
      "30days": "last 30 days",
      thisMonth: "this month",
    };
    return rangeMap[range] || "24 hours";
  };

  // TanStack Query for alert summary with dynamic time range
  const { data: alertSummaryApiData } = useQuery({
    queryKey: ["alertSummary", user?.email, timeRange],
    queryFn: () => {
      const endDateTime = moment().toISOString();
      let startDateTime;

      if (timeRange === "7days") {
        startDateTime = moment().subtract(7, "days").toISOString();
      } else if (timeRange === "15days") {
        startDateTime = moment().subtract(15, "days").toISOString();
      } else if (timeRange === "30days") {
        startDateTime = moment().subtract(30, "days").toISOString();
      } else if (timeRange === "thisMonth") {
        startDateTime = moment().startOf("month").toISOString();
      } else {
        // Default to 24 hours
        startDateTime = moment().subtract(24, "hours").toISOString();
      }

      return getAlertSummary(user?.email, startDateTime, endDateTime);
    },
    enabled: !!user?.email,
    refetchInterval: 120000, // Refetch every 2 minutes
    staleTime: 60000, // Cache for 1 minute
  });

  // Use API data if available
  const apiData = alertSummaryApiData?.data || {};

  const lifetimeData = {
    totalAlerts: apiData.lifetimeAlerts || 0,
    safetyCount: apiData.safetyCount || 0,
    securityCount: apiData.securityCount || 0,
    systemCount: apiData.systemCount || 0,
    openCount: apiData.openCount || 0,
    acknowledgedCount: apiData.acknowledgedCount || 0,
    resolvedCount: apiData.resolvedCount || 0,
    description: "All alerts received since account was created.",
  };

  const receivedData = {
    totalAlerts: apiData.totalAlerts || 0,
    safetyCount: apiData.safetyCount || 0,
    securityCount: apiData.securityCount || 0,
    systemCount: apiData.systemCount || 0,
    activeAlerts: {
      safety: apiData.safetyCount || 0,
      security: apiData.securityCount || 0,
      system: apiData.systemCount || 0,
    },
    description: `Total alerts received in the ${getTimeRangeLabel(
      timeRange
    )}.`,
  };

  return (
    <AlertStatsContainer>
      {/* Lifetime Alerts Card */}
      <StatsCardContainer>
        <StatsHeader>
          <StatsHeaderIcon>
            <img src={AlertImg} alt="Alert Icon" />
          </StatsHeaderIcon>
          <StatsHeaderContent>
            <StatsLabel>Lifetime Alerts</StatsLabel>
            <StatsCount>{lifetimeData.totalAlerts}</StatsCount>
          </StatsHeaderContent>
        </StatsHeader>
        <StatsDescription>{lifetimeData.description}</StatsDescription>

        {/* Category Breakdown */}
        <CategoryGrid>
          <CategoryCard>
            <CategoryIcon>
              <img src={safetyImg} alt="Safety Icon" />
            </CategoryIcon>
            <CategoryTextContainer>
              <CategoryLabel>Safety</CategoryLabel>
              <CategoryCount>{lifetimeData.safetyCount}</CategoryCount>
            </CategoryTextContainer>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <img src={securityImg} alt="Security Icon" />
            </CategoryIcon>
            <CategoryTextContainer>
              <CategoryLabel>Security</CategoryLabel>
              <CategoryCount>{lifetimeData.securityCount}</CategoryCount>
            </CategoryTextContainer>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <img src={systemImg} alt="System Icon" />
            </CategoryIcon>
            <CategoryTextContainer>
              <CategoryLabel>System</CategoryLabel>
              <CategoryCount>{lifetimeData.systemCount}</CategoryCount>
            </CategoryTextContainer>
          </CategoryCard>
        </CategoryGrid>
        <StatsDescription>
          All alerts received by category, since account was created.
        </StatsDescription>

        {/* Status Breakdown */}
        <StatusGrid>
          <StatusCard>
            <StatusCardTop>
              <StatusIcon>
                <img src={OpenIssueImg} alt="Open Folder Icon" />
              </StatusIcon>
              <StatusTextContainer>
                <StatusLabel>Open</StatusLabel>
                <StatusCount>{lifetimeData.openCount}</StatusCount>
              </StatusTextContainer>
            </StatusCardTop>
            <StatusDescription>Still Waiting for Action</StatusDescription>
          </StatusCard>
          <StatusCard>
            <StatusCardTop>
              <StatusIcon>
                <img src={AcknowledgedImg} alt="Acknowledged Icon" />
              </StatusIcon>
              <StatusTextContainer>
                <StatusLabel>Acknowledged</StatusLabel>
                <StatusCount>{lifetimeData.acknowledgedCount}</StatusCount>
              </StatusTextContainer>
            </StatusCardTop>
            <StatusDescription>
              Confirmed But Not Yet Resolved
            </StatusDescription>
          </StatusCard>
          <StatusCard>
            <StatusCardTop>
              <StatusIcon>
                <img src={ResolvedImg} alt="Resolved Icon" />
              </StatusIcon>
              <StatusTextContainer>
                <StatusLabel>Resolved</StatusLabel>
                <StatusCount>{lifetimeData.resolvedCount}</StatusCount>
              </StatusTextContainer>
            </StatusCardTop>
            <StatusDescription>Fully Addressed and Closed</StatusDescription>
          </StatusCard>
        </StatusGrid>
        <ProgressText>Current progress on all alerts received.</ProgressText>
      </StatsCardContainer>

      {/* Alerts Received Card */}
      <StatsCardContainer>
        <StatsHeader>
          <StatsHeaderIcon>
            <img src={AlertImg} alt="Alert Icon" />
          </StatsHeaderIcon>
          <StatsHeaderContent>
            <StatsLabel>Alerts Received</StatsLabel>
            <StatsCount>{receivedData.totalAlerts}</StatsCount>
          </StatsHeaderContent>
        </StatsHeader>
        <StatsDescription>{receivedData.description}</StatsDescription>

        {/* Category Breakdown */}
        <CategoryGrid>
          <CategoryCard>
            <CategoryIcon>
              <img src={safetyImg} alt="Safety Icon" />
            </CategoryIcon>
            <CategoryTextContainer>
              <CategoryLabel>Safety</CategoryLabel>
              <CategoryCount>{receivedData.safetyCount}</CategoryCount>
            </CategoryTextContainer>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <img src={securityImg} alt="Security Icon" />
            </CategoryIcon>
            <CategoryTextContainer>
              <CategoryLabel>Security</CategoryLabel>
              <CategoryCount>{receivedData.securityCount}</CategoryCount>
            </CategoryTextContainer>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <img src={systemImg} alt="System Icon" />
            </CategoryIcon>
            <CategoryTextContainer>
              <CategoryLabel>System</CategoryLabel>
              <CategoryCount>{receivedData.systemCount}</CategoryCount>
            </CategoryTextContainer>
          </CategoryCard>
        </CategoryGrid>
        <StatsDescription>
          Total alerts received in the {getTimeRangeLabel(timeRange)} by
          category.
        </StatsDescription>

        {/* Active Alerts by Category */}
        <CategoryGrid>
          <CategoryCard>
            <CategoryIcon>
              <img src={safetyImg} alt="Safety Icon" />
            </CategoryIcon>
            <CategoryTextContainer>
              <CategoryLabel>Safety</CategoryLabel>
              <CategoryCount>{receivedData.activeAlerts.safety}</CategoryCount>
            </CategoryTextContainer>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <img src={securityImg} alt="Security Icon" />
            </CategoryIcon>
            <CategoryTextContainer>
              <CategoryLabel>Security</CategoryLabel>
              <CategoryCount>
                {receivedData.activeAlerts.security}
              </CategoryCount>
            </CategoryTextContainer>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <img src={systemImg} alt="System Icon" />
            </CategoryIcon>
            <CategoryTextContainer>
              <CategoryLabel>System</CategoryLabel>
              <CategoryCount>{receivedData.activeAlerts.system}</CategoryCount>
            </CategoryTextContainer>
          </CategoryCard>
        </CategoryGrid>
        <StatsDescription>Active alerts by category.</StatsDescription>
      </StatsCardContainer>
    </AlertStatsContainer>
  );
};

export default AlertStats;
