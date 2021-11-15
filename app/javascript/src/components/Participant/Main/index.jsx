import React, { useState } from "react";

import Attempt from "../Attempt";
import Login from "../Login";

const Main = () => {
  const [data, setData] = useState();
  if (data) {
    return <Attempt />;
  }

  return (
    <div>
      <Login setData={setData} />
    </div>
  );
};

export default Main;
