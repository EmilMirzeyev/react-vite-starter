import { type FieldErrors, useForm } from "react-hook-form";
import { useAddPost } from "@/app/api/postApi";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPostSchema } from "@/data/schemas/formValidations/addPost.schema";
import type { PostModel } from "@/data/model/post.model";

const resetForm = { title: "", description: "", isRead: null };

export const PostFormVM = () => {
  const addPost = useAddPost();
  const { t } = useTranslation();

  const methods = useForm<PostModel>({
    resolver: zodResolver(addPostSchema),
    defaultValues: resetForm,
  });

  const onError = (data: FieldErrors<PostModel>) => {
    console.error("error:", data);
  };

  const submitHandler = methods.handleSubmit((data: PostModel) => {
    addPost.mutate(data, {
      onSuccess() {
        methods.reset();
      },
    });
  }, onError);

  return { t, methods, submitHandler };
};
