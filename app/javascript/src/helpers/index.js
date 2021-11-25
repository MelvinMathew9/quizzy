export const setAnswerFieldValues = options =>
  options
    .filter(option => option)
    .map(option => {
      return { label: option, value: option };
    });
