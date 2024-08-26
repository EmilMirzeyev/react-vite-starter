import Select from "@/ui/shared/Select";
import Input from "@/ui/shared/Input";
import { PostFormVM } from "./post_form.vm";
import Form from "@/ui/shared/Form";
import Button from "@/ui/shared/Button";
import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";

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
        <Button variant={ButtonVariantsEnum.OUTLINED}>Send</Button>
      </Form>
    </div>
  );
};

export default PostForm;
