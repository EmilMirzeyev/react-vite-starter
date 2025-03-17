import { type FieldErrors, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPostSchema } from "@/entities/post/schemas/form_validations/add_post.schema.ts";
import type { PostModel } from "@/entities/post/models/post.model.ts";
import { useAddPostApi } from "@/entities/post/api/useAddPost.api.ts";

const resetForm = { title: "", description: "", isRead: null };

export const PostFormVM = () => {
  const addPost = useAddPostApi();
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
