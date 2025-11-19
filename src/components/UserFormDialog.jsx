import React, { useState, useEffect } from "react";
// MUI components
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";
// UserFormDialog component for adding/editing a user
export default function UserFormDialog({ open, onClose, onSave, editData }) {
  const [user, setUser] = useState({ name: "", email: "" , age: "", course: ""});
// Populate form fields if editData is provided
  useEffect(() => {
    if (editData) {
      setUser(editData);
    }
    else{
      setUser({ name: "", email: "" , age: "", course: ""});
    }
  }, [editData , open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editData ? "Edit User" : "Add User"}</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          type="text"
          fullWidth
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          label="Age"
          type="number"
          fullWidth
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
        />
        <TextField
          label="course"
          type="text"
          fullWidth
          value={user.course}
          onChange={(e) => setUser({ ...user, course: e.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
        variant="contained" 
        onClick={() => {
          if(!user.name.trim() || !user.email.trim() || !user.age || !user.course){
            alert("All fields are required");
            return;
          }
          onSave(user);
        }}>
          {editData ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
