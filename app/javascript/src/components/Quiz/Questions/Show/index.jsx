import React from "react";

import { Highlight, Delete, CheckCircle } from "neetoicons";
import { Button, Typography, Tag } from "neetoui";
import { useHistory, useParams } from "react-router";

const Question = ({ data, index, setShowModal, setQuestion }) => {
  const { quiz_id } = useParams();
  const history = useHistory();
  const handleDelete = question => {
    setQuestion(question);
    setShowModal(true);
  };
  return (
    <div className="neeto-ui-shadow-s my-2">
      <Tag
        indicatorColor="gray"
        label={`Question ${index + 1}`}
        className="self-start"
      />
      <div className="flex flex-col px-6 py-2 ">
        <div className="flex space-x-2">
          <Typography style="h3" className="flex-grow">
            {data?.question}
          </Typography>
          <Button
            style="secondary"
            icon={Highlight}
            iconPosition="left"
            onClick={() =>
              history.push({
                pathname: `/questions/${data.id}/edit`,
                state: { quizId: quiz_id },
              })
            }
            label="Edit"
          ></Button>
          <Button
            style="primary"
            icon={Delete}
            iconPosition="left"
            onClick={() => handleDelete(data)}
            label="Delete"
          ></Button>
        </div>
        {data.options?.map((option, index) => (
          <div
            key={index}
            className={`${
              option.is_answer ? "bg-green-200 " : "bg-gray-100"
            } p-2 my-2 flex items-center`}
          >
            <Typography style="body1" className="flex-grow">
              {option.content}
            </Typography>
            {option.is_answer && <CheckCircle size={20} color="lightgreen" />}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Question;
