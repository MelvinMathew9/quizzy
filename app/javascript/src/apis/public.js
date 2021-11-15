import axios from "axios";

const showQuiz = slug => axios.get(`/public/quizzes/${slug}`);
const showQuestion = slug => axios.get(`/public/questions/${slug}`);

const publicApi = {
  showQuiz,
  showQuestion,
};

export default publicApi;
