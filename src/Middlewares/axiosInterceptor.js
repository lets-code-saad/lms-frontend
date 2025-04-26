import axios from "axios";
import { toast } from "react-toastify";

const axiosInterceptor = axios.create({
  baseURL: "https://lms-backend-xi-pied.vercel.app",
  // baseURL: "http://localhost:5000",
});

// add token to every request
axiosInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // very important
  },
  (error) => Promise.reject(error)
);

let alreadyShownExpiredToast = false;

axiosInterceptor.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const errorMsg = error?.response?.message || "Something went wrong";

    // handle 401 separately
    if (status === 401) {
      if (!alreadyShownExpiredToast) {
        alreadyShownExpiredToast = true;
        localStorage.removeItem("token");
        toast.error("Session Expired! Please Login Again", {
          toastId: "expired-session",
        });
      }
      return Promise.reject(error); // still reject the promise
    }

    // Handle other status codes
    switch (status) {
      case 400:
        toast.error(errorMsg || "Bad Request. Please check your input.", {
          toastId: "bad-request",
        });
        break;

      case 403:
        toast.error(errorMsg || "Access Denied! You don't have permission.", {
          toastId: "forbidden",
        });
        break;

      case 404:
        toast.error(errorMsg || "Resource not found.", {
          toastId: "not-found",
        });
        break;

      case 409:
        toast.error(errorMsg || "Conflict. Maybe you're already enrolled?", {
          toastId: "conflict",
        });
        break;

      case 429:
        toast.error(errorMsg || "Too many requests. Try again later.", {
          toastId: "rate-limit",
        });
        break;

      case 500:
        toast.error(errorMsg || "Server Error. Please try again later.", {
          toastId: "server-error",
        });
        break;

      default:
        toast.error(errorMsg, { toastId: "generic-error" });
    }

    return Promise.reject(error);
  }

);



export default axiosInterceptor;
