import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { PageLoader, Button, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory, useParams } from "react-router";

import quizApi from "apis/quiz";

import ShowQuestion from "./Show";

import DeleteModal from "../Common/DeleteModal";

const Questions = () => {
  const [quiz, setQuiz] = useState([]);
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [modal, setShowModal] = useState(false);
  const [publish, setPublish] = useState(false);
  const history = useHistory();
  const { quiz_id } = useParams();

  const fetchQuiz = async () => {
    try {
      const quizResponse = await quizApi.show(quiz_id);
      setQuiz(quizResponse?.data?.quiz);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      await quizApi.publish(quiz_id);
      setPublish(true);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, [publish]);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full py-4 md:px-5 px-4 space-y-2">
      <div className="flex space-x-2">
        <Typography style="h2" className="flex-grow text-gray-700">
          {quiz.title}
        </Typography>
        <Button
          label="Add questions"
          onClick={() =>
            history.push({
              pathname: `/questions/new`,
              state: { quizId: quiz_id },
            })
          }
          iconPosition="left"
          icon={Plus}
          className="md:self-end self-center"
        />
        {!isEmpty(quiz.questions) && (
          <Button
            label={quiz?.slug || publish ? "Published" : "Publish"}
            onClick={handlePublish}
            disabled={quiz?.slug || publish ? true : false}
            className="md:self-end self-center"
          />
        )}
      </div>
      {quiz?.slug && (
        <div className="self-end">
          Public URL:
          <Button
            style="link"
            label={`${window.location.origin}/public/${quiz.slug}`}
            onClick={() =>
              (window.location.href = `${window.location.origin}/public/${quiz.slug}`)
            }
          />
        </div>
      )}
      {quiz.questions.length ? (
        quiz.questions.map((question, index) => (
          <ShowQuestion
            key={index}
            data={question}
            index={index}
            setShowModal={setShowModal}
            setQuestion={setQuestion}
          />
        ))
      ) : (
        <Typography
          style="h3"
          className="mt-16 md:mt-40 neeto-ui-text-gray-300 self-center"
        >
          You have not created any questions
        </Typography>
      )}
      {modal && (
        <DeleteModal
          setShowModal={setShowModal}
          data={question}
          refetch={fetchQuiz}
          type="Question"
        />
      )}
    </div>
  );
};

export default Questions;
