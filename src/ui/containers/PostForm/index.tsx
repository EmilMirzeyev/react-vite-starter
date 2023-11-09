import { useState } from "react";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { setAllPostFormInputs } from "@/app/store/postSlice";
import { EButtonVariants } from "@/data/enum/button.enum";
import { Controller, useForm } from "react-hook-form";
import { BaseSelect } from "@/data/types/base_select";
import { useAddPost } from "@/app/api/postApi";
import { useTranslation } from "react-i18next";
import Button from "@/ui/shared/Button";
import Select from "@/ui/shared/Select";
import Option from "@/ui/shared/Select/Option";
import Input from "@/ui/shared/Input";
import { PostDSO } from "@/data/dso/post.dso";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPostSchema } from "@/data/schemas/formValidations/addPostSchema";

const selectData = [
  { id: 0, name: "Xeyr" },
  { id: 1, name: "Bəli" },
];

const PostForm = () => {
  const addPost = useAddPost();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [selectValue, setSelectValue] = useState<BaseSelect>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostDSO>({
    resolver: zodResolver(addPostSchema),
  });

  const submitHandler = (data: PostDSO) => {
    addPost.mutate(data);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h2>{t("add_post")}</h2>
      <form
        className="flex gap-4 justify-center"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Input
          name="title"
          placeholder="Title"
          isDebounce
          error={errors.title}
          register={register}
          onChange={(value) =>
            dispatch(setAllPostFormInputs({ key: "title", value }))
          }
        />
        <Input
          name="description"
          placeholder="Description"
          isDebounce
          error={errors.description}
          register={register}
          onChange={(value) =>
            dispatch(setAllPostFormInputs({ key: "description", value }))
          }
        />
        <Controller
          control={control}
          name="isRead"
          render={({ field: { onChange: onChange } }) => (
            <Select
              data={selectData}
              error={errors.isRead}
              option={(val) => <Option value={val}>{val.name}</Option>}
              value={selectValue || { id: null, name: "" }}
              onChange={(val) => {
                onChange(Boolean(val.id));
                setSelectValue(val);
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
