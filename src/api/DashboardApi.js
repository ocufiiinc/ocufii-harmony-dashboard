import api from "../common/ConfigAxios";
import { APIROUTES } from "../common/ApiRoutes";
import Toast from "../utility/Toast";

export const getDashboard = async (
  email,
  limit = 1000,
  dateRange = "24 hours"
) => {
  try {
    const response = await api.get(
      APIROUTES.GET_ACTIVE_ALERTS(email, limit, dateRange)
    );
    // console.log("return response", response.data);
    if (response.data.status == 200) {
      // Ensure all alerts have proper numeric lat/lng for the map
      if (response.data.data) {
        const categories = ["safety", "security", "system"];
        categories.forEach((category) => {
          if (response.data.data[category]?.alerts) {
            response.data.data[category].alerts = response.data.data[
              category
            ].alerts.map((alert) => ({
              ...alert,
              // Ensure numeric latitude and longitude are present
              latitude: alert.latitude || parseFloat(alert.lat),
              longitude: alert.longitude || parseFloat(alert.lng),
            }));
          }
        });
      }
      return response.data;
    } else {
      Toast.error(response.data.message || "Failed to fetch dashboard data");
      return null;
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const pingRecipients = async (email, notificationId) => {
  try {
    const response = await api.post(APIROUTES.PING_RECIPIENTS, {
      email,
      notificationId,
    });
    console.log("Ping recipients response:", response.data);
    if (response.data.status == 200) {
      return response.data;
    } else {
      // Toast.error(response.data.message || "Failed to ping recipients");
      return null;
    }
  } catch (error) {
    console.error("Error ping recipients:", error);
    // Toast.error("Failed to ping recipients");
    throw error;
  }
};

export const getSafetyNetworkLocations = async (email, notificationId) => {
  try {
    const response = await api.get(
      APIROUTES.GET_SAFETY_NETWORK_LOCATIONS(email, notificationId)
    );
    console.log("Safety network locations response:", response.data);
    if (response.data.status == 200) {
      // Ensure all members have proper numeric lat/lng for the map
      if (response.data.members) {
        response.data.members = response.data.members.map((member) => ({
          ...member,
          // Map lat/long to latitude/longitude for consistency
          latitude: member.lat ? parseFloat(member.lat) : null,
          longitude: member.long ? parseFloat(member.long) : null,
        }));
      }
      return response.data;
    } else {
      // Toast.error(
      //   response.data.message || "Failed to get safety network locations"
      // );
      return null;
    }
  } catch (error) {
    console.error("Error getting safety network locations:", error);
    // Toast.error("Failed to get safety network locations");
    throw error;
  }
};

export const sendAssistMessage = async ({
  email,
  helperEmail,
  notificationId,
  lat,
  long,
  customMessage,
  title,
  eventName,
}) => {
  try {
    const response = await api.post(APIROUTES.SEND_ASSIST_MESSAGE, {
      email,
      helperEmail,
      notificationId,
      lat,
      long,
      customMessage,
      title,
      eventName,
    });
    console.log("Send assist message response:", response.data);
    if (response.data.status == 200) {
      // Toast.success(response.data.message || "Message sent successfully");
      return response.data;
    } else {
      // Toast.error(response.data.message || "Failed to send message");
      return null;
    }
  } catch (error) {
    console.error("Error sending assist message:", error);
    // Toast.error("Failed to send message");
    throw error;
  }
};

export const getAssistRequestStatus = async (notificationId) => {
  try {
    const response = await api.get(
      APIROUTES.GET_ASSIST_REQUEST_STATUS(notificationId)
    );
    console.log("Get assist request status response:", response.data);
    if (response.data.status == 200) {
      return response.data;
    } else {
      // Toast.error(
      //   response.data.message || "Failed to get assist request status"
      // );
      return null;
    }
  } catch (error) {
    console.error("Error getting assist request status:", error);
    // Toast.error("Failed to get assist request status");
    throw error;
  }
};

export const shareRoute = async ({
  notificationId,
  eventId,
  senderEmail,
  receiverEmail,
  destinationLat,
  destinationLng,
  helperLat,
  helperLng,
}) => {
  try {
    const response = await api.post(APIROUTES.SHARE_ROUTE, {
      notificationId,
      eventId,
      senderEmail,
      receiverEmail,
      destinationLat,
      destinationLng,
      helperLat,
      helperLng,
    });
    console.log("Share route response:", response.data);
    if (response.data.status == 200) {
      Toast.success(response.data.message || "Route shared successfully");
      return response.data;
    } else {
      Toast.error(response.data.message || "Failed to share route");
      return null;
    }
  } catch (error) {
    console.error("Error sharing route:", error);
    Toast.error("Failed to share route");
    throw error;
  }
};

export const getAlertSummary = async (email, startDateTime, endDateTime) => {
  try {
    const response = await api.post(APIROUTES.GET_ALERT_SUMMARY, {
      email,
      startDateTime,
      endDateTime,
    });
    console.log("Get alert summary response:", response.data);
    if (response.data.status == 200) {
      return response.data;
    } else {
      Toast.error(response.data.message || "Failed to get alert summary");
      return null;
    }
  } catch (error) {
    console.error("Error getting alert summary:", error);
    Toast.error("Failed to get alert summary");
    throw error;
  }
};

export const getDeviceHealth = async (email) => {
  try {
    const response = await api.get(APIROUTES.GET_DEVICE_HEALTH(email));
    console.log("Get device health response:", response.data);
    if (response.data.status == 200) {
      return response.data;
    } else {
      Toast.error(response.data.message || "Failed to get device health");
      return null;
    }
  } catch (error) {
    console.error("Error getting device health:", error);
    Toast.error("Failed to get device health");
    throw error;
  }
};

export const getAlertNotes = async (email, notificationId) => {
  try {
    const response = await api.get(
      APIROUTES.GET_ALERT_NOTES(email, notificationId)
    );
    console.log("Get alert notes response:", response.data);
    if (response.data.status == 200) {
      return response.data;
    } else {
      Toast.error(response.data.message || "Failed to get alert notes");
      return null;
    }
  } catch (error) {
    console.error("Error getting alert notes:", error);
    Toast.error("Failed to get alert notes");
    throw error;
  }
};

export const addAlertNote = async ({
  notificationId,
  email,
  authorName,
  noteText,
  newStatus,
}) => {
  try {
    const response = await api.post(APIROUTES.ADD_ALERT_NOTES, {
      notificationId,
      email,
      authorName,
      noteText,
      newStatus,
    });
    console.log("Add alert note response:", response.data);
    if (response.data.status == 200) {
      Toast.success(response.data.message || "Note added successfully");
      return response.data;
    } else {
      Toast.error(response.data.message || "Failed to add note");
      return null;
    }
  } catch (error) {
    console.error("Error adding alert note:", error);
    Toast.error("Failed to add note");
    throw error;
  }
};

export const getOverviewStats = async (email) => {
  try {
    const response = await api.get(APIROUTES.GET_OVERVIEW_STATS(email));
    console.log("Get overview stats response:", response.data);
    if (response.data.status == 200) {
      return response.data;
    } else {
      Toast.error(response.data.message || "Failed to get overview stats");
      return null;
    }
  } catch (error) {
    console.error("Error getting overview stats:", error);
    Toast.error("Failed to get overview stats");
    throw error;
  }
};

export const sendMessageToVictim = async (email, notificationId) => {
  try {
    const response = await api.post(APIROUTES.SEND_MESSAGE_TO_VICTIM, {
      email,
      notificationId,
    });
    console.log(
      "Send message to victim response:",
      response.status,
      response.data
    );
    // Check HTTP status code directly since API returns 200 with no response body
    if (response.status === 200) {
      Toast.success("Message sent successfully");
      return response.data;
    } else {
      Toast.error("Failed to send message");
      return null;
    }
  } catch (error) {
    console.error("Error sending message to victim:", error);
    Toast.error("Failed to send message");
    throw error;
  }
};
