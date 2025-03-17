import axiosInstance from "@/app/lib/axios.config.ts";
import {endpoints} from "@/data/utils/endpoints.ts";
import {validator} from "@/app/utils/validator.ts";
import {GetPostsResDTO} from "@/entities/post/res_dto/get_posts.res_dto.ts";
import {getPostsSchema} from "@/entities/post/schemas/api_validations/get_posts.schema.ts";

export const getPostsService = async (query: string) => {
  const res = await axiosInstance.get<GetPostsResDTO>(endpoints.posts(query));

  return validator({
    endpoint: endpoints.posts(query),
    schema: getPostsSchema,
    response: res.data,
  });
};