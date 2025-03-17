import { BaseType } from "@/data/types/base.type";
import { Overwrite } from "@/data/types/overwrite.type";
import { ComboboxOptionVariantEnum } from "./combobox.enum";

export type ComboboxDataType = Overwrite<BaseType, { id: number | null }> & {
  disabled?: boolean;
  info?: string;
};

export type ComboboxType<T extends ComboboxDataType> = {
  variant?: ComboboxOptionVariantEnum;
  data: T[];
  name: string;
  object?: boolean;
} & (
  | {
      multiple?: false;
      value?: T | null | number;
      onChange?: (value: T) => void;
    }
  | {
      multiple: true;
      value?: T[] | null | number[];
      onChange?: (value: T[]) => void;
    }
);
