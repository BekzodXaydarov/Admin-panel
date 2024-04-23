import { createSlice } from "@reduxjs/toolkit";

export const Room = createSlice({
  name: "room",
  initialState:JSON.parse(localStorage.getItem("room")) || [],
  reducers: {
    setRoom(_, { payload }) {
      localStorage.setItem("room", JSON.stringify(payload));
      return payload
    },

  },
});

export const { setRoom } = Room.actions;

export default Room.reducer;
