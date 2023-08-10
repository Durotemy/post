import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./redux/posts";

const store = configureStore({
  reducer: {
    post: postsReducer,
  },
});
export default store;
