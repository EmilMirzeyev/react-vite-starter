import { ReactNode, InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister, FieldError} from 'react-hook-form';

export type InputType = Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, "onChange"> & {
    label?: string;
    leading?: ReactNode;
    trailing?: ReactNode;
    invalid?: boolean;
    name: string;
    register?: UseFormRegister<any>;
    error?: FieldError;
    type?: string;
    validationSchema?: RegisterOptions;
    isDebounce?: boolean;
    value?: string;
    onChange: (value: string) => void;
  }