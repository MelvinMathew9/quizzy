import React from "react";

import { Input, Button, Typography } from "neetoui";

const Create = ({
  handleSubmit,
  setEmail,
  setFirstName,
  setLastName,
  firstName,
  lastName,
  title,
  email,
  loading,
}) => {
  return (
    <div className="flex items-center justify-center mt-40 space-y-2  px-4">
      <div className="w-full max-w-md flex flex-col space-y-6 neeto-ui-shadow-xs p-5">
        <Typography className="self-center" style="h2">
          Welcome to {title} Quiz
        </Typography>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="First Name"
            placeholder="Eve"
            required={true}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            placeholder="Smith"
            required={true}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            placeholder="eve@example.com"
            required={true}
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            label="Submit"
            fullWidth={true}
            loading={loading}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Create;
