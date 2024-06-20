import axiosInstance from "@/app/lib/axios.config";
import { type PostDTO } from "@/data/dto/post.dto";
import { type PostDSO } from "@/data/dso/post.dso";
import { endpoints } from "@/data/utils/endpoints";
import { validator } from "../utils/validator";
import {
  postSchema,
  postsApiSchema,
} from "@/data/schemas/dtoValidations/post.schema";

export const getPostsService = async (query: string) => {
  const res = await axiosInstance.get<PostDTO[]>(endpoints.posts(query));

  return validator({
    endpoint: endpoints.posts(query),
    schema: postsApiSchema,
    response: res.data,
  });
};

export const getPostService = async (id: number) => {
  const res = await axiosInstance.get<PostDTO>(endpoints.post(id));

  return validator({
    endpoint: endpoints.post(id),
    schema: postSchema,
    response: res.data,
  });
};

export const addPostService = async (post: PostDSO) => {
  const res = await axiosInstance.post(endpoints.posts(), post);
  return res.data;
};

export const deletePostService = async (id: number) => {
  const res = await axiosInstance.delete(endpoints.post(id));
  return res.data;
};
