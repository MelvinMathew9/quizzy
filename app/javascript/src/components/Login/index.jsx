import React, { useState } from "react";

import { toast } from "react-hot-toast";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

import Create from "./Create";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await authApi.login({ login: { email, password } });
      toast.success("Logged in successfully");
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        userName: `${response.data.first_name} ${response.data.last_name}`,
      });
      setAuthHeaders();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Create
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
