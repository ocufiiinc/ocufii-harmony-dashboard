import api from "../common/ConfigAxios";
import { APIROUTES } from "../common/ApiRoutes";

/**
 * Login API
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} roleId - User role ID (default: "3")
 * @returns {Promise} - Login response with user data and tokens
 */
export const loginAPI = async (email, password, roleId = "3") => {
  try {
    const response = await api.post(APIROUTES.LOGIN, {
      email,
      password,
      roleId,
    });
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};

/**
 * Logout API (if needed in future)
 */
export const logoutAPI = async () => {
  // Implement logout API call if backend supports it
  return Promise.resolve();
};
