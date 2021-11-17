import axios from "axios";

const fetch = () => axios.get("/reports");

const reportApi = {
  fetch,
};

export default reportApi;
