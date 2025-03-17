import { ComboboxOption } from "@headlessui/react";
import type { ComboboxDataType } from "./combobox.type";
import CheckSVG from "@svg/check.svg?react";

const ComboboxOptionCheckbox = <T extends ComboboxDataType>({
  data,
}: {
  data: T;
}) => {
  return (
    <ComboboxOption
      key={data.id}
      value={data}
      disabled={data.disabled}
      className="relative flex items-center justify-between gap-x-2 cursor-pointer select-none text-gray-900 p-2 rounded data-[focus]:bg-gray-100 data-[selected]:bg-blue-50 data-[disabled]:bg-gray-500 data-[disabled]:cursor-default group"
    >
      <div className="flex items-center gap-x-2">
        <span className="shrink-0 flex justify-center items-center size-5 border border-gray-300 rounded-md group-data-[selected]:border-blue-600 group-data-[selected]:bg-blue-600 group-data-[selected]:ring group-data-[selected]:ring-blue-100">
          <CheckSVG className="opacity-0 text-white duration-300 group-data-[selected]:opacity-100" />
        </span>
        <p>{data.name}</p>
      </div>
      {data.info && (
        <span className="text-16px400 text-gray-400">{data.info}</span>
      )}
    </ComboboxOption>
  );
};

export default ComboboxOptionCheckbox;
