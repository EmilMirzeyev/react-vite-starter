import { migrator } from "@/app/utils/migrator";
import { type PostDTO } from "@/data/dto/post.dto";
import { type PostModel } from "@/data/model/post.model";

export const postMigration = (dto: PostDTO): PostModel => {
  return migrator(dto, () => ({
    id: dto.id,
    title: dto.title,
    description: dto.body,
    isRead: false,
  }));
};
