import { ReactNode, InputHTMLAttributes } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

//TODO: if onDebounce works isDebounce required

export type TInput = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  label?: string;
  placeholder?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  name: string;
  register?: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  isDebounce?: boolean;
  inputClassName?: string;
  onChange?: (value: string) => void;
  onDebounce?: (val: string) => void;
};
