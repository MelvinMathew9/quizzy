import React, { useState } from "react";

import Create from "./Create";

const Login = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    logger.info(email, firstName, lastName, setLoading);
  };
  return (
    <Create
      setEmail={setEmail}
      setFirstName={setFirstName}
      setLastName={setLastName}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
