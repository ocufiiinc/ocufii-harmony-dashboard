import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DashboardContainer,
  DashboardHeader,
  HeaderLogo,
  HeaderUser,
  VerticalSidebar,
  MenuItem,
  MainContent,
  DashboardFooter,
  MobileMenuToggle,
  MobileOverlay,
  HeaderNavLinks,
  NavLink,
  UserInitials,
} from "../styles/Dashboard.styled";
import { useUser } from "../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import ocufiiLogo from "../assets/images/ocufii_logo_2.png";
import { getOverviewStats } from "../api/DashboardApi";

import { CiLogout } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { MenuItems } from "../common/CommonData";
import { ROUTE } from "../common/Routes";
import moment from "moment/moment";
import { RightsReserved } from "../common/AppVersion";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch overview stats
  const { data: overviewData } = useQuery({
    queryKey: ["overviewStats", user?.email],
    queryFn: () => getOverviewStats(user?.email),
    enabled: !!user?.email,
    retry: 1, // Retry up to 1 time on failure
  });

  // Calculate counts from overview stats
  const getCounts = () => {
    const data = overviewData?.data || {};
    return {
      alerts: data.totalActiveAlerts || 0,
      devices: data.totalDevices || 0,
      safetyNetwork: data.safetyNetworkCount || 0,
      recipients: data.recipientsCount || 0,
    };
  };

  const counts = getCounts();

  const handleLogout = () => {
    logout();
    navigate(ROUTE.LOGIN);
  };

  const handleNavigation = (path) => {
    if (path !== location.pathname) {
      navigate(path);
    }
    // Close sidebar on mobile after navigation
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Get user initials from name
  const getUserInitials = () => {
    if (user?.firstName) {
      const names = user.firstName.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`;
      }
      return names[0].substring(0, 2);
    }

    // If no firstName, use email
    if (user?.email) {
      const emailName = user.email.split("@")[0];
      return emailName.substring(0, 2).toUpperCase();
    }

    return "U";
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <div className="header-content">
          <HeaderLogo>
            <MobileMenuToggle onClick={toggleSidebar}>
              {isSidebarOpen ? <RxCross2 /> : <RxHamburgerMenu />}
            </MobileMenuToggle>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img src={ocufiiLogo} alt="Ocufii" />
              <span
                style={{ color: "#000000", fontSize: "16px", fontWeight: 400 }}
              >
                BE IN THE KNOWN
              </span>
            </div>
          </HeaderLogo>
          <HeaderUser>
            <HeaderNavLinks>
              {/* <NavLink onClick={() => console.log("Navigate to Users")}> 
                 Users
              </NavLink>
              <NavLink onClick={() => console.log("Navigate to Subscriptions")}>
                Subscriptions
              </NavLink> */}
              <NavLink
                onClick={() => navigate(ROUTE.SETTINGS)}
                className={location.pathname === ROUTE.SETTINGS ? "active" : ""}
              >
                Settings
              </NavLink>
              <NavLink
                onClick={() => navigate(ROUTE.ACCOUNT)}
                className={location.pathname === ROUTE.ACCOUNT ? "active" : ""}
              >
                Account
              </NavLink>
              <UserInitials title={user?.name || "User"}>
                {getUserInitials()}
              </UserInitials>
            </HeaderNavLinks>
          </HeaderUser>
        </div>
      </DashboardHeader>

      <div className="main-layout">
        <VerticalSidebar className={isSidebarOpen ? "open" : ""}>
          {MenuItems.map((item) => {
            if (item.type === "separator") {
              return (
                <span
                  key={item.id}
                  style={{
                    display: "block",
                    height: "1px",
                    backgroundColor: "rgb(232, 231, 231)",
                    margin: "12px 16px",
                  }}
                />
              );
            }
            // Get count for specific menu items
            const getItemCount = () => {
              switch (item.id) {
                case "alerts":
                  return counts.alerts;
                case "devices":
                  return counts.devices;
                case "safetyNetwork":
                  return counts.safetyNetwork;
                case "recipient":
                  return counts.recipients;
                default:
                  return null;
              }
            };

            const itemCount = getItemCount();

            return (
              <MenuItem
                key={item.id}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => {
                  if (item.id === "logout") {
                    handleLogout();
                  } else if (item.id === "shop") {
                    // open shop in new tab
                    window.open(item.path, "_blank", "noopener,noreferrer");
                    setIsSidebarOpen(false);
                  } else if (item.id === "help") {
                    // open shop in new tab
                    window.open(item.path, "_blank", "noopener,noreferrer");
                    setIsSidebarOpen(false);
                  } else {
                    handleNavigation(item.path);
                  }
                }}
              >
                <span className="icon">
                  <img src={item.icon} alt={item.label} />
                </span>
                <span className="label">{item.label}</span>
                {itemCount !== null && itemCount > 0 && (
                  <span
                    className="count-badge"
                    style={{
                      marginLeft: "auto",
                      borderRadius: "12px",
                      padding: "2px 8px",
                      fontSize: "14px",
                      fontWeight: "700",
                      minWidth: "20px",
                      textAlign: "center",
                      color:
                        location.pathname === item.path ? "#f28f17" : "#000000",
                    }}
                  >
                    {itemCount}
                  </span>
                )}
              </MenuItem>
            );
          })}
        </VerticalSidebar>

        <MobileOverlay
          className={isSidebarOpen ? "active" : ""}
          onClick={closeSidebar}
        />

        <div className="content-area">
          <MainContent>{children}</MainContent>

          <DashboardFooter>
            <div>
              <p>{RightsReserved}</p>
              <div>
                <a
                  href="https://www.ocufii.com/terms-of-service/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Use
                </a>
                <a
                  href="https://www.ocufii.com/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Personal Data Processing Policy
                </a>
              </div>
            </div>
          </DashboardFooter>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default DashboardLayout;
