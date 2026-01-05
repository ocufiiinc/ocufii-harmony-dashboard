import api from "../common/ConfigAxios";
import { APIROUTES } from "../common/ApiRoutes";
import Toast from "../utility/Toast";

export const deleteUserAccount = async (email) => {
  try {
    const response = await api.post(APIROUTES.DELETE_ACCOUNT, {
      email,
    });

    if (response.status !== 200) {
      return false;
    } else {
      console.log("Account deleted successfully");
      Toast.success("Account deleted successfully");
    }
    return true;
  } catch (error) {
    console.error("Delete Account API Error:", error);
    throw error;
  }
};
