import { useState } from "react";
import type { ComboboxType } from "./combobox.type";
import type { Overwrite } from "@/data/types/overwrite.type";
import type { BaseType } from "@/data/types/base.type";
import {
  useFormContext,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";

export const ComboboxVM = <
  T extends Overwrite<BaseType, { id: number | null }>
>({
  data,
  name,
  value,
  object,
  multiple,
  onChange,
}: Pick<
  ComboboxType<T>,
  "data" | "name" | "value" | "multiple" | "onChange" | "object"
>) => {
  const methods: UseFormReturn<FieldValues, any, undefined> = useFormContext();
  const hasMethods = methods && methods.formState;
  const mainValue = hasMethods ? methods.getValues(name) : value;

  const initialValue = (
    val: T | T[] | null | number | number[] | undefined
  ): T | T[] => {
    if (multiple) {
      if (!val) [] as T[];
      if (Array.isArray(val)) {
        if (val.every((v) => typeof v === "number")) {
          return (val.map((v) => data.find((d) => d.id === v)) as T[]) || [];
        }
        return (val as T[]).filter((v) => v && v.id !== null);
      }
      return [];
    } else {
      if (val === undefined || val === null) {
        return { id: null, name: "" } as T;
      }
      if (typeof val === "number") {
        return data.find((d) => d.id === val) || ({ id: null, name: "" } as T);
      }
      return val as T;
    }
  };

  const [innerValue, setInnerValue] = useState<T | T[]>(
    initialValue(mainValue)
  );

  const handleSelect = (val: T | T[]): void => {
    if (methods) {
      methods.setValue(
        name,
        object ? val : Array.isArray(val) ? val.map((v) => v.id) : val.id
      );
      methods.trigger(name);
    }
    setInnerValue(val);
    if (multiple) {
      (onChange as (value: T[]) => void)?.(val as T[]);
    } else {
      (onChange as (value: T) => void)?.(val as T);
    }
  };

  useUpdateEffect(() => {
    if (
      hasMethods &&
      (methods.getValues(name) === null ||
        methods.getValues(name) === undefined)
    ) {
      setInnerValue(multiple ? [] : ({ id: null, name: "" } as T));
    }
  }, [methods?.formState.isSubmitSuccessful]);

  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((d) => {
          return d.name.toLowerCase().includes(query.toLowerCase());
        });

  useUpdateEffect(() => {
    mainValue !== null
      ? setInnerValue(initialValue(mainValue))
      : setInnerValue(multiple ? [] : ({ id: null, name: "" } as T));
  }, [mainValue, data]);

  return {
    innerValue,
    handleSelect,
    filteredData,
    setQuery,
    hasMethods,
    methods,
  };
};
