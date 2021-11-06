import React, { useState } from "react";

import DeleteModal from "./DeleteModal";
import Table from "./Table";

import quizApi from "../../apis/quiz";

const Quiz = ({ data, setData }) => {
  const [modal, setShowModal] = useState(false);
  const [quiz, setQuiz] = useState({});

  const fetchQuizzes = async () => {
    try {
      const response = await quizApi.fetch();
      setData(response.data.quizzes);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <Table quizzes={data} setShowModal={setShowModal} setQuiz={setQuiz} />
      {modal && (
        <DeleteModal
          setShowModal={setShowModal}
          quiz={quiz}
          refetch={fetchQuizzes}
        />
      )}
    </>
  );
};

export default Quiz;
