import { EButtonVariants } from "@/data/enum/button.enum";
import React, { useCallback } from "react";

export const ButtonVM = () => {
  const variants: Record<EButtonVariants, () => string> = {
    [EButtonVariants.FILLED]() {
      return "bg-red text-white";
    },
    [EButtonVariants.OUTLINED]() {
      return "bg-blue text-white";
    },
  };

  const rippleEffect = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    let rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let circle = document.createElement("span");
    const diameter = Math.max(
      e.currentTarget.clientWidth,
      e.currentTarget.clientHeight
    );

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = x + "px";
    circle.style.top = y + "px";
    e.currentTarget.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  }, []);

  return { variants, rippleEffect };
};
