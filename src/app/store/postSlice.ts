import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostDSO } from "@/data/dso/post.dso";
import { deepClone } from "../helpers/deepClone";
import { PostModel } from "@/data/model/post.model";

const initPostForm: PostDSO = {
  title: "",
  description: "",
}

const initialState: { posts: PostModel[], post_form: PostDSO } = {
  posts: [],
  post_form: deepClone(initPostForm),
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostModel[]>) => {
      state.posts = action.payload
    },
    addPost: (state, action: PayloadAction<PostModel>) => {
      state.posts.unshift(action.payload)
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload)
    },
    setAllPostFormInputs: (
      state,
      action: PayloadAction<{ key: keyof PostDSO; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.post_form[key] = value
    },
    resetPostForm: (state) => {
      state.post_form = initPostForm
    },
  },
});

export const { setPosts, addPost, deletePost, setAllPostFormInputs, resetPostForm } = postSlice.actions;
export default postSlice.reducer;
