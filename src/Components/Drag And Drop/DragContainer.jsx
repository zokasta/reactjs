import DraggableItem from "./DragElement";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function ({ id, items }) {
  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div className="border border-gray-400 rounded-md shadow-md p-3 m-3 min-w-[200px] min-h-[50px]">
        {items.length === 0 ? (
          <div className="p-2 text-gray-500">Drop items here</div>
        ) : (
          items.map((item) => <DraggableItem key={item} id={item} />)
        )}
      </div>
    </SortableContext>
  );
}
