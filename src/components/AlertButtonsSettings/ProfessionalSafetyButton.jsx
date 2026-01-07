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

const ProfessionalSafetyButton = ({ alertSettings, onToggle }) => {
  const [expandedButton, setExpandedButton] = useState(null);
  const alertButtons = [
    {
      key: "police",
      label: "Police",
      message:
        "I have activated the Police Alert and am receiving assistance from the Professional Dispatch Center. I may not be able to answer calls right now as might be on the phone with the dispatcher or handling the situation. This message is for your awareness only.",
      showbutton: false,
    },
    {
      key: "medicalService",
      label: "Emergency Medical Service",
      message:
        "I have activated the EMS Alert and am receiving assistance from the Professional Dispatch Center. I may not be able to answer calls right now as might be on the phone with the dispatcher or handling the situation. This message is for your awareness only.",
      showbutton: false,
    },
    {
      key: "fire",
      label: "Fire Department",
      message:
        "I have activated the Fire Department Alert and am receiving assistance from the Professional Dispatch Center. I may not be able to answer calls right now as might be on the phone with the dispatcher or handling the situation. This message is for your awareness only.",
      showbutton: false,
    },
    {
      key: "activeShooter",
      label: "Active Shooter",
      message:
        "I have activated the Active Shooter Alert and am receiving assistance from the Professional Dispatch Center. I may not be able to answer calls right now as might be on the phone with the dispatcher or handling the situation. This message is for your awareness only.",
      showbutton: false,
    },
    {
      key: "feelingUnsafe",
      label: "Feeling Unsafe",
      message:
        "I have activated the Feeling Unsafe Alert and am receiving assistance from the Professional Dispatch Center. I may not be able to answer calls right now as might be on the phone with the dispatcher or handling the situation. This message is for your awareness only.",
      showbutton: false,
    },
  ];

  const handleMessageChange = (key, value) => {
    console.log(`Update message for ${key}:`, value);
    // TODO: Implement API call to update message
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
                  <MdChevronRight size={20} color="#9ca3af" />
                  <AlertButtonLabel>{button.label}</AlertButtonLabel>
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

export default ProfessionalSafetyButton;
