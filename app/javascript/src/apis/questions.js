import axios from "axios";

const create = payload => axios.post("/questions", payload);
const fetch = () => axios.get("/questions");

const questionApi = {
  fetch,
  create,
};

export default questionApi;
