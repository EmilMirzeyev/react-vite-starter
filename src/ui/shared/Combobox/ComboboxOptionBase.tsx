import { ComboboxOption } from "@headlessui/react";
import type { ComboboxDataType } from "./combobox.type";

const ComboboxOptionBase = <T extends ComboboxDataType>({
  data,
}: {
  data: T;
}) => {
  return (
    <ComboboxOption
      key={data.id}
      value={data}
      disabled={data.disabled}
      className="relative flex items-center justify-between gap-x-2 cursor-pointer select-none text-gray-900 p-2 rounded data-[focus]:bg-gray-100 data-[selected]:bg-blue-50 data-[disabled]:bg-gray-500 data-[disabled]:cursor-default"
    >
      {data.name}{" "}
      {data.info && (
        <span className="text-16px400 text-gray-400">{data.info}</span>
      )}
    </ComboboxOption>
  );
};

export default ComboboxOptionBase;
