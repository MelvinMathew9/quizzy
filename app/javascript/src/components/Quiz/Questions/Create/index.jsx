import React, { useEffect, useState } from "react";

import { Formik, Form, FieldArray } from "formik";
import { Plus, Minus, LeftArrowCircle } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";
import toast from "react-hot-toast";
import { useParams } from "react-router";

import questionApi from "apis/questions";
import quizApi from "apis/quiz";

import Container from "../../../Common/Conatiner";
import { FORM_INITIAL_VALUES, FORM_VALIDATIONS } from "../constants";

const Create = () => {
  const [id, setId] = useState(null);
  const { slug } = useParams();

  const fetchQuiz = async () => {
    try {
      const response = await quizApi.show(slug);
      setId(response.data.quiz.id);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleSubmit = async values => {
    if (values.options.includes(values?.answer?.value)) {
      try {
        await questionApi.create({
          questions: {
            question: values.question,
            quiz_id: id,
            list: values.options.map(option => {
              return {
                content: option,
                is_answer: option === values?.answer?.value,
              };
            }),
          },
        });
      } catch (error) {
        logger.error(error);
      }
    } else {
      toast.error("Invalid option");
    }
  };

  return (
    <Container>
      <div className="max-w-lg mx-auto py-10 neeto-ui-shadow-xs px-4 space-y-4">
        <Formik
          initialValues={FORM_INITIAL_VALUES}
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
                    content: "Go Bak",
                    position: "right",
                  }}
                  to={`/quizzes/questions/${slug}`}
                  icon={() => <LeftArrowCircle size={20} />}
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
                      {values.options.map((_, index) => {
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
                      {values.options.length < 4 && (
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
                  options={values.options.map(option => {
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

export default Create;
