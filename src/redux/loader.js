import { createSlice } from "@reduxjs/toolkit";

export const Loader = createSlice({
  name: "loader",
  initialState: false,
  reducers: {
    setLoader(_, { payload }) {
      return payload;
    },
  },
});

export const { setLoader } = Loader.actions;

export default Loader.reducer;
