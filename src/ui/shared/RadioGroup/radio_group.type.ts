import type { ReactNode } from "react";
import { RequestStateEnum } from "@/ui/shared/Select/request_state.enum.ts";

export type RadioGroupType<
  T extends { id: number; disabled?: boolean; render: ReactNode },
> = {
  name: string;
  data: T[];
  state?: RequestStateEnum;
  toggle?: boolean;
  className?: string;
  value?: T | null | number;
  onChange?: (value: T | null) => void;
};
