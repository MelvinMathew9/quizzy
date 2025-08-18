import axios from "axios";

const create = payload => axios.post("/api/v1/quizzes", payload);
const fetch = () => axios.get("/api/v1/quizzes");
const show = id => axios.get(`/api/v1/quizzes/${id}`);
const destroy = id => axios.delete(`/api/v1/quizzes/${id}`);
const update = (id, payload) => axios.put(`/api/v1/quizzes/${id}`, payload);
const publish = id => axios.post(`/api/v1/quizzes/${id}/publish`);

const quizApi = {
  create,
  fetch,
  update,
  show,
  destroy,
  publish,
};

export default quizApi;
