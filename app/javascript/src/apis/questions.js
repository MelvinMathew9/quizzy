import axios from "axios";

const create = payload => axios.post("/questions", payload);

const questionApi = {
  create,
};

export default questionApi;
