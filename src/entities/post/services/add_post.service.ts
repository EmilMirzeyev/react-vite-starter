import type { PostReqDTO } from "@/entities/post/req_dto/post.req_dto.ts";
import axiosInstance from "@/app/lib/axios.config.ts";
import { endpoints } from "@/data/utils/endpoints.ts";

export const addPostService = async (post: PostReqDTO) => {
  const res = await axiosInstance.post(endpoints.posts(), post);
  return res.data;
};
