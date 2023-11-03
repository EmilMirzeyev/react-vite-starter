export type SelectType<T> = {
    data: T[];
    option: (opt: T) => ReactNode
    value: BaseSelect;
    onChange: (value: BaseSelect) => void;
    invalid?: boolean;
}

export type OptionType = PropsWithChildren & {
    value: BaseSelect
}