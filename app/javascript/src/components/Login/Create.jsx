import React from "react";

import { Input, Button, Typography } from "neetoui";

const Create = ({ handleSubmit, setEmail, setPassword, loading }) => {
  return (
    <div className="flex items-center justify-center mt-40 space-y-2  px-4">
      <div className="w-full max-w-md flex flex-col space-y-6 neeto-ui-shadow-xs p-5">
        <Typography className="self-center" style="h2">
          Login
        </Typography>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="sam@example.com"
            required={true}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            required={true}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            label="Submit"
            fullWidth={true}
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Create;
