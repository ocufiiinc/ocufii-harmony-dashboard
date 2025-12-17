import api from "../common/ConfigAxios";
import { APIROUTES } from "../common/ApiRoutes";
import Toast from "../utility/Toast";

export const getAllDevices = async (email) => {
  try {
    const response = await api.get(APIROUTES.GET_ALL_DEVICES(email));
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    Toast.error("Failed to fetch devices");
    throw error;
  }
};
