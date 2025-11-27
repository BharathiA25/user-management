import React, { useState, useEffect } from "react";
// MUI components
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";
// UserFormDialog component for adding/editing a user
export default function UserFormDialog({ open, onClose, onSave, editData }) {
  const [user, setUser] = useState({ name: "", email: "" , age: "", course: ""});

  const [errors , setErrors] = useState({name : "", email : "" , age: "" , course: ""});
  // Populate form fields if editData is provided
  useEffect(() => {
    if (editData) {
      setUser(editData);
      setErrors({ name: "", email: "", age: "", course: "" });
    }
    else{
      setUser({ name: "", email: "" , age: "", course: ""});
      setErrors({ name: "", email: "", age: "", course: "" });
    }
  }, [editData , open]);

  const validate = () => {
    let newErrors = {};

    if(!user.name.trim())newErrors.name ="Name is required";
    if(!user.email.trim())newErrors.email ="Email is required";
    if(!user.age)newErrors.age ="Age is required";
    if(!user.course.trim())newErrors.course ="Course is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  return (
    <Dialog open={open} onClose={onClose} 
    sx={{"& .MuiDialog-paper": {
      boxSizing: "border-box",
      width: "700px",
      padding: 0,
      borderRadius: "20px",
      overflow: "hidden",
      background: "#ffffffff",
    },}}>
      <DialogTitle 
      sx={{textAlign:'center', color:'white' , fontWeight:'600',backgroundColor:editData?'#cbc54eff' : '#0bb416aa'}}>{editData ? "Edit User" : "Add User"}</DialogTitle>

      <DialogContent sx={{display:'flex',gap:'10px',flexWrap:'wrap', marginTop:'20px' }}>
        <TextField
          placeholder="Name"
          type="text"
          sx={{flexBasis:'40%'}}
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField 
          placeholder="Email"
          type="email"
          sx={{flexBasis:'calc(60% - 10px)'}}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          error ={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          placeholder="Age"
          type="number"
          sx={{flexBasis:'20%'}}
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          error={Boolean(errors.age)}
          helperText={errors.age}
        />
        <TextField
          placeholder="Course"
          type="text"
          sx={{flexBasis:'calc(80% - 10px)'}}
          value={user.course}
          onChange={(e) => setUser({ ...user, course: e.target.value })}
          error={Boolean(errors.course)}
          helperText={errors.course}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{color:'red'}}>Cancel</Button>
        <Button 
        variant="contained" 
        sx={{color:'white', backgroundColor:editData?'#cbc54eff' : '#0bb416aa'}}
        onClick={() => {
          if(!validate())return;
          onSave(user);
        }}>
          {editData ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
