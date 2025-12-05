import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/user-manages/userSlice'
export const store = configureStore({
    reducer :{
        users : userReducer
    }
})