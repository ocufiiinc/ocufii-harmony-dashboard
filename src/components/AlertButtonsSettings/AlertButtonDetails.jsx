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
  screenFlashing,
  onMessageChange,
  onFlashlightToggle,
  onAlarmToggle,
  onScreenFlashingToggle,
  showButtons = false,
}) => {
  return (
    <AlertExpandedContent>
      <AlertMessageLabel>Alert Message Sent to Recipients</AlertMessageLabel>
      <AlertMessageBox
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Enter alert message..."
        disabled={false}
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
          {/* <AlertOptionRow>
            <AlertOptionLabel>Screen Flashing</AlertOptionLabel>
            <Switch
              checked={screenFlashing}
              onChange={onScreenFlashingToggle}
              onColor="rgb(76, 217, 100)"
              disabled={true}
            />
          </AlertOptionRow> */}
        </>
      )}
    </AlertExpandedContent>
  );
};

export default AlertButtonDetails;
