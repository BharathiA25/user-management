import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function UserNav() {
  return (
    //Nav Bar that displays the title as "User Management" by using MUI AppBar and Toolbar components
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">User Management</Typography>
      </Toolbar>
    </AppBar>
  );
}
