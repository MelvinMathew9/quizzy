import React from "react";

import { Typography, Button } from "neetoui";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";

const Topbar = ({ isLoggedIn }) => {
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        authUserId: null,
        authEmail: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <div className="p-4 flex border-gray-300 border-b-2">
      <Typography style="h2" className="flex-grow">
        Quizzy
      </Typography>
      {isLoggedIn && (
        <div className="flex space-x-4">
          <Button style="link" label="Reports" />
          <Button style="link" label={getFromLocalStorage("userName")} />
          <Button style="link" label="Logout" onClick={handleLogout} />
        </div>
      )}
    </div>
  );
};

export default Topbar;
