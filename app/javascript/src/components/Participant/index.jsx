import React, { useEffect, useState, useContext } from "react";

import { Typography, PageLoader } from "neetoui";
import { useHistory, useParams } from "react-router";

import publicApi from "apis/public";

import { ParticipantContext } from "../../contexts/ParticipantContext";

const Participant = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { slug } = useParams();
  const { setSlugVerified } = useContext(ParticipantContext);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      await publicApi.showQuiz(slug);
      setSlugVerified(true);
      history.push(`/public/${slug}/attempt/new`);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);
  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Typography style="h2" className="text-gray-700">
        Quiz not found
      </Typography>
    </div>
  );
};

export default Participant;
