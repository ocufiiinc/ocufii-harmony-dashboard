import api from "../common/ConfigAxios";
import { APIROUTES } from "../common/ApiRoutes";

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
