import React, { useEffect, useState } from "react";
import UserList from "../components/UserList.jsx";
import UserFormDialog from "../components/UserFormDialog.jsx";
import DeleteDialog from "../components/DeleteDialog.jsx";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, addUser, editUser, removeUser, clearSuccess } from "../features/user-manages/userSlice.js";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/UserApi.jsx";

export default function UserManagement() {
  const dispatch = useDispatch();
  const { list, successMessage } = useSelector((state) => state.users);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  const handleSave = (data) => {
    if (editData) {
      const id = editData.userId || editData._id || editData.id
      console.log(id)
      dispatch(editUser({ id, data })).then(() => dispatch(fetchUsers()))

    } else {
      const payload = {...data}
      delete payload.id;
      dispatch(addUser(payload)).then(() => dispatch(fetchUsers()));
    }
    setOpenForm(false);
    setEditData(null);
  }

  const handleDeleteConfirm = () => {
  dispatch(removeUser(deleteId)).then(()=> dispatch(fetchUsers()) )
  setOpenDelete(false);
  };


  return (
    <>
      <UserList
        users={list}
        onAdd={() => setOpenForm(true)}
        onEdit={(u) => {
          setEditData(u);
          setOpenForm(true);
        }}
        onDelete={(id) => {
          console.log("DELETE CLICKED ID:", id);
          setDeleteId(id);
          setOpenDelete(true);
        }}
      />
      <UserFormDialog
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditData(null);
        }}
        onSave={handleSave}
        editData={editData}
      />
      <DeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteConfirm}
      />

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={2000}
        onClose={() => dispatch(clearSuccess())}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => dispatch(clearSuccess())}
          severity="success"
          variant="filled"
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
