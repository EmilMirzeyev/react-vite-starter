import { IPostRepository } from "../abstract/i_post_repository";
import { PostModel } from "@/data/model/post.model";
import {
  getPostService,
  getPostsService,
  addPostService,
  deletePostService
} from "@/app/services/posts.service";
import { PostDSO } from "@/data/dso/post.dso";

class PostRepository implements IPostRepository {
  deletePost(id: number): Promise<any> {
   return deletePostService(id)
  }
  addPost(post: PostDSO): Promise<any> {
    return addPostService(post);
  }
  getPosts(query: string): Promise<PostModel[]> {
    return getPostsService(query);
  }
  getPost(id: number): Promise<PostModel> {
    return getPostService(id);
  }
}

export default new PostRepository();
