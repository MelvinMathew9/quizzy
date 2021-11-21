import axios from "axios";

const create = payload => axios.post("/questions", payload);
const update = (id, payload) => axios.put(`/questions/${id}`, payload);
const destroy = id => axios.delete(`/questions/${id}`);
const show = id => axios.get(`/questions/${id}`);

const questionApi = {
  create,
  update,
  destroy,
  show,
};

export default questionApi;
