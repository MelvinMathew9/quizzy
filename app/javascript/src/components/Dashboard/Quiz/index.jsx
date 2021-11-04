import React from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

const Quiz = () => {
  return (
    <>
      <div className="flex flex-col w-full py-10 md:px-5 px-4 space-y-6">
        <Button
          label="Add new quiz"
          iconPosition="left"
          icon={() => <Plus size={18} />}
          className="md:self-end self-center"
        />
        <Typography style="h3" className="neeto-ui-text-gray-300 self-center">
          You have not created any quiz
        </Typography>
      </div>
    </>
  );
};

export default Quiz;
