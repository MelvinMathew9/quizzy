import axios from "axios";

const create = payload => axios.post("/public/users", payload);
const userApi = {
  create,
};

export default userApi;
