import { useUpdateEffect } from "@/app/hooks/useUpdateEffect";
import { BaseModel } from "@/data/model/base.model";
import { Overwrite } from "@/data/types/Overwrite";
import { MouseEvent, useState } from "react";

type Props<T extends BaseModel> = {
  data: T[];
  value?: BaseModel | number | null;
  onChange: (value: Overwrite<BaseModel, { id: number | null }>) => void;
};

export const SelectVM = <T extends BaseModel>({
  data,
  value,
  onChange,
}: Props<T>) => {
  const initialValue = (val: null | undefined | number | BaseModel) => {
    if (val === undefined || val === null) {
      return { id: null, name: "" };
    }
    if (typeof val === "number") {
      return data.find((d) => d.id === val) || { id: null, name: "" };
    }
    return val;
  };

  const [innerValue, setInnerValue] = useState<
    Overwrite<BaseModel, { id: number | null }>
  >(initialValue(value));

  const handleSelect = (val: BaseModel) => {
    setInnerValue(val);
    onChange(val);
  };

  const resetHandler = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setInnerValue({ id: null, name: "" });
    onChange({ id: null, name: "" });
  };

  useUpdateEffect(() => {
    value !== null
      ? setInnerValue(initialValue(value))
      : setInnerValue({ id: null, name: "" });
  }, [value]);

  return { innerValue, handleSelect, resetHandler };
};
