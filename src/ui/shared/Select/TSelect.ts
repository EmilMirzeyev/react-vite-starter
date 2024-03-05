import { BaseModel } from "@/data/model/base.model";
import { Overwrite } from "@/data/types/Overwrite";
import { PropsWithChildren, ReactNode } from "react";
import { FieldError } from "react-hook-form";

export type TSelect<T extends BaseModel> = {
  data: T[];
  option: (opt: BaseModel, selected: boolean) => ReactNode;
  value?: BaseModel | number | null;
  label?: string;
  hasReset?: boolean;
  error?: FieldError;
  className?: string;
  onChange: (value: Overwrite<BaseModel, {id: number | null}>) => void;
};

export type TOption = PropsWithChildren & {
  value: BaseModel;
  selected?: boolean;
  className?: string;
};
