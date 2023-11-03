import { ButtonHTMLAttributes } from "react";
import { EButtonVariants } from "@/data/enum/e_button";

export type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: EButtonVariants;
    disabled?: boolean;
    isLoading?: boolean;
}