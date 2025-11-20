import React, { useState } from "react";

// MUI components
import {
  IconButton, Paper, Button, Toolbar, Typography,TextField,
  Box, Grid, Card, CardContent, CardActions
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";


export default function UserList({ users, onAdd, onEdit, onDelete }) {
  const [search ,setSearch]=useState("");

  const filteredUsers = users.filter((u)=>
    u.name.toLowerCase().includes(search.toLowerCase())||
    u.email.toLowerCase().includes(search.toLowerCase())||
    u.course.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <Box sx={{ padding: '10px', backgroundColor: '#dc202094', height: '100vh', boxSizing: 'border-box' }}>
      <Paper elevation={6} sx={{ height: '80vh', overflowY: 'auto', boxSizing: 'border-box', borderRadius: '20px' }}>
<Toolbar sx={{ display: "flex", justifyContent: "center" }}>
  <TextField
    placeholder="Search students..."
    variant="outlined"
    size="small"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: "#555" }} />
        </InputAdornment>
      ),
      sx: {
        borderRadius: "30px",
      }
    }}
    sx={{
      backgroundColor: "white",
      borderRadius: "30px",
      width: "100%",
      "& .MuiOutlinedInput-root": {
        borderRadius: "50px",
      }
    }}
  />
</Toolbar>

        
        {/* Header */}
        <Toolbar sx={{ display: "flex", justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: '700' }}>
            User Management
          </Typography>

  {/* ADD USER BUTTON */}
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

        {/* EMPTY MESSAGE WHEN NO MATCHES */}
        {filteredUsers.length === 0 ? (
          <Box sx={{ textAlign: 'center', padding: '40px 0', color: '#555' }}>
            <Typography variant="h6" fontWeight={600}>
              No students found
            </Typography>
            <Typography variant="body2">
              Try a different search keyword.
            </Typography>
          </Box>
        ) : (
          /* CARD LIST */
          <Grid container spacing={2} sx={{ padding: '10px' }}>
            {filteredUsers.map((u) => (
              <Grid item xs={12} sm={6} md={4} key={u.id}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: '16px',
                    padding: '16px',
                    backgroundColor: '#f5f5f5'
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={700}>
                      {u.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Email: {u.email}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Age: {u.age}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Course: {u.course}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <IconButton onClick={() => onEdit(u)}>
                      <EditIcon color="primary" />
                    </IconButton>

                    <IconButton onClick={() => onDelete(u.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
