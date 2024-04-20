import { configureStore } from "@reduxjs/toolkit";
import redux from "./redux";
import loader from "./loader";
import rooms from "./rooms";

const store = configureStore({
  reducer: {
    redux,
    loader,
    rooms,
  },
});

export default store;
