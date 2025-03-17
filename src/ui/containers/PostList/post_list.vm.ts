import { useMemo, useState } from "react";
import type { PostModel } from "@/entities/post/models/post.model.ts";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
import { RequestStateEnum } from "@/data/enum/request_state.enum";
import { useGetPostsApi } from "@/entities/post/api/useGetPosts.api.ts";
import { useDeletePostApi } from "@/entities/post/api/useDeletePost.api.ts";
import { setPostForm } from "@/entities/post/slice";

export const PostListVM = () => {
  const { data, isLoading, isError, error } = useGetPostsApi("?_limit=20");
  const dispatch = useAppDispatch();
  const deletePost = useDeletePostApi();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeID, setActiveID] = useState<number>();

  useUpdateEffect(() => {
    setModalVisible(false);
  }, [deletePost.isSuccess]);

  const deleteHandler = (id: number) => {
    deletePost.mutate(id);
  };

  useUpdateEffect(() => {
    if (isError) {
      alert(error);
    }
  }, [isError]);

  const updateHandler = (post: PostModel) => {
    dispatch(setPostForm(post));
  };

  const requestState = useMemo(() => {
    if (isLoading) return RequestStateEnum.LOADING;
    if (data?.length) return RequestStateEnum.SUCCESS;
    if (data?.length === 0) return RequestStateEnum.EMPTY;
  }, [isLoading, data]);

  return {
    data,
    modalVisible,
    setModalVisible,
    activeID,
    setActiveID,
    deleteHandler,
    updateHandler,
    requestState,
    deleteLoading: deletePost.isPending,
  };
};
