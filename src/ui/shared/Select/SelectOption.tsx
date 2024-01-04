import { Listbox } from "@headlessui/react";
import { TOption } from "./TSelect";
import { twMerge } from "tailwind-merge";

const SelectOption = ({
  children,
  value,
  selected = false,
  className,
}: TOption) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        twMerge(
          "relative cursor-default select-none text-gray-900 p-2 rounded",
          active ? "bg-gray-100" : "",
          selected ? "bg-blue-50" : "",
          className
        )
      }
      value={value}
    >
      {children}
    </Listbox.Option>
  );
};

export default SelectOption;
