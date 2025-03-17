import post_repository from "@/entities/post/repository";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum.ts";
import {useQuery} from "@tanstack/react-query";

export const useGetPostsApi = (query: string = "") => {
  return useQuery({
    queryKey: [ERevalidateTags.POSTS],
    queryFn: () => {
      return post_repository.getPosts(query);
    },
  });
};
