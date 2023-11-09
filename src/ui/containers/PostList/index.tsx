import { useMemo, useState } from 'react';
import { useDeletePost, usePosts } from '@/app/api/postApi';
// import { useAppSelector } from '@/app/hooks/useRedux'
import { ERequestState } from '@/data/enum/request_state.enum';
import PostCard from '@/ui/components/PostCard'
import { type PostModel } from '@/data/model/post.model';
import { setPostForm } from '@/app/store/postSlice';
import { useAppDispatch } from '@/app/hooks/useRedux';
import Modal from '@/ui/shared/Modal';
import Button from '@/ui/shared/Button';
import { useUpdateEffect } from '@/app/hooks/useUpdateEffect';
import PostCardSkeleton from '@/ui/components/PostCard/PostCardSkeleton';

const PostList = () => {
    const { data, isFetching } = usePosts("?_limit=20");
    const dispatch = useAppDispatch()
    // const posts = useAppSelector((state) => state.posts.posts);
    const deletePost = useDeletePost();
    const [modalVisible, setModalVisible] = useState(false)
    const [activeID, setActiveID] = useState<number>()
    
    useUpdateEffect(() => {
        //   dispatch(setPosts(data as PostModel[]))
        setModalVisible(false)
    }, [deletePost.isSuccess])
    
    const deleteHandler = (id: number) => {
        deletePost.mutate(id);
    }
    
    const updateHandler = (post: PostModel) => {
        dispatch(setPostForm(post))
    }

    const requestState = useMemo(() => {
        if (isFetching) return ERequestState.LOADING
        if (!isFetching && data!.length > 0) return ERequestState.SUCCESS
        if (!isFetching && data!.length === 0) return ERequestState.EMPTY
    }, [isFetching, data])

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {requestState === ERequestState.LOADING && [...Array(6)].map((_, i) => (
                    <PostCardSkeleton key={i} />
                ))}
                {requestState === ERequestState.EMPTY && <div>No Data</div>}
                {requestState === ERequestState.SUCCESS && data!.map((post) => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        description={post.description}
                        updateHandler={() => updateHandler(post)}
                        deleteHandler={() => {
                            setActiveID(post.id)
                            setModalVisible(true)
                        }}
                    />
                ))}
            </div>
            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <div className='p-4'>
                    <p>Silmek istediyinizden eminsiz ?</p>
                    <Button onClick={() => deleteHandler(activeID!)}>Sil</Button>
                </div>
            </Modal>
        </>
    )
}

export default PostList