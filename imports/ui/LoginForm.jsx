import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { LoginWithGithub } from './LoginWithGithub';

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ textAlign: "center", flexDirection: "column",display:"flex", gap:3 }}>
      <LoginWithGithub />
      <TextField
        id="standard-basic"
        label="Username"
        variant="standard"
        required
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id="standard-password-input"
        label="Password"
        variant="standard"
        type="password"
        required
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
      <Button type="submit" variant="contained">Log In</Button>
      </div>
    </Box>
  );
};
