import {
  Popover as PopoverH,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { PopoverType } from "./popover.type";

const Popover = ({
  button,
  anchor = "bottom",
  panelClassName = "",
  popoverClassName = "",
  onClick,
  children,
}: PopoverType) => {
  return (
    <PopoverH
      className={twMerge("relative z-60 h-full w-fit", popoverClassName)}
    >
      {({ open }) => (
        <>
          <PopoverButton
            className="relative size-full before:absolute before:top-[calc(100%+5px)] before:left-1/2 before:-translate-x-1/2 before:size-5 before:bg-white before:rotate-45 before:border-l before:border-t before:border-gray-200 before:opacity-0 before:scale-95 before:duration-300 before:pointer-events-none data-[open]:before:opacity-100 data-[open]:before:scale-100"
            onClick={() => onClick?.(open)}
          >
            {button}
          </PopoverButton>
          <PopoverPanel
            anchor={anchor}
            transition
            className={twMerge(
              "[--anchor-gap:16px] border border-gray-200 drop-shadow-md bg-white rounded-lg z-50 transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",
              panelClassName
            )}
          >
            {children}
          </PopoverPanel>
        </>
      )}
    </PopoverH>
  );
};

export default Popover;
