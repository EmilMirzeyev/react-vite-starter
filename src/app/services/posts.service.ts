import axiosInstance from "@/app/lib/axios.config";
import { type PostDTO } from "@/data/dto/post.dto";
import { type PostModel } from "@/data/model/post.model";
import { endpoints } from "@/data/utils/endpoints";
import { validator } from "../utils/validator";
import {
  postSchema,
  postsApiSchema,
} from "@/data/schemas/dtoValidations/postSchema";

export const getPostsService = async (query: string) => {
  const res = await axiosInstance.get<PostDTO[]>(endpoints.posts(query));

  return validator({
    schema: postsApiSchema,
    response: res.data,
  });
};

export const getPostService = async (id: number) => {
  const res = await axiosInstance.get<PostDTO>(endpoints.post(id));

  return validator({
    schema: postSchema,
    response: res.data,
  });
};

export const addPostService = async (post: PostModel) => {
  const res = await axiosInstance.post(endpoints.posts(), post);
  return res.data;
};

export const deletePostService = async (id: number) => {
  const res = await axiosInstance.delete(endpoints.post(id));
  return res.data;
};
