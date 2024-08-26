import PostCard from "@/ui/components/PostCard";
import PostCardSkeleton from "@/ui/components/PostCard/PostCardSkeleton";
import { PostListVM } from "./post_list.vm";
import { RequestStateEnum } from "@/data/enum/request_state.enum";
import Modal from "@/ui/shared/Modal";
import Button from "@/ui/shared/Button";

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
        {requestState === RequestStateEnum.LOADING &&
          [...Array(6)].map((_, i) => <PostCardSkeleton key={i} />)}
        {requestState === RequestStateEnum.EMPTY && <div>No Data</div>}
        {requestState === RequestStateEnum.SUCCESS &&
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
        <div className="space-y-4">
          <p>Silmek istediyinizden eminsiz ?</p>
          <Button
            className="bg-red-500 w-full"
            onClick={() => deleteHandler(activeID!)}
          >
            Sil
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PostList;
