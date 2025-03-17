import post_repository from "@/app/repositories/PostRepository";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import i18n from "@/app/lib/i18next.config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostModel } from "@/data/model/post.model";
import { mutate } from "../helpers/mutate";
import { snackbar } from "@/ui/shared/Snackbar";
import { SnackbarStatusEnum } from "@/data/enum/snackbar_status.enum";

export const usePosts = (query: string = "") => {
  return useQuery({
    queryKey: [ERevalidateTags.POSTS],
    queryFn: () => {
      return post_repository.getPosts(query);
    },
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: [ERevalidateTags.POST],
    queryFn: () => {
      return post_repository.getPost(id);
    },
  });
};

export const useAddPost = () => {
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
    onSuccess: (_data, _variables) => {
      snackbar(SnackbarStatusEnum.SUCCESS, i18n.t("post_success"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.POSTS] });
    },
  });
};

export const useDeletePost = () => {
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
    onSuccess: (_data, _variables) => {
      snackbar(SnackbarStatusEnum.SUCCESS, i18n.t("post deleted"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ERevalidateTags.POSTS] });
    },
  });
};
