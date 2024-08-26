import { twMerge } from "tailwind-merge";
import { TableDataCellNTableRowType } from "./table.type";

export const TD = ({ children, className }: TableDataCellNTableRowType) => {
  return (
    <td className={twMerge(`w-auto text-12px500 h-[60px] ${className || ""}`)}>
      {children}
    </td>
  );
};
