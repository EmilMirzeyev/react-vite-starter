import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import UpChevronSVG from "@svg/up_chevron.svg?react";
import { type TSelect } from "./TSelect";
import { TBaseSelect } from "@/data/types/TBaseSelect";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";

const Select = ({
  data,
  option,
  value,
  error,
  onChange,
}: TSelect) => {
  const newVal = (value === undefined || value === null) ? { id: null, name: "" } : typeof value === "number" ? data.find((d) => d.id === value) as TBaseSelect : value
  const [innerValue, setInnerValue] = useState<TBaseSelect>(newVal);

  useUpdateEffect(() => {
    value === null && setInnerValue({ id: null, name: "" })
  }, [value])
  
  
  return (
    <div className="w-72">
      <Listbox
        value={innerValue}
        onChange={(val) => {
          setInnerValue(val);
          onChange(val);
        }}
      >
        {({ open }) => {
          return (
            <div className="relative mt-1">
              <Listbox.Button
                className={[
                  "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm",
                  Boolean(error) ? "border border-red" : "",
                ].join(" ")}
              >
                <span className="block truncate">{innerValue?.name || "Seçin"}</span>
                <span
                  className={[
                    "pointer-events-none absolute duration-300 ease-in right-3 flex inset-y-0 items-center",
                    open ? "-rotate-0" : "rotate-180",
                  ].join(" ")}
                >
                  <UpChevronSVG className="w-3 h-3 text-red" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                  {data.map((d: any) => (
                    <Fragment key={d.id}>{option(d)}</Fragment>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          );
        }}
      </Listbox>
      {error && (
        <span role="alert" className="error">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Select;
