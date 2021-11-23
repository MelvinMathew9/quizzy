import axios from "axios";

const fetch = () => axios.get("/reports");
const exportReport = () => axios.get("/reports/export");
const exportStatus = id => axios.get(`/reports/export_status?id=${id}`);

const reportApi = {
  fetch,
  exportReport,
  exportStatus,
};

export default reportApi;
