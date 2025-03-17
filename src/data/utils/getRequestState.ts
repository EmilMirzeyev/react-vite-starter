import { RequestStateEnum } from "@/data/enum/request_state.enum.ts";

type RequestStateType<T> = {
  data: T[] | T;
  isLoading: boolean;
};

export const getRequestState = <T>({
  data,
  isLoading,
}: RequestStateType<T>) => {
  if (isLoading) return RequestStateEnum.LOADING;
  const hasData = Array.isArray(data)
    ? data.length > 0
    : typeof data === "object" && data && Object.keys(data).length > 0;
  if (hasData) return RequestStateEnum.SUCCESS;
  if (!hasData) return RequestStateEnum.EMPTY;
};
