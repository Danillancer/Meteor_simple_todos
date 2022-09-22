import { AppBar } from '@mui/material'
import React from 'react'

export const Header = ({user,logout}) => {
  return (
    <>
<AppBar
        position="static"
        sx={{
          mb: 2,
          pl: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h1>Welcome to Meteor!</h1>
        <div onClick={logout}>
          {user ? `${user.username || user.profile.name} 🚪` : ""}
        </div>
      </AppBar>
    </>
  )
}
