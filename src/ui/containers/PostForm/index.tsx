import { EButtonVariants } from "@/data/enum/button.enum";
import { Controller } from "react-hook-form";
import Button from "@/ui/shared/Button";
import Select from "@/ui/shared/Select";
import Input from "@/ui/shared/Input";
import { PostFormVM } from "./PostFormVM";

const selectData = [
  { id: 0, name: "Xeyr" },
  { id: 1, name: "Bəli" },
];

const PostForm = () => {
  const { t, handleSubmit, errors, control, register, submitHandler, onError } =
    PostFormVM();

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
