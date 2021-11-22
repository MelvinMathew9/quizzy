import React, { useEffect, useState } from "react";

import { LeftArrowCircle } from "neetoicons";
import { Typography, Input, Button } from "neetoui";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router";

import quizApi from "apis/quiz";
import Container from "common/Container";
import { getFromLocalStorage } from "helpers/storage";

const EditQuiz = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { quiz_id } = useParams();

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await quizApi.show(quiz_id);
      setTitle(response.data.quiz.title);
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
    if (!title.trim()) {
      toast.error("Title can't be empty");
    } else {
      try {
        setLoading(true);
        await quizApi.update(quiz_id, {
          publish: false,
          quiz: { title, user_id: getFromLocalStorage("authUserId") },
        });
        history.push("/");
      } catch (error) {
        logger.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Container>
      <div className="max-w-lg mx-auto py-10 px-4 space-y-4">
        <div className="flex">
          <Typography style="h3" className="flex-grow">
            Add Quiz
          </Typography>
          <Button
            iconPosition="left"
            style="text"
            tooltipProps={{
              content: "Go Back",
              position: "right",
            }}
            to={"/"}
            icon={LeftArrowCircle}
          />
        </div>
        <Input
          label="Quiz name"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter Name"
        />
        <Button
          label="Submit"
          size="large"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
          fullWidth={true}
        />
      </div>
    </Container>
  );
};

export default EditQuiz;
