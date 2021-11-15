import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

import { setAuthHeaders } from "apis/axios";
import publicApi from "apis/public";
import { setToSessionsStorage } from "helpers/storage";

import Create from "./Create";

const Login = ({ setData }) => {
  const [quiz, setQuiz] = useState();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await publicApi.showQuiz(slug);
      setQuiz(response.data?.quiz);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await publicApi.createUser({
        user: {
          first_name: firstName,
          last_name: lastName,
          email,
          quiz_id: quiz?.id,
        },
      });
      setToSessionsStorage({
        authToken: response.data.user.authentication_token,
        email: response.data.user.email,
        userId: response.data.user.id,
        userName: `${response.data.user.first_name} ${response.data.user.last_name}`,
      });
      setData({
        authToken: response.data.user.authentication_token,
        email: response.data.user.email,
        userId: response.data.user.id,
        userName: `${response.data.user.first_name} ${response.data.user.last_name}`,
      });
      setAuthHeaders(setLoading, "standard");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Create
      setEmail={setEmail}
      setFirstName={setFirstName}
      firstName={firstName}
      lastName={lastName}
      email={email}
      title={quiz?.title}
      setLastName={setLastName}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
