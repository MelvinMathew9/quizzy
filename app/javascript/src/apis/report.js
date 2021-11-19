import axios from "axios";

const fetch = () => axios.get("/reports");
const exportReport = () => axios.get("/reports/export");
const exportStatus = () => axios.get("/reports/export_status");
const exportDownload = () => axios.get("/reports/export_download");

const reportApi = {
  fetch,
  exportReport,
  exportStatus,
  exportDownload,
};

export default reportApi;
