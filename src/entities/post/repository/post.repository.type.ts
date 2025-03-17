import { type PostModel } from "@/entities/post/models/post.model.ts";

export type PostRepositoryType = {
  deletePost(id: number): Promise<unknown>;
  addPost(post: PostModel): Promise<unknown>;
  getPosts(query: string): Promise<PostModel[]>;
  getPostById(id: number): Promise<PostModel>;
};
