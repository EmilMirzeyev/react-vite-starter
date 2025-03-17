import { ReactNode } from "react";
import { DrawerPositionEnum } from "./drawer_position.enum";

export type DrawerType = {
  active: boolean;
  setActive: (type: boolean) => void;
  children: ReactNode;
  position?: DrawerPositionEnum;
  arrow?: boolean;
  className?: string;
};
