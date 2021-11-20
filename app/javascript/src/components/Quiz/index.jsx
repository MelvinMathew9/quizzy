import React, { useState } from "react";

import DeleteModal from "./Common/DeleteModal";
import Table from "./Table";

const Quiz = ({ data, fetchQuizzes }) => {
  const [modal, setShowModal] = useState(false);
  const [quiz, setQuiz] = useState({});

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
