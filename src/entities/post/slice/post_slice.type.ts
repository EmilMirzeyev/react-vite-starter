import type {PostModel} from "@/entities/post/models/post.model.ts";

export type PostSliceType = {
  posts: PostModel[];
  post_form: PostModel;
  is_edit: boolean;
}