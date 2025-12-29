import React, { useState, useEffect } from "react";
import { TimePicker } from "react-wheel-time-picker";
import {
  RightSection,
  SettingsSection,
  SectionTitle,
} from "../../styles/DeviceDetails.styled";

import {
  SnoozeContainer,
  SnoozeCard,
  SnoozeIcon,
  SnoozeTime,
  SnoozeSubtitle,
  SnoozeButtons,
  BackButton,
  SnoozeActionButton,
} from "../../styles/SnoozeMode.styled";

const SnoozeMode = ({
  deviceType,
  deviceData,
  onBack,
  onSnoozeStart,
  onSnoozeCancel,
}) => {
  const [timeValue, setTimeValue] = useState("08:00");
  const [remainingTime, setRemainingTime] = useState(null);

  // Check if device is currently snoozed
  const isSnoozed = deviceData.snoozeEndTime && deviceData.snoozeEndTime !== "";

  useEffect(() => {
    if (isSnoozed) {
      calculateRemainingTime();
      const interval = setInterval(calculateRemainingTime, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [isSnoozed, deviceData.snoozeEndTime]);

  const calculateRemainingTime = () => {
    if (!deviceData.snoozeEndTime) return;

    const now = new Date();
    const endTime = new Date(deviceData.snoozeEndTime);
    const diff = endTime - now;

    if (diff <= 0) {
      setRemainingTime({ hours: 0, minutes: 0 });
      return;
    }

    const totalMinutes = Math.floor(diff / 60000);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    setRemainingTime({ hours: hrs, minutes: mins });
  };

  const handleTimeChange = (value) => {
    setTimeValue(value);
  };

  const handleStartSnooze = () => {
    // Parse the time value (format: "HH:MM")
    const [hours, minutes] = timeValue.split(":").map(Number);
    const snoozeEndTime = new Date();
    snoozeEndTime.setHours(snoozeEndTime.getHours() + hours);
    snoozeEndTime.setMinutes(snoozeEndTime.getMinutes() + minutes);
    onSnoozeStart(snoozeEndTime.toISOString());
  };

  const handleCancelSnooze = () => {
    onSnoozeCancel();
  };

  return (
    <RightSection>
      <SettingsSection>
        <SectionTitle>SNOOZE MODE</SectionTitle>

        {isSnoozed ? (
          // View 1: Currently Snoozed - Show Remaining Time
          <>
            <SnoozeContainer>
              <p
                style={{
                  marginBottom: "24px",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                {deviceType} Notifications Are Currently Snoozed:
              </p>
              <SnoozeCard>
                <SnoozeIcon>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22C10.3431 22 9 20.6569 9 19V15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15V19C15 20.6569 13.6569 22 12 22Z"
                      stroke="#FF9800"
                      strokeWidth="2"
                    />
                    <path
                      d="M9 9L15 9"
                      stroke="#FF9800"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 2L12 6"
                      stroke="#FF9800"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17 4L19 6"
                      stroke="#FF9800"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 6L7 4"
                      stroke="#FF9800"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 15C18 15 19 15.5 19 17C19 18.5 18 19 18 19"
                      stroke="#FF9800"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 15C6 15 5 15.5 5 17C5 18.5 6 19 6 19"
                      stroke="#FF9800"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </SnoozeIcon>
                <SnoozeTime>
                  {remainingTime
                    ? `${remainingTime.hours} Hrs ${remainingTime.minutes} Minutes Remaining`
                    : "Calculating..."}
                </SnoozeTime>
                <SnoozeSubtitle>*Tag "1" Is Snoozed</SnoozeSubtitle>
              </SnoozeCard>
            </SnoozeContainer>

            <SnoozeButtons>
              <BackButton onClick={onBack}>Back</BackButton>
              <SnoozeActionButton cancel onClick={handleCancelSnooze}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginRight: "8px" }}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 9L9 15M9 9L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Cancel Snooze Mode
              </SnoozeActionButton>
            </SnoozeButtons>
          </>
        ) : (
          // View 2: Not Snoozed - Show Time Picker
          <>
            <SnoozeContainer>
              <p
                style={{
                  marginBottom: "24px",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                Snooze {deviceType} Notification For:
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "24px 0",
                }}
              >
                <TimePicker
                  value={timeValue}
                  onChange={handleTimeChange}
                  pickerDefaultValue="08:00"
                  cellHeight={50}
                  placeHolder="Select Time"
                />
              </div>
            </SnoozeContainer>

            <SnoozeButtons>
              <BackButton onClick={onBack}>Back</BackButton>
              <SnoozeActionButton onClick={handleStartSnooze}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginRight: "8px" }}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Start Snooze Mode
              </SnoozeActionButton>
            </SnoozeButtons>
          </>
        )}
      </SettingsSection>
    </RightSection>
  );
};

export default SnoozeMode;
