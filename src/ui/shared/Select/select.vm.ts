import { MouseEvent, useState } from "react";
import type { SelectType, SelectDataType } from "./select.type";
import {
  FieldValues,
  UseFormReturn,
  useFormContext,
  useController,
} from "react-hook-form";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";

export const SelectVM = <T extends SelectDataType>({
  data,
  name,
  value,
  multiple,
  onChange,
}: Pick<
  SelectType<T>,
  "data" | "value" | "onChange" | "name" | "multiple"
>) => {
  const methods: UseFormReturn<FieldValues> = useFormContext();
  const hasMethods = methods && methods.formState;
  const mainValue = hasMethods ? methods.getValues(name) : value;
  const getController = hasMethods
    ? useController
    : () => ({ field: { ref: undefined } });

  const { field: selectRef } = getController({ name });

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

  const [innerValue, setInnerValue] = useState<T | T[]>(() =>
    initialValue(mainValue)
  );

  const handleSelect = async (val: T | T[]): Promise<void> => {
    if (methods) {
      methods.setValue(
        name,
        Array.isArray(val) ? val.map((v) => v.id) : val.id
      );
      await methods.trigger(name);
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

  const resetHandler = async (e: MouseEvent<SVGSVGElement>): Promise<void> => {
    e.stopPropagation();
    if (methods) {
      methods.setValue(name, null);
      await methods.trigger(name);
    }
    setInnerValue(multiple ? [] : ({ id: null, name: "" } as T));
    if (multiple) {
      (onChange as (value: T[]) => void)?.([]);
    } else {
      (onChange as (value: T | null) => void)?.({ id: null, name: "" } as T);
    }
  };

  useUpdateEffect(() => {
    mainValue !== null
      ? setInnerValue(initialValue(mainValue))
      : setInnerValue(multiple ? [] : ({ id: null, name: "" } as T));
  }, [mainValue, data]);

  return {
    innerValue,
    handleSelect,
    resetHandler,
    hasMethods,
    methods,
    selectRef: selectRef.ref,
  };
};
