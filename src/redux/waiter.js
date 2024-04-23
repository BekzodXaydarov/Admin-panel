import { createSlice } from "@reduxjs/toolkit";

export const waiter = createSlice({
    name: "waiter",
    initialState:JSON.parse(localStorage.getItem("waiter")) || [],
    reducers: {
      setWaiter(_, { payload }) {
        console.log(payload);
        localStorage.setItem("waiter", JSON.stringify(payload));
        return payload
      },
  
    },
  });
  
  export const { setWaiter } = waiter.actions;
  
  export default waiter.reducer;