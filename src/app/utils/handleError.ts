import type { FieldValues, UseFormReturn } from "react-hook-form";

export const handleError = (
  key: string,
  methods: UseFormReturn<FieldValues, object, undefined>
): string => {
  const keys = key.split(".");
  let result: Record<string, unknown> = methods.formState.errors;
  for (const k of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, k)) {
      result = result[k] as Record<string, unknown>;
    } else {
      return "";
    }
  }
  return (result as { message: string }).message;
};
