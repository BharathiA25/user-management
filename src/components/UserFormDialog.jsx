import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";

export default function UserFormDialog({ open, onClose, onSave, editData }) {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    if (editData) setUser(editData);
  }, [editData]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editData ? "Edit User" : "Add User"}</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          label="Age"
          fullWidth
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
        />
        <TextField
          label="course"
          fullWidth
          value={user.course}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(user)}>
          {editData ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
