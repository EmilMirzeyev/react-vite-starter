import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { BaseType } from "@/data/types/base.type";
import SortableItem from "./SortableItem";
import { SortableListType } from "./sortable_list.type";

const Sortable = <T extends BaseType>({
  list,
  setList,
}: SortableListType<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getItemPos = (id: number) => list.findIndex((item) => item.id === id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!!over && active.id == over.id) return;

    setList((items) => {
      const oldIndex = getItemPos(Number(active.id));
      const newIndex = getItemPos(Number(over!.id));

      return arrayMove(items, oldIndex, newIndex);
    });
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <ul className="w-full flex flex-col gap-y-2">
        <SortableContext items={list} strategy={verticalListSortingStrategy}>
          {list.map((item, index) => (
            <SortableItem
              key={item.id}
              item={item}
              index={index + 1}
              removeItem={() => setList(list.filter((s) => s.id !== item.id))}
            />
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  );
};

export default Sortable;
