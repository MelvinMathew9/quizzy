import React, { useEffect, useState } from "react";

import { LeftArrowCircle } from "neetoicons";
import { Typography, Input, Button } from "neetoui";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router";

import quizApi from "apis/quiz";
import { getFromLocalStorage } from "helpers/storage";

import Container from "../../Common/Conatiner";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { slug } = useParams();
  const fetchQuizzes = async () => {
    try {
      const response = await quizApi.show(slug);
      setTitle(response.data.quiz.title);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!title.trim()) {
      toast.error("Title can't be empty");
    } else {
      try {
        setLoading(true);
        await quizApi.update(slug, {
          quiz: { title, user_id: getFromLocalStorage("authUserId") },
        });
        history.push("/dashboard");
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
              content: "Go Bak",
              position: "right",
            }}
            onClick={() => history.push("/dashboard")}
            icon={() => <LeftArrowCircle size={20} />}
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
          fullWidth={true}
        />
      </div>
    </Container>
  );
};

export default Edit;
