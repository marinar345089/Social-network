import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance, setAccessToken } from "../../axiosInstance";

const initialState = {
  profile: null,
  profileLoading: false,
  profileError: null,
  profilePosts: [],
  profilePostsLoading: false,
  profilePostsError: null,
  loginError: null,
};
export const getProfile = createAsyncThunk("user/getProfile", (id) =>
  axiosInstance.get(`/users/${id}`).then((res) => res.data)
);
export const getProfilePosts = createAsyncThunk("user/getProfilePosts", (id) =>
  axiosInstance.get(`/posts/user/${id}`).then((res) => res.data)
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  ({ username, password }) =>
    axiosInstance
      .post(`/user/login`, { username, password })
      .then((res) => res.data)
);
export const getCurrentUser = createAsyncThunk("user/getCurrentUser", () =>
  axiosInstance.get(`/user/me`).then((res) => res.data)
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.profileLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.profileError = null;
      state.profile = action.payload;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.profileLoading = false;
      state.profileError = "Server Error";
      state.profile = null;
    });
    builder.addCase(getProfilePosts.pending, (state) => {
      state.profilePostsLoading = true;
    });
    builder.addCase(getProfilePosts.fulfilled, (state, action) => {
      state.profilePostsLoading = false;
      state.profilePostsError = null;
      state.profilePosts = action.payload.posts;
    });
    builder.addCase(getProfilePosts.rejected, (state) => {
      state.profilePostsLoading = false;
      state.profilePostsError = "Server Error";
      state.profilePosts = [];
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginError = null;
      setAccessToken(action.payload.accessToken);
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loginError = "invalid login or password";
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.profileLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.profileError = null;
      state.profile = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.profileLoading = false;
      state.profileError = "Server Error";
      state.profile = null;
    });
  },
});
export default userSlice.reducer;
