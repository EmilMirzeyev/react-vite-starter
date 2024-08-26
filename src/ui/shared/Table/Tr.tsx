import { twMerge } from "tailwind-merge";
import type { TableDataCellNTableRowType } from "./table.type";

export const TR = ({
  children,
  className,
  ...props
}: TableDataCellNTableRowType) => {
  return (
    <tr
      className={twMerge(`[&>th]:py-3 [&>th]:px-4 [&>th]:whitespace-nowrap [&>td]:py-3 [&>td]:px-4
            ${className || ""}`)}
      {...props}
    >
      {children}
    </tr>
  );
};
