import React, { useEffect, useState } from "react";

import { PageLoader, Typography } from "neetoui";

import reportApi from "apis/report";

import Table from "./Table";

const Report = () => {
  const [report, setReport] = useState();
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="flex flex-col w-full py-4 md:px-5 px-4 space-y-6">
      {report?.length ? (
        <Table reports={report} />
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
