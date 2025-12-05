import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, createUser, updateUser, deleteUser } from "../../api/UserApi"; 

//Get All users

export const fetchUsers = createAsyncThunk("users/fetchUsers",async() =>{
    const res = await getAllUsers();
    return res.data.data;
})

//Add user

export const addUser = createAsyncThunk("users/addUser", async(data) =>{
    await createUser(data);
    return true;
})

//update user

export const editUser = createAsyncThunk("users/editUser", async({id, data})=>{
    await updateUser(id, data);
    return id;
})

//delete user

export const removeUser = createAsyncThunk("users/removeUser", async(id) =>{
    await deleteUser(id);
    return id;
})

const userSlice = createSlice({
    name : "users",
    initialState :{
        list : [],
        loading : false,
        successMessage : "",
        error : ""
    },
    reducers :{
        clearSuccess : (state) =>{
            state.successMessage ="";
        }
    },
    extraReducers : (builder) =>{
       builder
         // Fetch user
        .addCase(fetchUsers.pending , (state) =>{
            state.loading = true ;
        })
        .addCase(fetchUsers.fulfilled , (state , action) =>{
            state.loading = false;
            state.list = action.payload;
        })

        //Add user
        .addCase(addUser.fulfilled, (state) =>{
            state.successMessage = "User Added Successfully"
        })

        //edit user
        .addCase(editUser.fulfilled, (state) =>{
            state.successMessage = "User Updated Successfully"
        })

        //remove user
        .addCase(removeUser.fulfilled , (state, action) =>{
            state.successMessage = "User delete successfully";
            const id = action.payload;
            state.list = state.list.filter(
                (u) => u.userId !== id && u._id !== id && u.id !== id
            );
        })

    } 
});

export const {clearSuccess} = userSlice.actions;

export default userSlice.reducer;