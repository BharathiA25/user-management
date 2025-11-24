// src/components/DeleteDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function DeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Delete User</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this user? This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} className="bounce" sx={{ color: "gray" }}>
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          className="bounce"
          sx={{ backgroundColor: "red", color: "white" }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
