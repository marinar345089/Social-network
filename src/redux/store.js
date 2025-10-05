import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsReducer";
import themeReducer from "./slices/themeReducer";
import userReducer from "./slices/userReducer";
import filterReducer from "./slices/filterReducer";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    theme: themeReducer,
    user: userReducer,
    filter: filterReducer,
  },
});
