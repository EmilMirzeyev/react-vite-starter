import { EButtonVariants } from "@/data/enum/button.enum";
import Button from "@/ui/shared/Button";
import Select from "@/ui/shared/Select";
import Input from "@/ui/shared/Input";
import { PostFormVM } from "./PostFormVM";
import Form from "@/ui/shared/Form";

const PostForm = () => {
  const { t, methods, submitHandler } = PostFormVM();

  return (
    <div className="flex flex-col gap-y-4">
      <h2>{t("add_post")}</h2>
      <Form
        className="flex gap-4 justify-center"
        onSubmit={submitHandler}
        methods={methods}
      >
        <Input name="title" placeholder="Title" />
        <Input name="description" placeholder="Description" />

        <Select
          name="isRead"
          data={[
            { id: 0, name: "Xeyr" },
            { id: 1, name: "Bəli" },
          ]}
        />
        <Button variant={EButtonVariants.OUTLINED}>Send</Button>
      </Form>
    </div>
  );
};

export default PostForm;
