import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo3.svg";
import dashboardLogo from "../../assets/images/dashboard.svg";
import notificationLogo from "../../assets/images/notification.svg";
import devicesLogo from "../../assets/images/devices.svg";
import historyLogo from "../../assets/images/history.svg";
import {
  FooterSection,
  LogoSection,
  MenuItem,
  MenuSection,
  SidebarContainer,
} from "../../styles/Sidebar.styled";

const Sidebar = ({
  isOpen = true,
  onToggle,
  menuItems = [],
  activeItem,
  onMenuItemClick,
}) => {
  // Default menu items (placeholder for now)
  const defaultMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: dashboardLogo, active: true },
    { id: "alerts", label: "Alerts", icon: notificationLogo },
    { id: "devices", label: "Devices", icon: devicesLogo },
    { id: "history", label: "History", icon: historyLogo },
  ];

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <SidebarContainer isOpen={isOpen}>
      <LogoSection>
        <img src={logo} alt="Ocufii Logo" />
      </LogoSection>

      <MenuSection>
        {items.map((item) => (
          <MenuItem
            key={item.id}
            className={activeItem === item.id ? "active" : ""}
            onClick={() => onMenuItemClick?.(item.id)}
          >
            <img src={item.icon} alt={item.label} />
            {/* {item.icon && item.icon} */}
            {item.label}
          </MenuItem>
        ))}
      </MenuSection>

      <FooterSection>
        {/* Footer content can be added here later */}
      </FooterSection>
    </SidebarContainer>
  );
};

export default Sidebar;
