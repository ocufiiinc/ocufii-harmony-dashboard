import React, { useState } from "react";
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

      {showDropdown && (
        <AlertFilterDropdown>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="All Alerts">All Alerts</option>
            <option value="Emergency">Emergency</option>
            <option value="Feeling Unsafe">Feeling Unsafe</option>
            <option value="Active Shooter">Active Shooter</option>
          </select>
        </AlertFilterDropdown>
      )}

      <AlertList>{children}</AlertList>

      <ViewAllButton color={color} onClick={onViewAll}>
        View All
      </ViewAllButton>
    </AlertCardContainer>
  );
};

export default AlertCard;
