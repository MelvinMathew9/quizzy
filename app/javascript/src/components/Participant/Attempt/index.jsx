import React, { useContext, useEffect, useState } from "react";

import { Radio, Typography, Tag, Button, PageLoader } from "neetoui";
import { useHistory, useParams } from "react-router";

import publicApi from "apis/public";

import { ParticipantContext } from "../../../contexts/ParticipantContext";

const Attempt = () => {
  const [questions, setQuestions] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [loading, setLoading] = useState(true);
  const { participantData, slugVerified } = useContext(ParticipantContext);
  const { slug } = useParams();
  const history = useHistory();
  const fetchQuestion = async () => {
    try {
      const attemptResponse = await publicApi.showAnswers(
        participantData?.attempt_id
      );
      if (attemptResponse.data?.attempt?.submitted) {
        history.push(`/public/${slug}/attempt/quiz-result`);
      }
      const response = await publicApi.showQuestion(slug);
      setQuestions(response.data?.quiz?.questions);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await publicApi.createAttemptAnswers({
        answers: {
          attempt_id: participantData?.attempt_id,
          list: Object.keys(selectedAnswer).map(item => {
            return {
              answer: selectedAnswer[item],
              question_id: item,
            };
          }),
        },
      });
      history.push(`/public/${slug}/attempt/quiz-result`);
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
      fetchQuestion();
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
      {questions?.map((data, index) => (
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
                <div key={i} className="bg-gray-100 p-2 mt-2 self-stretch">
                  <Radio.Item
                    label={option.content}
                    value={option.id}
                    name={data.id}
                    onClick={() =>
                      setSelectedAnswer({
                        ...selectedAnswer,
                        [data.id]: option.id,
                      })
                    }
                  />
                </div>
              ))}
            </Radio>
          </div>
        </div>
      ))}
      <Button
        label="Submit"
        className="self-end"
        onClick={handleSubmit}
        loading={loading}
        disabled={loading}
      />
    </div>
  );
};
export default Attempt;
