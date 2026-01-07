import React from "react";
import Switch from "react-ios-switch";
import {
  AlertExpandedContent,
  AlertMessageLabel,
  AlertMessageBox,
  AlertOptionRow,
  AlertOptionLabel,
} from "../../styles/PersonalSafety.styled";

const AlertButtonDetails = ({
  message,
  flashlightOn,
  alarmSound,
  onMessageChange,
  onFlashlightToggle,
  onAlarmToggle,
  showButtons = false,
}) => {
  return (
    <AlertExpandedContent>
      <AlertMessageLabel>Alert Message Sent to Recipients</AlertMessageLabel>
      <AlertMessageBox
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Enter alert message..."
        disabled={true}
      />
      {showButtons && (
        <>
          <AlertOptionRow>
            <AlertOptionLabel>Flashlight On</AlertOptionLabel>
            <Switch
              checked={flashlightOn}
              onChange={onFlashlightToggle}
              onColor="rgb(76, 217, 100)"
              disabled={true}
            />
          </AlertOptionRow>

          <AlertOptionRow>
            <AlertOptionLabel>Alarm Sound</AlertOptionLabel>
            <Switch
              checked={alarmSound}
              onChange={onAlarmToggle}
              onColor="rgb(76, 217, 100)"
              disabled={true}
            />
          </AlertOptionRow>
        </>
      )}
    </AlertExpandedContent>
  );
};

export default AlertButtonDetails;
