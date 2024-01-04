import { EButtonVariants } from "@/data/enum/button.enum";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useAddPost } from "@/app/api/postApi";
import { useTranslation } from "react-i18next";
import Button from "@/ui/shared/Button";
import Select from "@/ui/shared/Select";
import Input from "@/ui/shared/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPostSchema } from "@/data/schemas/formValidations/addPostSchema";
import { PostModel } from "@/data/model/post.model";

const selectData = [
  { id: 0, name: "Xeyr" },
  { id: 1, name: "Bəli" },
];

const resetForm = { title: "", description: "", isRead: null };

const PostForm = () => {
  const addPost = useAddPost();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PostModel>({
    resolver: zodResolver(addPostSchema),
    defaultValues: resetForm,
  });

  const submitHandler = (data: PostModel) => {
    addPost.mutate(data, {
      onSuccess() {
        reset();
      },
    });
  };

  const onError = (data: FieldErrors<PostModel>) => {
    console.error(data);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h2>{t("add_post")}</h2>
      <form
        className="flex gap-4 justify-center"
        onSubmit={handleSubmit(submitHandler, onError)}
      >
        <Input
          name="title"
          placeholder="Title"
          error={errors.title}
          register={register}
        />
        <Input
          name="description"
          placeholder="Description"
          error={errors.description}
          register={register}
        />
        <Controller
          control={control}
          name="isRead"
          render={({ field: { value, onChange } }) => (
            <Select
              data={selectData}
              error={errors.isRead}
              value={value}
              option={(val, selected) => (
                <Select.Option value={val} selected={selected}>
                  {val.name}
                </Select.Option>
              )}
              onChange={(val) => {
                onChange(val.id);
              }}
            />
          )}
        />
        <Button variant={EButtonVariants.OUTLINED}>Send</Button>
      </form>
    </div>
  );
};

export default PostForm;
