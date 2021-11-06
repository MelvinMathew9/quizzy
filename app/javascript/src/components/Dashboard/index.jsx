import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { PageLoader, Button, Typography } from "neetoui";
import { all, isNil, isEmpty, either } from "ramda";
import { useHistory } from "react-router";

import quizApi from "../../apis/quiz";
import Quiz from "../Quiz";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
        onClick={() => history.push("/quizzes/create")}
        iconPosition="left"
        icon={() => <Plus size={18} />}
        className="md:self-end self-center"
      />
      {all(either(isNil, isEmpty), [quizzes]) ? (
        <Typography
          style="h3"
          className="mt-24 neeto-ui-text-gray-300 self-center"
        >
          You have not created any quiz
        </Typography>
      ) : (
        <Quiz data={quizzes} setData={setQuizzes} />
      )}
    </div>
  );
};

export default Dashboard;
