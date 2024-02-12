import { ZodType } from "zod";

type TValidator<T> = {
  schema: ZodType<any>;
  response: T;
};

export const validator = <T>({
    schema,
    response,
  }: TValidator<T>) => {
    const validatedDTO = schema.safeParse(response);
    if (!validatedDTO.success) {
      console.error(validatedDTO.error);
      throw new Error("Schema not correct");
    } else {
      return validatedDTO.data;
    }
  };
