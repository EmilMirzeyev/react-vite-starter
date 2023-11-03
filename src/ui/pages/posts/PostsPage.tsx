// import { usePosts } from "@/app/api/postApi";
// import { useAppDispatch } from "@/app/hooks/useRedux";
// import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
// import { setPosts } from "@/app/store/postSlice";
// import { PostModel } from "@/data/model/post.model";
import PostForm from "@/ui/containers/PostForm";
import PostList from "@/ui/containers/PostList";

const PostsPage = () => {
  // const dispatch = useAppDispatch()
  // const { data, isSuccess } = usePosts("?_limit=10");

  // useUpdateEffect(() => {
  //   dispatch(setPosts(data as PostModel[]))
  // }, [isSuccess])

  return (
    <div className="container py-6 flex flex-col gap-6">
      <PostForm />
      <PostList />
    </div>
  );
};

export default PostsPage;
