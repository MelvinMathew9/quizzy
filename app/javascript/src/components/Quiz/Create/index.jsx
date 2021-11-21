import React, { useState } from "react";

import { LeftArrowCircle } from "neetoicons";
import { Typography, Input, Button } from "neetoui";
import toast from "react-hot-toast";
import { useHistory } from "react-router";

import quizApi from "apis/quiz";
import Container from "common/Container";

const Create = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    if (!title.trim()) {
      toast.error("Title can't be empty");
    } else {
      try {
        setLoading(true);
        await quizApi.create({
          quiz: { title },
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
            to={"/"}
            tooltipProps={{
              content: "Go Back",
              position: "right",
            }}
            icon={LeftArrowCircle}
          />
        </div>
        <Input
          label="Quiz name"
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

export default Create;
