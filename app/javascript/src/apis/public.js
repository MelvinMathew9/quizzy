import axios from "axios";

const showQuiz = slug => axios.get(`/public/quizzes/${slug}`);
const showQuestion = slug => axios.get(`/public/questions/${slug}`);
const createUser = payload => axios.post("/public/users", payload);
const createAttempt = payload => axios.post("/public/attempts", payload);
const createAttemptAnswers = payload =>
  axios.post("/public/attempt_answers", payload);

const publicApi = {
  showQuiz,
  showQuestion,
  createUser,
  createAttempt,
  createAttemptAnswers,
};

export default publicApi;
