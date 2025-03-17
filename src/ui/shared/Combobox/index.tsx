import {
  Combobox as HCombobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";
import SearchSVG from "@svg/search.svg?react";
import ChevronSVG from "@svg/chevron_up.svg?react";
import type { ComboboxDataType, ComboboxType } from "./combobox.type";
import { ComboboxVM } from "./combobox.vm";
import { handleError } from "@/app/helpers/handleErrors";
import { cn } from "@/app/utils/cn";
import type { EnsureArray } from "node_modules/@headlessui/react/dist/types";
import ComboboxOptionFactory from "./ComboboxOptionFactory";
import { ComboboxOptionVariantEnum } from "./combobox.enum";

const Combobox = <T extends ComboboxDataType>({
  variant = ComboboxOptionVariantEnum.BASE,
  data,
  name,
  value,
  object = false,
  multiple = false,
  onChange,
}: ComboboxType<T>) => {
  const {
    innerValue,
    handleSelect,
    filteredData,
    setQuery,
    hasMethods,
    methods,
  } = ComboboxVM({
    data,
    name,
    value,
    object,
    multiple,
    onChange,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-2">
        <HCombobox
          multiple={multiple}
          value={innerValue as T | EnsureArray<T> | undefined}
          onChange={(val) => handleSelect(val as T | T[])}
          onClose={() => setQuery("")}
        >
          <div className="relative">
            <span
              className={cn(
                "absolute inset-y-0 left-0 flex items-center z-10 px-2.5",
                hasMethods &&
                  handleError(name, methods) &&
                  methods.formState.submitCount > 0
                  ? "text-red-500"
                  : "text-gray-600"
              )}
            >
              <SearchSVG className="size-5" />
            </span>
            <ComboboxInput
              aria-label={name}
              displayValue={() =>
                !Array.isArray(innerValue) ? innerValue.name : ""
              }
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
              placeholder="Axtar..."
              className={cn(
                "relative flex items-center justify-between w-full h-14 rounded-lg bg-white py-2 px-10 border text-left sm:text-sm",
                hasMethods &&
                  handleError(name, methods) &&
                  methods.formState.submitCount > 0
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-gray-400"
              )}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 text-gray-600">
              <ChevronSVG className="size-4" />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom"
            className="empty:invisible w-[--input-width] [--anchor-gap:4px] flex flex-col gap-y-1 bg-white !max-h-60 overflow-auto rounded p-1 ring-1 ring-black/5 z-50"
          >
            {filteredData.map((d) => (
              <ComboboxOptionFactory key={d.id} data={d} variant={variant} />
            ))}
          </ComboboxOptions>
        </HCombobox>
      </div>
      {hasMethods &&
      handleError(name, methods) &&
      methods.formState.submitCount > 0 ? (
        <span role="alert" className="text-red-500 text-14px400">
          {handleError(name, methods)}
        </span>
      ) : null}
    </div>
  );
};

export default Combobox;
