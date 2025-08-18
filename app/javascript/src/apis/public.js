import axios from "axios";

const showQuiz = slug => axios.get(`/api/v1/public/quizzes/${slug}`);
const showQuestion = slug => axios.get(`/api/v1/public/questions/${slug}`);
const createUser = payload => axios.post("/api/v1/public/users", payload);
const createAttempt = payload => axios.post("/api/v1/public/attempts", payload);
const createAttemptAnswers = payload =>
  axios.post("/api/v1/public/attempt_answers", payload);
const showAnswers = id => axios.get(`/api/v1/public/attempts/${id}`);
const verifySlug = slug =>
  axios.get(`/api/v1/public/quizzes/${slug}/slug_verify`);

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
