import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { PageLoader, Button, Typography } from "neetoui";
import { useHistory, useParams } from "react-router";

import quizApi from "apis/quiz";

const Questions = () => {
  const [quiz, setQuiz] = useState([]);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const fetchQuiz = async () => {
    try {
      const response = await quizApi.show(slug);
      setQuiz(response.data.quiz);
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
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full py-4 md:px-5 px-4">
      <div className="flex">
        <Typography style="h2" className="flex-grow text-gray-700">
          {quiz.title}
        </Typography>
        <Button
          label="Add questions"
          onClick={() => history.push(`/quizzes/questions/${slug}/create`)}
          iconPosition="left"
          icon={() => <Plus size={18} />}
          className="md:self-end self-center"
        />
      </div>
      <Typography
        style="h3"
        className="mt-16 md:mt-40 neeto-ui-text-gray-300 self-center"
      >
        You have not created any questions
      </Typography>
    </div>
  );
};

export default Questions;
