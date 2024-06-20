import { type PostModel } from "@/data/model/post.model";

export type PostRespositoryType = {
  deletePost(id: number): Promise<unknown>;
  addPost(post: PostModel): Promise<unknown>;
  getPosts(query: string): Promise<PostModel[]>;
  getPost(id: number): Promise<PostModel>;
};
