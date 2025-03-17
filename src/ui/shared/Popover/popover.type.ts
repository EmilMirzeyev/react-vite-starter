import { PropsWithChildren, ReactNode } from "react";

export type PopoverType = PropsWithChildren & {
  button: ReactNode;
  anchor?:
    | "bottom"
    | "bottom end"
    | "bottom start"
    | "top"
    | "top end"
    | "top start";
  panelClassName?: string;
  popoverClassName?: string;
  onClick?: (isOpen: boolean) => void;
};
