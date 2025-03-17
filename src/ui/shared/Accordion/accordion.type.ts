import { PropsWithChildren, ReactNode } from "react";

export type AccordionType = PropsWithChildren & {
  accordionButton: (open: boolean) => ReactNode;
  defaultOpen?: boolean;
  setClose?: boolean;
  overflow?: boolean;
  buttonClassName?: string;
  panelClassName?: string;
};
