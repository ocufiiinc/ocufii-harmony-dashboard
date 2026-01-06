import React from "react";
import { AlertItem } from "../../styles/Dashboard.styled";
import { formatDateTime } from "../../utility/TimeFormat";
import { getDeviceIcon } from "../../utility/DeviceMapping";

const SecurityAlertItem = ({ alert, onView, onAlertAction, isSelected }) => {
  return (
    <AlertItem className="security-alert" $isSelected={isSelected}>
      <div className="alert-header">
        <div className="alert-left">
          <div className="device-image-wrapper">
            <img src={getDeviceIcon(alert.deviceType)} alt="Device" />
          </div>
          <div className="alert-info">
            <span className="alert-name">{alert.title}</span>
            <span className="alert-category">
              {alert.gatewayName ? alert.gatewayName : "Wifi Hub"}
            </span>
            <span className="alert-subcategory">
              {alert.notificationReason}
            </span>
          </div>
        </div>
        <div className="alert-datetime">
          <span className="datetime">{formatDateTime(alert.duration)}</span>
        </div>
      </div>
      <button
        className="alert-action-button red"
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

export default SecurityAlertItem;
