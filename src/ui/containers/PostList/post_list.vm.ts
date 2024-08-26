import { useMemo, useState } from "react";
import { useDeletePost, usePosts } from "@/app/api/postApi";
import type { PostModel } from "@/data/model/post.model";
import { setPostForm } from "@/app/store/postSlice";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
import { RequestStateEnum } from "@/data/enum/request_state.enum";

export const PostListVM = () => {
  const { data, isLoading, isError, error } = usePosts("?_limit=20");
  const dispatch = useAppDispatch();
  const deletePost = useDeletePost();
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
  };
};
