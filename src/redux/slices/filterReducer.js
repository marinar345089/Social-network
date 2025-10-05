import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstance";
export const sortValues = {
  all: { sortBy: "id", order: "asc" },
  title: { sortBy: "title", order: "asc" },
  body: { sortBy: "body", order: "asc" },
  views: { sortBy: "views", order: "desc" },
};

const initialState = {
  tags: [],
  tagsLoading: false,
  tagsError: null,
  selectedSort: "all",
  selectedTag: null,
  search: "",
};
export const getAllTags = createAsyncThunk("/filter/getAllTags", () =>
  axiosInstance.get("/posts/tag-list").then((res) => res.data)
);
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    setTag: (state, action) => {
      state.selectedTag = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearAll: (state) => {
      state.selectedSort = "all";
      state.selectedTag = null;
      state.search = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTags.pending, (state) => {
      state.tagsLoading = true;
    });
    builder.addCase(getAllTags.fulfilled, (state, action) => {
      state.tagsLoading = false;
      state.tagsError = null;
      state.tags = action.payload.slice(0, 28);
    });
    builder.addCase(getAllTags.rejected, (state) => {
      state.tagsLoading = false;
      state.tagsError = "Server Error";
      state.tags = [];
    });
  },
});
export const { setSort, setTag, setSearch, clearAll } = filterSlice.actions;
export default filterSlice.reducer;
