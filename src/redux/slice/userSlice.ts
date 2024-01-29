import { createSlice } from "@reduxjs/toolkit";

export interface User {
    userName: string
    fullName: string
    firstName: string
    lastName: string
    emailAddress: string
    mobilePhone: string
    telephone: string
    groupMemberships: string[]
  }

 interface UserData {
    userDetails: User | null
 }

export const initialState: UserData = {
    userDetails: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {            
            state.userDetails = action.payload
        }
    }
});

export const { setUserDetails } = userSlice.actions

export const getUserData = (state) => state.user;

export default userSlice.reducer;