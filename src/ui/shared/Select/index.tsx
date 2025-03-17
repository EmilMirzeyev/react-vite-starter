import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment, ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import type { SelectDataType, SelectType } from "./select.type";
import { SelectOptionVariantEnum } from "./select.enum";
import { SelectVM } from "./select.vm";
import XSVG from "@svg/x.svg?react";
import ChevronUpSVG from "@svg/chevron_up.svg?react";
import SelectOptionFactory from "./SelectOptionFactory";
import { handleError } from "@/app/helpers/handleErrors";
import { cn } from "@/app/utils/cn.ts";

const Select = <T extends SelectDataType>({
  data,
  className,
  label,
  name,
  hasReset = true,
  isTriggered = false,
  disabled = false,
  variant = SelectOptionVariantEnum.BASE,
  multiple = false,
  placeholder,
  value,
  onChange,
}: SelectType<T>): ReactElement => {
  const {
    innerValue,
    handleSelect,
    resetHandler,
    hasMethods,
    methods,
    selectRef,
  } = SelectVM({
    data,
    value,
    name,
    multiple,
    onChange,
  });

  return (
    <div className={twMerge("w-full", className)}>
      <Listbox
        value={innerValue}
        onChange={handleSelect}
        multiple={multiple}
        disabled={disabled}
      >
        <div className="relative group">
          <ListboxButton
            ref={selectRef}
            className={cn(
              "relative flex items-center justify-between w-full h-14 rounded-lg bg-white py-2 p-3 border text-left sm:text-sm cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed",
              hasMethods &&
                handleError(name, methods) &&
                (isTriggered || methods.formState.submitCount > 0)
                ? "border-red-500"
                : "border-gray-300 focus-within:border-gray-400"
            )}
          >
            {label && (
              <span
                className={cn(
                  "block truncate duration-100 text-11px400 absolute text-gray-500",
                  !Array.isArray(innerValue) && innerValue?.id === null
                    ? "opacity-0"
                    : "top-1/2 -translate-y-[20px] px-1 left-2 text-xs"
                )}
              >
                {label}
              </span>
            )}
            <span
              className={[
                "block truncate duration-100",
                !Array.isArray(innerValue) && innerValue.id !== null && !!label
                  ? "translate-y-1.5"
                  : "",
                !Array.isArray(innerValue) && innerValue.id === null && !label
                  ? "text-gray-500"
                  : "",
              ].join(" ")}
            >
              {Array.isArray(innerValue)
                ? innerValue.length
                  ? innerValue.map((v) => v.name).join(", ")
                  : placeholder || "Seçin"
                : innerValue.id !== null
                  ? innerValue.name
                  : label || placeholder || "Seçin"}
            </span>
            <div className={`flex items-center gap-2 pl-3 ml-auto`}>
              {!Array.isArray(innerValue) &&
                innerValue?.id !== null &&
                hasReset && (
                  <div className="bg-gray-200 rounded-full cursor-pointer size-6 flex items-center justify-center">
                    <XSVG onClick={resetHandler} className="size-4" />
                  </div>
                )}
              <span className="pointer-events-none relative flex items-center duration-200 ease-in rotate-180 group-data-[open]:rotate-0 ">
                <ChevronUpSVG className="size-3" />
              </span>
            </div>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              anchor="bottom start"
              className="[--anchor-gap:4px] w-[--button-width] flex flex-col gap-y-1 !max-h-60 overflow-auto rounded bg-white p-1 ring-1 ring-black/5 z-100"
            >
              {data.length ? (
                data.map((d) => (
                  <SelectOptionFactory key={d.id} data={d} variant={variant} />
                ))
              ) : (
                <p className="text-center">Məlumat yoxdur</p>
              )}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
      {hasMethods &&
      handleError(name, methods) &&
      (isTriggered || methods.formState.submitCount > 0) ? (
        <span role="alert" className="text-red-500 text-14px400">
          {handleError(name, methods)}
        </span>
      ) : null}
    </div>
  );
};

export default Select;
