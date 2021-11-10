import axios from "axios";

const create = payload => axios.post("/questions", payload);
const update = (id, payload) => axios.put(`/questions/${id}`, payload);
const destroy = id => axios.delete(`/questions/${id}`);

const questionApi = {
  create,
  update,
  destroy,
};

export default questionApi;
