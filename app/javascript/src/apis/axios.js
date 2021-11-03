import axios from "axios";
import { toast } from "react-hot-toast";

import { getFromLocalStorage, setToLocalStorage } from "helpers/storage.js";

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
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      toast.success(response.data.notice);
    }
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  toast.error(
    axiosErrorObject.response?.data?.error || DEFAULT_ERROR_NOTIFICATION
  );
  if (axiosErrorObject.response?.status === 401) {
    setToLocalStorage({
      authToken: null,
      authUserId: null,
      authEmail: null,
      userName: null,
    });
  }

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
