import { EButtonVariants } from "@/data/enum/button.enum";
import { ButtonHTMLAttributes } from "react";

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: EButtonVariants;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
}