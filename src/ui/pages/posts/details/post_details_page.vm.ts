import { useGetPostByIdApi } from "@/entities/post/api/useGetPostById.api";
import { useParams } from "react-router-dom";

export const PostDetailsPageVM = () => {
  const params = useParams();
  const { data } = useGetPostByIdApi(Number(params.postId));

  return { data };
};
