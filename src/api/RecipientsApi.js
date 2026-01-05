import api from "../common/ConfigAxios";
import { APIROUTES } from "../common/ApiRoutes";

export const getRecipients = async (email) => {
  const response = await api.get(APIROUTES.GET_RECIPIENTS(email));
  return response.data;
};
