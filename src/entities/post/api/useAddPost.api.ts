import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PostModel} from "@/entities/post/models/post.model.ts";
import post_repository from "@/entities/post/repository";
import {mutate} from "@/app/helpers/mutate.ts";
import {ERevalidateTags} from "@/data/enum/revalidate_tags.enum.ts";
import {snackbar} from "@/ui/shared/Snackbar";
import {SnackbarStatusEnum} from "@/data/enum/snackbar_status.enum.ts";
import i18n from "@/app/lib/i18next.config.ts";

export const useAddPostApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: PostModel) => {
      return post_repository.addPost(post);
    },
    onMutate: async (post: Omit<PostModel, "id">) => {
      return mutate<PostModel[]>({
        queryClient,
        queryKey: [ERevalidateTags.POSTS],
        updateFunction: (old) => [{ id: 456, ...post }, ...old],
      });
    },
    onError: (_error, _variables, context) => {
      snackbar(SnackbarStatusEnum.ERROR, i18n.t("post_error"));
      queryClient.setQueryData([ERevalidateTags.POSTS], context?.previousData);
    },
    onSuccess: () => {
      snackbar(SnackbarStatusEnum.SUCCESS, i18n.t("post_success"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.POSTS] });
    },
  });
};