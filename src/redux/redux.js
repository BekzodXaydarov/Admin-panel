import { createSlice } from "@reduxjs/toolkit";

export const Reudx = createSlice({
  name: "user",
  initialState:JSON.parse(localStorage.getItem("user")) || {},
  reducers: {
    setUser(_, { payload }) {
      localStorage.setItem("user", JSON.stringify(payload));
      return payload
    },
  },
});

export const { setUser } = Reudx.actions;

export default Reudx.reducer;
