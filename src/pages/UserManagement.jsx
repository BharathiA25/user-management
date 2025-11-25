import React, { useEffect, useState } from "react";
import UserList from "../components/UserList.jsx";
import UserFormDialog from "../components/UserFormDialog.jsx";
import DeleteDialog from "../components/DeleteDialog.jsx";
import { Snackbar, Alert } from "@mui/material";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/UserApi.jsx";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const[successMessage, setSuccessMessage] = useState("");
  const[openSuccess, setOpenSuccess] = useState(false);

console.log("edit data in main:", editData);
  
console.log("set state users:", users);

  const fetchData = async () => {
    try {
      const res = await getAllUsers();

      console.log("Fetched users:", res.data)

      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (user) => {
    try {

      if (editData) {
        // if editData exists, we're updating an existing user
        const userId = editData.id || editData._id || editData.userId;
        const payload = {
          id: userId,
          userName: user.userName,
          userEmail: user.userEmail,
          age: user.age,
          course: user.course,
          userMobileNo : user.userMobileNo,

        };
        console.log("Updating user with payload:", payload  );
        
        await updateUser(userId, payload);
        setSuccessMessage("Updated Successfully ✔");
        setOpenSuccess(true);
      } else {
        // Creating new user
        const payload = {
          userName: user.userName,
          userEmail: user.userEmail,
          age: user.age,
          course: user.course,
          userMobileNo : user.userMobileNo,
        };
        console.log("Creating user with payload:", payload);
        await createUser(payload);
      }
      setOpenForm(false);
      setEditData(null);
      setSuccessMessage("Saved Successfully ✔");
      setOpenSuccess(true);
      await fetchData();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      // don't call delete if id is empty / invalid
      if (deleteId === null || deleteId === undefined) {
        console.warn("Skipping delete: deleteId is empty or invalid", deleteId);
        setOpenDelete(false);
        return;
      }

      await deleteUser(deleteId);
      setOpenDelete(false);
      setDeleteId(null);
      await fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };


  return (
    <>
      <UserList
        users={users}
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
  open={openSuccess}
  autoHideDuration={3000}
  onClose={() => setOpenSuccess(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setOpenSuccess(false)}
    severity="success"
    variant="filled"
  >
    {successMessage}
  </Alert>
</Snackbar>
    </>
  );
}
