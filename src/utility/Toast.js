import { toast } from "react-toastify";

const Toast = {
  success: (msg, options = {}) => toast.success(msg, options),
  error: (msg, options = {}) => toast.error(msg, options),
  warn: (msg, options = {}) => toast.warn(msg, options),
  info: (msg, options = {}) => toast.info(msg, options),
};

export default Toast;
