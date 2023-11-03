import { PostDTO } from "../dto/post.dto"
import { PostModel } from "../model/post.model"

export const postMigration = (dto: PostDTO): PostModel => {
    return {
        id: dto.id,
        title: dto.title,
        description: dto.body,
        isRead: false
    }
  }