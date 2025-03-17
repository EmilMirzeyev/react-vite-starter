import { useQuery } from "@tanstack/react-query";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum.ts";
import post_repository from "@/entities/post/repository";

export const useGetPostByIdApi = (id: number) => {
  return useQuery({
    queryKey: [ERevalidateTags.POST],
    queryFn: () => {
      return post_repository.getPostById(id);
    },
  });
};
