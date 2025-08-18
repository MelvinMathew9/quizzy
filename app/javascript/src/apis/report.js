import axios from "axios";

const fetch = () => axios.get("/api/v1/reports");
const exportReport = () => axios.get("/api/v1/reports/export");
const exportStatus = id => axios.get(`/api/v1/reports/export_status?id=${id}`);
const exportDownload = jobId =>
  axios.get(`/api/v1/reports/export_download.xlsx?id=${jobId}`, {
    responseType: "blob",
  });

const reportApi = {
  fetch,
  exportReport,
  exportStatus,
  exportDownload,
};

export default reportApi;
