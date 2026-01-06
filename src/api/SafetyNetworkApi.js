import api from "../common/ConfigAxios";
import { APIROUTES } from "../common/ApiRoutes";

export const getSafetyNetworkMembers = async (email) => {
  const response = await api.get(APIROUTES.GET_SAFETY_NETWORK_MEMBERS(email));
  return response.data;
};

export const getSafetyNetworkMemberDetails = async (email, memberEmail) => {
  const response = await api.get(
    APIROUTES.GET_SAFETY_NETWORK_MEMBER_DETAILS(email, memberEmail)
  );
  return response.data;
};
