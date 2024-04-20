import { createSlice } from "@reduxjs/toolkit";

export const Loader = createSlice({
  name: "loader",
  initialState: {
    value: false,
  },
  reducers: {
    setLoader(_, {payload}) {
      _.value = payload
    },
  },
});

export const { setLoader } = Loader.actions;

export default Loader.reducer;
