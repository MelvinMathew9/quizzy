import React from "react";

import { Typography, Button } from "neetoui";

const Ready = ({ handleDownload }) => {
  return (
    <div className="flex flex-col w-full py-4 md:px-5 px-4">
      <Typography style="h3" className="text-gray-700">
        Report
      </Typography>
      <div className="mt-64 self-center flex flex-col justify-center space-y-4">
        <Typography style="h3" className="text-gray-700">
          Report is now ready for Download
        </Typography>
        <Button
          label="Download report"
          className="self-center"
          onClick={handleDownload}
        />
      </div>
    </div>
  );
};
export default Ready;
