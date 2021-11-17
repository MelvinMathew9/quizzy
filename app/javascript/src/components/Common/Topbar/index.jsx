import React from "react";

import { Typography, Button } from "neetoui";
import { useHistory } from "react-router";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { getFromLocalStorage } from "helpers/storage";

const Topbar = ({ isLoggedIn }) => {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.clear();
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="p-4 flex border-gray-300 border-b-2">
      <Typography
        style="h2"
        className="flex-grow hover: cursor-pointer"
        onClick={() =>
          !window.location.pathname.includes("public") && history.push("/")
        }
      >
        Quizzy
      </Typography>
      {isLoggedIn &&
        window.location.pathname !== "/login" &&
        !window.location.pathname.includes("public") && (
          <div className="flex space-x-4">
            <Button
              style="link"
              label="Reports"
              onClick={() => history.push("/report")}
            />
            <Button style="link" label={getFromLocalStorage("userName")} />
            <Button style="link" label="Logout" onClick={handleLogout} />
          </div>
        )}
    </div>
  );
};

export default Topbar;
