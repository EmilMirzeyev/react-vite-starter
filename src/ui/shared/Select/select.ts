import { BaseSelect } from "@/data/types/base_select";
import { PropsWithChildren, ReactNode } from "react";
import { FieldError } from "react-hook-form";

export type SelectType<T> = {
    data: T[];
    option: (opt: T) => ReactNode
    value: BaseSelect;
    error?: FieldError;
    onChange: (value: BaseSelect) => void;
}

export type OptionType = PropsWithChildren & {
    value: BaseSelect
}