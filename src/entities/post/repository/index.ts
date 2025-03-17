
import type {PostRepositoryType} from "./post.repository.type.ts";
import {getPostByIdService} from "@/entities/post/services/get_post_by_id.service.ts";
import {deletePostService} from "@/entities/post/services/delete_post.service.ts";
import {addPostService} from "@/entities/post/services/add_post.service.ts";
import {getPostsService} from "@/entities/post/services/get_posts.service.ts";
import type {PostReqDTO} from "@/entities/post/req_dto/post.req_dto.ts";
import { postMapper } from "@/entities/post/mapper";

const PostRepository: PostRepositoryType = {
  async deletePost(id) {
    return await deletePostService(id);
  },
  async addPost(post) {
    return await addPostService(post as PostReqDTO);
  },
  async getPosts(query) {
    const posts = await getPostsService(query);
    return posts.map(postMapper.resDtoToModel);
  },
  async getPostById(id) {
    const post = await getPostByIdService(id);
    return postMapper.resDtoToModel(post);
  },
};

export default PostRepository;
