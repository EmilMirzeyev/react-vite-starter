import { ReactNode, InputHTMLAttributes } from 'react'
import { UseFormRegister, FieldError} from 'react-hook-form';

export type TInput = Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, "onChange"> & {
    label?: string;
    leading?: ReactNode;
    trailing?: ReactNode;
    name: string;
    register?: UseFormRegister<any>;
    error?: FieldError;
    type?: string;
    isDebounce?: boolean;
    value?: string;
    onChange?: (value: string) => void;
  }