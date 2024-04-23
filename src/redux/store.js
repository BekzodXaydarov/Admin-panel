import { configureStore } from "@reduxjs/toolkit";
import user from "./redux";
import loader from "./loader";
import rooms from "./rooms";
import waiter from "./waiter";
import product from "./product";

const store = configureStore({
  reducer: {
    user,
    loader,
    rooms,
    waiter,
    product
  },
});

export default store;
