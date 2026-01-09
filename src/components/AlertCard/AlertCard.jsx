import React, { useState, useMemo } from "react";
import {
  AlertCardContainer,
  AlertCardHeader,
  AlertCount,
  AlertList,
  ViewAllButton,
  AlertFilterDropdown,
} from "../../styles/Dashboard.styled";

const AlertCard = ({ category, color, count, alerts, onViewAll, children }) => {
  const [selectedFilter, setSelectedFilter] = useState("All Alerts");
  const showDropdown =
    category === "Safety" || category === "System" || category === "Security";

  // Get dropdown options based on category
  const getDropdownOptions = () => {
    switch (category) {
      case "Safety":
        return [
          { value: "All Alerts", label: "All Alerts" },
          { value: "Emergency", label: "Emergency Alerts" },
          { value: "Feeling Unsafe", label: "Feeling Unsafe Alerts" },
          { value: "Active Shooter", label: "Active Shooter Alerts" },
          { value: "911 Auto-Dial", label: "911 Auto-Dial Alerts" },
          { value: "988 Auto-Dial", label: "988 Auto-Dial Alerts" },
        ];
      case "Security":
        return [
          { value: "All Alerts", label: "All Alerts" },
          { value: "Beacon Alert", label: "Beacon Alerts" },
          { value: "Connected Lock Alert", label: "Connected Lock Alerts" },
        ];
      case "System":
        return [
          { value: "All Alerts", label: "All Alerts" },
          { value: "Beacon Alert", label: "Beacon Alerts" },
          { value: "Connected Lock Alert", label: "Connected Lock Alerts" },
          { value: "Safety Card Alert", label: "Safety Card Alerts" },
          { value: "Wifi", label: "Wifi Hub" },
        ];
      default:
        return [{ value: "All Alerts", label: "All Alerts" }];
    }
  };

  // Filter alerts based on selected filter
  const filteredAlerts = useMemo(() => {
    // First filter out acknowledged alerts and resolved alerts
    const activeAlerts = alerts.filter((alert) => alert.acknowledge === "0");

    if (selectedFilter === "All Alerts") {
      return activeAlerts;
    }

    // Safety alerts - use includes for notificationReason
    if (category === "Safety") {
      console.log("Filtering Safety Alerts by:", selectedFilter, activeAlerts);
      return activeAlerts.filter((alert) =>
        alert.notificationReason?.includes(selectedFilter)
      );
    }

    // Security - use deviceType
    if (category === "Security") {
      if (selectedFilter === "Beacon Alert") {
        return activeAlerts.filter((alert) =>
          ["0", "2", "3", "03"].includes(alert.deviceType)
        );
      }
      if (selectedFilter === "Connected Lock Alert") {
        return activeAlerts.filter((alert) =>
          ["4", "5", "6"].includes(alert.deviceType)
        );
      }
    }

    //System alerts - use deviceType
    if (category === "System") {
      if (selectedFilter === "Beacon Alert") {
        console.log("Filtering System Alerts for beacon alert");
        return activeAlerts.filter((alert) =>
          ["0", "2", "3", "03"].includes(String(alert.deviceType))
        );
      }
      if (selectedFilter === "Connected Lock Alert") {
        console.log("Filtering System Alerts for connected lock alert");
        return activeAlerts.filter((alert) =>
          ["4", "5", "6"].includes(String(alert.deviceType))
        );
      }
      if (selectedFilter === "Safety Card Alert") {
        console.log("Filtering System Alerts for safety card alert");
        return activeAlerts.filter((alert) => String(alert.deviceType) === "7");
      }
      if (selectedFilter === "Wifi") {
        console.log("Filtering System Alerts for Wifi Hub");
        return activeAlerts.filter((alert) => String(alert.deviceType) === "1");
      }
    }

    return activeAlerts;
  }, [alerts, selectedFilter, category]);

  const dropdownOptions = getDropdownOptions();

  return (
    <AlertCardContainer>
      <AlertCardHeader>
        <h3>{category}</h3>
      </AlertCardHeader>

      <AlertCount color={color}>
        <div className="count-circle">
          <span className="count">{count}</span>
          <span className="label">Active</span>
        </div>
      </AlertCount>
      {/* Divider above the alerts list */}
      <div
        style={{
          height: "1px",
          background: "#888",
          width: "100%",
          margin: "12px 0",
        }}
      />

      {showDropdown && (
        <AlertFilterDropdown>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            {dropdownOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </AlertFilterDropdown>
      )}

      <AlertList>
        {filteredAlerts.slice(0, 3).map((alert) => {
          // Get the first child as template (all children of same category use same component type)
          const childTemplate = React.Children.toArray(children)[0];

          if (childTemplate) {
            // Clone the wrapper div and its child component with the filtered alert data
            return React.cloneElement(childTemplate, {
              key: alert.id,
              children: React.cloneElement(childTemplate.props.children, {
                alert: alert,
              }),
            });
          }
          return null;
        })}
      </AlertList>

      <ViewAllButton color={color} onClick={onViewAll}>
        View All
      </ViewAllButton>
    </AlertCardContainer>
  );
};

export default AlertCard;
