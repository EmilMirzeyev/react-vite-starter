import { twMerge } from "tailwind-merge";
import { InputType } from "./input.type";
import { InputVM } from "./input.vm";
import { handleError } from "@/app/helpers/handleErrors";
import { cn } from "@/app/utils/cn";

const Input = ({
  label,
  leading,
  trailing,
  name,
  type,
  isDebounce = false,
  placeholder,
  className,
  inputWrapperClassname,
  onChange,
  onDebounce,
  ...props
}: InputType) => {
  const { reg, hasMethods, methods, keyDownHandler, changeHandler } = InputVM({
    name,
    type,
    isDebounce,
    onDebounce,
    onChange,
  });

  return (
    <div className={twMerge("w-full", className)}>
      <div
        className={cn(
          "relative flex items-center gap-x-4 px-4 border h-14 border-solid rounded-lg bg-white",
          inputWrapperClassname,
          props?.disabled ? "bg-gray-100" : "bg-white",
          hasMethods && handleError(name, methods)
            ? "border-red-500"
            : "border-gray-300 focus-within:border-gray-400"
        )}
      >
        {leading}
        <div className="relative h-full flex-grow">
          <input
            aria-label={name}
            id={name}
            type={type}
            placeholder={label ? " " : placeholder}
            className={cn(
              "w-full h-full peer text-15px400 bg-transparent",
              label ? "pt-3" : ""
            )}
            onKeyDown={keyDownHandler}
            onChange={changeHandler}
            {...props}
            {...reg}
          />

          {label && (
            <label
              htmlFor={name}
              className="absolute text-14px400 text-gray-500 duration-300 transform -translate-y-1/2 scale-75 top-4 -left-0.5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2  peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:scale-75"
            >
              {label}
            </label>
          )}
        </div>
        {trailing}
      </div>
      {hasMethods && handleError(name, methods) ? (
        <span role="alert" className="text-red-500 text-14px400">
          {handleError(name, methods)}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
