import { ReactElement } from "react";
import type { ComboboxDataType } from "./combobox.type";
import { ComboboxOptionVariantEnum } from "./combobox.enum";
import ComboboxOptionBase from "./ComboboxOptionBase";
import ComboboxOptionCheckbox from "./ComboboxOptionCheckbox";

type ComboboxOptionFactoryType = <T extends ComboboxDataType>({
  data,
  variant,
}: {
  data: T;
  variant: ComboboxOptionVariantEnum;
}) => ReactElement;

const ComboboxOptionFactory: ComboboxOptionFactoryType = ({
  data,
  variant,
}) => {
  switch (variant) {
    case ComboboxOptionVariantEnum.BASE:
      return <ComboboxOptionBase data={data} />;
    case ComboboxOptionVariantEnum.CHECKBOX:
      return <ComboboxOptionCheckbox data={data} />;

    default:
      throw new Error("Invalid option variant");
  }
};

export default ComboboxOptionFactory;
