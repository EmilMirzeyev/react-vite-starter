import type {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";
import { ClassValue } from "clsx";
import type { NestedKeysType } from "@/data/types/nested_keys.type";
import { RequestStateEnum } from "@/data/enum/request_state.enum";

export type TableHeaderBaseType = {
  id: number;
  name?: string | ReactNode;
  width?: string;
  className?: string;
};

export type TableHeaderType<T> = TableHeaderBaseType &
  (
    | { key: NestedKeysType<T>; render?: undefined }
    | { key?: never; render: (row: T, index: number) => ReactNode }
  );

export type TableType<T extends { id: number }> = {
  headData: TableHeaderType<T>[];
  bodyData: T[];
  state?: RequestStateEnum;
  title?: ReactNode;
  className?: string;
  trClassname?: string | ((row: T) => ClassValue);
  total?: number;
  pagination?: {
    total: number;
    perPage?: number;
  };
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
