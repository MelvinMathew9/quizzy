import axios from "axios";

const fetch = () => axios.get("/reports");
const exportReport = () => axios.get("/reports/export");
const exportStatus = id => axios.get(`/reports/export_status?id=${id}`);
const exportDownload = jobId =>
  axios.get(`/reports/export_download.xlsx?id=${jobId}`, {
    responseType: "blob",
  });

const reportApi = {
  fetch,
  exportReport,
  exportStatus,
  exportDownload,
};

export default reportApi;
