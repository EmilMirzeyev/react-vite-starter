import {z} from "zod";
import {getPostsSchema, postSchema} from "@/entities/post/schemas/api_validations/get_posts.schema.ts";

export type PostResDTO = z.infer<typeof postSchema>;
export type GetPostsResDTO = z.infer<typeof getPostsSchema>;