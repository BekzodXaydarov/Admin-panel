import { createSlice } from "@reduxjs/toolkit";

export const User = createSlice({
  name: "user",
  initialState:JSON.parse(localStorage.getItem("user")) || {},
  reducers: {
    setUser(_, { payload }) {
      localStorage.setItem("user", JSON.stringify(payload));
      return payload
    },
  },
});

export const { setUser } = User.actions;

export default User.reducer;
