import { type PostDSO } from '@/data/dso/post.dso';
import post_repository from "@/app/repositories/implementation/post_repository";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import i18n from '@/app/lib/i18next.config';
import { useAppDispatch } from '@/app/hooks/useRedux';
import { errorToast, successToast } from '@/app/store/root/toastSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostModel } from '@/data/model/post.model';
import { mutate } from '../helpers/mutate';

export const usePosts = (query: string = "") => {
  return useQuery({
    queryKey: [ERevalidateTags.POSTS],
    queryFn: () => {
      return post_repository.getPosts(query);
    }
  })
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: [ERevalidateTags.POST],
    queryFn: () => {
      return post_repository.getPost(id);
    }
  })
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch()
  return useMutation({
    mutationFn: (post: PostDSO) => {
      return post_repository.addPost(post);
    },
    onMutate: async (post: PostDSO) => {
      return mutate<PostModel[]>({
        queryClient,
        queryKey: [ERevalidateTags.POSTS],
        updateFunction: (old) => [{id: 123, ...post}, ...old] as PostModel[],
      });
    },
    onError: (_error, _variables, context) => {
      dispatch(errorToast(i18n.t("post_error")))
      queryClient.setQueryData([ERevalidateTags.POSTS], context?.previousData)
    },
    onSuccess: (_data, _variables) => {
      dispatch(successToast(i18n.t("post_success")))
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [ERevalidateTags.POSTS]});
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch()
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
      dispatch(errorToast(i18n.t("post cant deleted")))
      queryClient.setQueryData([ERevalidateTags.POSTS], context?.previousData)
    },
    onSuccess: (_data, _variables) => {
      dispatch(successToast(i18n.t("post deleted")))
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [ERevalidateTags.POSTS]});
    },
  });
};
