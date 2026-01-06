import React from "react";
import { AlertItem } from "../../styles/Dashboard.styled";

import { formatDateTime } from "../../utility/TimeFormat";
import { getDeviceIcon } from "../../utility/DeviceMapping";

const SystemAlertItem = ({ alert, onView, onAlertAction, isSelected }) => {
  const getSubcategory = (notificationType) => {
    switch (notificationType) {
      case "1":
        return "Low Battery";
      case "4":
        return "Beacon Offline";
      case "5":
        return "Beacon Online";
      case "6":
        return "Wifi Hub Offline";
      case "7":
        return "Wifi Hub Online";
      case "8":
        return "Safety Card Offline";
      case "9":
        return "Safety Card Online";
      case "10":
        return "Safety Card Battery Low";
      case "11":
        return "Safety Card SOS/Alert";
      default:
        return "System Default Alert";
    }
  };

  return (
    <AlertItem className="system-alert" $isSelected={isSelected}>
      <div className="alert-header">
        <div className="alert-left">
          <div className="device-image-wrapper">
            <img src={getDeviceIcon(alert.deviceType)} alt="Device" />
          </div>
          <div className="alert-info">
            <span className="alert-name">{alert.title}</span>
            {alert.deviceType !== 1 ? null : (
              <span className="alert-category">WiFi Hub</span>
            )}

            <span className="alert-subcategory">
              {getSubcategory(alert.notificationType)}
            </span>
          </div>
        </div>
        <div className="alert-datetime">
          <span className="datetime">{formatDateTime(alert.duration)}</span>
        </div>
      </div>
      <button
        className="alert-action-button yellow"
        onClick={(e) => {
          e.stopPropagation();
          onAlertAction && onAlertAction(alert);
        }}
      >
        Alert Action
      </button>
    </AlertItem>
  );
};

export default SystemAlertItem;
