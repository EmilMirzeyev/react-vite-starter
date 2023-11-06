import { SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useRedux";
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

const selectData = [
  { id: 0, name: "Bəli" },
  { id: 1, name: "Xeyr" },
]

const PostForm = () => {
  const addPost = useAddPost();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const postForm = useAppSelector((state) => state.posts.post_form)
  const [selectValue, setSelectValue] = useState<BaseSelect>({
    id: null,
    name: ""
  })

  const {
    register,
    trigger,
    control,
    formState: { errors },
  } = useForm<any>()

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    const output = await trigger()
    output && addPost.mutate(postForm);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <h2>{t("add_post")}</h2>
      <form className="flex gap-4 justify-center" onSubmit={submitHandler}>
        <Input
          name="title"
          placeholder="Title"
          value={postForm.title}
          isDebounce
          errors={errors}
          register={register}
          validationSchema={{
            required: "Todo text is required",
            minLength: {
              value: 3,
              message: "Please enter a minimum of 3 characters"
            }
          }}
          onChange={(value) =>
            dispatch(
              setAllPostFormInputs({ key: "title", value})
            )
          }
        />
        <Input
          name="description"
          placeholder="Description"
          value={postForm.description}
          isDebounce
          errors={errors}
          register={register}
          validationSchema={{
            required: "Todo text is required",
            minLength: {
              value: 3,
              message: "Please enter a minimum of 3 characters"
            }
          }}
          onChange={(value) =>
            dispatch(
              setAllPostFormInputs({ key: "description", value })
            )
          }
        />
        <Controller control={control}
          name="select"
          rules={{
            required: true,
          }}
          render={({ field: { onChange: onChange } }) => (
            <Select data={selectData} option={(val) => <Option value={val}>{val.name}</Option>} value={selectValue || ""} onChange={(val) => {
              onChange(val)
              setSelectValue(val)
            }} />
          )} />
        {errors.select && (
          <span role="alert">
            This field is required
          </span>
        )}
        <Button variant={EButtonVariants.OUTLINED}>Send</Button>
      </form>
    </div>
  );
};

export default PostForm;
