import {
  getPostService,
  getPostsService,
  addPostService,
  deletePostService,
} from "@/app/services/posts.service";
import { TPostRespository } from "./TPostRepository";
import { postMigration } from "@/data/migration/post.migration";

const PostRepository: TPostRespository = {
  async deletePost(id) {
    return await deletePostService(id);
  },
  async addPost(post) {
    return await addPostService(post);
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
