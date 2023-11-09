import { ChangeEvent, memo, useState } from "react";
import { InputType } from "./input";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";

const Input = memo(
  ({
    label,
    leading,
    trailing,
    name,
    register,
    error,
    type,
    isDebounce = false,
    value,
    onChange,
    ...props
  }: InputType) => {
    const [innerValue, setInnerValue] = useState(value || "");
    const debouncedValue = useDebounce<string>(innerValue, 500);

    useUpdateEffect(() => {
      isDebounce && onChange?.(innerValue);
    }, [debouncedValue]);

    useUpdateEffect(() => {
      isDebounce && setInnerValue(value || "");
    }, [value]);

    return (
      <div className="w-full">
        {label && <p className="mb-2 dark:text-white">{label}</p>}
        <div
          className={[
            "flex items-center gap-x-4 px-4 border h-full border-solid rounded bg-white dark:bg-softBlack",
            Boolean(error) ? "border-red" : "border-softBlack",
          ].join(" ")}
        >
          {leading}
          <input
            id={name}
            type={type}
            {...props}
            {...register!(name)}
            className="w-full dark:bg-softBlack dark:text-white"
            value={isDebounce ? innerValue : value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              isDebounce
                ? setInnerValue(e.target.value)
                : onChange?.(e.target.value);
            }}
          />
          {trailing}
        </div>
        {error && (
          <span role="alert" className="error">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
