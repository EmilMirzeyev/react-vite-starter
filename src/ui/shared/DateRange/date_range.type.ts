export type DateRangeType = {
  name: string;
  className?: string;
  placeholder?: string;
  defaultValue?: [string, string];
  onChange?: (value: { startDate: string; endDate: string } | null) => void;
};

export type DateRangeVMType = Pick<
  DateRangeType,
  "name" | "onChange" | "defaultValue"
>;
