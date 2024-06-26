import type { Overwrite } from "@/data/types/overwrite.type";
import { SelectOptionVariantEnum } from "./select.enum";
import type { BaseType } from "@/data/types/base.type";

export type SelectDataType = Overwrite<BaseType, { id: number | null }> & {
  disabled?: boolean;
};

export type SelectType<T extends SelectDataType> = {
  data: T[];
  className?: string;
  label?: string;
  name: string;
  hasReset?: boolean;
  value?: T | null | number;
  variant?: SelectOptionVariantEnum;
  onChange?: (value: T) => void;
};
