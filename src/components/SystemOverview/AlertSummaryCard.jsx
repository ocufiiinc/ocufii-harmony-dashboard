import React from "react";
import {
  AlertSummaryContainer,
  AlertSummaryHeader,
  TimeDropdown,
  TotalAlertsCard,
  AlertIcon,
  AlertCount,
  AlertLabel,
  AlertDescription,
  CategoryGrid,
  CategoryCard,
  CategoryIcon,
  CategoryLabel,
  CategoryCount,
  CategoryTextContainer,
  StatusGrid,
  StatusCard,
  StatusCardTop,
  StatusIcon,
  StatusLabel,
  StatusCount,
  StatusTextContainer,
  StatusDescription,
  ProgressText,
  LifetimeText,
} from "../../styles/SystemOverview.styled";
import AlertImg from "../../assets/images/alarm-bell-ring-1.svg";
import safetyImg from "../../assets/images/person-shield.svg";
import securityImg from "../../assets/images/warningShield2.png";
import systemImg from "../../assets/images/warning2.svg";
import OpenIssueImg from "../../assets/images/openFolder2.png";
import AcknowledgedImg from "../../assets/images/Like.png";
import ResolvedImg from "../../assets/images/done2.png";

const AlertSummaryCard = ({ alertSummaryData, timeRange, onTimeRangeChange }) => {
  // Use API data if available, otherwise fall back to default values
  const displayData = alertSummaryData || {
    totalAlerts: 0,
    safetyCount: 0,
    securityCount: 0,
    systemCount: 0,
    openCount: 0,
    acknowledgedCount: 0,
    resolvedCount: 0,
    missedCount: 0,
    lifetimeAlerts: 0,
  };

  return (
    <AlertSummaryContainer>
      <AlertSummaryHeader>
        <h3>Alert Summary</h3>
        <TimeDropdown
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
        >
          <option value="24 Hours">24 Hours</option>
          <option value="7 Days">7 Days</option>
          <option value="30 Days">30 Days</option>
        </TimeDropdown>
      </AlertSummaryHeader>

      {/* Total Alerts Received */}
      <TotalAlertsCard>
        <AlertIcon>
          <img src={AlertImg} alt="Alert Icon" />
        </AlertIcon>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AlertCount>{displayData.totalAlerts}</AlertCount>
            <AlertLabel>Alerts Received</AlertLabel>
          </div>
        </div>
      </TotalAlertsCard>
      <AlertDescription>
        Total alerts received in the last {timeRange.toLowerCase()}.
      </AlertDescription>

      {/* Category Breakdown */}
      <CategoryGrid>
        <CategoryCard>
          <CategoryIcon>
            <img src={safetyImg} alt="safety Icon" />
          </CategoryIcon>
          <CategoryTextContainer>
            <CategoryLabel>Safety</CategoryLabel>
            <CategoryCount>{displayData.safetyCount}</CategoryCount>
          </CategoryTextContainer>
        </CategoryCard>
        <CategoryCard>
          <CategoryIcon>
            <img src={securityImg} alt="security Icon" />
          </CategoryIcon>
          <CategoryTextContainer>
            <CategoryLabel>Security</CategoryLabel>
            <CategoryCount>{displayData.securityCount}</CategoryCount>
          </CategoryTextContainer>
        </CategoryCard>
        <CategoryCard>
          <CategoryIcon>
            <img src={systemImg} alt="system Icon" />
          </CategoryIcon>
          <CategoryTextContainer>
            <CategoryLabel>System</CategoryLabel>
            <CategoryCount>{displayData.systemCount}</CategoryCount>
          </CategoryTextContainer>
        </CategoryCard>
      </CategoryGrid>
      <AlertDescription>
        Total alerts received in the last {timeRange.toLowerCase()} by category.
      </AlertDescription>

      {/* Status Breakdown */}
      <StatusGrid>
        <StatusCard>
          <StatusCardTop>
            <StatusIcon>
              <img src={OpenIssueImg} alt="Open Folder Icon" />
            </StatusIcon>
            <StatusTextContainer>
              <StatusLabel>Open</StatusLabel>
              <StatusCount>{displayData.openCount}</StatusCount>
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
              <StatusCount>{displayData.acknowledgedCount}</StatusCount>
            </StatusTextContainer>
          </StatusCardTop>
          <StatusDescription>Confirmed But Not Yet Resolved</StatusDescription>
        </StatusCard>
        <StatusCard>
          <StatusCardTop>
            <StatusIcon>
              <img src={ResolvedImg} alt="Resolved Icon" />
            </StatusIcon>
            <StatusTextContainer>
              <StatusLabel>Resolved</StatusLabel>
              <StatusCount>{displayData.resolvedCount}</StatusCount>
            </StatusTextContainer>
          </StatusCardTop>
          <StatusDescription>Fully Addressed and Closed</StatusDescription>
        </StatusCard>
      </StatusGrid>
      <ProgressText>Current progress on all alerts received.</ProgressText>
      <LifetimeText>Lifetime Alerts: {displayData.lifetimeAlerts}</LifetimeText>
    </AlertSummaryContainer>
  );
};

export default AlertSummaryCard;
