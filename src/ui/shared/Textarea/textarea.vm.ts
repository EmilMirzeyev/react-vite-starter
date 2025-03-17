import { useDebounce } from "@/app/hooks/useDebounce";
import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
import { ChangeEvent, useState } from "react";
import { FieldValues, UseFormReturn, useFormContext } from "react-hook-form";
import { TextareaType } from "./textarea.type";

export const TextareaVM = ({
  name,
  isDebounce,
  onDebounce,
  onChange,
}: TextareaType) => {
  const methods: UseFormReturn<FieldValues, any, undefined> = useFormContext();
  const [innerValue, setInnerValue] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const debouncedValue = useDebounce<string>(innerValue!, 500);
  const reg = methods ? { ...methods.register?.(name) } : undefined;
  const hasMethods = methods && methods.formState;

  useUpdateEffect(() => {
    dirty && isDebounce && onDebounce?.(innerValue!);
  }, [debouncedValue]);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    isDebounce && setInnerValue(e.target.value);
    !dirty && setDirty(true);
    onChange?.(e.target.value);
  };

  return {
    innerValue,
    reg,
    hasMethods,
    methods,
    changeHandler,
  };
};
