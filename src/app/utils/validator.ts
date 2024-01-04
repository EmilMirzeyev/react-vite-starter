import { ZodType } from "zod";

type TValidator<T, K> = {
  schema: ZodType<any>;
  response: T;
  onError: (dto: T) => any;
  onSuccess: (dto: T) => K;
};

export const validator = <T, K>({
  schema,
  response,
  onError,
  onSuccess,
}: TValidator<T, K>) => {
  const validatedDTO = schema.safeParse(response);
  if (!validatedDTO.success) {
    console.error(validatedDTO.error);
    onError(response);
    return response as unknown as K;
  } else {
    return onSuccess(validatedDTO.data);
  }
};
