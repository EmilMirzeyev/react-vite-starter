import type { ButtonType } from "./button.type";
import { ButtonVM } from "./button.vm";
import { ButtonVariantsEnum } from "@/data/enum/button_variants.enum";
import { cn } from "@/app/utils/cn";

const Button = ({
  variant = ButtonVariantsEnum.FILLED,
  className,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonType) => {
  const { variants, rippleEffect } = ButtonVM();

  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      onMouseDown={rippleEffect}
      className={cn(
        "relative flex items-center justify-center h-14 z-10 rounded px-6 overflow-hidden disabled:cursor-not-allowed [&>.ripple]:absolute [&>.ripple]:z-50 [&>.ripple]:animate-ripple [&>.ripple]:inline-block [&>.ripple]:-translate-y-1/2 [&>.ripple]:-translate-x-1/2 [&>.ripple]:pointer-events-none [&>.ripple]:rounded-full [&>.ripple]:scale-0",
        variants[variant],
        className
      )}
    >
      {isLoading ? (
        <div className="relative h-full aspect-square p-1">
          <div className="spinner w-full h-full opacity-20 border-2 rounded-full"></div>
          <div className="spinner opacity-70 border-t-2 animate-spin rounded-full absolute inset-1"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
