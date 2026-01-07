import React, { useState } from "react";
import Switch from "react-ios-switch";
import { MdChevronRight } from "react-icons/md";
import {
  AlertButtonsContainer,
  AlertButtonsTitle,
  AlertButtonsList,
  AlertButtonItem,
  AlertButtonLeft,
  AlertButtonLabel,
} from "../../styles/PersonalSafety.styled";
import AlertButtonDetails from "./AlertButtonDetails";

const ProfessionalSafetyButton = ({
  alertSettings,
  onToggle,
  settingsData,
}) => {
  const [expandedButton, setExpandedButton] = useState(null);

  // Map API keys to display labels and alert settings keys
  const buttonConfig = {
    police: {
      label: "Police",
      key: "police",
      defaultMessage:
        "I have activated the Police Alert and am receiving assistance from the Professional Dispatch Center. Please stay alert and be ready to provide any information if contacted.",
    },
    emergencyMedicalService: {
      label: "Emergency Medical Service",
      key: "medicalService",
      defaultMessage:
        "I have activated the Emergency Medical Service Alert and am receiving assistance from the Professional Dispatch Center. Please stay alert and be ready to provide any information if contacted.",
    },
    fireDepartment: {
      label: "Fire Department",
      key: "fire",
      defaultMessage:
        "I have activated the Fire Department Alert and am receiving assistance from the Professional Dispatch Center. Please stay alert and be ready to provide any information if contacted.",
    },
    proActiveShooter: {
      label: "Active Shooter",
      key: "activeShooter",
      defaultMessage:
        "I have activated the Active Shooter Alert and am receiving assistance from the Professional Dispatch Center. Please stay alert and be ready to provide any information if contacted.",
    },
    proFeelingUnsafe: {
      label: "Feeling Unsafe",
      key: "feelingUnsafe",
      defaultMessage:
        "I have activated the Feeling Unsafe Alert and am receiving assistance from the Professional Dispatch Center. Please stay alert and be ready to provide any information if contacted.",
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

  const handleButtonClick = (key) => {
    setExpandedButton(expandedButton === key ? null : key);
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
                />
              )}
            </div>
          );
        })}
      </AlertButtonsList>
    </AlertButtonsContainer>
  );
};

export default ProfessionalSafetyButton;
