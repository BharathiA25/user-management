import React, { useState, useEffect } from "react";
// MUI components
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button,
  MenuItem
} from "@mui/material";

export default function UserFormDialog({ open, onClose, onSave, editData }) {
  const [user, setUser] = useState({ id: "", name: "", email: "", age: "", course: "" });
  const [errors, setErrors] = useState({ name: "", email: "", age: "", course: "" });
  const textFieldStyle ={"& .MuiOutlinedInput-root": {
              // set radius for the input wrapper (affects background clipping)
              borderRadius: "10px",
        
      // set radius for the visible outline
            "> fieldset": {
            borderRadius: "15px",
            
            },
    }}; 
    console.log(user);
    
  // Populate form fields if editData is provided (preserve id explicitly)
  useEffect(() => {
    if (editData) {
      setUser({
        id: editData.id ?? "",
        name: editData.name ?? "",
        email: editData.email ?? "",
        age: editData.age ?? "",
        course: editData.course ?? "",
      });
      setErrors({ name: "", email: "", age: "", course: "" });
    } else {
      setUser({ id: "", name: "", email: "", age: "", course: "" });
      setErrors({ name: "", email: "", age: "", course: "" });
    }
  }, [editData, open]);

  const validate = () => {
    let newErrors = {};
    if (!user.name || !user.name.toString().trim()) newErrors.name = "Name is required";
    if (!user.email || !user.email.toString().trim()) newErrors.email = "Email is required";
    if (!user.age && user.age !== 0) newErrors.age = "Age is required";
    if (!user.course || !user.course.toString().trim()) newErrors.course = "Course is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} className="zoom-in"
      sx={{
        "& .MuiDialog-paper": {
          boxSizing: "border-box",
          width: "700px",
          padding: 0,
          borderRadius: "20px",
          overflow: "hidden",
          background: "#ffffffff",
        },
      }}>
      <DialogTitle sx={{ textAlign: 'center', color: 'white', fontWeight: '600', backgroundColor: editData ? '#cbc54eff' : '#0bb416aa' }}>
        {editData ? "Edit User" : "Add User"}
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
        <TextField
          variant="outlined"                // make sure it's outlined
          placeholder="Name"
          type="text"
          sx={{
          flexBasis: "40%",
          ...textFieldStyle
            }}
          value={user.name}
          onChange={handleChange("name")}
          error={Boolean(errors.name)}
          helperText={errors.name}
/>

        <TextField
          placeholder="Email"
          variant="outlined"
          type="email"
          sx={{ flexBasis: 'calc(60% - 10px)',...textFieldStyle }}
          value={user.email}
          onChange={handleChange("email")}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          placeholder="Age"
          variant="outlined"
          type="number"
          sx={{ flexBasis: '30%',...textFieldStyle }}
          value={user.age}
          onChange={handleChange("age")}
          error={Boolean(errors.age)}
          helperText={errors.age}
        />
        <TextField select
          variant="outlined"
          type="text"
          sx={{ flexBasis: 'calc(70% - 10px)', ...textFieldStyle }}
          value={user.course}
          onChange={handleChange("course")}
          error={Boolean(errors.course)}
          helperText={errors.course}
          SelectProps={{
            displayEmpty : true,
          }}
        >
          <MenuItem value="" disabled >
          <span style={{ color: "#999" }}>Select course</span></MenuItem>
           <MenuItem value="C">C</MenuItem>
          <MenuItem value="C++">C++</MenuItem>
          <MenuItem value="Java">Java</MenuItem>
          <MenuItem value="Python">Python</MenuItem>
          <MenuItem value="JavaScript">JavaScript</MenuItem>
          </TextField> 
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} className="bounce" sx={{ color: 'red',backgroundColor:'#ffff' ,textTransform:'capitalize'} }>Cancel</Button>
        <Button
          variant="contained"
          className="bounce"
          sx={{ color: 'white', backgroundColor: editData ? '#cbc54eff' : '#0bb416aa' ,borderRadius : '25px', textTransform:'capitalize'}}
          onClick={() => {
            if (!validate()) return;
            // Pass user object (includes id when editing)
            onSave(user);
          }}>
          {editData ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
