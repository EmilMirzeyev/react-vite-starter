import { type PostModel } from "@/data/model/post.model";
import {
  getPostService,
  getPostsService,
  addPostService,
  deletePostService,
} from "@/app/services/posts.service";

const PostRepository = {
  deletePost(id: number): Promise<unknown> {
    return deletePostService(id);
  },
  addPost(post: PostModel): Promise<unknown> {
    return addPostService(post);
  },
  getPosts(query: string): Promise<PostModel[]> {
    return getPostsService(query);
  },
  getPost(id: number): Promise<PostModel> {
    return getPostService(id);
  },
};

export default PostRepository;
