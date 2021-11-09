import * as yup from "yup";

const FORM_INITIAL_VALUES = {
  answer: "",
  question: "",
  options: ["", ""],
};

const FORM_VALIDATIONS = yup.object({
  question: yup.string().required("Question is required"),
  options: yup.array().min(2, "Minimum 2 options"),
  answer: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required("Answer is required"),
});

export { FORM_INITIAL_VALUES, FORM_VALIDATIONS };
