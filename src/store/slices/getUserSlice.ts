import { createSlice } from "@reduxjs/toolkit";

type user={
    email:String,
    password:String
}

interface UserState{
    userList:user[]
}

const initialState: UserState = {
    userList:[
        {
            email:"mohit@thecesgroup.com",
            password:"Mohitraut2410"
        },
        {
            email:"admin@thecesgroup.com",
            password:"Admin123"
        }
    ]
}

const UserListSlice = createSlice({
    name: 'userList',
    initialState: initialState,
    reducers:{
        updatePassword: (state, action)=>{
            const newUserList = state.userList;
            const a = newUserList.find(u=>u.email===action.payload.username);
        }
    }
});

export const {updatePassword} = UserListSlice.actions;
export default UserListSlice.reducer;

