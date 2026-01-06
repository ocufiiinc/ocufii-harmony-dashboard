import api from "../common/ConfigAxios";
import { APIROUTES } from "../common/ApiRoutes";

export const getUserSettings = async (email) => {
  const response = await api.get(APIROUTES.GET_USER_SETTINGS(email));
  return response.data;
};
