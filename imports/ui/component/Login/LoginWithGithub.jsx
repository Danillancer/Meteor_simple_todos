import React from 'react';
import { Meteor } from 'meteor/meteor';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from '@mui/material';

export const LoginWithGithub = () => {
  const handleGithubLogin = () => {
    Meteor.loginWithGithub({
      requestPermissions: ['user'],
      loginStyle: 'popup',
    });
  };

  return (
    <Button type="button" variant="outlined" onClick={handleGithubLogin} sx={{display:"flex", alignItems: "center", p:0}}>
      <p>Login with Github</p>
      <GitHubIcon/>
    </Button> 
  );
};