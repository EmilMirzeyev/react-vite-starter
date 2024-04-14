import { SelectOptionVariantEnum } from "./select.enum";
import { Overwrite } from "@/data/types/Overwrite";
import { BaseModel } from "@/data/model/base.model";

export type SelectDataType = Overwrite<BaseModel, { id: number | null }> & {disabled?: boolean}

export type SelectType<T extends SelectDataType> = {
  data: T[];
  className?: string;
  label?: string;
  name: string;
  hasReset?: boolean;
  value?: T | null | number;
  variant?: SelectOptionVariantEnum
  onChange?: (value: T) => void;
};