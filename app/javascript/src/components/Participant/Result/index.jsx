import React, { useContext, useEffect, useState } from "react";

import { CheckCircle, CloseCircle } from "neetoicons";
import { Radio, Typography, Tag, PageLoader, Button } from "neetoui";
import { useParams, useHistory } from "react-router";

import publicApi from "apis/public";

import { ParticipantContext } from "../../../contexts/ParticipantContext";

const Result = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState();
  const history = useHistory();
  const [score, setScore] = useState(0);
  const { slugVerified, participantData } = useContext(ParticipantContext);
  const fetchResult = async () => {
    try {
      const response = await publicApi.showAnswers(participantData?.attempt_id);
      setAnswers(response.data?.answers);
      setScore(response.data?.attempt);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!slugVerified || !participantData) {
      history.push(`/public/${slug}`);
      setLoading(false);
    } else {
      fetchResult();
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full py-4 md:px-5 px-4 space-y-4">
      <div className="flex justify-end space-x-2 ">
        <Button
          style="secondary"
          label={`${score?.correct_answers_count}`}
          icon={CheckCircle}
        />
        <Button
          label={`${score?.incorrect_answers_count}`}
          style="danger"
          icon={CloseCircle}
        />
      </div>
      {answers?.map((data, index) => (
        <div key={index} className="neeto-ui-shadow-s my-2 ">
          <Tag
            indicatorColor="gray"
            label={`Question ${index + 1}`}
            className="self-start"
          />
          <div className="flex flex-col px-6 py-2 ">
            <Typography style="h3" className="flex-grow">
              {data?.question}
            </Typography>
            <Radio
              label="Select Answer"
              className="space-y-2 my-2"
              containerClassName="w-full"
              stacked
            >
              {data.options?.map((option, i) => (
                <div
                  key={i}
                  className={`${
                    option.is_answer
                      ? "bg-green-200"
                      : data.submitted_answer === option.id
                      ? "bg-red-200"
                      : "bg-gray-100"
                  } p-2 mt-2 self-stretch`}
                >
                  <Radio.Item
                    label={option.content}
                    value={option.id}
                    name={data.id}
                    checked={data.submitted_answer === option.id}
                    disabled={true}
                  />
                </div>
              ))}
            </Radio>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Result;
