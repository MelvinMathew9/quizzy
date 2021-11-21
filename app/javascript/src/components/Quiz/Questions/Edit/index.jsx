import React, { useEffect, useState } from "react";

import { Formik, Form, FieldArray } from "formik";
import { Plus, Minus, LeftArrowCircle } from "neetoicons";
import { Typography, Button, PageLoader } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";
import toast from "react-hot-toast";
import { useHistory, useLocation, useParams } from "react-router";

import questionApi from "apis/questions";
import Container from "common/Container";

import { FORM_INITIAL_VALUES, FORM_VALIDATIONS } from "../constants";

const EditQuestion = () => {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState({});
  const history = useHistory();
  const { question_id } = useParams();
  const locations = useLocation();
  const quiz_id = locations.state.quizId;
  let defaultValues = FORM_INITIAL_VALUES;
  defaultValues = {
    answer: question?.options
      ? {
          label: question?.options.find(option => option.is_answer).content,
          value: question?.options.find(option => option.is_answer).content,
        }
      : "",
    question: question?.question ? question?.question : "",
    options: question?.options
      ? question?.options.map(option => option.content)
      : ["", ""],
  };
  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await questionApi.show(question_id);
      setQuestion(response.data?.question);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleSubmit = async values => {
    if (values.options.includes(values?.answer?.value)) {
      try {
        await questionApi.update(question_id, {
          questions: {
            question: values?.question,
            quiz_id: quiz_id,
            options_attributes: values?.options?.map(option => {
              return {
                content: option,
                is_answer: option === values?.answer?.value,
              };
            }),
          },
        });
        history.push(`/quizzes/${quiz_id}/show`);
      } catch (error) {
        logger.error(error);
      }
    } else {
      toast.error("Invalid option");
    }
  };
  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="max-w-lg mx-auto py-10 neeto-ui-shadow-xs px-4 space-y-4">
        <Formik
          initialValues={defaultValues}
          onSubmit={handleSubmit}
          validationSchema={FORM_VALIDATIONS}
        >
          {({ values, isSubmitting }) => (
            <div className="space-y-4 flex flex-col">
              <div className="flex">
                <Typography style="h3" className="flex-grow">
                  Add New Question
                </Typography>
                <Button
                  iconPosition="left"
                  style="text"
                  tooltipProps={{
                    content: "Go Back",
                    position: "right",
                  }}
                  to={`/quizzes/${quiz_id}/show`}
                  icon={LeftArrowCircle}
                />
              </div>
              <Textarea
                label="Question"
                placeholder="Add question"
                name="question"
              />
              <Form className="space-y-4">
                <FieldArray
                  name="options"
                  render={arrayHelpers => (
                    <div className="space-y-4">
                      {values?.options?.map((_, index) => {
                        if (index < 2) {
                          return (
                            <Input
                              key={index}
                              label={`Option ${index + 1}`}
                              name={`options.${index}`}
                              className="flex-grow"
                              placeholder={`Add option ${index + 1}`}
                            />
                          );
                        }

                        return (
                          <div
                            className="flex items-end space-x-2"
                            key={index + 1}
                          >
                            <Input
                              label={`Option ${index + 1}`}
                              name={`options.${index}`}
                              className="flex-grow"
                              placeholder={`Add option ${index + 1}`}
                            />
                            <Button
                              icon={() => <Minus />}
                              onClick={() => arrayHelpers.remove(index)}
                            />
                          </div>
                        );
                      })}
                      {values?.options?.length < 4 && (
                        <Button
                          iconPosition="left"
                          label="Add option"
                          onClick={() => arrayHelpers.push("")}
                          icon={() => <Plus size={16} />}
                          style="link"
                          className="self-start"
                        />
                      )}
                    </div>
                  )}
                />

                <Select
                  label="Answer"
                  name="answer"
                  options={values?.options?.map(option => {
                    return { label: option, value: option };
                  })}
                  placeholder="Select correct option"
                />

                <Button
                  type="submit"
                  label="Submit"
                  loading={isSubmitting}
                  size="large"
                  fullWidth={true}
                  disabled={isSubmitting}
                />
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default EditQuestion;
