import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";
import { sortValues } from "./filterReducer";

const initialState = {
  posts: [],
  postsLoading: false,
  postsError: null,
  favourites: [],
  currentPage: 1,
  limit: 10,
  total: 20,
};
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  (_, { getState }) => {
    const state = getState();
    let url = "/posts";
    const params = new URLSearchParams();
    params.append("sortBy", sortValues[state.filter.selectedSort].sortBy);
    params.append("order", sortValues[state.filter.selectedSort].order);
    params.append("limit", state.posts.limit);
    params.append("skip", state.posts.limit * (state.posts.currentPage - 1));
    if (state.filter.selectedTag) {
      url += `/tag/${state.filter.selectedTag}`;
    }
    if (state.filter.search) {
      url = `/posts/search?q=${state.filter.search}`;
    }
    return axiosInstance.get(url, { params }).then((res) => res.data);
  }
);
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const isFavourite = state.favourites.find(
        (el) => el.id === action.payload.id
      );
      if (isFavourite) {
        state.favourites = state.favourites.filter(
          (el) => el.id !== action.payload.id
        );
      } else {
        state.favourites.push(action.payload);
      }
    },
    nextPage: (state) => {
      state.currentPage++;
    },
    prevPage: (state) => {
      state.currentPage--;
    },
    changeLimit: (state, action) => {
      state.limit = action.payload;
    },
    resetPage: (state) => {
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.postsLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.postsLoading = false;
      state.postsError = null;
      state.posts = action.payload.posts;
      state.total = action.payload.total;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.postsLoading = false;
      state.postsError = "Server Error";
      state.posts = [];
    });
  },
});
export const { toggleFavourite, nextPage, prevPage, changeLimit, resetPage } =
  postsSlice.actions;
export default postsSlice.reducer;
