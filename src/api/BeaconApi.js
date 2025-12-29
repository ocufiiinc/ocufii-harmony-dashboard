import api from "../common/ConfigAxios";
import { APIROUTES } from "../common/ApiRoutes";
import Toast from "../utility/Toast";

export const setSnooze = async (email, beaconMAC, hours, minutes) => {
  try {
    const response = await api.post(APIROUTES.SET_SNOOZE, {
      email,
      beaconMAC,
      hours,
      minutes,
      gatewayMAC: "", // Optional, can be empty
    });
    console.log("Set snooze response:", response.data);
    if (response.data.status == 200) {
      Toast.success(
        response.data.message || "Snooze mode started successfully"
      );
      return response.data;
    } else {
      Toast.error(response.data.message || "Failed to start snooze mode");
      return null;
    }
  } catch (error) {
    console.error("Error setting snooze:", error);
    Toast.error("Failed to start snooze mode");
    throw error;
  }
};

export const stopSnooze = async (email, beaconMAC) => {
  try {
    const response = await api.post(APIROUTES.STOP_SNOOZE, {
      email,
      beaconMAC,
    });
    console.log("Stop snooze response:", response.data);
    if (response.data.status == 200) {
      Toast.success(
        response.data.message || "Snooze mode cancelled successfully"
      );
      return response.data;
    } else {
      Toast.error(response.data.message || "Failed to cancel snooze mode");
      return null;
    }
  } catch (error) {
    console.error("Error stopping snooze:", error);
    Toast.error("Failed to cancel snooze mode");
    throw error;
  }
};
