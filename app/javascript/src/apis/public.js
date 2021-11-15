import axios from "axios";

const showQuiz = slug => axios.get(`/public/quizzes/${slug}`);
const showQuestion = slug => axios.get(`/public/questions/${slug}`);
const createUser = payload => axios.post("/public/users", payload);

const publicApi = {
  showQuiz,
  showQuestion,
  createUser,
};

export default publicApi;
