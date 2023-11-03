import { useMemo } from 'react';
import { useDeletePost, usePosts } from '@/app/api/postApi';
// import { useAppSelector } from '@/app/hooks/useRedux'
import { ERequestState } from '@/data/enum/e_request_state';
import PostCard from '@/ui/components/PostCard'

const PostList = () => {
    const { data, isFetching } = usePosts("?_limit=10");
    // const posts = useAppSelector((state) => state.posts.posts);
    const deletePost = useDeletePost();

    const deleteHandler = (id: number) => {
        deletePost.mutate(id);
    }

    const requestState = useMemo(() => {
        if (isFetching) return ERequestState.LOADING
        if (!isFetching && data!.length > 0) return ERequestState.SUCCESS
        if (!isFetching && data!.length === 0) return ERequestState.EMPTY
    }, [isFetching, data])

    return (
        <div className="grid grid-cols-3 gap-4">
            {requestState === ERequestState.LOADING && <div>Loading...</div>}
            {requestState === ERequestState.EMPTY && <div>No Data</div>}
            {requestState === ERequestState.SUCCESS && data!.map((post) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    deleteHandler={() => deleteHandler(post.id)}
                />
            ))}
        </div>
    )
}

export default PostList