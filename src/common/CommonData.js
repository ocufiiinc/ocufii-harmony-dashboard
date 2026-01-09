// Menu items for the sidebar navigation
import dashboardLogo from "../assets/images/dashboard.svg";
import notificationLogo from "../assets/images/notification.svg";
import devicesLogo from "../assets/images/devices.svg";
import historyLogo from "../assets/images/history.svg";
import recipientLogo from "../assets/images/recipients.png";
import personalLogo from "../assets/images/person-shield2.svg";
import safetyNetworkLogo from "../assets/images/safetyNetwork.png";
import shopLogo from "../assets/images/shop.png";
import helpLogo from "../assets/images/help.png";
import logoutLogo from "../assets/images/logout2.png";
import { ROUTE } from "./Routes";
import moment from "moment";
export const MenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: dashboardLogo,
    path: ROUTE.DASHBOARD,
  },
  {
    id: "alerts",
    label: "Alerts",
    icon: notificationLogo,
    path: ROUTE.ALERT,
  },
  {
    id: "devices",
    label: "Devices",
    icon: devicesLogo,
    path: ROUTE.DEVICES,
  },
  {
    id: "history",
    label: "History",
    icon: historyLogo,
    path: ROUTE.HISTORY,
  },
  {
    id: "safetyNetwork",
    label: "My Safety Network",
    icon: safetyNetworkLogo,
    path: ROUTE.SAFETY_NETWORK,
  },
  {
    id: "recipient",
    label: "My Recipients",
    icon: recipientLogo,
    path: ROUTE.RECIPIENTS,
  },
  {
    id: "personalSafety",
    label: "Personal Safety Service",
    icon: personalLogo,
    path: ROUTE.PERSONAL_SAFETY,
  },
  {
    id: "separator-1",
    type: "separator",
  },
  {
    id: "shop",
    label: "Shop",
    icon: shopLogo,
    path: ROUTE.SHOP,
  },
  {
    id: "help",
    label: "Help & Support",
    icon: helpLogo,
    path: ROUTE.HELP,
  },
  {
    id: "separator-2",
    type: "separator",
  },
  {
    id: "logout",
    label: "Logout",
    icon: logoutLogo,
  },
];

export const dateRangeMap = {
  "24hours": "24hours",
  "7days": "7",
  "15days": "15",
  "30days": "30",
  lastMonth: "30",
  last3Months: "90",
  lastWeek: "7",
  thisMonth: (moment().diff(moment().startOf("month"), "days") + 1).toString(),
};
