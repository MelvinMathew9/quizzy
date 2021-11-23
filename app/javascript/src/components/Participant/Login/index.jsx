import React, { useContext, useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { useHistory, useParams } from "react-router";

import publicApi from "apis/public";

import Create from "./Create";

import { ParticipantContext } from "../../../contexts/ParticipantContext";

const Login = () => {
  const [quiz, setQuiz] = useState();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();
  const { slugVerified, setParticipantData } = useContext(ParticipantContext);

  const fetchQuiz = async () => {
    try {
      const response = await publicApi.showQuiz(slug);
      setQuiz(response.data?.quiz);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!slugVerified) {
      history.push(`/public/${slug}`);
      setLoading(false);
    } else {
      fetchQuiz();
    }
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
        },
      });

      const attemptResponse = await publicApi.createAttempt({
        attempt: {
          quiz_id: quiz.id,
          user_id: response.data?.user?.id,
        },
      });
      setParticipantData({
        authToken: response.data.user.authentication_token,
        email: response.data.user.email,
        userId: response.data.user.id,
        userName: `${response.data.user.first_name} ${response.data.user.last_name}`,
        attempt_id: attemptResponse.data?.attempt?.id,
      });
      history.push(`/public/${slug}/attempt/quiz-new`);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

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
