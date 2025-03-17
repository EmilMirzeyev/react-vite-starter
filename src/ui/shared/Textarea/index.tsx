import { handleError } from "@/app/helpers/handleErrors";
import { TextareaType } from "./textarea.type";
import { TextareaVM } from "./textarea.vm";
import { cn } from "@/app/utils/cn";

const Textarea = ({
  label,
  name,
  symbolCount = 0,
  isDebounce = false,
  placeholder,
  onChange,
  onDebounce,
  ...props
}: TextareaType) => {
  const { innerValue, reg, hasMethods, methods, changeHandler } = TextareaVM({
    name,
    isDebounce,
    onDebounce,
    onChange,
  });

  const remainingCharacters = props.maxLength
    ? props.maxLength -
      (hasMethods ? methods.watch(name)?.length || 0 : innerValue?.length || 0)
    : null;

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative flex items-center gap-x-4 px-4 border border-solid rounded-lg",
          props?.disabled ? "bg-gray-100" : "bg-white",
          hasMethods && handleError(name, methods)
            ? "border-red-500"
            : "border-gray-300 focus-within:border-gray-400"
        )}
      >
        <div className="relative h-full flex-grow">
          <textarea
            aria-label={name}
            id={name}
            placeholder={label ? " " : placeholder}
            className={cn(
              "w-full h-full min-h-32 peer text-15px400 bg-transparent resize-none",
              label ? "pt-2" : "pt-5"
            )}
            onChange={changeHandler}
            {...props}
            {...reg}
          />

          {label && (
            <label
              htmlFor={name}
              className="absolute text-14px400 text-gray-500 duration-300 transform -translate-y-1/2 scale-75 top-4 -left-0.5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:scale-75"
            >
              {label}
            </label>
          )}
        </div>
      </div>
      {remainingCharacters !== null && remainingCharacters !== 0 && (
        <p className="text-14px400 text-gray-600 mt-1.5 flex gap-x-1">
          <span>{remainingCharacters}</span>
          simvol qalıb
        </p>
      )}
      {hasMethods && handleError(name, methods) ? (
        <span role="alert" className="text-red-500 text-14px400">
          {handleError(name, methods)}
        </span>
      ) : null}
    </div>
  );
};

export default Textarea;
