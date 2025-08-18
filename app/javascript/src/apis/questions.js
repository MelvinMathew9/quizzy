import axios from "axios";

const create = payload => axios.post("/api/v1/questions", payload);
const update = (id, payload) => axios.put(`/api/v1/questions/${id}`, payload);
const destroy = id => axios.delete(`/api/v1/questions/${id}`);
const show = id => axios.get(`/api/v1/questions/${id}`);

const questionApi = {
  create,
  update,
  destroy,
  show,
};

export default questionApi;
