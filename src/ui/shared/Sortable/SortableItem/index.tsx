import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SortableItemType } from "./sortable_item.type";
import type { BaseType } from "@/data/types/base.type";

const SortableItem = <T extends BaseType>({
  item,
  index,
  removeItem,
}: SortableItemType<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full flex items-center gap-x-2"
    >
      <p>{index}.</p>
      <div className="w-full flex justify-between items-center p-3 bg-gray-50 rounded">
        <p>{item.name}</p>
        <span
          className="relative block border border-red-500 size-5 rounded-md after:absolute after:inset-x-1 after:h-0.5 after:bg-red-500 after:inset-1/2 after:-translate-y-1/2 after:rounded-md"
          role="button"
          onClick={removeItem}
        ></span>
      </div>
    </li>
  );
};

export default SortableItem;
