import React from "react";

import { Radio, Typography, Tag } from "neetoui";

const Attempt = ({ data, index }) => {
  return (
    <div className="neeto-ui-shadow-s my-2">
      <Tag
        indicatorColor="gray"
        label={`Question ${index + 1}`}
        className="self-start"
      />
      <div className="flex flex-col px-6 py-2 ">
        <Typography style="h3" className="flex-grow">
          {data?.question}
        </Typography>
        <Radio
          label="Select Answer"
          className="space-y-2 my-2"
          containerClassName="w-full"
          stacked
        >
          {data.options?.map((option, i) => (
            <div key={i} className="bg-gray-100 p-2 mt-2 self-stretch">
              <Radio.Item
                label={option.content}
                value={option.content}
                name={`answer${index + 1}`}
              />
            </div>
          ))}
        </Radio>
      </div>
    </div>
  );
};
export default Attempt;
