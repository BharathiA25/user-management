import React, { useState } from "react";
// MUI components
import {
  IconButton, Paper, Button, Toolbar, Typography, TextField,
  Box, Grid, Card, CardContent, CardActions
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import {Pagination} from "@mui/material";


export default function UserList({ users, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const[currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const q = (search || "").toLowerCase();

  const filteredUsers = (users || []).filter((u) =>
    (u.userName ?? "").toLowerCase().includes(q) ||
    (u.userEmail ?? "").toLowerCase().includes(q) ||
    (u.course ?? "").toLowerCase().includes(q)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <Box sx={{ padding: '30px', backgroundColor: '#dc202094', height: '90vh',display:'flex',justifyContent:'center',alignItems:'center' }}>
      <Paper elevation={6} sx={{ height: '70vh', boxSizing: 'border-box', borderRadius: '40px',width:'100%',padding:'20px' }}>
          

        <Toolbar sx={{ display: "flex", justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: '700' }}>
            User Management
          </Typography>
          <TextField
            placeholder="Search students..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#fff8f8ff" }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "30px"
              }
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: "30px",
              width: "40%",
              bgcolor: "#dc202074",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                color:"white"
              }
            }}
          />

          <Button
            sx={{
              textTransform: 'capitalize',
              backgroundColor: '#99939324',
              borderRadius: '20px'
            }}
            onClick={onAdd}
          >
            Add User +
          </Button>
          </Toolbar>

        {currentUsers.length === 0 ? (
          <Box sx={{ textAlign: 'center', padding: '40px 0', color: '#555' }}>
            <Typography variant="h6" fontWeight={600}>
              No students found
            </Typography>
            <Typography variant="body2">
              Try a different search keyword.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ padding: '10px' }}>
            {currentUsers.map((u , index) => (
              <Grid size={{xs:12,sm:6, md:4}}  key={index}>
                <Card
                  elevation={3}
                  className="zoom-in"
                  sx={{
                    borderRadius: '20px',
                    padding: '16px',
                    backgroundColor: '#369c3fa6',
                  }}
                >
                  <CardContent >
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                    <IconButton className="bounce" onClick={() => onEdit(u)} >
                      <EditIcon color="primary" />
                    </IconButton>

                    <IconButton className="bounce" onClick={() => onDelete(u.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </CardActions >
                    <Typography variant="h6"  sx={{color : 'white'}}>
                      Name:{u.userName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{color : 'white'}}>
                      Email: {u.userEmail}
                    </Typography>

                    <Typography variant="body2" color="text.secondary"sx={{color : 'white'}}>
                      Age: {u.age}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{color : 'white'}}>
                      Course: {u.course}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{color : 'white'}}>
                      Phone: {u.userMobileNo}
                    </Typography>
                  </CardContent>


                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Pagination 
              count={Math.ceil(filteredUsers.length/usersPerPage)}
              page={currentPage}
              onChange={(e,value)=>setCurrentPage(value)}
              color="primary"
              sx={{ display: "flex", justifyContent: "center", py: 5}}/>
      </Paper>
        
    </Box>
  );
}
3