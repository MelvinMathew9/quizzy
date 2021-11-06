import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const fetch = () => axios.get("/quizzes");
const show = slug => axios.get(`/quizzes/${slug}`);
const destroy = slug => axios.delete(`/quizzes/${slug}`);
const update = (slug, payload) => axios.put(`/quizzes/${slug}`, payload);

const quizApi = {
  create,
  fetch,
  update,
  show,
  destroy,
};

export default quizApi;
