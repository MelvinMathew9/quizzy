import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const fetch = () => axios.get("/quizzes");
const show = id => axios.get(`/quizzes/${id}`);
const destroy = id => axios.delete(`/quizzes/${id}`);
const update = (id, payload) => axios.put(`/quizzes/${id}`, payload);
const publish = id => axios.post(`/quizzes/${id}/publish`);

const quizApi = {
  create,
  fetch,
  update,
  show,
  destroy,
  publish,
};

export default quizApi;
