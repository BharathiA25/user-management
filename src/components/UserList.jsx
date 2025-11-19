import React from "react";

// MUI components
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Paper, TableContainer, Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// UserList component to display list of users with edit and delete options
export default function UserList({ users, onAdd, onEdit, onDelete }) {
  return (
    //paper component to hold the user list table
    <Paper sx={{ padding: 2, marginTop: 2 }}>
    {/* Button to add a new user */}
      <Button variant="contained" onClick={onAdd}>
        Add User
      </Button>
    {/* Table container to display users in a tabular format */}
      <TableContainer sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
               <TableCell>Age</TableCell>
                <TableCell>course</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
      {/* Table body to map through users and display each user's details along with edit and delete buttons */ }
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.age}</TableCell>
                <TableCell>{u.course}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(u)}>
                    <EditIcon color="primary" />
                  </IconButton>

                  <IconButton onClick={() => onDelete(u.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}
