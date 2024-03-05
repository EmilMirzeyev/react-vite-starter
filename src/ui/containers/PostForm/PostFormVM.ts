import { FieldErrors, useForm } from "react-hook-form";
import { useAddPost } from "@/app/api/postApi";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPostSchema } from "@/data/schemas/formValidations/addPostSchema";
import { PostModel } from "@/data/model/post.model";

const resetForm = { title: "", description: "", isRead: null };

export const PostFormVM = () => {
  const addPost = useAddPost();
  const { t } = useTranslation();

  const methods = useForm<PostModel>({
    resolver: zodResolver(addPostSchema),
    defaultValues: resetForm,
  });

  const submitHandler = methods.handleSubmit((data: PostModel) => {
    addPost.mutate(data, {
      onSuccess() {
        methods.reset();
      },
    });
  });

  const onError = (data: FieldErrors<PostModel>) => {
    console.error(data);
  };

  return { t, methods, submitHandler, onError };
};
