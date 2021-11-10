import React, { useState } from "react";

import DeleteModal from "./Common/DeleteModal";
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
          data={quiz}
          refetch={fetchQuizzes}
          type="Quiz"
        />
      )}
    </>
  );
};

export default Quiz;
