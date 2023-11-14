import { Dispatch, PropsWithChildren, SetStateAction } from "react";

export type TModal = PropsWithChildren & {
  dialogClassName?: string;
  visible: boolean;
  clickOutside?: boolean
  setVisible: Dispatch<SetStateAction<boolean>>;
}