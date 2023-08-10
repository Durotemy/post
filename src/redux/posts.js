import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  hasErrors: false,
  posts: [],
  status: "idle",
};
export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      postData
    );
    return response.data;
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${postData.id}`,
      postData
    );
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.loading = true;
      state.hasErrors = false;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.hasErrors = false;
    },
    [fetchPosts.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    [createPost.pending]: (state) => {
      state.loading = true;
      state.hasErrors = false;
    },
    [createPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
      state.loading = false;
      state.hasErrors = false;
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },

    [updatePost.pending]: (state) => {
      state.loading = true;
      state.hasErrors = false;
    },
    [updatePost.fulfilled]: (state, action) => {
      const updatedPost = action.payload;
      const existingPost = state.posts.find(
        (post) => post.id === updatedPost.id
      );

      if (existingPost) {
        existingPost.title = updatedPost.title;
        existingPost.body = updatedPost.body;
      }
      state.loading = false;
      state.hasErrors = false;
    },
  },
});
export default postsSlice.reducer;
