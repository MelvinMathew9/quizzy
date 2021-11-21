import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { PageLoader, Button, Typography } from "neetoui";
import { isNil, isEmpty, either } from "ramda";

import quizApi from "../../apis/quiz";
import Quiz from "../Quiz";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const response = await quizApi.fetch();
      setQuizzes(response.data.quizzes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full py-4 md:px-5 px-4 space-y-6">
      <Button
        label="Add new quiz"
        to={"/quizzes/new"}
        iconPosition="left"
        icon={Plus}
        className="md:self-end self-center"
      />
      {either(isNil, isEmpty)[quizzes] ? (
        <Typography
          style="h3"
          className="mt-16 md:mt-40  neeto-ui-text-gray-300 self-center"
        >
          You have not created any quiz
        </Typography>
      ) : (
        <Quiz data={quizzes} fetchQuizzes={fetchQuizzes} />
      )}
    </div>
  );
};

export default Dashboard;
