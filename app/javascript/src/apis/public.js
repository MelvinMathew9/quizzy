import axios from "axios";

const showQuiz = slug => axios.get(`/public/quizzes/${slug}`);
const showQuestion = slug => axios.get(`/public/questions/${slug}`);
const createUser = payload => axios.post("/public/users", payload);
const createAttempt = payload => axios.post("/public/attempts", payload);
const createAttemptAnswers = payload =>
  axios.post("/public/attempt_answers", payload);
const showAnswers = id => axios.get(`/public/attempts/${id}`);
const verifySlug = slug => axios.get(`/public/quizzes/${slug}/slug_verify`);

const publicApi = {
  showQuiz,
  showQuestion,
  createUser,
  createAttempt,
  createAttemptAnswers,
  showAnswers,
  verifySlug,
};

export default publicApi;
