import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { ModalType } from "./modal.type";
import XSVG from "@svg/x.svg?react";

const Modal = ({
  children,
  title = "",
  dialogClassName,
  closeButton = true,
  visible,
  clickOutside = true,
  setVisible,
}: ModalType) => {
  return (
    <Transition show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => clickOutside && setVisible(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="w-full flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={[
                  "min-w-[260px] transform rounded bg-white text-left align-middle shadow-xl transition-all p-4",
                  dialogClassName,
                ].join(" ")}
              >
                {(title || closeButton) && (
                  <div className="flex items-center justify-between gap-x-4 mb-4">
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {closeButton && (
                      <XSVG
                        className="ml-auto cursor-pointer"
                        onClick={() => setVisible(false)}
                      />
                    )}
                  </div>
                )}
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
