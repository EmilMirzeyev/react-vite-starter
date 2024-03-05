import { FormProvider } from "react-hook-form";
import { TForm } from "./TForm";

const Form = ({ children, methods, ...props }: TForm) => {
  return (
    <FormProvider {...methods}>
      <form {...props}>{children}</form>
    </FormProvider>
  );
};

export default Form;
