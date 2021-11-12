import React from "react";

import Attempt from "./Attempt";

const Submission = () => {
  return (
    <Attempt
      data={{
        question: "test",
        options: [{ content: "test" }, { content: "test" }],
      }}
    />
  );
};

export default Submission;
