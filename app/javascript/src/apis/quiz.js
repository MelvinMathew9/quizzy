import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const fetch = () => axios.get("/quizzes");

const quizApi = {
  create,
  fetch,
};

export default quizApi;
