import React, { useEffect, useState } from "react";

import { Download } from "neetoicons";
import { PageLoader, Typography, Button } from "neetoui";

import reportApi from "apis/report";

import Loading from "./Loading";
import Ready from "./Ready";
import Table from "./Table";

const Report = () => {
  const [report, setReport] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();
  const [jobId, setJobId] = useState();

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await reportApi.fetch();
      setReport(
        response.data?.reports?.sort((a, b) => (a.title > b.title ? 1 : -1))
      );
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleExport = async () => {
    try {
      setStatus("started");
      const response = await reportApi.exportReport();
      setJobId(response.data?.jid);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDownload = async () => {
    window.location.href = `/export_download.xlsx?id=${jobId}`;
  };

  useEffect(() => {
    if (jobId) {
      const intervalId = setInterval(async () => {
        try {
          const response = await reportApi.exportStatus(jobId);
          if (response.data.status === "complete") {
            setStatus("completed");
            clearInterval(intervalId);
          }
        } catch (error) {
          logger.error(error);
        }
      }, 2000);
    }
  }, [jobId]);

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  if (status === "started") {
    return <Loading />;
  }

  if (status === "completed") {
    return <Ready handleDownload={handleDownload} />;
  }

  return (
    <div className="flex flex-col w-full py-4 md:px-5 px-4 space-y-6">
      {report?.length ? (
        <>
          <div className="flex space-x-2">
            <Typography style="h3" className="flex-grow text-gray-700">
              Report
            </Typography>

            <Button
              label="Download"
              icon={() => <Download size={16} />}
              onClick={handleExport}
              className="md:self-end self-center space-x-2"
            />
          </div>
          <Table reports={report} />
        </>
      ) : (
        <Typography
          style="h3"
          className="mt-16 md:mt-40 neeto-ui-text-gray-300 self-center"
        >
          No Attempts
        </Typography>
      )}
    </div>
  );
};

export default Report;
