import React from "react";

import { Typography } from "neetoui";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="flex flex-col w-full py-4 md:px-5 px-4">
      <Typography style="h3" className="text-gray-700">
        Report
      </Typography>
      <div className="mt-64 self-center flex items-center space-x-4">
        <HashLoader size={30} />
        <Typography style="h3" className="text-gray-700">
          Your report is being prepared for downloading
        </Typography>
      </div>
    </div>
  );
};
export default Loading;
