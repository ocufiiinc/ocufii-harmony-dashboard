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

  const alertButtons = [
    {
      key: "autoDial911",
      label: "Auto-Dial 911",
      message:
        "I have dialed 911 for emergency assistance. Please stay alert and be ready to help if needed. I trust you and appreciate your support.",
      showbutton: false,
    },
    {
      key: "autoDial988",
      label: "Auto-Dial 988",
      showbutton: false,
      message:
        "I have dialed the 988 Suicide & Crisis Lifeline for support. Please stay alert and check in with me if possible. I trust you and appreciate your help.",
    },
    {
      key: "emergency",
      label: "Emergency",
      showbutton: true,
      message:
        "I am in a critical emergency situation and need help. Please call emergency services immediately. If you have my location, share it with them.",
      flashOn: true,
      alarmSound: true,
    },
    {
      key: "activeShooter",
      label: "Active Shooter",
      showbutton: true,
      message:
        "There is an active shooter situation happening right now. Please call emergency services immediately. If you have my location, share it with them. ",
      flashOn: true,
      alarmSound: true,
    },
    {
      key: "feelingUnsafe",
      label: "Feeling Unsafe",
      showbutton: true,
      message:
        "I am feeling unsafe and in distress.  Please contact me immediately as I need your help.",
      flashOn: true,
      alarmSound: true,
    },
  ];

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
                  checked={alertSettings[button.key]}
                  onChange={() => onToggle(button.key)}
                  onColor="rgb(76, 217, 100)"
                  disabled={true}
                />
              </AlertButtonItem>
              {isExpanded && (
                <AlertButtonDetails
                  message={button.message || ""}
                  flashlightOn={button.flashOn || false}
                  alarmSound={button.alarmSound || false}
                  onMessageChange={(value) =>
                    handleMessageChange(button.key, value)
                  }
                  onFlashlightToggle={() => handleFlashlightToggle(button.key)}
                  onAlarmToggle={() => handleAlarmToggle(button.key)}
                  showButtons={button.showbutton}
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
