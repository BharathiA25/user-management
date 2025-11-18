import React from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Paper, TableContainer, Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserList({ users, onAdd, onEdit, onDelete }) {
  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Button variant="contained" onClick={onAdd}>
        Add User
      </Button>

      <TableContainer sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
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
