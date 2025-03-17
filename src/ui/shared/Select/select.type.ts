import type {BaseType} from "@/data/types/base.type";
import {SelectOptionVariantEnum} from "./select.enum";
import type {Overwrite} from "@/data/types/overwrite.type";

export type SelectDataType = Overwrite<BaseType, { id: number | null }> & {
    disabled?: boolean;
};

export type SelectType<T extends SelectDataType> = {
    data: T[];
    className?: string;
    label?: string;
    name: string;
    hasReset?: boolean;
    isTriggered?: boolean;
    disabled?: boolean;
    placeholder?: string;
    variant?: SelectOptionVariantEnum;
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
