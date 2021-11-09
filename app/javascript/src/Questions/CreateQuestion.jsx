import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Plus, Minus } from "neetoicons";
import { Typography, Button, Textarea, Input, Select } from "neetoui";

import Container from "../components/Conatiner";

const CreateQuestion = () => {
  const [options, setOptions] = useState([1, 2]);

  const handleMinus = () => {
    setOptions(options => options.slice(0, options.length - 1));
  };
  return (
    <Container>
      <div className="neeto-ui-shadow-s m-4 p-6">
        <Formik
          initialValues={{ option1: "", option2: "", option3: "", option4: "" }}
        >
          {() => (
            <Form>
              <div className="space-y-4 flex flex-col">
                <Typography style="h3" className="text-gray-500 self-center">
                  Add New Question
                </Typography>
                <Textarea
                  label="Question"
                  placeholder="Add question"
                  name="question"
                />
                {options.map((item, index) => {
                  if (item <= 2) {
                    return (
                      <Input
                        key={index}
                        label={`Option ${index + 1}`}
                        name={`option${index + 1}`}
                        className="flex-grow"
                        placeholder={`Add option ${index + 1}`}
                      />
                    );
                  }

                  return (
                    <div className="flex items-end space-x-2" key={index + 1}>
                      <Input
                        label={`Option ${index + 1}`}
                        name={`option${index + 1}`}
                        className="flex-grow"
                        placeholder={`Add option ${index + 1}`}
                      />
                      <Button icon={() => <Minus />} onClick={handleMinus} />
                    </div>
                  );
                })}
                {options.length < 4 && (
                  <Button
                    iconPosition="left"
                    label="Add option"
                    onClick={() =>
                      setOptions([...options, options[options.length - 1] + 1])
                    }
                    icon={() => <Plus size={16} />}
                    style="link"
                    className="self-start"
                  />
                )}

                <Select
                  name="answer"
                  placeholder="Select Answer"
                  required
                  size="small"
                />
                <div className="flex space-x-2">
                  <Button label="Submit" />
                  <Button label="Go Back" style="secondary" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default CreateQuestion;
