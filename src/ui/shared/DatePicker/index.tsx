import { default as ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { DatePickerType } from "./date_picker.type";
import { useRef, useState } from "react";
import { format } from "date-fns";

const parseDateInput = (inputDate: string): Date | null => {
  const formats = [
    /(\d{2})\/(\d{2})\/(\d{4})/, // 99/99/9999
    /(\d{2})\.(\d{2})\.(\d{4})/, // 99.99.9999
    /(\d{2})-(\d{2})-(\d{4})/, // 99-99-9999
    /(\d{2})_(\d{2})_(\d{4})/, // 99_99_9999
  ];
  if (typeof inputDate === "string") {
    for (const format of formats) {
      const match = inputDate.match(format);
      if (match) {
        const [, day, month, year] = match;
        return new Date(`${year}-${month}-${day}`);
      }
    }
    return null;
  }

  return inputDate;
};

const DatePicker = ({
  placeholder,
  value,
  error = false,
  setValue,
  minDate = undefined,
  disabled = false,
}: DatePickerType) => {
  const dateRef = useRef<any>(null);
  const [keyDown, setKeyDown] = useState(false);

  return (
    <div
      className={[
        "h-11 flex px-4 items-center border rounded-lg",
        error ? "border-error-600" : "border-gray-200",
        disabled
          ? "bg-gray-200 [&_input]:bg-gray-200 select-none"
          : "bg-white [&_input]:bg-white",
      ].join(" ")}
    >
      <ReactDatePicker
        ref={dateRef}
        placeholderText={placeholder}
        selected={value}
        disabled={disabled}
        dateFormat="dd.MM.yyyy"
        onKeyDown={() => setKeyDown(true)}
        onChangeRaw={(event) => {
          if (
            keyDown &&
            event &&
            (event.target as unknown as { value: string }).value.length === 10
          ) {
            dateRef.current.input.value = format(
              parseDateInput(
                (event.target as unknown as { value: string }).value
              ) || new Date(),
              "dd.MM.yyyy"
            );
          }
          setKeyDown(false);
        }}
        onChange={(val) => {
          setValue(val!);
        }}
        minDate={minDate}
      />
      {/* <CalendarSVG className={error ? "text-error-600" : "text-gray-400"} /> */}
      icon
    </div>
  );
};

export default DatePicker;
