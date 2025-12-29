import React, { useState, useEffect, useRef } from "react";
import {
  RightSection,
  SettingsSection,
  SectionTitle,
} from "../../styles/DeviceDetails.styled";
import checkImg from "../../assets/images/check-badge.svg";

import {
  SnoozeContainer,
  SnoozeCard,
  SnoozeIcon,
  SnoozeTime,
  SnoozeSubtitle,
  SnoozeButtons,
  BackButton,
  SnoozeActionButton,
  TimePickerContainer,
  TimePickerColumn,
  TimePickerItem,
  TimePickerLabel,
} from "../../styles/SnoozeMode.styled";

const SnoozeMode = ({
  deviceType,
  deviceData,
  onBack,
  onSnoozeStart,
  onSnoozeCancel,
}) => {
  const [selectedHours, setSelectedHours] = useState(8);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  console.log("Device Data:", deviceData);

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

  const handleScroll = (ref, items, setter) => {
    if (!ref.current) return;
    const container = ref.current;
    const itemHeight = 50;
    const scrollTop = container.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
    setter(items[clampedIndex]);
  };

  useEffect(() => {
    // Scroll to initial values
    if (hoursRef.current) {
      hoursRef.current.scrollTop = selectedHours * 50;
    }
    if (minutesRef.current) {
      minutesRef.current.scrollTop = selectedMinutes * 50;
    }
  }, []);

  const handleStartSnooze = () => {
    const snoozeEndTime = new Date();
    snoozeEndTime.setHours(snoozeEndTime.getHours() + selectedHours);
    snoozeEndTime.setMinutes(snoozeEndTime.getMinutes() + selectedMinutes);
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
              <TimePickerContainer>
                <TimePickerColumn
                  ref={hoursRef}
                  onScroll={() =>
                    handleScroll(hoursRef, hours, setSelectedHours)
                  }
                >
                  {hours.map((hour) => (
                    <TimePickerItem
                      key={hour}
                      $selected={hour === selectedHours}
                    >
                      {hour}
                    </TimePickerItem>
                  ))}
                </TimePickerColumn>
                <TimePickerLabel>Hours</TimePickerLabel>
                <TimePickerColumn
                  ref={minutesRef}
                  onScroll={() =>
                    handleScroll(minutesRef, minutes, setSelectedMinutes)
                  }
                >
                  {minutes.map((minute) => (
                    <TimePickerItem
                      key={minute}
                      $selected={minute === selectedMinutes}
                    >
                      {minute.toString().padStart(2, "0")}
                    </TimePickerItem>
                  ))}
                </TimePickerColumn>
                <TimePickerLabel>Minutes</TimePickerLabel>
              </TimePickerContainer>
            </SnoozeContainer>

            <SnoozeButtons>
              <BackButton onClick={onBack}>Back</BackButton>
              <SnoozeActionButton onClick={handleStartSnooze}>
                <img
                  src={checkImg}
                  alt="check"
                  width="16"
                  height="16"
                  style={{ marginRight: "8px", color: "#fff" }}
                />
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
