import axios from "axios";

const fetch = () => axios.get("/reports");
const exportReport = () => axios.get("/export");
const exportStatus = id => axios.get(`/export_status?id=${id}`);

const reportApi = {
  fetch,
  exportReport,
  exportStatus,
};

export default reportApi;
