import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function UserNav() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">User Management</Typography>
      </Toolbar>
    </AppBar>
  );
}
