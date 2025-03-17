import type { DrawerType } from "./drawer.type";
import { DrawerPositionEnum } from "./drawer_position.enum";
import { cn } from "@/app/utils/cn";
import ChevronSVG from "@svg/chevron_up.svg?react";
import { useEffect } from "react";

const Drawer = ({
  active,
  setActive,
  children,
  className,
  position = DrawerPositionEnum.RIGHT,
  arrow = true,
}: DrawerType) => {
  const handlePosition = () => {
    switch (position) {
      case DrawerPositionEnum.RIGHT:
        return `${active ? "right-0" : "-right-full"}`;
      case DrawerPositionEnum.LEFT:
        return `${active ? "left-0" : "-left-full"}`;
    }
  };

  useEffect(() => {
    if (active) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [active]);

  return (
    <div className="fixed z-70 top-0">
      {active && (
        <div
          onClick={() => setActive(false)}
          className={cn(
            "animate-fade transition duration-700 ease-in-out bg-opacity-60 fixed z-20 h-screen top-0 left-0 right-0 cursor-pointer",
            className
          )}
        ></div>
      )}
      <div
        className={cn(
          "z-50 h-full w-full md:w-1/2 fixed duration-700 ease-in-out",
          handlePosition()
        )}
      >
        {arrow && (
          <div
            onClick={() => setActive(false)}
            className={`absolute ${
              position === DrawerPositionEnum.RIGHT
                ? "-left-[80px]"
                : "-right-[80px]"
            } top-1/2 block md:flex justify-center items-center w-14 h-14 p-4 bg-white rounded-full z-40 cursor-pointer text-gray-800`}
          >
            <ChevronSVG
              className={cn(
                "text-black",
                position === DrawerPositionEnum.RIGHT
                  ? "rotate-90"
                  : "-rotate-90"
              )}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Drawer;
