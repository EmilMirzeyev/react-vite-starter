import type {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";
import { RequestStateEnum } from "../Select/request_state.enum";
import type { NestedKeysType } from "@/data/types/nested_keys.type";
import { ClassValue } from "clsx";

export type TableHeaderBaseType = {
  id: number | string;
  name?: string | ReactNode;
  width?: string;
  className?: string;
};

export type TableHeaderType<T> = TableHeaderBaseType &
  (
    | { key: NestedKeysType<T>; render?: undefined }
    | { key?: never; render: (row: T, index: number) => ReactNode }
  );

export type TableType<T extends { id: number | string }> = {
  headData: TableHeaderType<T>[];
  bodyData: T[];
  state?: RequestStateEnum;
  title?: ReactNode;
  className?: string;
  trClassname?: string | ((row: T) => ClassValue);
  total?: number;
  pagination?: { total?: number; perPage?: number };
};

export type TableDataCellNTableRowType = PropsWithChildren &
  DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > & {
    className?: string;
    onClick?: (event: MouseEventHandler<HTMLTableRowElement>) => void;
  };

export type TitleDataType = PropsWithChildren<{
  className?: string;
}>;
