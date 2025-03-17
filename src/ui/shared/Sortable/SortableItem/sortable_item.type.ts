export type SortableItemType<T> = {
  item: T;
  index: number;
  removeItem: () => void;
};
