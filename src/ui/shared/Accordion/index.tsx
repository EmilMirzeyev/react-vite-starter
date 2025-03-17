"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import type { AccordionType } from "./accordion.type";

const Accordion = ({
  accordionButton,
  defaultOpen,
  setClose,
  overflow = false,
  buttonClassName,
  panelClassName,
  children,
}: AccordionType) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open, close }) => {
        setClose && open && close();
        return (
          <>
            <DisclosureButton
              className={["w-full text-inherit", buttonClassName].join(" ")}
            >
              {accordionButton(open)}
            </DisclosureButton>
            <div className={overflow ? "overflow-visible" : "overflow-auto"}>
              <Transition
                enter="transition transition-all duration-300 ease-in !overflow-hidden"
                enterFrom="transform max-h-0"
                enterTo="transform max-h-[2000px]"
                leave="transition transition-all duration-200 ease-out !overflow-hidden"
                leaveFrom="transform max-h-[2000px]"
                leaveTo="transform max-h-0"
              >
                <DisclosurePanel className={panelClassName}>
                  {children}
                </DisclosurePanel>
              </Transition>
            </div>
          </>
        );
      }}
    </Disclosure>
  );
};

export default Accordion;
