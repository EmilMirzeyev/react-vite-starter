import { Dispatch, SetStateAction } from "react";

export type SortableListType<T> = {
  list: T[];
  setList: Dispatch<SetStateAction<T[]>>;
};
