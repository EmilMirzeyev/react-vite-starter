import { ERequestState } from "@/data/enum/request_state.enum";
import PostCard from "@/ui/components/PostCard";
import Modal from "@/ui/shared/Modal";
import Button from "@/ui/shared/Button";
import PostCardSkeleton from "@/ui/components/PostCard/PostCardSkeleton";
import { PostListVM } from "./PostListVM";

const PostList = () => {
  const {
    data,
    modalVisible,
    setModalVisible,
    activeID,
    setActiveID,
    deleteHandler,
    updateHandler,
    requestState,
  } = PostListVM();

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {requestState === ERequestState.LOADING &&
          [...Array(6)].map((_, i) => <PostCardSkeleton key={i} />)}
        {requestState === ERequestState.EMPTY && <div>No Data</div>}
        {requestState === ERequestState.SUCCESS &&
          data?.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              updateHandler={() => updateHandler(post)}
              deleteHandler={() => {
                setActiveID(post.id);
                setModalVisible(true);
              }}
            />
          ))}
      </div>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <div className="p-4">
          <p>Silmek istediyinizden eminsiz ?</p>
          <Button onClick={() => deleteHandler(activeID!)}>Sil</Button>
        </div>
      </Modal>
    </>
  );
};

export default PostList;
