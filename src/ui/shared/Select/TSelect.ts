import { TBaseSelect } from "@/data/types/TBaseSelect";
import { PropsWithChildren, ReactNode } from "react";
import { FieldError } from "react-hook-form";

export type TSelect<T> = {
  data: T[];
  option: (opt: TBaseSelect, selected: boolean) => ReactNode;
  value?: TBaseSelect | number | null;
  label?: string;
  hasReset?: boolean;
  error?: FieldError;
  className?: string;
  onChange: (value: TBaseSelect) => void;
};

export type TOption = PropsWithChildren & {
  value: TBaseSelect;
  selected?: boolean;
  className?: string;
};
