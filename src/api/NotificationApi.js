import api from "../common/ConfigAxios";
import { APIROUTES } from "../common/ApiRoutes";

// Get notifications for a user
export const getNotifications = async () => {
  try {
    const response = await api.get(APIROUTES.GET_NOTIFICATIONS);
    // console.log("✅ Notifications response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    throw error;
  }
};

// Acknowledge a notification
export const acknowledgeNotification = async (notificationId) => {
  try {
    const response = await api.put(APIROUTES.ACKNOWLEDGE_NOTIFICATION, {
      notificationId: notificationId,
    });
    // console.log("✅ Notification acknowledged:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error acknowledging notification:", error);
    console.error("❌ Error config:", error.config);
    throw error;
  }
};
