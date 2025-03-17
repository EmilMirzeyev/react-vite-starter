import type { PostModel } from "@/entities/post/models/post.model.ts";
import type { PostResDTO } from "@/entities/post/res_dto/get_posts.res_dto.ts";

export const postMapper = {
  resDtoToModel: (dto: PostResDTO): PostModel => {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.body,
      isRead: 0,
    };
  },
};
