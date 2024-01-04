import { Listbox, Transition } from "@headlessui/react";
import { Fragment, MouseEvent, useState } from "react";
import { type TSelect } from "./TSelect";
import SelectOption from "./SelectOption";
import { twMerge } from "tailwind-merge";
import UpChevronSVG from "@svg/up_chevron.svg?react";
import XSVG from "@svg/x.svg?react";
import { TBaseSelect } from "@/data/types/TBaseSelect";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";

const Select = <T extends TBaseSelect>({
  data,
  option,
  className,
  label,
  hasReset = true,
  value,
  error,
  onChange,
}: TSelect<T>) => {
  const newVal = (val: null | undefined | number | TBaseSelect) =>
    val === undefined || val === null
      ? { id: null, name: "" }
      : typeof val === "number"
      ? (data.find((d) => d.id === val) as TBaseSelect)
      : val;
  const [innerValue, setInnerValue] = useState<TBaseSelect>(newVal(value));

  const handleSelect = (val: TBaseSelect) => {
    setInnerValue(val);
    onChange(val);
  };

  useUpdateEffect(() => {
    value !== null
      ? setInnerValue(newVal(value))
      : setInnerValue({ id: null, name: "" });
  }, [value]);

  return (
    <div className={twMerge("w-full", className)}>
      <Listbox value={innerValue} onChange={(val) => handleSelect(val)}>
        {({ open }) => {
          return (
            <div className="relative">
              <Listbox.Button
                className={[
                  "relative flex items-center justify-between w-full cursor-default h-14 rounded-lg bg-white py-2 p-3 border text-left sm:text-sm",
                  error ? "border-error-500" : "border-gray-400",
                ].join(" ")}
              >
                {label && (
                  <span
                    className={`block truncate duration-100 text-11px400 absolute text-gray-500 ${
                      innerValue?.id === null
                        ? "opacity-0"
                        : "top-1/2 -translate-y-[20px] px-1 left-2 text-xs"
                    }`}
                  >
                    {label}
                  </span>
                )}
                <span
                  className={[
                    "block truncate duration-100",
                    innerValue.id !== null && !!label ? "translate-y-1.5" : "",
                  ].join(" ")}
                >
                  {innerValue.id !== null ? innerValue?.name : label || "Seçin"}
                </span>
                <div className={`flex items-center gap-2 pl-3 ml-auto`}>
                  {innerValue?.id !== null && hasReset && (
                    <div className="bg-gray-200 rounded-full cursor-pointer w-6 h-6 flex items-center justify-center">
                      <XSVG
                        onClick={(e: MouseEvent<SVGSVGElement>) => {
                          e.stopPropagation();
                          setInnerValue({ id: null, name: "" });
                          onChange({ id: null, name: "" });
                        }}
                      />
                    </div>
                  )}
                  <span
                    className={[
                      "pointer-events-none relative duration-300 ease-in  flex items-center",
                      open ? "-rotate-0" : "rotate-180",
                    ].join(" ")}
                  >
                    <UpChevronSVG className="w-3 h-3 text-gray" />
                  </span>
                </div>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-1 ring-1 ring-black/5 z-50">
                  {data.map((d: T) => (
                    <Fragment key={d.id}>
                      {option(d, innerValue.id === d.id)}
                    </Fragment>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          );
        }}
      </Listbox>
      {error && (
        <span role="alert" className="text-error-500 text-14px400">
          {error.message}
        </span>
      )}
    </div>
  );
};

Select.Option = SelectOption;

export default Select;
