import React from "react";

import { Typography, Input, Button } from "neetoui";

import Container from "../Conatiner";

const CreateQuiz = () => {
  return (
    <Container>
      <div className="max-w-lg mx-auto py-10 px-4 space-y-4">
        <Typography style="h3">Add new Quiz</Typography>
        <Input label="Quiz name" required={true} placeholder="Enter Name" />
        <Button label="Submit" fullWidth={true} />
      </div>
    </Container>
  );
};

export default CreateQuiz;
