import { Dispatch, PropsWithChildren, SetStateAction } from "react";

export type ModalType = PropsWithChildren & {
  title?: string;
  dialogClassName?: string;
  closeButton?: boolean;
  visible: boolean;
  clickOutside?: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};
