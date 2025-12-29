import React, { useState } from "react";
import { AlertItem } from "../../styles/Dashboard.styled";
import phonePng from "../../assets/images/phone.png";
import safetyCardPng from "../../assets/images/safety_card.png";
import { formatDateTime } from "../../utility/TimeFormat";
import { getSafetyAlertIcon } from "../../utility/DeviceMapping";
import NoLocationModal from "../NoLocationModal";

const SafetyAlertItem = ({
  alert,
  onView,
  onSeeRecipients,
  onAlertAction,
  isSelected,
  showRecipients,
  showEmergencyServices,
}) => {
  const [showNoLocationModal, setShowNoLocationModal] = useState(false);
  const iconData = getSafetyAlertIcon(alert.notificationReason);
  const IconComponent = iconData.Component;

  const hasValidLocation =
    alert.lat && alert.lng && alert.lat !== "" && alert.lng !== "";

  const handleViewClick = (callback) => {
    if (!hasValidLocation) {
      setShowNoLocationModal(true);
    } else {
      callback && callback(alert);
    }
  };

  return (
    <AlertItem $isSelected={isSelected}>
      <div className="alert-header">
        <div className="alert-left">
          <div className="alert-bell-icon">
            {iconData.type === "image" ? (
              <img
                src={iconData.src}
                alt={iconData.alt}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <IconComponent style={{ fontSize: "100%" }} />
            )}
          </div>
          <div className="alert-info">
            <span className="alert-name">{alert.title}</span>
            <span className="alert-category">{alert.notificationReason}</span>
          </div>
        </div>
        <div className="alert-datetime">
          <span className="datetime">{formatDateTime(alert.duration)}</span>

          {alert.notificationType === "11" ? (
            <div className="alert-device-icon">
              <img
                src={safetyCardPng}
                alt="Safety Card"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))" }}
              />
            </div>
          ) : (
            <div className="alert-device-icon2">
              <img src={phonePng} alt="Phone" />
            </div>
          )}
        </div>
      </div>
      <div className="alert-actions">
        <button
          className="see-recipients-button"
          onClick={(e) => {
            e.stopPropagation();
            handleViewClick(onSeeRecipients);
          }}
          style={
            showRecipients
              ? {
                  background:
                    "linear-gradient(135deg, rgba(86, 216, 248, 1), rgba(0, 179, 223, 1))",
                  color: "white",
                }
              : {}
          }
        >
          View My Safety Network
        </button>
        <button
          className="emergency-services-button"
          onClick={(e) => {
            e.stopPropagation();
            handleViewClick(onView);
          }}
          style={
            showEmergencyServices
              ? {
                  background:
                    "linear-gradient(135deg, rgba(86, 216, 248, 1), rgba(0, 179, 223, 1))",
                  color: "white",
                }
              : {}
          }
        >
          View Emergency Services
        </button>
      </div>
      <button
        className="alert-action-button"
        onClick={(e) => {
          e.stopPropagation();
          onAlertAction && onAlertAction(alert);
        }}
      >
        Alert Action
      </button>

      <NoLocationModal
        isOpen={showNoLocationModal}
        onClose={() => setShowNoLocationModal(false)}
      />
    </AlertItem>
  );
};

export default SafetyAlertItem;
