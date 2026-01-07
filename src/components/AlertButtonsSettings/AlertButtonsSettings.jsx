import React from "react";
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

const AlertButtonsSettings = ({ alertSettings, onToggle }) => {
  const alertButtons = [
    { key: "autoDial911", label: "Auto-Dial 911" },
    { key: "autoDial988", label: "Auto-Dial 988" },
    { key: "emergency", label: "Emergency" },
    { key: "activeShooter", label: "Active Shooter" },
    { key: "feelingUnsafe", label: "Feeling Unsafe" },
  ];

  return (
    <AlertButtonsContainer>
      <AlertButtonsTitle>Alert Buttons Settings</AlertButtonsTitle>
      <AlertButtonsList>
        {alertButtons.map((button) => (
          <AlertButtonItem key={button.key}>
            <AlertButtonLeft>
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
        ))}
      </AlertButtonsList>
    </AlertButtonsContainer>
  );
};

export default AlertButtonsSettings;
