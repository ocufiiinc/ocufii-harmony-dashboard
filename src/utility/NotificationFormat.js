import { getTimeAgo } from "./TimeFormat";

export const transformNotifications = (notificationData) => {
  if (!notificationData?.notifications) return [];

  return notificationData.notifications.map((notification) => ({
    id: notification.notificationId,
    type: notification.notificationCategory === "0" ? "emergency" : "offline",
    title: notification.title,
    body: notification.body,
    duration: `Active since ${getTimeAgo(notification.recordTimeStamp)}`,
    location: `Battery: ${notification.battery}% - ${notification.beaconMAC}`,
    coordinates: {
      lat: parseFloat(notification.locations?.latitude) || 0,
      lng: parseFloat(notification.locations?.longitude) || 0,
    },
    isUrgent: notification.notificationCategory === "0",
    priority: notification.priority,
    acknowledge: notification.acknowledge,
    isSnoozed: notification.isSnoozed,
    reason: notification.notificationReason,
    deviceMAC: notification.deviceMAC,
    beaconMAC: notification.beaconMAC,
    notificationTimeStamp: notification.notificationTimeStamp,
  }));
};

// Get notification counts by category
export const getNotificationCounts = (notifications) => {
  if (!notifications || !Array.isArray(notifications)) {
    return { urgent: 0, general: 0 };
  }

  const counts = notifications.reduce(
    (acc, notification) => {
      const category = notification.notificationCategory;
      if (category === "0") {
        acc.urgent += 1;
      } else if (category === "1") {
        acc.general += 1;
      }
      return acc;
    },
    { urgent: 0, general: 0 }
  );

  return counts;
};
