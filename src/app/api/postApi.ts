import { type PostDSO } from '@/data/dso/post.dso';
import post_repository from "@/app/repositories/implementation/post_repository";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import i18n from '@/app/lib/i18next.config';
import { useAppDispatch } from '@/app/hooks/useRedux';
import { successToast } from '@/app/store/root/toastSlice';
import { resetPostForm } from '@/app/store/postSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    onSuccess: (_data, _variables) => {
      // dispatch(addPost({ id: data.id, isRead: false, ...variables }))
      dispatch(successToast(i18n.t("post_success")))
      dispatch(resetPostForm())
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
    onSuccess: (_data, _variables) => {
      // dispatch(deletePost(variables))
      dispatch(successToast(i18n.t("post deleted")))
      queryClient.invalidateQueries({queryKey: [ERevalidateTags.POSTS]});
    },
  });
};
