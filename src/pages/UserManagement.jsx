import React, { useEffect, useState } from "react";
import UserNav from "../Components/UserNav.jsx";
import UserList from "../Components/UserList.jsx";
import UserFormDialog from "../Components/UserFormDialog.jsx";
import DeleteDialog from "../Components/DeleteDialog.jsx";  

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

  const fetchData = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (user) => {
    if (editData) {
      await updateUser(editData.id, user);
    } else {
      await createUser(user);
    }
    setOpenForm(false);
    setEditData(null);
    fetchData();
  };

  const handleDeleteConfirm = async () => {
    await deleteUser(deleteId);
    setOpenDelete(false);
    fetchData();
  };

  return (
    <>
      <UserNav />

      <UserList
        users={users}
        onAdd={() => setOpenForm(true)}
        onEdit={(u) => {
          setEditData(u);
          setOpenForm(true);
        }}
        onDelete={(id) => {
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
    </>
  );
}
