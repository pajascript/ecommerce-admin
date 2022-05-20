import { createSlice } from "@reduxjs/toolkit";

export const userListSlice = createSlice({
    name: "userList",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //Get All Users
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const {getUsersStart, getUsersSuccess, getUsersFailure} = userListSlice.actions;

export default userListSlice.reducer;