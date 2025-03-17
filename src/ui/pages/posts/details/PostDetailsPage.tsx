import { PostDetailsPageVM } from "./post_details_page.vm";

const PostDetailsPage = () => {
  const { data } = PostDetailsPageVM();

  return (
    <div>
      {data && (
        <>
          <h1>{data.title}</h1>
          <h2>{data.description}</h2>
        </>
      )}
    </div>
  );
};

export default PostDetailsPage;
