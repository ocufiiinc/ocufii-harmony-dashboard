import React, { useState, useEffect, useRef } from "react";
import {
  RightSection,
  SettingsSection,
  SectionTitle,
} from "../../styles/DeviceDetails.styled";
import checkImg from "../../assets/images/check-badge.svg";
import alarmImg from "../../assets/images/alarm-bell-sleep-1.svg";
import { useUser } from "../../context/UserContext";
import { setSnooze } from "../../api/BeaconApi";

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

const SnoozeMode = ({ deviceType, deviceData, onBack }) => {
  const [selectedHours, setSelectedHours] = useState(8);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);
  const [snoozeEndTime, setSnoozeEndTime] = useState(
    deviceData.snoozeEndTime || null
  );
  const [isSnoozed, setIsSnoozed] = useState(
    deviceData.snoozeEndTime && deviceData.snoozeEndTime !== ""
  );
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const { user } = useUser();

  console.log("Device Data:", deviceData);

  useEffect(() => {
    if (isSnoozed) {
      calculateRemainingTime();
      const interval = setInterval(calculateRemainingTime, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [isSnoozed, snoozeEndTime]);

  const calculateRemainingTime = () => {
    if (!snoozeEndTime) return;

    const now = new Date();
    const endTime = new Date(snoozeEndTime);
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

  const handleStartSnooze = async () => {
    try {
      // Call the setSnooze API
      const response = await setSnooze(
        user?.email,
        deviceData?.macAddress || deviceData?.address,
        selectedHours,
        selectedMinutes
      );

      console.log("Snooze started:", response);
      // Use the snoozeTimeStampEnd from API response
      if (response?.snoozeSettings?.snoozeTimeStampEnd) {
        setSnoozeEndTime(response.snoozeSettings.snoozeTimeStampEnd);
        setIsSnoozed(true);
      }
    } catch (error) {
      console.error("Error starting snooze:", error);
    }
  };

  const handleCancelSnooze = () => {};

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
                  <img
                    src={alarmImg}
                    alt="alarm"
                    width="48"
                    height="48"
                    style={{ display: "block" }}
                  />
                </SnoozeIcon>
                <SnoozeTime>
                  {remainingTime
                    ? `${remainingTime.hours} Hrs ${remainingTime.minutes} Minutes Remaining`
                    : "Calculating..."}
                </SnoozeTime>
                <SnoozeSubtitle>*{deviceData.name} Is Snoozed</SnoozeSubtitle>
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
