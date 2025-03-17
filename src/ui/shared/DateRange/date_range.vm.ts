import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { DateRangeVMType } from "./date_range.type.ts";
import { handleError } from "@/app/helpers/handleErrors.ts";
import { format } from "date-fns";

export const DateRangeVM = ({
  name,
  onChange,
  defaultValue,
}: DateRangeVMType) => {
  const methods = useFormContext();
  const hasMethods = methods && methods.formState;
  const [innerValue, setInnerValue] = useState<[Date, Date] | null>(
    defaultValue ? [new Date(defaultValue[0]), new Date(defaultValue[1])] : null
  );

  const setDateRange = (val: [Date, Date] | null) => {
    if (val) {
      const startDate = format(new Date(val[0]), "dd.MM.yyyy");
      const endDate = format(new Date(val[1]), "dd.MM.yyyy");
      setInnerValue(val);

      onChange?.({ startDate, endDate });
    }
    if (methods) {
      methods.setValue(name, val);
      methods.trigger(name);
    }
  };

  const hasError =
    hasMethods &&
    handleError(name, methods) &&
    methods.formState.submitCount > 0;

  return { methods, hasMethods, innerValue, setDateRange, hasError };
};
