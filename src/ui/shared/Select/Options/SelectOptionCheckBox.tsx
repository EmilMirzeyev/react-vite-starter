import { ListboxOption } from "@headlessui/react";
import CheckSVG from "@svg/check.svg?react";
import { SelectDataType } from "../select.type.ts";

const SelectOptionCheckbox = <T extends SelectDataType>({
  data,
}: {
  data: T;
}) => {
  return (
    <ListboxOption
      className="relative flex items-center gap-x-2 cursor-pointer select-none text-gray-900 p-2 rounded data-[focus]:bg-gray-100 data-[selected]:bg-blue-50 group"
      disabled={data.disabled}
      value={data}
    >
      <span className="shrink-0 flex justify-center items-center size-6 border border-gray-200 rounded-md group-data-[selected]:border-blue-600 group-data-[selected]:bg-blue-600">
        <CheckSVG className="opacity-0 text-white duration-300 group-data-[selected]:opacity-100" />
      </span>
      {data.name}
    </ListboxOption>
  );
};

export default SelectOptionCheckbox;
