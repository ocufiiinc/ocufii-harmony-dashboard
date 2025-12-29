export const APIROUTES = {
  LOGIN: "/OcufiiDynamoDB/Login",
  GET_ACTIVE_ALERTS: (email, limit, dateRange = "24 hours") =>
    `/Dashboard/GetActiveAlerts?email=${email}&dateRange=${dateRange}&limit=${limit}`,
  PING_RECIPIENTS: "/Dashboard/PingSafetyNetworkLocations",
  GET_SAFETY_NETWORK_LOCATIONS: (email, notificationId) =>
    `/Dashboard/GetSafetyNetworkLocations?email=${email}&notificationId=${notificationId}`,
  SEND_ASSIST_MESSAGE: "/Dashboard/SendAssistMessage",
  GET_ASSIST_REQUEST_STATUS: (notificationId) =>
    `/Dashboard/GetAssistRequestStatus?notificationId=${notificationId}`,
  SHARE_ROUTE: "/Dashboard/SendRouteToMember",
  GET_ALERT_SUMMARY: "/Dashboard/GetAlertSummary",
  GET_DEVICE_HEALTH: (email) => `/Dashboard/GetDeviceHealth?email=${email}`,
  GET_ALERT_NOTES: (email, notificationId) =>
    `/Dashboard/GetAlertNotes?email=${email}&notificationId=${notificationId}`,
  ADD_ALERT_NOTES: "/Dashboard/AddAlertNote",
  GET_ALL_DEVICES: (email) =>
    `/Dashboard/devices/all?email=${email}&filter=all`,
  GET_OVERVIEW_STATS: (email) => `/Dashboard/GetOverview?email=${email}`,
  SEND_MESSAGE_TO_VICTIM: "/Dashboard/SendMessageToVictim",
  SET_SNOOZE: "/Dashboard/devices/snooze/start",
};
