import { createSlice } from "@reduxjs/toolkit";

export const Product = createSlice({
  name: "product",
  initialState: JSON.parse(localStorage.getItem("product")) || [],
  reducers: {
    setProduct: (_, { payload }) => {
      localStorage.setItem("product", JSON.stringify(payload));
      return payload;
    },
  },
});

export const { setProduct } = Product.actions;
export default Product.reducer;
