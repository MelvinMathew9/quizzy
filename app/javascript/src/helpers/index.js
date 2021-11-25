const setAnswerFieldValues = options =>
  options
    .filter(option => option)
    .map(option => {
      return { label: option, value: option };
    });

const handleDeleteOptions = (values, arrayHelpers, index) => {
  {
    values.answer = {};
    arrayHelpers.remove(index);
  }
};

export { setAnswerFieldValues, handleDeleteOptions };
