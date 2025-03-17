import axiosInstance from "@/app/lib/axios.config.ts";
import {endpoints} from "@/data/utils/endpoints.ts";
import {validator} from "@/app/utils/validator.ts";
import {PostResDTO} from "@/entities/post/res_dto/get_posts.res_dto.ts";
import {postSchema} from "@/entities/post/schemas/api_validations/get_posts.schema.ts";

export const getPostByIdService = async (id: number) => {
  const res = await axiosInstance.get<PostResDTO>(endpoints.post(id));

  return validator({
    endpoint: endpoints.post(id),
    schema: postSchema,
    response: res.data,
  });
};