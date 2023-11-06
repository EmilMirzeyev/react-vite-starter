import { EButtonVariants } from "@/data/enum/button.enum";
import { ButtonHTMLAttributes } from "react";

export type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: EButtonVariants;
    disabled?: boolean;
    isLoading?: boolean;
}