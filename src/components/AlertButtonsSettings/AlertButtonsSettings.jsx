import React, { useState } from "react";
import Switch from "react-ios-switch";
import { MdChevronRight } from "react-icons/md";
import AlertButtonDetails from "./AlertButtonDetails";
import {
  AlertButtonsContainer,
  AlertButtonsTitle,
  AlertButtonsList,
  AlertButtonItem,
  AlertButtonLeft,
  AlertButtonLabel,
} from "../../styles/PersonalSafety.styled";

const AlertButtonsSettings = ({ alertSettings, onToggle, settingsData }) => {
  const [expandedButton, setExpandedButton] = useState(null);

  // Map API keys to display labels and alert settings keys
  const buttonConfig = {
    emergency911: {
      label: "Auto-Dial 911",
      key: "autoDial911",
      defaultMessage:
        "I have dialed 911 for emergency assistance. Please stay alert and be ready to help if needed. I trust you and appreciate your support.",
    },
    emergency988: {
      label: "Auto-Dial 988",
      key: "autoDial988",
      defaultMessage:
        "I have dialed the 988 Suicide & Crisis Lifeline for support. Please stay alert and check in with me if possible. I trust you and appreciate your help.",
    },
    emergency: {
      label: "Emergency",
      key: "emergency",
      defaultMessage:
        "I am in a critical emergency situation and need help. Please call emergency services immediately. If you have my location, share it with them.",
    },
    activeShooter: {
      label: "Active Shooter",
      key: "activeShooter",
      defaultMessage:
        "There is an active shooter situation happening right now. Please call emergency services immediately. If you have my location, share it with them.",
    },
    distress: {
      label: "Feeling Unsafe",
      key: "feelingUnsafe",
      defaultMessage:
        "I am feeling unsafe and in distress. Please contact me immediately as I need your help.",
    },
  };

  // Build alert buttons from settingsData
  const alertButtons = Object.keys(buttonConfig).map((dataKey) => {
    try {
      // Handle null values by treating them as disabled
      if (
        settingsData?.[dataKey] === null ||
        settingsData?.[dataKey] === undefined
      ) {
        return {
          dataKey,
          key: buttonConfig[dataKey].key,
          label: buttonConfig[dataKey].label,
          alertMessage: buttonConfig[dataKey].defaultMessage,
          flashOn: false,
          alarmSound: false,
          isEnabled: false,
        };
      }

      const parsedData = JSON.parse(settingsData[dataKey]);
      console.log("returning data", {
        dataKey,
        key: buttonConfig[dataKey].key,
        label: buttonConfig[dataKey].label,
        alertMessage:
          parsedData.alertMessage || buttonConfig[dataKey].defaultMessage,
        flashOn: parsedData.flashOn || false,
        alarmSound: parsedData.alarmSound || false,
        isEnabled: parsedData.isEnabled || false,
      });
      return {
        dataKey,
        key: buttonConfig[dataKey].key,
        label: buttonConfig[dataKey].label,
        alertMessage:
          parsedData.alertMessage || buttonConfig[dataKey].defaultMessage,
        flashOn: parsedData.flashOn || false,
        alarmSound: parsedData.alarmSound || false,
        isEnabled: parsedData.isEnabled || false,
      };
    } catch (error) {
      console.error(`Error parsing ${dataKey}:`, error);
      return {
        dataKey,
        key: buttonConfig[dataKey].key,
        label: buttonConfig[dataKey].label,
        alertMessage: buttonConfig[dataKey].defaultMessage,
        flashOn: false,
        alarmSound: false,
        isEnabled: false,
      };
    }
  });

  const handleButtonClick = (key) => {
    setExpandedButton(expandedButton === key ? null : key);
  };

  const handleMessageChange = (key, value) => {
    console.log(`Update message for ${key}:`, value);
    // TODO: Implement API call to update message
  };

  const handleFlashlightToggle = (key) => {
    console.log(`Toggle flashlight for ${key}`);
    // TODO: Implement API call to toggle flashlight
  };

  const handleAlarmToggle = (key) => {
    console.log(`Toggle alarm for ${key}`);
    // TODO: Implement API call to toggle alarm
  };

  return (
    <AlertButtonsContainer>
      <AlertButtonsTitle>Alert Buttons Settings</AlertButtonsTitle>
      <AlertButtonsList>
        {alertButtons.map((button) => {
          const isExpanded = expandedButton === button.key;

          return (
            <div key={button.key}>
              <AlertButtonItem>
                <AlertButtonLeft onClick={() => handleButtonClick(button.key)}>
                  <MdChevronRight
                    size={20}
                    color="#9ca3af"
                    style={{
                      transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                  />
                  <AlertButtonLabel style={{ cursor: "pointer" }}>
                    {button.label}
                  </AlertButtonLabel>
                </AlertButtonLeft>
                <Switch
                  checked={button.isEnabled}
                  onChange={() => onToggle(button.key)}
                  onColor="rgb(76, 217, 100)"
                  disabled={true}
                />
              </AlertButtonItem>
              {isExpanded && (
                <AlertButtonDetails
                  message={button.alertMessage}
                  flashlightOn={button.flashOn}
                  alarmSound={button.alarmSound}
                  onMessageChange={(value) =>
                    handleMessageChange(button.key, value)
                  }
                  onFlashlightToggle={() => handleFlashlightToggle(button.key)}
                  onAlarmToggle={() => handleAlarmToggle(button.key)}
                  showButtons={true}
                />
              )}
            </div>
          );
        })}
      </AlertButtonsList>
    </AlertButtonsContainer>
  );
};

export default AlertButtonsSettings;
