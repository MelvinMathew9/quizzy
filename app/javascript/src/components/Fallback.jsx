import React from "react";

import { Home } from "neetoicons";
import { Typography, Button } from "neetoui";

const Fallback = () => {
  return (
    <div className="h-screen flex flex-col space-y-4 overflow-auto justify-center items-center">
      <Typography className="font-semibold w-64 text-center" style="h3">
        You have landed somwhere unknown.
      </Typography>
      <Button
        iconPosition="left"
        size="large"
        to="/"
        icon={Home}
        label="Take me home"
      />
    </div>
  );
};

export default Fallback;
