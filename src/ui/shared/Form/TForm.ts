import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export type TForm = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  methods: UseFormReturn<FieldValues, any, FieldValues> | any;
};
