import React, { useEffect, useState } from "react";
import UserList from "../components/UserList.jsx";
import UserFormDialog from "../components/UserFormDialog.jsx";
import DeleteDialog from "../components/DeleteDialog.jsx";

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
        const payload = {
          id: editData.userId,
          name: user.userName ?? "",
          email: user.userEmail ?? "",
          age: user.age ?? "",
          course: user.course ?? "",
          phone : user.userMobileNo ?? "",
        };
        console.log("Updating user with payload:", payload  );
        
        await updateUser(editData.id, payload);
      } else {
        // Creating new user
        const payload = {
          name: user.userName ?? "",
          email: user.userEmail ?? "",
          age: user.age ?? "",
          course: user.course ?? "",
          phone : user.userMobileNo ?? "",
        };
        console.log("Creating user with payload:", payload);
        await createUser(payload);
      }
      setOpenForm(false);
      setEditData(null);
      await fetchData();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      // don't call delete if id is empty / invalid
      if (!deleteId && deleteId !== 0) {
        console.warn("Skipping delete: deleteId is empty or invalid", deleteId);
        setOpenDelete(false);
        setDeleteId(null);
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
          // ensure id is numeric if possible
          const numericId = id === "" ? null : Number(id);
          setDeleteId(numericId);
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
    </>
  );
}
