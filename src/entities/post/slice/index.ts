import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deepClone } from "@/app/utils/deepClone";
import type { PostModel } from "@/entities/post/models/post.model.ts";
import type {PostSliceType} from "@/entities/post/slice/post_slice.type.ts";

const initPostForm: PostModel = {
  id: 0,
  title: "",
  description: "",
  isRead: 0
}

const initialState: PostSliceType = {
  posts: [],
  post_form: deepClone(initPostForm),
  is_edit: false
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
    setPostForm: (state, action: PayloadAction<Partial<PostModel>>) => {
        state.post_form = { ...state.post_form, ...action.payload };
    },
    setAllPostFormInputs: (
      state,
      action: PayloadAction<{ key: keyof PostModel, value: PostModel[keyof PostModel] }>
    ) => {
      const { key, value } = action.payload;
      (state.post_form[key] as PostModel[keyof PostModel]) = value
    },
    resetPostForm: (state) => {
      state.post_form = initPostForm
    },
  },
});

export const { setPosts, addPost, deletePost, setPostForm, setAllPostFormInputs, resetPostForm } = postSlice.actions;
export default postSlice.reducer;
