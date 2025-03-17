import { TD, THead, TR } from ".";
import type { TableType } from "./table.type";
import { RequestStateEnum } from "../Select/request_state.enum";
import { cn } from "@/app/utils/cn";
import { getNestedValue } from "@/app/helpers/getNestedValue";
import Pagination from "../Pagination";

export const TableContainer = <T extends { id: number | string }>({
  headData,
  bodyData,
  state = RequestStateEnum.SUCCESS,
  trClassname,
  title,
  pagination,
}: TableType<T>) => {

  const render = () => {
    switch (state) {
      case RequestStateEnum.LOADING:
        return [...Array(5)].map((_, i) => (
          <TR key={i} className="border-transparent border-y last:border-0">
            {[...Array(headData?.length)].map((_, idx) => (
              <TD key={idx}>
                <div className="w-full bg-gray-100 h-4" />
              </TD>
            ))}
          </TR>
        ));
      case RequestStateEnum.SUCCESS:
        return bodyData.map((row, rowIndex) => (
          <TR
            key={row.id}
            className={cn(
              "border-b last:border-none",
              typeof trClassname === "string" ? trClassname : trClassname?.(row)
            )}
          >
            {headData.map((header) => (
              <TD key={header.id} className="w-auto">
                {header.render
                  ? header.render(row, rowIndex)
                  : getNestedValue(row, header.key)}
              </TD>
            ))}
          </TR>
        ));

      case RequestStateEnum.EMPTY:
        return (
          <TR>
            {[...Array(headData?.length)].map((_, idx) => (
              <TD key={idx} className="w-auto">
                <p>-</p>
              </TD>
            ))}
          </TR>
        );
    }
  };

  return (
    <div className="flex flex-col relative z-20">
      <div className="overflow-x-auto z-10">
        <div className="inline-block min-w-full">
          <div
            className={cn(
              "rounded-xl",
              !!title && "border border-[#E3E8EF] p-2"
            )}
          >
            {title && <div className="px-4 pt-5 pb-2 mb-2">{title}</div>}
            <div className="flex flex-col gap-y-10">
              <table className="table-fixed w-full text-left text-sm font-light">
                <THead data={headData} />
                <tbody>{render()}</tbody>
              </table>
              {pagination && state === RequestStateEnum.SUCCESS && (
                <Pagination
                  total={pagination.total!}
                  perPage={pagination.perPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
