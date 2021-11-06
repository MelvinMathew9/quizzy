import axios from "axios";
import { toast } from "react-hot-toast";

import { getFromLocalStorage } from "helpers/storage.js";

axios.defaults.baseURL = "/";
const DEFAULT_ERROR_NOTIFICATION = "Something went wrong!";

const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = getFromLocalStorage("authToken");
  const email = getFromLocalStorage("authEmail");
  if (token && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
  setLoading(false);
};

const handleSuccessResponse = response => {
  if (response?.data?.notice) {
    toast.success(response?.data?.notice);
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  toast.error(
    axiosErrorObject.response?.data?.error || DEFAULT_ERROR_NOTIFICATION
  );
  //The 401 Unauthorized status code means unauthorized
  if (axiosErrorObject.response?.status === 401) {
    localStorage.clear();
  }

  //The 423 (Locked) status code means the source or destination resource of a method is locked.
  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/";
  }

  return Promise.reject(axiosErrorObject);
};

const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, error =>
    handleErrorResponse(error)
  );
};

const resetAuthTokens = () => {
  delete axios.defaults.headers["X-Auth-Email"];
  delete axios.defaults.headers["X-Auth-Token"];
};

export { setAuthHeaders, resetAuthTokens, registerIntercepts };
