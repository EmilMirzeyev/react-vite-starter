import {
  getPostService,
  getPostsService,
  addPostService,
  deletePostService,
} from "@/app/services/posts.service";
import { postMigration } from "@/app/migration/post.migration";
import type { PostRespositoryType } from "./post.repository.type";
import type { PostDSO } from "@/data/dso/post.dso";

const PostRepository: PostRespositoryType = {
  async deletePost(id) {
    return await deletePostService(id);
  },
  async addPost(post) {
    return await addPostService(post as PostDSO);
  },
  async getPosts(query) {
    const posts = await getPostsService(query);
    const migratedPosts = posts.map(postMigration.dtoToModel);
    return migratedPosts;
  },
  async getPost(id) {
    const post = await getPostService(id);
    const migratedPost = postMigration.dtoToModel(post);
    return migratedPost;
  },
};

export default PostRepository;
