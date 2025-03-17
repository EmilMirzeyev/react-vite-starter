import { DateRangePicker } from "rsuite";
import { DateRangeVM } from "./date_range.vm.ts";
import "rsuite/DateRangePicker/styles/index.css";
import { DateRangeType } from "./date_range.type.ts";
import { cn } from "@/app/utils/cn";
import "./style.css";
import { handleError } from "@/app/helpers/handleErrors.ts";
import azLocale from "@/data/constants/az_locale.data.json";

const DateRange = ({
  name,
  placeholder = "Tarix Seçin",
  onChange,
  defaultValue,
}: DateRangeType) => {
  const { methods, hasError, innerValue, setDateRange } = DateRangeVM({
    name,
    defaultValue,
    onChange,
  });

  console.log("defaultValue", defaultValue);

  return (
    <div className="w-full flex flex-col relative z-30 h-12">
      <DateRangePicker
        className={cn(
          "h-full border rounded-md [&>div]:h-full",
          hasError
            ? "border-error-500 hover:border-error-500 rs-picker-error"
            : "border-gray-300 hover:border-gray-400 focus-within:border-gray-400"
        )}
        placeholder={placeholder}
        onOk={setDateRange}
        defaultValue={innerValue}
        onClean={() => {
          setDateRange(null);
          onChange?.(null);
        }}
        onClose={() => setDateRange(innerValue)}
        showHeader={false}
        ranges={[]}
        locale={azLocale}
        placement={"autoVerticalEnd"}
        menuClassName="z-30"
        appearance="subtle"
        calendarSnapping
        editable
        character=" - "
        // renderValue={([start, end]) => {
        //     return `${format(start, "dd/MM/yyyy")} - ${format(
        //         end,
        //         "dd/MM/yyyy"
        //     )}`;
        // }}
      />
      {hasError && (
        <span role="alert" className="text-red-500 text-14px400 mt-0.5">
          {handleError(name, methods)}
        </span>
      )}
    </div>
  );
};

export default DateRange;
