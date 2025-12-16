import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    fullname: "",
    username: "",
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload._id;
            state.fullname = action.payload.fullname;
            state.username = action.payload.username;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        clearUser: (state) => {
            state.id = "";
            state.fullname = "";
            state.username = "";
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
