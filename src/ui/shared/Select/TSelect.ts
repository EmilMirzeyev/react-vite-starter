import { TBaseSelect } from "@/data/types/TBaseSelect";
import { PropsWithChildren, ReactNode } from "react";
import { FieldError } from "react-hook-form";

export type TSelect = {
    data: TBaseSelect[];
    option: (opt: TBaseSelect) => ReactNode
    value?: TBaseSelect | number | null;
    error?: FieldError;
    onChange: (value: TBaseSelect) => void;
}

export type TOption = PropsWithChildren & {
    value: TBaseSelect
}