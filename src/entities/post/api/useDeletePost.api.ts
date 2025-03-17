import {useMutation, useQueryClient} from "@tanstack/react-query";
import post_repository from "@/entities/post/repository";
import {mutate} from "@/app/helpers/mutate.ts";
import {PostModel} from "@/entities/post/models/post.model.ts";
import {ERevalidateTags} from "@/data/enum/revalidate_tags.enum.ts";
import {snackbar} from "@/ui/shared/Snackbar";
import {SnackbarStatusEnum} from "@/data/enum/snackbar_status.enum.ts";
import i18n from "@/app/lib/i18next.config.ts";

export const useDeletePostApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return post_repository.deletePost(id);
    },
    onMutate: async (id: number) => {
      return mutate<PostModel[]>({
        queryClient,
        queryKey: [ERevalidateTags.POSTS],
        updateFunction: (old) => old.filter((d) => d.id !== id),
      });
    },
    onError: (_error, _variables, context) => {
      snackbar(SnackbarStatusEnum.ERROR, i18n.t("post cant deleted"));
      queryClient.setQueryData([ERevalidateTags.POSTS], context?.previousData);
    },
    onSuccess: () => {
      snackbar(SnackbarStatusEnum.SUCCESS, i18n.t("post deleted"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.POSTS] });
    },
  });
};