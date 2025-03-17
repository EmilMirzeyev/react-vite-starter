import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";
import React, { useCallback } from "react";

export const ButtonVM = () => {
  const variants: Record<ButtonVariantsEnum, string> = {
    [ButtonVariantsEnum.FILLED]:
      "bg-blue-600 text-white border border-transparent hover:brightness-125 disabled:bg-gray-500 [&>.ripple]:bg-white/50 disabled:hover:brightness-100",
    [ButtonVariantsEnum.OUTLINED]:
      "text-gray-800 border border-gray-300 [&>.ripple]:bg-gray-300/50 [&_.spinner]:border-gray-800",
    [ButtonVariantsEnum.SECONDARY_OUTLINED]:
      "text-blue-600 bg-blue-50 border border-blue-600 [&>.ripple]:bg-blue-200/50 [&_.spinner]:border-blue-800",
  };

  const rippleEffect = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const circle = document.createElement("span");
    circle.classList.add("ripple");
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
