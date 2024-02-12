import { useMemo, useState } from 'react';
import { useDeletePost, usePosts } from '@/app/api/postApi';
import { ERequestState } from '@/data/enum/request_state.enum';
import { type PostModel } from '@/data/model/post.model';
import { setPostForm } from '@/app/store/postSlice';
import { useAppDispatch } from '@/app/hooks/useRedux';
import { useUpdateEffect } from '@/app/hooks/useUpdateEffect';

export const PostListVM = () => {
    const { data, isLoading } = usePosts("?_limit=20");
    const dispatch = useAppDispatch()
    const deletePost = useDeletePost();
    const [modalVisible, setModalVisible] = useState(false)
    const [activeID, setActiveID] = useState<number>()
    
    useUpdateEffect(() => {
        setModalVisible(false)
    }, [deletePost.isSuccess])
    
    const deleteHandler = (id: number) => {
        deletePost.mutate(id);
    }
    
    const updateHandler = (post: PostModel) => {
        dispatch(setPostForm(post))
    }

    const requestState = useMemo(() => {
        if (isLoading) return ERequestState.LOADING
        if (data?.length) return ERequestState.SUCCESS
        if (data?.length === 0) return ERequestState.EMPTY
    }, [isLoading, data])

    return {data, modalVisible, setModalVisible, activeID, setActiveID, deleteHandler, updateHandler, requestState}
}