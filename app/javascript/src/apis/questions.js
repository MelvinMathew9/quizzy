import axios from "axios";

const create = payload => axios.post("/questions", payload);
const update = (id, payload) => axios.put(`/questions/${id}`, payload);

const questionApi = {
  create,
  update,
};

export default questionApi;
