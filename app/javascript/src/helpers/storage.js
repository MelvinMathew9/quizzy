const setToLocalStorage = ({ authToken, email, userId, userName }) => {
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("authEmail", email);
  localStorage.setItem("authUserId", userId);
  localStorage.setItem("userName", userName);
};
const setToSessionsStorage = ({ authToken, email, userId, userName }) => {
  sessionStorage.setItem("authToken", authToken);
  sessionStorage.setItem("authEmail", email);
  sessionStorage.setItem("authUserId", userId);
  sessionStorage.setItem("userName", userName);
};

const getFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export { setToLocalStorage, getFromLocalStorage, setToSessionsStorage };
