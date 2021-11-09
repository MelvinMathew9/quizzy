import React, { useEffect, useState } from "react";

import { Formik, Form, FieldArray } from "formik";
import { Plus, Minus } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";
import { useParams } from "react-router";

import questionApi from "apis/questions";
import quizApi from "apis/quiz";

import Container from "../../Conatiner";

const CreateQuestion = () => {
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
  };
  return (
    <Container>
      <div className="neeto-ui-shadow-s m-4 p-6">
        <Formik
          initialValues={{
            answer: "",
            question: "",
            options: ["", ""],
          }}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <div className="space-y-4 flex flex-col">
              <Typography style="h3" className="self-center">
                Add New Question
              </Typography>
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
                  name="answer"
                  options={values.options.map(option => {
                    return { label: option, value: option };
                  })}
                  placeholder="Select correct option"
                />

                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    label="Submit"
                    loading={isSubmitting}
                    size="small"
                    disabled={isSubmitting}
                  />
                  <Button
                    label="Go back"
                    to={`/quizzes/questions/${slug}`}
                    style="secondary"
                  />
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default CreateQuestion;
