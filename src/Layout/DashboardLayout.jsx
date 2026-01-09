import React, { useState, useEffect, useRef } from "react";
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
import { getUserSettings } from "../api/SettingsApi";

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
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);

  const inactivityTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  // Fetch overview stats
  const { data: overviewData } = useQuery({
    queryKey: ["overviewStats", user?.email],
    queryFn: () => getOverviewStats(user?.email),
    enabled: !!user?.email,
    retry: 1, // Retry up to 1 time on failure
  });

  // Fetch user settings for auto-logout
  const { data: userSettingsData } = useQuery({
    queryKey: ["userSettings", user?.email],
    queryFn: () => getUserSettings(user?.email),
    enabled: !!user?.email,
    refetchInterval: 60000,
    staleTime: 30000,
  });

  // Calculate counts from overview stats
  const getCounts = () => {
    const data = overviewData?.data || {};
    return {
      alerts: data.totalAlertsCount || 0,
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

  // Handle auto-logout
  const handleAutoLogout = () => {
    console.log("[Auto-Logout] User inactive - logging out");
    clearAllTimers();
    logout();
    navigate(ROUTE.LOGIN);
  };

  // Clear all timers
  const clearAllTimers = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  };

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    const settings = userSettingsData?.data;
    const autoLogout = settings?.autoLogout;
    const autoLogoutInterval = settings?.autoLogoutInterval;

    // Only track inactivity if autoLogout is enabled (1)
    if (autoLogout !== 1 || !autoLogoutInterval) {
      return;
    }

    // Clear existing timers
    clearAllTimers();

    // Hide warning modal if open
    if (showWarningModal) {
      setShowWarningModal(false);
    }

    // Update last activity time
    lastActivityRef.current = Date.now();

    // Convert minutes to milliseconds
    const intervalMs = autoLogoutInterval * 60 * 1000;
    const warningTimeMs = intervalMs - 60000; // Show warning 1 minute before

    console.log(
      `[Auto-Logout] Timer reset. Will warn in ${
        autoLogoutInterval - 1
      } min, logout in ${autoLogoutInterval} min`
    );

    // Set warning timer (1 minute before logout)
    if (autoLogoutInterval > 1) {
      warningTimerRef.current = setTimeout(() => {
        console.log("[Auto-Logout] Showing warning modal");
        setShowWarningModal(true);
        setTimeRemaining(60);

        // Start countdown
        countdownIntervalRef.current = setInterval(() => {
          setTimeRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(countdownIntervalRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, warningTimeMs);
    }

    // Set logout timer
    inactivityTimerRef.current = setTimeout(() => {
      handleAutoLogout();
    }, intervalMs);
  };

  // Handle user activity with debouncing
  const handleUserActivity = useRef(
    (() => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          resetInactivityTimer();
        }, 500); // Debounce by 500ms to avoid excessive resets
      };
    })()
  ).current;

  // Handle "Stay Logged In" button
  const handleStayLoggedIn = () => {
    console.log("[Auto-Logout] User chose to stay logged in");
    setShowWarningModal(false);
    resetInactivityTimer();
  };

  // Set up activity listeners and inactivity timer
  useEffect(() => {
    const settings = userSettingsData?.data;
    const autoLogout = settings?.autoLogout;
    const autoLogoutInterval = settings?.autoLogoutInterval;

    // Only set up if autoLogout is enabled
    if (autoLogout !== 1 || !autoLogoutInterval) {
      console.log("[Auto-Logout] Feature disabled or not configured");
      clearAllTimers();
      setShowWarningModal(false);
      return;
    }

    console.log(
      `[Auto-Logout] Feature enabled - ${autoLogoutInterval} minutes inactivity timeout`
    );

    // Activity events to track
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    // Add event listeners
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity, true);
    });

    // Start initial timer
    resetInactivityTimer();

    // Cleanup on unmount or settings change
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity, true);
      });
      clearAllTimers();
    };
  }, [userSettingsData, user?.email]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

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

      {/* Inactivity Warning Modal */}
      {showWarningModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            fontFamily: "'Decimal', sans-serif",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "450px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
              textAlign: "center",
            }}
          >
            {/* Warning Icon */}
            <div
              style={{
                width: "80px",
                height: "80px",
                margin: "0 auto 24px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FFC107 0%, #FF9800 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
              }}
            >
              ⏰
            </div>

            {/* Title */}
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "24px",
                fontWeight: "600",
                color: "#212529",
              }}
            >
              Session Timeout Warning
            </h3>

            {/* Message */}
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                color: "#6c757d",
                lineHeight: "1.6",
              }}
            >
              You've been inactive for a while. For your security, you'll be
              automatically logged out in:
            </p>

            {/* Countdown Timer */}
            <div
              style={{
                margin: "24px 0",
                fontSize: "48px",
                fontWeight: "700",
                color: timeRemaining <= 10 ? "#dc3545" : "#FF9800",
                fontFamily: "'Decimal', monospace",
              }}
            >
              {timeRemaining}s
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "24px",
              }}
            >
              <button
                onClick={handleAutoLogout}
                style={{
                  flex: 1,
                  padding: "14px 24px",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#5a6268")}
                onMouseOut={(e) => (e.target.style.background = "#6c757d")}
              >
                Logout Now
              </button>
              <button
                onClick={handleStayLoggedIn}
                style={{
                  flex: 1,
                  padding: "14px 24px",
                  background:
                    "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 16px rgba(40, 167, 69, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(40, 167, 69, 0.3)";
                }}
              >
                Stay Logged In
              </button>
            </div>

            {/* Info Text */}
            <p
              style={{
                margin: "20px 0 0 0",
                fontSize: "13px",
                color: "#adb5bd",
                lineHeight: "1.4",
              }}
            >
              Any activity will reset the timer and keep you logged in.
            </p>
          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

export default DashboardLayout;
