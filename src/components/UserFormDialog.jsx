import React, { useState, useEffect } from "react";
// MUI components
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button,
  MenuItem
} from "@mui/material";

export default function UserFormDialog({ open, onClose, onSave, editData }) {
  const [user, setUser] = useState({ id: "", userName: "", userEmail: "", age: "", course: "" , userMobileNo: "" });
  const [errors, setErrors] = useState({ userName: "", userEmail: "", age: "", course: "" , userMobileNo: "" });
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
        id: editData.id || editData._id || editData,
        userName: editData.userName,
        userEmail: editData.userEmail,
        age: editData.age,
        course: editData.course,
        userMobileNo: editData.userMobileNo,
      });
      setErrors({ userName: "", userEmail: "", age: "", course: "", userMobileNo: "" });
    } else {
      setUser({ id: "", userName: "", userEmail: "", age: "", course: "", userMobileNo: "" });
    }
  }, [editData, open]);

  const validate = () => {
    let newErrors = {};
    if (!user.userName.trim()) newErrors.name = "Name is required";
    if(!user.userEmail.trim()) newErrors.email = "Email is required"; 
    if(!user.age) newErrors.age = "Age is required";
    if(!user.course) newErrors.course = "Course is required";
    if(!user.userMobileNo.trim()) newErrors.phone = "Phone number is required";
    else if(user.userMobileNo.trim().length !== 10) newErrors.phone = "Phone number must be 10 digits";

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
          value={user.userName}
          onChange={handleChange("userName")}
          error={Boolean(errors.userName)}
          helperText={errors.userName}
/>

        <TextField
          placeholder="Email"
          variant="outlined"
          type="email"
          sx={{ flexBasis: 'calc(60% - 10px)',...textFieldStyle }}
          value={user.userEmail}
          onChange={handleChange("userEmail")}
          error={Boolean(errors.userEmail)}
          helperText={errors.userEmail}
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
          {/* Added phone number field */}
          <TextField 
          placeholder="Phone Number"
          variant="outlined"
          type="text"
          sx={{ flexBasis: '100%',...textFieldStyle }}
          value={user.userMobileNo}
            onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, "");
            setUser({...user, userMobileNo:onlyNums});
         }}
          error={Boolean(errors.userMobileNo)}
          helperText={errors.userMobileNo}
        /> 
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
